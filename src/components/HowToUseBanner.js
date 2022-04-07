import React from 'react'
import { Banner, Link } from '@shopify/polaris'

import { withRouter } from "react-router-dom";
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

  handleGoHow(){
    this.props.history.push('/shopify-metafields/how-to-use')
  }

  render () {
    return (
        this.state.active && (
            <div className="mb20">
                <Banner
                    onDismiss={() => {
                        this.handleOnDismiss();
                    }}
                >
                    <div>
                        4 steps to know{" "}
                            <span className="blue b" onClick={() => {this.handleGoHow()}} >how to use</span>
                        Grow Force Metafields Master!
                    </div>
                </Banner>
            </div>
        )
    );
  }
}

export default withRouter(HowToUseBanner)