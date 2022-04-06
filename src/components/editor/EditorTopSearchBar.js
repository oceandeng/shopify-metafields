import React from 'react';
import { Card, Layout, Stack, TextField, ButtonGroup, Button, TextContainer, DisplayText, TextStyle, Icon } from '@shopify/polaris';
import {
  SearchMajor,
  ArrowLeftMinor,
  ArrowRightMinor
} from '@shopify/polaris-icons';

class EditorTopSearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      namespace: '',
      key: ''
    }
  }

  handleChange (v, n) {
    this.setState({ [n]: v })
  }

  handleSearch () {
    const { namespace, key } = this.state
    this.props.onSearch(namespace, key)
  }

  handleReset () {
    this.setState({
      namespace: '',
      key: ''
    }, () => {
      this.handleSearch()
    })
  }

  handlePagination (type) {
    this.props.onPagination(type)
  }

  render () {
    const { namespace, key } = this.state
    const { metafields, currentPage, link } = this.props

    return (
      <div className={this.props.className}>
        <Card sectioned>
          <Layout>
            <Layout.Section oneThird>
              <TextField value={namespace} onChange={(v) => { this.handleChange(v, 'namespace') }} placeholder="namespace" />
            </Layout.Section>
            <Layout.Section oneThird>
              <TextField value={key} onChange={(v) => { this.handleChange(v, 'key') }} placeholder="key" />
            </Layout.Section>
            <Layout.Section oneThird>
              <Stack>
                <Stack.Item fill>
                  <ButtonGroup>
                    <Button icon={SearchMajor} onClick={() => { this.handleSearch() }} />
                    <Button onClick={() => { this.handleReset() }}>Reset</Button>
                  </ButtonGroup>
                </Stack.Item>
                <Stack.Item>
                  <div className="mt5">
                    <Stack>
                      <Stack.Item>
                        <TextStyle variation="subdued"><div className="lh28">Page {currentPage}</div></TextStyle>
                      </Stack.Item>
                      <Stack.Item>
                        <Button size="large" icon={ArrowLeftMinor} disabled={!link.previous} plain onClick={() => { this.handlePagination('previous') }} />
                        <Button size="large" icon={ArrowRightMinor} disabled={!link.next} plain onClick={() => { this.handlePagination('next') }} />
                      </Stack.Item>
                    </Stack>
                  </div>
                </Stack.Item>
              </Stack>
            </Layout.Section>
          </Layout>
        </Card>
        {
          (!metafields.length && (!!namespace || !!key)) && <div className="tc pt20">
            <TextContainer>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style={{ width: '80px', height: '80px', fill: '#c3cfd8', }} >
                <path d="M8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm9.707 4.293l-4.82-4.82C13.585 10.493 14 9.296 14 8c0-3.313-2.687-6-6-6S2 4.687 2 8s2.687 6 6 6c1.296 0 2.492-.415 3.473-1.113l4.82 4.82c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414z"></path>
              </svg>
              <DisplayText size="medium">Could not find any records</DisplayText>
              <TextStyle variation="subdued">Try changing the search term</TextStyle>
            </TextContainer>
          </div>
        }

      </div >
    )
  }
}

export default EditorTopSearchBar