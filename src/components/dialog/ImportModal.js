import React from 'react';
import { Modal, TextContainer, TextStyle, FormLayout, Select, DropZone, Button, Stack, Icon, InlineError } from '@shopify/polaris';
import {
  DeleteMajor,
  PackageMajor
} from '@shopify/polaris-icons';
class IndexImportModal extends React.Component {
  constructor(props) {
    super(props);

    const disableOptions = ["shop", "customers", "draft_orders", "orders", "variants"]

    this.importApiURL = `${appEnvironment.apiURL}import`
    this.formData = new FormData()
    this.validFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

    this.options = disableOptions.includes(this.props.exportOwnerResource) ?
      [
        { label: 'ID', value: 'id' }
      ] :
      [
        { label: 'ID', value: 'id' },
        { label: 'Handle', value: 'handle' }
      ]

    this.state = {
      active: this.props.active,
      submitLoading: false,
      openFileDialog: false,
      selected: 'id',
      files: [],
      errorMessage: ''
    }
  }

  toggleOpenFileDialog () {
    this.setState({ openFileDialog: !this.state.openFileDialog })
  }

  handleChange (v) {
    this.setState({ selected: v })
  }

  handleDropZoneDrop (_dropFiles, acceptedFiles, _rejectedFiles) {
    this.formData = new FormData()
    this.formData.append('file', _dropFiles[0])
    this.setState({ files: _dropFiles, errorMessage: '' })
  }

  handleClose (state) {
    this.props.onClose(state)
  }

  handleSubmit () {
    if (!this.state.files.length) {
      this.setState({ errorMessage: 'File Is Required' })
      return
    }
    this.setState({ submitLoading: true })

    this.formData.append('ownerResource', this.props.exportOwnerResource)
    this.formData.append('importBy', this.state.selected)

    axios.post(this.importApiURL, this.formData).then(res => {
      console.log(res);
      let message = 'Uploading, please refresh the page later'
      if (res.data.status != 200) {
        message = res.data.msg
      }
      this.handleClose(message)
    }).catch(err => {
      this.handleClose('Error')
    })
  }

  handleDelete (e, file, index) {
    const copyFiles = this.state.files.map(item => item)
    const deleteItem = copyFiles.splice(index, 1).join()

    this.setState({ files: copyFiles })
    e.stopPropagation()
  }


  handleCancel () {
    this.handleClose()
  }

  render () {
    const { selected, submitLoading, openFileDialog, files, errorMessage } = this.state

    return (
      <Modal
        open={this.state.active}
        onClose={() => { this.handleClose() }}
        title="Import Metafields"
        primaryAction={{
          content: 'Submit',
          loading: submitLoading,
          onAction: () => { this.handleSubmit() }
        }}
        secondaryActions={{
          content: 'Cancel',
          onAction: () => { this.handleCancel() }
        }}>
        <Modal.Section>
          <FormLayout>
            <Select
              label="Import By"
              value={selected}
              onChange={(v) => { this.handleChange(v) }}
              options={this.options}>
            </Select>
            <TextContainer>File</TextContainer>
            <TextContainer>Supported format- XLSX only</TextContainer>
            <DropZone
              type="file"
              openFileDialog={openFileDialog}
              allowMultiple={false}
              onFileDialogClose={() => { this.toggleOpenFileDialog() }}
              accept={this.validFileTypes}
              onDrop={(_dropFiles, acceptedFiles, _rejectedFiles) => { this.handleDropZoneDrop(_dropFiles, acceptedFiles, _rejectedFiles) }}>

              <div className="Polaris-DropZone-FileUpload box-align-left">
                <Stack>
                  <Stack.Item><div className={this.isFile ? "border-1 mr20" : "upload-button border-1 mr20"}><DropZone.FileUpload /></div></Stack.Item>
                  {
                    files.map((file, index) => {
                      return (
                        <div className="upload-file" key={index}>
                          <div className="upload-file-item">
                            <div className="upload-file-icon"><Icon source={PackageMajor} /></div>
                            <div className="upload-file-title">{file.name}</div>
                            <div className="upload-file-button">
                              <Button outline size="slim" fullWidth icon={DeleteMajor} onClick={(e) => { this.handleDelete(e, file, index) }}></Button>
                            </div>
                          </div>
                        </div>)
                    })
                  }
                </Stack>
              </div>
            </DropZone>
            {!!errorMessage && < InlineError message={errorMessage} />}
            <TextContainer>
              <div>Download a <Button plain><a style={{ color: '#006fbb' }} href="/storage/import_template.xlsx" download target="_blank">sample XLSX template</a></Button> to see an example of the format required.</div>
              <TextStyle variation="negative">Please do not use the exprot file to import.</TextStyle>
            </TextContainer>
          </FormLayout>
        </Modal.Section>
      </Modal>
    )
  }
}

export default IndexImportModal