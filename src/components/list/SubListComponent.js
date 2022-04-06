import React from 'react';
import { Filters, ResourceList, ResourceItem, Thumbnail, Badge, Stack, Button, Avatar } from '@shopify/polaris';
import { withRouter } from "react-router-dom";
import {
  ImageMajor
} from '@shopify/polaris-icons';
class CollectionList extends React.Component {
  constructor(props) {
    super(props)

    this.exportOwnerResource = window.publicTools.getQuery('exportOwnerResource')

    const { ownerResource } = this.props
    this.ownerResource = ownerResource
    this.isProductType = ownerResource == 'collections' || ownerResource == 'products'
    this.isProduct = ownerResource == 'products'
    this.isCustomer = ownerResource == 'customers'
    this.isOrders = ownerResource == 'orders'
    this.isDraftOrders = ownerResource == 'draft_orders'
    this.isPages = ownerResource == 'pages'
    this.isBlogs = ownerResource == 'blogs'
    this.isVariants = ownerResource == 'variants'
    this.isArticles = ownerResource == 'posts'
  }

  handleGoSonPage (e, sonText, title, parentId, handle) {
    const ownerResource = sonText.toLowerCase()
    const apiData = {
      'variants': `shopify/products/${parentId}/variants`,
      'posts': `shopify/blogs/${parentId}/articles`
    }
    const metafieldsNameData = {
      'variants': `variant`,
      'posts': `article`
    }
    this.props.history.push(`/web/view/secondary-list/${ownerResource}?topBarTitle=${title}&apiPath=${apiData[ownerResource]}&parentId=${parentId}&exportOwnerResource=${ownerResource}&handle=${handle}&metafieldsName=${metafieldsNameData[ownerResource]}`)
    e.stopPropagation()
  }

  _getRenderItems (item) {
    const { id, legacyResourceId, title, email, displayName, name, image, previewUrl, metafieldsCount, totalPriceSet, handle } = item

    const lh = (this.isProductType || this.isArticles || this.isVariants) ? 'lh60' : this.isCustomer ? 'lh40' : ''
    const sonText = this.isProduct ? 'Variants' : this.isBlogs ? 'Posts' : ''
    const parentId = this.isProduct ? legacyResourceId : this.isBlogs ? id : (this.isVariants || this.isArticles) ? window.publicTools.getQuery('parentId') : ''
    const media = (this.isProductType || this.isArticles || this.isVariants) ? <Thumbnail source={image ? image : ImageMajor} name={title} /> :
      this.isCustomer ? <Avatar customer /> :
        this.isArticles ? <Thumbnail source={image ? image : ImageMajor} name={title} /> : ''
    const titleItem = (this.isProductType || this.isPages || this.isBlogs || this.isVariants || this.isArticles) ? <span className="b">{title}</span> :
      this.isCustomer ? <div><div className="lh20 b">{displayName}</div><div className="lh20">{email}</div></div> :
        this.isOrders ? <span><span className="g6">{name}</span><span className="ml20 b">{legacyResourceId}</span></span> :
          this.isDraftOrders ? <span><span className="g6">{name}</span><span className="ml20 b">{id}</span></span> : ''

    let fid = legacyResourceId ? legacyResourceId : id

    let editTitle = (this.isOrders || this.isDraftOrders) ? name : this.isCustomer ? displayName : title

    return (
      <ResourceItem
        id={id}
        media={media}
        accessibilityLabel={`View details for ${editTitle}`}
        onClick={() => { this.props.handleResourceItemClick(parentId, fid, editTitle, previewUrl) }}
      >
        <Stack alignment="center">
          <Stack.Item fill>
            <pre><div className={lh}>{titleItem}</div></pre>
          </Stack.Item>
          {
            (this.isBlogs || this.isArticles) &&
            <Stack.Item>{handle}</Stack.Item>
          }
          {
            (this.isProduct || this.isBlogs) &&
            <Stack.Item>
              <Button plain onClick={(e) => this.handleGoSonPage(e, sonText, title, parentId, handle)}>{sonText}</Button>
            </Stack.Item>
          }
          {
            this.isOrders &&
            <Stack.Item>
              <span className="g6">{totalPriceSet.presentmentMoney.amount}</span>
            </Stack.Item>
          }
          <Stack.Item>
            <Badge status={metafieldsCount > 0 ? 'success' : ''}>{metafieldsCount ? `${metafieldsCount} metafields` : 'No metafields'}</Badge>
          </Stack.Item>
        </Stack>
      </ResourceItem>
    )
  }

  render () {
    const { query, filters, items } = this.props

    return (
      <ResourceList
        resourceName={{ singular: this.ownerResource, plural: this.ownerResource }}
        filterControl={
          (!this.isVariants && !this.isDraftOrders) && <Filters
            queryValue={query}
            filters={filters}
            onQueryChange={(query) => { this.props.handleFiltersQueryChange(query) }}
            onQueryClear={() => { this.props.handleQueryValueRemove() }}
            queryPlaceholder={`Search ${this.ownerResource}`}
          />
        }
        items={items}
        renderItem={(item) => {
          return (
            this._getRenderItems(item)
          );
        }}
      />
    )
  }
}

export default withRouter(CollectionList)