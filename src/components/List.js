import React from 'react';
import { Card, Stack, Pagination } from '@shopify/polaris';
import { withRouter } from "react-router-dom";
import { firstAPI } from '../data'
import SubListComponent from './list/SubListComponent'
import Loading from '../components/Loading'

class List extends React.Component {
  constructor(props) {
    super(props)

    this.ownerResource = this.props.match.params.ownerResource
    this.isShopifyGra = ['orders', 'customers', 'products'].includes(this.ownerResource)
    this.isPosts = this.ownerResource == 'posts'

    this.apiPath = window.publicTools.getQuery('apiPath')
    this.handle = window.publicTools.getQuery('handle')
    this.metafieldsName = window.publicTools.getQuery('metafieldsName')
    this.apiURL = window.appEnvironment.apiURL + this.apiPath
    this.apiData = firstAPI
    this.dataField = this._getDataField()
    this.timer = null
    this.delay = 1300

    this.state = {
      loading: true,
      keyword: '',
      filters: [],
      pageInfo: '',
      items: [],
      link: {
        previous: '',
        next: ''
      }
    }
  }

  getItems (type) {
    const { keyword, pageInfo } = this.state
    let params = { keyword}
    if (this.isShopifyGra) {
      if (type == 'previous'){
        params.previous_page = pageInfo
      }
      if(type == 'next'){
        params.next_page = pageInfo
      }
    }else{
      params.pageInfo = pageInfo
    }

    this.setState({ loading: true }, () => {
      window.axios.get(this.apiURL, { params }).then(res => {
        if (res.data.status == 200) {
          const data = res.data.data || res.data
          const { link } = data
          const list = data[this.dataField] || []

          const items = !!list.length ? list.map(item => {
            return {
              ...item,
              id: item.id,
              title: item.title,
              metafieldsCount: item.metafields_count,
              image: ((this.ownerResource == 'collections' || this.ownerResource == 'articles') && item.image) ? item.image.src : (this.ownerResource == 'products' && item.featuredImage) ? item.featuredImage.originalSrc : '',
              previewUrl: this.isPosts ? `blogs/${this.handle}/${item.handle}` : `${this.ownerResource}/${item.handle}`
            }
          }) : []

          this.setState({ loading: false }, () => {
            this.setState({ items, link })
          })
        } else {
          this.setState({ loading: false }, () => {
            this.setState({ items: [] })
          })
        }
      }).catch(() => {
        this.setState({ loading: false })
      })
    })
  }

  handleFiltersQueryChange (keyword) {
    this.setState({ keyword }, () => {
      if (this.timer) { clearTimeout(this.timer) }

      this.timer = setTimeout(() => {
        this.getItems()
      }, this.delay)
    })
  }

  handleQueryValueRemove () {
    this.setState({ keyword: '' }, () => {
      this.getItems()
    })
  }

  handleResourceItemClick (parentId, id, title, previewUrl) {
    this.props.history.push(`/web/view/editor/${this.ownerResource}?topBarTitle=${encodeURIComponent(title)}&previewUrl=${previewUrl}&id=${id}&parentId=${parentId}&metafieldsName=${this.metafieldsName}`)
  }

  handlePagination (type) {
    const pageInfo = this.state.link[type]
    this.setState({ pageInfo }, () => {
      this.getItems(type)
    })
  }

  _getDataField () {
    const typeArr = ['variants']
    if (typeArr.includes(this.ownerResource)) {
      return this.ownerResource.toLowerCase()
    }
    if (this.ownerResource == 'posts') {
      return 'articles'
    }
    return this.apiData[this.apiPath]
  }

  componentDidMount () {
    this.getItems()
  }

  render () {
    const { loading, keyword, filters, items, link } = this.state

    return (
      <Card>
        {
          loading ? <Loading /> :
            <>
              <SubListComponent
                query={keyword}
                filters={filters}
                ownerResource={this.ownerResource}
                items={items}
                handleFiltersQueryChange={(keyword) => this.handleFiltersQueryChange(keyword)}
                handleResourceItemClick={(parentId, id, title, previewUrl) => this.handleResourceItemClick(parentId, id, title, previewUrl)}
                handleQueryValueRemove={() => this.handleQueryValueRemove()} />
              <Stack distribution="fill">
                <div className="section-list_footer tc">
                  <Pagination
                    hasPrevious={!!link.previous}
                    onPrevious={() => { this.handlePagination('previous') }}
                    hasNext={!!link.next}
                    onNext={() => { this.handlePagination('next') }}
                  />
                </div>
              </Stack>
            </>
        }
      </Card>
    )
  }
}

export default withRouter(List)