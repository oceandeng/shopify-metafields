import React from 'react'
import { Modal, TextContainer } from '@shopify/polaris'

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props)

    const { modalTitle, modalText } = this.props

    this.state = {
      modalOpen: false,
      loading: false,
      item: {},
      modalTitle,
      modalText
    }
  }

  handleModalDelete () {
    const { item } = this.state
    this.setState({loading: true})
    this.props.onModalDelete(item, () => {
      this.setState({ loading: false, modalOpen: false})
    })
  }

  handleModalOpen (item) {
    this.setState({ modalOpen: true, item })
  }

  handleModalClose () {
    this.setState({ modalOpen: false })
  }

  render () {
    const { modalOpen, modalTitle, modalText, loading } = this.state

    return (
      <Modal
        open={modalOpen}
        title={modalTitle}
        primaryAction={{
          destructive: true,
          content: 'Delete',
          loading,
          onAction: () => {
            this.handleModalDelete()
          }
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => {
              this.handleModalClose()
            }
          }
        ]}
        onClose={() => { this.handleModalClose() }}
      >
        <Modal.Section>
          <TextContainer>
            <p>{modalText}</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    )
  }
}

export default ConfirmModal