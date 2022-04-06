import React from 'react';
import { Button } from '@shopify/polaris';
import {
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import { withRouter } from "react-router-dom";

class GoBack extends React.Component {
  constructor(props) {
    super(props)
  }

  handleGoBack () {
    this.props.history.goBack()
  }

  render () {
    return (
      <Button icon={ArrowLeftMinor} onClick={() => { this.handleGoBack() }}></Button>
    )
  }
}

export default withRouter(GoBack);