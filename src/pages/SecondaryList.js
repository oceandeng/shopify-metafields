import React from 'react';
import { Frame } from '@shopify/polaris';
import ListPage from '../components/ListPage';

class SecondaryList extends React.Component {
  render () {
    return (
      <Frame>
        <ListPage />
      </Frame>
    )
  }
}

export default SecondaryList;