import React from 'react';
import { Modal, TextContainer, Checkbox, InlineError } from '@shopify/polaris';
import { homeList } from '../../data'
import { withRouter } from "react-router-dom";

class IndexExportModal extends React.Component {
  constructor(props) {
    super(props)

    this.apiURL = `${appEnvironment.apiURL}export`

    this.state = {
      active: this.props.active,
      submitLoading: false,
      errorMessage: '',
      categoryList: homeList.map(item => {
        return {
          title: item.title,
          ownerResource: item.exportOwnerResource,
          allChecked: false,
          checked: false
        }
      })
    }
  }

  handleSubmit () {
    const checkedList = this.state.categoryList.filter(item => {
      if (item.checked) {
        return item.checked
      }
    }).map(item => {
      return item.ownerResource
    })

    let l = checkedList.length
    let params = {
      ownerResource: checkedList.join(),
      type: l == 1 ? '2' : l > 1 ? '3' : ''
    }

    if (!l) {
      this.setState({ errorMessage: 'Export metafields is required' })
      return
    }

    this.setState({ submitLoading: true})
    axios.get(this.apiURL, { params }).then(res => {
      console.log(res);
      let status = res.data.status
      this.setState({ submitLoading: false })
      if (status == '200') {
        this.handleClose('Success')
        this.props.history.push('/web/view/activity-logs')
      }else{
        this.handleClose('Error')
      }
    }).catch(err => {
      this.setState({ submitLoading: false })
      this.handleClose('Error')
    })
  }

  handleCancel () {
    this.handleClose()
  }

  handleClose (state) {
    this.props.onClose(state)
  }

  handleAllChange (v) {
    const copyCategoryList = this.state.categoryList.map((item) => {
      return {
        ...item,
        checked: v
      }
    })

    const some = copyCategoryList.some(item => item.checked)
    if (some) {
      this.setState({ errorMessage: '' })
    }

    this.setState({ allChecked: v })
    this.setState({ categoryList: copyCategoryList })
  }

  handleChange (index) {
    const copyCategoryList = this.state.categoryList.map((item, sindex) => {
      return {
        ...item,
        title: item.title,
        checked: (index == sindex && !item.checked) ? true : (index == sindex && item.checked) ? false : item.checked
      }
    })
    const allChecked = copyCategoryList.every(item => item.checked)

    const some = copyCategoryList.some(item => item.checked)
    if (some) {
      this.setState({ errorMessage: '' })
    }

    this.setState({ allChecked })
    this.setState({ categoryList: copyCategoryList })
  }

  render () {
    const { active, allChecked, categoryList, errorMessage, submitLoading } = this.state
    return (
        <Modal
          open={active}
          onClose={() => { this.handleClose() }}
          title="Export Metafields"
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
            <TextContainer>Export metafields For</TextContainer>
            <div className="mt10">
              <Checkbox
                label="All"
                checked={allChecked}
                onChange={(v) => { this.handleAllChange(v) }}
              />
            </div>
            <div className="index-checkbox-body">
              {
                categoryList.map((item, index) => {
                  return (
                    <div className="index-checkbox-item" key={item.title}>
                      <Checkbox
                        label={item.title}
                        checked={item.checked}
                        onChange={() => { this.handleChange(index) }}
                      />
                    </div>
                  )
                })
              }
            </div>
            {!!errorMessage && <div className="mt10">
              <InlineError message={errorMessage} />
            </div>}
          </Modal.Section>
        </Modal>
    )
  }
}

export default withRouter(IndexExportModal)