import React from 'react';
import { Layout, Heading, ButtonGroup, Button, Stack, Toast } from '@shopify/polaris';
import { ViewMajor } from '@shopify/polaris-icons';
import GoBack from '../GoBack';

class EditorTopBar extends React.Component {
  constructor(props) {
    super(props)
    this.topBarTitle = publicTools.getQuery('topBarTitle')
    this.previewUrl = publicTools.getQuery('previewUrl')
    this.max = 10

    this.ownerResource = this.props.ownerResource
    this.isShowPreview = ['variants', 'customers', 'orders', 'draft_orders', 'shop'].includes(this.ownerResource)

    this.state = {
      active: false,
      isShowPreview: !this.isShowPreview
    }
  }

  handleCreate () {
    const { metafieldsLength } = this.props
    if (metafieldsLength >= this.max) {
      this.setState({ active: true })
      return
    }
    this.props.handleCreate()
  }

  toggleActive () {
    this.setState({ active: !this.state.active })
  }

  handleView () {
    window.open(`${window.location.protocol}//${__SHOP__.myshopify_domain}/${this.previewUrl}`)
  }

  render () {
    const { active, isShowPreview } = this.state
    const { metafieldsLength } = this.props

    return (
      <>
        <Layout>
          <Layout.Section>
            <div className="sub-tit-body">
              <div className="go-back"><GoBack /></div>
              <pre><div className="sub-heading"><Heading>{this.topBarTitle ? this.topBarTitle : ''}</Heading></div></pre>
            </div>
          </Layout.Section>
          <Layout.Section secondary>
            <Stack>
              <Stack.Item fill></Stack.Item>
              <Stack.Item>
                <ButtonGroup>
                  {isShowPreview && <Button plain icon={ViewMajor} onClick={() => { this.handleView() }}>Preview</Button>}
                  <Button onClick={() => { this.handleCreate() }}>Create metafield<span className="b ml5 g9">{`(${metafieldsLength})`}</span></Button>
                </ButtonGroup>
              </Stack.Item>
            </Stack>
          </Layout.Section>
        </Layout>
        {active && <Toast content="Please save your editing first." onDismiss={() => this.toggleActive()} />}
      </>
    )
  }
}

export default EditorTopBar