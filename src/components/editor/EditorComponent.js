import React from 'react';
import { Card, Banner, Stack, Button } from '@shopify/polaris';
import {
  DeleteMajor
} from '@shopify/polaris-icons';
import MetafieldsItemTitle from './MetafieldsItemTitle'
import MetafieldsItem from './MetafieldsItem';
import { isNamespaceValueInvalid, isKeyValueInvalid, isDescriptionInvalid, isRequired, isURL } from '../../utilities/validate'
import emitter from '../../utilities/ev'

class EditorComponent extends React.Component {
  constructor(props) {
    super(props)
    this.id = publicTools.getQuery('id')
    this.parentId = publicTools.getQuery('parentId')
    this.ownerHandle = publicTools.getQuery('owner_handle')
    this.options = __PERMISSION__.editorFieldsOptions
    this.deleteUploads = []

    this.metafieldsItem = {
      id: '',
      type: 'create',
      title: 'Create metefield',
      selected: 'string',
      selectedName: this.options.find(v => v.value == 'string').label,
      namespace: '',
      key: '',
      description: '',
      value: '',
      isDeleted: false,
      created_at: '',
      updated_at: '',
      namespaceInvalid: {
        isInvalid: null,
        errorMessage: '',
      },
      keyInvalid: {
        isInvalid: null,
        errorMessage: ''
      },
      descriptionInvalid: {
        isInvalid: null,
        errorMessage: ''
      },
      valueInvalid: {
        isInvalid: null,
        errorMessage: ''
      }
    }

    this.state = {
      metafields: []
    }

  }

  initMetafieldsData (cb) {
    if (!!this.state.metafields.length) return

    const metafields = this.props.metafields.map((item) => {
      return {
        id: item.id,
        type: 'edit',
        title: 'Edit metefield',
        selected: item.value_type,
        selectedName: this.options.find(v => v.value == item.value_type).label,
        namespace: item.namespace,
        key: item.key,
        description: item.description,
        value: item.value.toString(),
        isDeleted: false,
        created_at: item.created_at,
        updated_at: item.updated_at,
        namespaceInvalid: {
          isInvalid: null,
          errorMessage: ''
        },
        keyInvalid: {
          isInvalid: null,
          errorMessage: ''
        },
        descriptionInvalid: {
          isInvalid: null,
          errorMessage: ''
        },
        valueInvalid: {
          isInvalid: null,
          errorMessage: ''
        }
      }
    })
    this.backMetafields = JSON.parse(JSON.stringify(metafields))

    if (!!metafields.length) {
      this.setState({ metafields }, () => {
        cb && cb()
      })
    } else {
      if (!!this.props.params.namespace || !!this.props.params.key) {
        return
      }
      this.setState({ metafields: [this.metafieldsItem] })
      this.props.onGetDelete(1)
    }

  }

  handleCreate () {
    const copyMetafields = this.state.metafields.map((item) => {
      return {
        ...item
      }
    })
    copyMetafields.unshift(this.metafieldsItem)
    this.setState({ metafields: copyMetafields })
    return copyMetafields.filter(item => item.type == 'create').length
  }

  handleDelete (item, index, type) {
    const { metafields } = this.state
    const status = type == 'cancel' ? false : type == 'enter' ? true : false
    if (type == 'enter') {
      if ((metafields.filter(item => item.type == 'create').length == 1) && (metafields.filter(item => { return !item.isDeleted && item.type == 'edit' }).length < 1)) return
    }
    const copyMetafields = this.state.metafields.map((item, i) => {
      return {
        ...item,
        isDeleted: index == i ? status : item.isDeleted
      }
    })
    if (type == 'enter' && item.type == 'create') {
      copyMetafields.splice(index, 1)
    }

    if (['image', 'multiple_images', 'file'].includes(item.selected)) {
      let value = item.value.split(',')
      if (type == 'enter') {
        this.deleteUploads = [...this.deleteUploads, ...value]
      } else if (type == 'cancel') {
        this.deleteUploads = this.deleteUploads.filter(item => {
          return !value.includes(item)
        })
      }
    }

    this.setState({ metafields: copyMetafields })
    const l = copyMetafields.filter(item => item.type == 'create').length
    this.props.onGetDelete(l)
  }

  handleNameSpace (v, index) {

    const copyMetafields = this.state.metafields.map((item, i) => {
      return {
        ...item,
        namespace: index == i ? v : item.namespace,
        namespaceInvalid: {
          ...item.namespaceInvalid,
          isInvalid: index == i ? isNamespaceValueInvalid(v) : item.namespaceInvalid.isInvalid,
          errorMessage: index == i ? (isNamespaceValueInvalid(v) ? 'Enter 3-20 characters' : '') : item.namespaceInvalid.errorMessage
        },
      }
    })
    this.setState({ metafields: copyMetafields })
    this.props.onGetValidate(this._handleGetValidate(copyMetafields))
  }

  handleKey (v, index) {
    const copyMetafields = this.state.metafields.map((item, i) => {
      return {
        ...item,
        key: index == i ? v : item.key,
        keyInvalid: {
          ...item.keyInvalid,
          isInvalid: index == i ? isKeyValueInvalid(v) : item.keyInvalid.isInvalid,
          errorMessage: index == i ? (isKeyValueInvalid(v) ? 'Enter 3-30 characters' : '') : item.keyInvalid.errorMessage
        }
      }
    })
    this.setState({ metafields: copyMetafields })
    this.props.onGetValidate(this._handleGetValidate(copyMetafields))
  }

  handleDescription (v, index) {
    const copyMetafields = this.state.metafields.map((item, i) => {
      return {
        ...item,
        description: index == i ? v : item.description,
        descriptionInvalid: {
          ...item.descriptionInvalid,
          isInvalid: index == i ? isDescriptionInvalid(v) : item.descriptionInvalid.isInvalid,
          errorMessage: index == i ? (isDescriptionInvalid(v) ? 'Enter less 255 characters' : '') : item.descriptionInvalid.errorMessage
        }
      }
    })
    this.setState({ metafields: copyMetafields })
    this.props.onGetValidate(this._handleGetValidate(copyMetafields))
  }

  handleValue (v, index) {
    const copyMetafields = this.state.metafields.map((item, i) => {
      return {
        ...item,
        valueInvalid: {
          ...item.valueInvalid,
          isInvalid: (index == i && item.selected == 'url') ? !isURL(v) : index == i ? isRequired(v) : item.valueInvalid.isInvalid,
          errorMessage: (index == i && item.selected == 'url') ? (!isURL(v) ? 'Enter the correct URL' : '') : index == i ? (isRequired(v) ? 'Is Required' : '') : item.valueInvalid.errorMessage
        },
        value: index == i ? v : item.value,
      }
    })
    this.setState({ metafields: copyMetafields })
    this.props.onGetValidate(this._handleGetValidate(copyMetafields))
  }

  handleSelectChange (v, o, index) {
    let c = o.find(item => item.value == v)

    if (c.enable == 'false') {
      emitter.emit('openPlanModal', v)
      return
    }

    const copyMetafields = this.state.metafields.map((item, i) => {
      return {
        ...item,
        value: index == i ? '' : item.value,
        selected: index == i ? v : item.selected,
        selectedName: index == i ? o.find(item => item.value == v).label : item.selectedName
      }
    })
    this.setState({ metafields: copyMetafields })
  }

  handleDiscard (type) {
    if (type == 'click') {
      this.setState({ metafields: this.backMetafields })
      return
    }
    this.props.onDiscard()
  }

  handleValidate () {
    const copyMetafields = this.state.metafields.map((item, i) => {
      return {
        ...item,
        namespaceInvalid: {
          ...item.namespaceInvalid,
          isInvalid: isNamespaceValueInvalid(item.namespace),
          errorMessage: isNamespaceValueInvalid(item.namespace) ? 'Enter 3-20 characters' : ''
        },
        keyInvalid: {
          ...item.keyInvalid,
          isInvalid: isKeyValueInvalid(item.key),
          errorMessage: isKeyValueInvalid(item.key) ? 'Enter 3-30 characters' : ''
        },
        descriptionInvalid: {
          ...item.descriptionInvalid,
          isInvalid: isDescriptionInvalid(item.description),
          errorMessage: isDescriptionInvalid(item.description) ? 'Enter less 255 characters' : ''
        },
        valueInvalid: {
          ...item.valueInvalid,
          isInvalid: item.selected == 'url' ? (!isURL(item.value) || isRequired(item.value)) : isRequired(item.value),
          errorMessage: item.selected == 'url' ? (isRequired(item.value) ? 'Is Required' : !isURL(item.value) ? 'Enter the correct URL' : '') : (isRequired(item.value) ? 'Is Required' : '')
        }
      }
    })

    this.setState({ metafields: copyMetafields })
    return this._handleGetValidate(copyMetafields)
  }

  handleSave (isRepeat, cb) {
    const invalid = this.handleValidate()
    const apiPath = `${appEnvironment.apiURL}multiMetas`

    if (!invalid && !isRepeat) {
      const params = this._getSaveParams()

      axios.post(apiPath, params).then(res => {
        cb && cb(res)
      })
    }
  }

  _getSaveParams () {
    let params = {
      ownerResource: this.props.ownerResource,
      ownerId: this.id,
      new_metas: this._getMetafields('create'),
      deleted_metas: this._getDeleteMetafields(),
      edited_metas: this._getMetafields('edit'),
      deleted_uploads: this.deleteUploads.join()
    }
    if (this.parentId != 'undefined') {
      params.ownerPid = this.parentId
    }
    return params
  }

  _getDeleteMetafields () {
    return this.state.metafields.filter(item => item.isDeleted).map(item => item.id).join()
  }

  _getMetafields (t) {
    let editedMetas = this.state.metafields.filter(item => {
      return item.type == t && !item.isDeleted
    }).filter(item => {
      if (item.type == 'create') {
        return true
      }
      if (item.type == 'edit') {
        return !JSON.stringify(this.backMetafields).includes(JSON.stringify(item))
      }
    }).map(item => {
      let o = {
        namespace: item.namespace,
        key: item.key,
        value: item.value,
        value_type: item.selected,
        description: item.description,
      }
      if (t == 'create') {
        o.owner_handle = this.ownerHandle
      }
      return o
    })
    return !!editedMetas.length ? JSON.stringify(editedMetas) : ''
  }

  _handleGetValidate (copyMetafields) {
    return copyMetafields.filter(item => !item.isDeleted).some(item => {
      return item.namespaceInvalid.isInvalid || item.keyInvalid.isInvalid || item.descriptionInvalid.isInvalid || item.valueInvalid.isInvalid
    })
  }

  _getRepeatData () {
    return publicTools.getRepeatArr(this.state.metafields)
  }

  _getDeleteData (d) {
    this.deleteUploads.push(d)
    return this.deleteUploads
  }

  componentDidUpdate (prevProps, prevState) {
    const po = !!this.props.metafields.length ? JSON.stringify(this.props.metafields) : ''
    const pn = !!(prevProps.metafields.length) ? JSON.stringify(prevProps.metafields) : ''

    if (po != pn || po == '') {
      this.initMetafieldsData()
    }

    const o = this._filterCompareData(this.backMetafields)
    const n = this._filterCompareData(this.state.metafields)

    if (!this.state.metafields.length) return

    if (o == n && this.props.isDirty) {
      this.handleDiscard()
    }
    if (o != n && !this.props.isDirty) {
      this.props.onShowSaveBar()
    }
  }

  _filterCompareData (d) {
    if (!d) return;

    return JSON.stringify(d.map(item => {
      delete item.index
      return {
        ...item
      }
    }))
  }

  componentDidMount () {
  }

  render () {
    const { metafields } = this.state
    const { metafieldsName} = this.props

    return (
      !!metafields.length &&
      <div className={this.props.className}>
        {
          metafields.map((item, index) => {
            item.index = index
            return (
              <div className="mt20" key={index}>
                {
                  (item.isDeleted && item.type == 'edit') ? (<Banner status="warning" icon={DeleteMajor}>
                    <Stack>
                      <Stack.Item fill><div className="lh20">Metafield {item.key} by {item.namespace} global be removed</div></Stack.Item>
                      <Stack.Item>
                        <Button size="slim" outline onClick={() => { this.handleDelete(item, index, 'cancel') }}>Cancel</Button>
                      </Stack.Item>
                    </Stack>
                  </Banner>) : (<Card
                    title={
                        <MetafieldsItemTitle metafields={metafields} item={item} metafieldsName={metafieldsName} onClose={() => { this.handleDelete(item, index, 'enter') }} />
                    } sectioned>
                    <MetafieldsItem
                      ref="MetafieldsItem"
                      metafields={metafields}
                      options={this.options}
                      data={item}
                      getDeleteData={(d) => { this._getDeleteData(d) }}
                      handleNameSpace={(v) => { this.handleNameSpace(v, index) }}
                      handleKey={(v) => { this.handleKey(v, index) }}
                      handleDescription={(v) => { this.handleDescription(v, index) }}
                      handleSelectChange={(v, o) => { this.handleSelectChange(v, o, index) }}
                      handleValue={(v) => { this.handleValue(v, index) }} />
                  </Card>)
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default EditorComponent