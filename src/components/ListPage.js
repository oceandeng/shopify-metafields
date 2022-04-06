import React from 'react';
import { Button, Layout, Heading } from '@shopify/polaris';

import List from './List'
import GoBack from './GoBack'
import { withRouter } from "react-router-dom";

class SecondaryList extends React.Component {
  constructor(props) {
    super(props)
    this.ownerResource = this.props.match.params.ownerResource

    this.topBarTitle = publicTools.getQuery('topBarTitle')
  }

  handleGlobalClick () {
    this.props.history.push(`/web/view/editor`)
  }

  render () {
    return (
      <div className="wrapper section-first_list">
        <div className="container">
          <Layout>
            <Layout.Section>
              <div className="sub-tit-body">
                <div className="go-back"><GoBack /></div>
                <div className="sub-heading"><Heading>{this.topBarTitle}</Heading></div>
              </div>
            </Layout.Section>
            {false && <Layout.Section secondary>
              <div className="tr">
                <Button primary onClick={() => { this.handleGlobalClick() }}>Global Metafields</Button>
              </div>
            </Layout.Section>}
          </Layout>
          <div className="mt20">
            <List />
          </div>
        </div>
      </div >
    )
  }
}

export default withRouter(SecondaryList);