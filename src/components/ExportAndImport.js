import React from 'react';
import { Button, ButtonGroup, Toast, Badge } from '@shopify/polaris';
import { withRouter } from "react-router-dom";
import ImportModal from '../components/dialog/ImportModal';
import emitter from '../utilities/ev'
import {
  ImportMinor,
  ExportMinor
} from '@shopify/polaris-icons';

class ExportAndImport extends React.Component {
  constructor(props) {
    super(props)

    this.exportApiURL = `${window.appEnvironment.apiURL}export`
    this.exportOwnerResource = window.publicTools.getQuery('exportOwnerResource')
    const { ownerResource } = this.props

    this.isVariants = ownerResource == 'variants'
    this.isArticles = ownerResource == 'posts'

    this.state = {
      active: false,
      toastTitle: '',
      exportLoading: false,
      importLoading: false,
      activeImport: false,
    }
  }

  handleExport () {
    if (window.__PERMISSION__.hasExport) {
      this.setState({ exportLoading: true })

      let params = {
        ownerResource: this.exportOwnerResource,
        type: 2
      }

      window.axios
          .get(this.exportApiURL, { params })
          .then((res) => {
              let status = res.data.status;

              if (status == "200") {
                  this.setState(
                      {
                          exportLoading: false,
                          active: true,
                          toastTitle: "Export Success",
                      },
                      () => {
                          this.props.history.push("/web/view/activity-logs");
                      }
                  );
              } else {
                  this.setState({
                      exportLoading: false,
                      active: true,
                      toastTitle: res.data.msg,
                  });
              }
          })
          .catch((err) => {
              this.setState({
                  exportLoading: false,
                  active: true,
                  toastTitle: "Export Error",
              });
          });
      return
    }

    emitter.emit('openPlanModal', 'export')
  }

  handleImport () {
    if(window.__PERMISSION__.hasImport){
      this.setState({ activeImport: true })
      return
    }
    emitter.emit('openPlanModal', 'import')
  }

  handleCloseModal (state, activeName) {
    this.setState({ [activeName]: false })
    if (!!state) {
      this.setState({ active: true, toastTitle: state })
    }
  }

  toggleActive () {
    this.setState({ active: !this.state.active })
  }

  render () {
    const { activeImport, active, toastTitle } = this.state
    return (
      <>
        <ButtonGroup>
          {(!this.isVariants && !this.isArticles) && <>
            <Button refs="exprot" loading={this.state.exportLoading} icon={ExportMinor} plain onClick={() => { this.handleExport() }}>Export</Button>
            <div className="plan-version">
              <Badge>Basic</Badge>
            </div>
          </>}
          <>
            <Button loading={this.state.importLoading} icon={ImportMinor} size="slim" plain onClick={() => { this.handleImport() }}>Import</Button>
            <div className="plan-version">
              <Badge>Basic</Badge>
            </div>
          </>
        </ButtonGroup>
        {
          activeImport ? <ImportModal active={activeImport} exportOwnerResource={this.exportOwnerResource} onClose={(state) => { this.handleCloseModal(state, 'activeImport') }} /> : ''
        }
        {active && <Toast content={toastTitle} onDismiss={() => this.toggleActive()} />}
      </>
    )
  }
}

export default withRouter(ExportAndImport)