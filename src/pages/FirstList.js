import React from 'react';
import { Frame } from '@shopify/polaris'
import ListPage from '../components/ListPage';

class FirstList extends React.Component {
  render () {
    return (
      <Frame>
        <ListPage />
      </Frame>
    )
  }
}

export default FirstList;