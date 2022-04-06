import React from 'react'
import { Banner, Link } from '@shopify/polaris'

class HowToUseBanner extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: true
    }
  }

  handleOnDismiss () {
    this.setState({active: !this.state.active})
  }

  render () {
    return (
      this.state.active && <div className="mb20">
        <Banner onDismiss={() => { this.handleOnDismiss() }}>
          <div>4 steps to know <Link url="/web/view/how-to-use"><span className="blue b">how to use</span></Link> Grow Force Metafields Master!</div>
        </Banner>
      </div>
    )
  }
}

export default HowToUseBanner