import React from 'react'
import { Modal, Layout, TextContainer, Heading, TextStyle, Toast } from '@shopify/polaris'
import upgradeImg from '@/assets/upgrade-img.jpg'

class PlanModal extends React.Component {
  constructor(props) {
    super(props)

    this.apiURL = `${window.appEnvironment.apiURL}plan/change`;

    this.state = {
      permission: '',
      modalOpen: false,
      active: false,
      message: '',
      loading: false,
      upgradeImg,
      isBaisc: false,
      isPro: false,
      modalTitle: "More functions that you can't miss",
      primaryActionText: 'Upgrade to',
      fileSize: {
        all: 200,
        single: 10
      }
    }
  }

  handleModalUpgrade () {
    this.setState({ loading: true })
    window.axios
        .post(this.apiURL, { id: this.id })
        .then((res) => {
            let status = res.data.status;
            if (status == 200) {
                let redirectURL = res.data.data.redirect_url;
                window.top.location.href = redirectURL;
            } else {
                this.setState({ loading: false, message: res.data.msg });
            }
        })
        .catch((err) => {
            this.setState({ loading: false, active: true, message: "Error" });
        });
  }

  handleModalOpen (permission) {
    this.setState({ modalOpen: true, permission }, () => {
      const { permission } = this.state

      __PLAN__.find(item => {
        let f = item.fields_permission.find(item => {
          if (item.value == permission && item.enable == 'true') {
            this.id = item.id
            this.price = item.price
          }
        })

        if (!f) {
          if (item.permission.includes(permission)) {
            this.id = item.id
            this.price = item.price
          }
          return item.permission.includes(permission)
        }
      })

      const isBaisc = this.id == 2
      const isPro = this.id == 3
      const primaryActionText = isBaisc ? `Upgrad to Basic($${this.price}/m)` : isPro ? `Upgrad to Pro($${this.price}/m)` : ''
      const fileSize = isBaisc ? this.state.fileSize : isPro ? {all: 500, single: 20} : this.state.fileSize

      this.setState({ isBaisc, isPro, primaryActionText, fileSize })
    })
  }

  handleModalClose () {
    this.setState({ modalOpen: false })
  }

  toggleActive () {
    this.setState({ active: !this.state.active })
  }

  render () {
    const { modalOpen, modalTitle, loading, upgradeImg, primaryActionText, isPro, active, message, fileSize } = this.state

    return (
      <Modal
        open={modalOpen}
        title={modalTitle}
        primaryAction={{
          content: `${primaryActionText}`,
          loading,
          onAction: () => {
            this.handleModalUpgrade()
          }
        }}
        onClose={() => { this.handleModalClose() }}
      >
        <Modal.Section>
          <Layout>
            <Layout.Section oneThird>
              <div className="box-align-center">
                <img src={upgradeImg} />
              </div>
            </Layout.Section>
            <Layout.Section oneThird>
              <TextContainer>
                <Heading>Export/Import</Heading>
                <TextStyle variation="subdued">Using Excel file, work efficient and save time.</TextStyle>
                <Heading>Advanced field types</Heading>
                <TextStyle variation="subdued">By using Rich Text，What you see is what you get</TextStyle>
                <Heading>File/Image upload</Heading>
                <TextStyle variation="subdued">Import file up to {fileSize.all}M，Image/File Upload {fileSize.single}MB every time</TextStyle>
                {isPro &&
                  <>
                    <Heading>Bulk Export</Heading>
                    <TextStyle variation="subdued">
                      Export Custom Collections, Smart Collections, Products & Variants, Customers, Draft Orders, Orders, Pages, Blogs & Posts, Shop at one time.
                    </TextStyle>
                  </>}
              </TextContainer>
            </Layout.Section>
          </Layout>
          {active && <Toast content={message} onDismiss={() => this.toggleActive()} />}
        </Modal.Section>
      </Modal>
    )
  }
}

export default PlanModal