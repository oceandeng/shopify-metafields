import React from 'react';
import { Stack, Button, TextStyle, Toast, Tooltip } from '@shopify/polaris';
import { CodeMajor, DeleteMajor } from '@shopify/polaris-icons';
import ClipboardJS from 'clipboard';

class MetafieldsItemTitle extends React.Component {
  constructor(props) {
    super(props)
    this.index = this.props.item.index

    this.state = {
      clipSuccess: false
    }
  }

  handleCloseToast () {
    this.setState({ clipSuccess: false })
  }

  handleCalcDate (date) {
    var timeZone = publicTools.clientTimeZone()
    let timeStamp = new Date(date).getTime()
    let currentTime = timeZone.hour * 60 * 60 * 1000 + timeZone.munite * 60 * 1000

    let t = timeZone.prefix == "+" ? timeStamp + currentTime : timeStamp - currentTime

    return publicTools.getExactTime(t)
  }

  handleClipboardJS () {
    const btn = `#copy_${this.index}`
    this.clipboard = new ClipboardJS(btn)
    this.clipboard.text = (trigger) => {
      return `{{${this.props.metafieldsName}.metafields['${this.props.item.namespace}']['${this.props.item.key}']}}`
    }

    this.clipboard.on('success', (e) => {
      this.setState({ clipSuccess: true })
      e.clearSelection()
    })
  }

  componentDidMount () {
    this.handleClipboardJS()
  }

  componentDidUpdate (prevProps, prevState) {
    if (!this.state.clipSuccess) {
      this.clipboard.destroy()
      this.handleClipboardJS()
    }
  }

  componentWillUnmount () {
    this.clipboard.destroy()
  }

  render () {
    const { title, namespace, key, created_at, updated_at } = this.props.item
    const { metafields, metafieldsName } = this.props
    const isDraft = metafieldsName == 'undefined'
    return (
      <>
        <Stack>
          <Stack.Item fill>
            <span className="Polaris-Heading">{title}</span>
            <span className="ml10">{!!created_at && <TextStyle variation="subdued">create at: {this.handleCalcDate(created_at)}</TextStyle>}</span>
            <span className="ml10">{!!updated_at && <TextStyle variation="subdued">last update: {this.handleCalcDate(updated_at)}</TextStyle>}</span>
          </Stack.Item>
          <Stack.Item>
            <div className="tr">
              {isDraft ? <Tooltip content="Liquid code unavailable" preferredPosition="above">
                <Button id={`copy_${this.index}`} icon={CodeMajor} plain disabled={true}></Button>
              </Tooltip> : <Button id={`copy_${this.index}`} icon={CodeMajor} plain disabled={!(!!namespace && !!key)}></Button> }
              <span className="ml10" >
                <Button icon={DeleteMajor}
                  disabled={(metafields.filter(item => item.type == 'create').length == 1) && (metafields.filter(item => { return !item.isDeleted && item.type == 'edit' }).length < 1)}
                  plain onClick={this.props.onClose}></Button>
              </span>
            </div>
          </Stack.Item>
        </Stack >
        { this.state.clipSuccess && <Toast content="Copied" onDismiss={() => { this.handleCloseToast() }} />}
      </>
    )
  }
}

export default MetafieldsItemTitle