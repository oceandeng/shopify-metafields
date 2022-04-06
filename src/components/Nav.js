import React from 'react';
import { Tabs } from '@shopify/polaris';
import { withRouter } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: [
        {
          id: 'resources-list',
          content: 'Resources list',
          panelID: 'resources-list',
        },
        {
          id: 'activity-logs',
          content: 'Activity Logs',
          panelID: 'activity-logs',
        },
        // {
        //   id: 'pricing',
        //   content: 'Pricing',
        //   panelID: 'pricing',
        // },
        {
          id: 'how-to-use',
          content: 'How To Use',
          panelID: 'how-to-use'
        }
      ],
      selected: 0
    }
  }

  init () {
    let pathname = this.props.location.pathname.split('/').pop()
    let search = window.location.search
    this.queryTag = window.publicTools.getSearchQuery(search, 'callbackTag')
    if (!!this.queryTag && this.queryTag == 'pricing') {
      pathname = this.queryTag
    }
    this.handleGetPath(pathname)
  }

  handleTabChange (selectedTabIndex) {
    const ROUTENAME = this.state.tabs[selectedTabIndex].panelID
    let route = `/web/view/${ROUTENAME}`

    if (ROUTENAME == 'pricing') {
      route += `?${window.appEnvironment.publicSearch}`;
    }

    this.setState({ selected: selectedTabIndex })
    this.props.history.push(route)
    return
  }

  handleGetPath (pathname) {
    this.state.tabs.forEach((item, index) => {
      if (item.id == pathname) {
        this.setState({ selected: index }, () => {
          this.handleTabChange(index)
        })
      }
    })
  }

  componentDidUpdate (prevProps, prevState) {
    let pathname = this.props.location.pathname.split('/').pop()

    if (prevProps.location.pathname != this.props.location.pathname) {
      this.handleGetPath(pathname)
    }
  }

  componentDidMount () {
    this.init()
  }

  render () {
    return (
      <div className="top-nav">
        <Tabs tabs={this.state.tabs} selected={this.state.selected} onSelect={(index) => { this.handleTabChange(index) }}></Tabs>
      </div>
    )
  }
}

export default withRouter(Nav)