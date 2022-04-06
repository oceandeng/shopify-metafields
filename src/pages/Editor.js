import React from 'react';
import { Frame, ContextualSaveBar, Pagination, Toast } from '@shopify/polaris';
import EditorTopBar from '../components/editor/EditorTopBar'
import EditorBanner from '../components/editor/EditorBanner'
import EditorTopSearchBar from '../components/editor/EditorTopSearchBar'
import EditorComponent from '../components/editor/EditorComponent'
import Loading from '../components/Loading'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.ownerResource = this.props.match.params.ownerResource
    this.metafieldsName = publicTools.getQuery('metafieldsName')
    this.id = publicTools.getQuery('id')
    this.parentId = publicTools.getQuery('parentId')

    this.state = {
      active: false,
      toastContent: '',
      insertRepeats: [],
      loading: true,
      valid: false,
      isDirty: false,
      isRepeat: false,
      repeatData: [],
      metafields: [],
      metafieldsLength: 0,
      link: {},
      currentPage: 1,
      params: {
        namespace: '',
        key: '',
        limit: 10,
        pageInfo: ''
      }
    }
  }

  getItems () {
    const { params } = this.state
    let apiPath = `${appEnvironment.apiURL}${this.ownerResource}/${this.id}/metafields`
    if (this.ownerResource == 'variants') {
      apiPath = `${appEnvironment.apiURL}products/${this.parentId}/variants/${this.id}/metafields`
    }
    if (this.ownerResource == 'posts') {
      apiPath = `${appEnvironment.apiURL}blogs/${this.parentId}/articles/${this.id}/metafields`
    }
    publicTools.filterEmptyParams(params)

    this.setState({ metafields: [] }, () => {
      axios.get(apiPath, { params }).then(res => {
        const data = res.data.data

        this.setState({ loading: false }, () => {
          this.setState({
            metafields: data.metafields,
            link: data.link,
          })
        })
      })
    })
  }

  handleCreate () {
    const l = this.refs.EditorComponent.handleCreate();
    this.setState({ metafieldsLength: l })
  }

  handleGetDelete (l) {
    this.setState({ metafieldsLength: l })
  }

  handleShowSaveBar () {
    this.setState({ isDirty: true })
  }

  handleSave () {
    const valid = this.refs.EditorComponent.handleValidate();
    const repeatData = this.refs.EditorComponent._getRepeatData()
    const isRepeat = repeatData.some(item => item.data.length > 1)

    this.setState({ valid, isRepeat, repeatData, loading: !valid && !isRepeat })

    this.refs.EditorComponent.handleSave(isRepeat, (res) => {
      console.log(res);
      if (res.data.status == 200) {
        let d = res.data.data
        let Created = d.inserted.split('/').join(' of ')
        let edited = d.updated.split('/').join(' of ')
        let deleted = d.deleted.split('/').join(' of ')
        const toastContent = `Created ${Created}, edited ${edited}, deleted ${deleted}`

        if (!!d.insert_repeats.length) {
          this.setState({ insertRepeats: d.insert_repeats })
        }

        this.setState({ active: true, toastContent })
        this.getItems()
      }
    });
  }

  handleClearInsertRepeats () {
    this.setState({ insertRepeats: [] })
  }

  handleDiscard (type) {
    if (type == 'click') {
      this.refs.EditorComponent.handleDiscard(type)
      this.setState({ isDirty: false, valid: false, isRepeat: false, metafieldsLength: 0 })
      return
    }
    this.setState({ isDirty: false, valid: false, isRepeat: false, repeatData: [], metafieldsLength: 0 })
  }

  handleSearch (namespace, key) {
    const params = { ...this.state.params, namespace, key, pageInfo: '' }
    this.setState({ params, loading: true, currentPage: 1 }, () => {
      this.getItems()
    })
  }

  handleGetValidate (valid) {
    this.setState({ valid })
  }

  handlePagination (type) {
    const { params, link } = this.state
    const pageInfo = type == 'previous' ? link.previous : type == 'next' ? link.next : ''
    let currentPage = 0

    if (type == 'previous') {
      currentPage = this.state.currentPage > 1 ? this.state.currentPage - 1 : 1
    } else if (type == 'next') {
      currentPage = this.state.currentPage + 1
    }

    this.setState({ params: { ...params, pageInfo }, loading: true, currentPage }, () => {
      this.getItems()
    })
  }

  toggleActive () {
    this.setState({ active: !this.state.active })
  }

  componentDidMount () {
    this.getItems()
  }

  render () {
    const { active, toastContent, insertRepeats, loading, isDirty, valid, isRepeat, repeatData, metafields, params, metafieldsLength, currentPage, link } = this.state

    return (
      <div className="wrapper">
        <div className="container editor-body">

          <Frame>
            {isDirty && <ContextualSaveBar
              alignContentFlush
              message="Unsaved changes"
              saveAction={{
                onAction: () => { this.handleSave() }
              }}
              discardAction={{
                onAction: () => { this.handleDiscard('click') }
              }}
            />}
            <EditorTopBar metafieldsLength={metafieldsLength} ownerResource={this.ownerResource} handleCreate={() => this.handleCreate()} />
            <EditorBanner valid={valid} isRepeat={isRepeat} insertRepeats={insertRepeats} repeatData={repeatData} onClearInsertRepeats={() => { this.handleClearInsertRepeats() }} />
            <EditorTopSearchBar
              ref="EditorTopSearchBar"
              className="mt20"
              currentPage={currentPage}
              params={params}
              link={link}
              metafields={metafields}
              onSearch={(namespace, key) => { this.handleSearch(namespace, key) }}
              onPagination={(type) => { this.handlePagination(type) }} />
            {loading ? <Loading /> :
              <EditorComponent
                className="mt20"
                metafieldsName={this.metafieldsName}
                ownerResource={this.ownerResource}
                params={params}
                metafields={metafields}
                isDirty={isDirty}
                ref="EditorComponent"
                onShowSaveBar={() => { this.handleShowSaveBar() }}
                onDiscard={() => { this.handleDiscard() }}
                onGetValidate={(valid) => { this.handleGetValidate(valid) }}
                onGetDelete={(l) => this.handleGetDelete(l)} />
            }
            {!!metafields.length && <div className="section-list_footer tc mt20">
              <Pagination
                hasPrevious={!!link.previous}
                onPrevious={() => { this.handlePagination('previous') }}
                hasNext={!!link.next}
                onNext={() => { this.handlePagination('next') }} />
            </div>}
            {active && <Toast content={toastContent} onDismiss={() => this.toggleActive()} />}
          </Frame>
        </div>
      </div>
    )
  }
}

export default Editor;