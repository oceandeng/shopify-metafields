import React from 'react';
import { Banner } from '@shopify/polaris';
import {
  CircleDisabledMajor
} from '@shopify/polaris-icons';
class EditorBanner extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: true
    }
  }

  toggleActive () {
    this.setState({ active: !this.state.active })
    this.props.onClearInsertRepeats()
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevState.active && !this.state.active) {
      this.setState({ active: true })
    }
  }

  render () {
    const { valid, isRepeat, insertRepeats, repeatData } = this.props

    return (
      <div className="mt20">
        {
          isRepeat && <Banner status="critical" title="The current page has duplicate data:">
            {
              repeatData.filter(item => item.data.length > 1).map((item, index) => {
                return (
                  <div key={index}>Namespace：{item.namespace} <span className="ml20">Key：</span>{item.key}</div>
                )
              })
            }
          </Banner>
        }
        {valid && <Banner status="critical" title="Error! Ensure you've not missed a field or exceed the character constranints." icon={CircleDisabledMajor}>
        </Banner>
        }
        {(!!insertRepeats.length && this.state.active) && <Banner status="critical" title="Created duplicate:" icon={CircleDisabledMajor} onDismiss={() => { this.toggleActive() }}>
          {
            insertRepeats.map((item, index) => {
              return (
                <div key={index}>Namespace：{item.namespace} <span className="ml20">Key：</span>{item.key}</div>
              )
            })
          }
        </Banner>}
      </div>
    )
  }
}

export default EditorBanner