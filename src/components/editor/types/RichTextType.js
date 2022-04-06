import React from 'react'
import { TextField, InlineError, Icon } from '@shopify/polaris'
import {
  CodeMajor
} from '@shopify/polaris-icons'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import Table from 'braft-extensions/dist/table'
import Throttle from '../../../utilities/Throttle'

const options = {
  defaultColumns: 3, // 默认列数
  defaultRows: 3, // 默认行数
  withDropdown: true, // 插入表格前是否弹出下拉菜单
  columnResizable: true, // 是否允许拖动调整列宽，默认false
  exportAttrString: 'border="0" style="border-collapse: collapse"' // 指定输出HTML时附加到table标签上的属性字符串
}

BraftEditor.use(Table(options))

class RichTextType extends React.Component {
  constructor(props) {
    super(props)

    this.textarea = React.createRef()
    this.htmlString = this.props.data.value
    this.throttle = new Throttle()
    this.apiUploadPath = `${appEnvironment.apiURL}upload`
    this.hooks = {
      'remove-medias': (params) => {
        this.handleRemoveMedias(params)
      },
      'open-braft-finder': () => {
        this.handleGetImage()
      }
    }
    this.media = {
      items: [],
      uploadFn: (params) => {
        this.handleUploadFn(params)
      },
      accepts: {
        image: 'image/gif,image/jpeg,image/jpg,image/png,image/bmp,image/ico'
      }
    }

    this.state = {
      htmlString: this.htmlString,
      editorState: BraftEditor.createEditorState(this.htmlString)
    }

    this.init()
  }

  init () {
    this.timer = null
    this.excludeControls = ['emoji']
    this.language = 'en'
  }

  handleGetImage () {
    let imgReg = /<img.*?(?:>|\/>)/gi //匹配图片中的img标签
    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i // 匹配图片中的src
    let arr = this.state.htmlString.match(imgReg)  //筛选出所有的img
    if (!arr) return
    let srcArr = arr.map((item, index) => {
      return {
        id: new Date().getTime() + index,
        type: 'IMAGE',
        url: item.match(srcReg)[1]
      }
    })
    this.braftFinder.removeAllItems()
    this.braftFinder.addItems(srcArr)
  }

  handleUploadFn (params) {
    const fd = new FormData()
    fd.append('resource[]', params.file)
    fd.append('dir', 'images')

    axios.post(this.apiUploadPath, fd, {
      onUploadProgress: (event) => {
        // 上传进度发生变化时调用param.progress
        params.progress(event.loaded / event.total * 100)
      }
    }).then(res => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      let files = res.data.data

      params.success({
        url: files.join()
      })
    }).catch(err => {
      // 上传发生错误时调用param.error
      params.error({
        msg: 'unable to upload.'
      })
    })
  }

  handleRemoveMedias (params) {
    let oldFiles = params.map(item => item.url).join()
    // this.props.getDeleteData(oldFiles)
  }

  handleConfirmSourceCode () {
    const htmlString = this.textarea.current.value

    this.setState({
      htmlString,
      editorState: BraftEditor.createEditorState(htmlString)
    })
  }

  getExtendControls (item) {
    const i = item.index
    const { htmlString } = this.state

    return [
      {
        key: `modal${i}`,
        type: 'modal',
        text: <Icon source={CodeMajor} />,
        modal: {
          id: `my-moda-${i}`,
          width: 940,
          height: 800,
          title: 'source code view',
          showConfirm: false, // 指定是否显示确认按钮
          onConfirm: () => {
            this.handleConfirmSourceCode()
          },
          children: (
            <div className="p20">
              <textarea disabled className="source-code-input" style={{ width: '100%', height: '620px' }} ref={this.textarea} defaultValue={htmlString}></textarea>
            </div>
          )
        }
      }
    ]
  }

  handleEditorChange (htmlContent) {
    this.setState({
      htmlString: htmlContent.toHTML(),
      editorState: BraftEditor.createEditorState(htmlContent)
    }, () => {
      this.throttle.setTimer(() => {
        const htmlString = htmlContent.toHTML()
        this.props.handleValue(htmlString)
      })
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.data.value != this.props.data.value && this.props.data.value == this.htmlString) {
      this.setState({
        htmlString: this.props.data.value,
        editorState: BraftEditor.createEditorState(this.props.data.value)
      })
    }
  }

  componentDidMount () {
    // 获取媒体库实例
    this.braftFinder = this.editorInstance.getFinderInstance()
  }

  render () {
    const item = this.props.data
    const { editorState } = this.state
    const extendControls = this.getExtendControls(item)

    return (
      <>
        <div>{item.selectedName} *</div>
        <div className="braft-editor-body mt5">
          <BraftEditor
            className="h400"
            ref={instance => this.editorInstance = instance}
            excludeControls={this.excludeControls}
            language={this.language}
            extendControls={extendControls}
            value={editorState}
            onChange={(htmlContent) => this.handleEditorChange(htmlContent)}
            media={this.media}
            hooks={this.hooks}
          />
          <div className="hiddenInput">
            <TextField
              labelHidden
              type="hidden"
              value={item.value}
              error={item.valueInvalid.isInvalid} />
            <div className="mt10">
              <InlineError message={item.valueInvalid.errorMessage} />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default RichTextType