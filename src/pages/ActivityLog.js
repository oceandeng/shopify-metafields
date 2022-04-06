import React from "react";
import { Card, DataTable, Badge, Pagination, Icon, Button, Toast, Stack, Frame } from '@shopify/polaris';
import Loading from '../components/Loading'
import ConfirmModal from '../components/dialog/ConfirmModal'
import {
  CircleDownMajor,
  DeleteMajor,
  CircleTickMajor,
  CircleCancelMajor
} from '@shopify/polaris-icons'
class ActivityLog extends React.Component {
  constructor(props) {
    super(props)

    this.apiURL = `${appEnvironment.apiURL}eximportlog`

    this.state = {
      active: false,
      hasPrevious: false,
      hasNext: false,
      currentPage: 1,
      loading: true,
      rows: [],
      data: []
    }
  }

  getLog () {
    this.setState({ loading: true })
    let params = {
      limit: 10,
      page: this.state.currentPage
    }
    axios.get(this.apiURL, { params }).then(res => {
      let d = res.data.data

      let data = d.data.map(item => {
        return {
          ...item,
        }
      })

      this.setData(data, () => {
        this.setState({ currentPage: d.current_page, hasPrevious: d.prev_page_url, hasNext: d.next_page_url, loading: false })
      })
    }).catch(err => {
      this.setState({ loading: false })
    })
  }

  handleOpenConfirmModal (item) {
    this.refs.ConfirmModal.handleModalOpen(item)
  }

  handleDelete (item, cb) {
    axios.delete(`${appEnvironment.apiURL}eximportlog/${item.id}`).then(res => {
      this.setState({ active: true }, () => {
        cb && cb()
        this.getLog()
      })
    }).catch(err => {
      cb && cb()
    })
  }

  setData (data, cb) {
    function IconWithReactChild() {
      const iconContent = () => {
        return (
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#006fbb" />
            <circle cx="10" cy="10" r="6" fill="currentColor" />
          </svg>
        );
      };
    
      return <div className="runIcon"><Icon source={iconContent} color="blue" /></div>;
    }
    this.setState({ data }, () => {

      let rows = this.state.data.map(item => {
        let type = item.type == 1 ? 'Import' : item.type == 2 ? 'Export' : item.type == 3 ? 'Bulk_Export' : item.type == 4 ? 'Bulk_Import' : ''
        let resource = (<div className="tc" style={{ 'whiteSpace': 'normal', 'wordBreak': 'break-all' }}>{item.resource}</div>)
        let items = (<div className="tc">{item.items}</div>)
        let created_at = this.handleCalcDate(item.created_at)
        let updated_at = this.handleCalcDate(item.updated_at)
        let status = item.status == 0 ? <div className="tc flex-con">{IconWithReactChild()}<Badge status="info">Running</Badge></div> : item.status == 1 ? <div className="tc flex-box"><Stack spacing="extraTight"><Icon
        source={CircleTickMajor}  color="green" /><Badge status="success">Completed</Badge></Stack></div> : item.status == 2 ? <div className="tc flex-box"><Stack spacing="extraTight"><Icon
        source={CircleCancelMajor}  color="red" /><Badge status="critical">Failed</Badge></Stack></div> : ''
        let download = item.status == 1 && (item.type == 2 || item.type == 3) ? <a className="url" download href={item.web_path} target="_blank"><Icon source={CircleDownMajor} /></a> : ''
        let deleteItem = item.status !=0 ? (<Button plain icon={DeleteMajor} onClick={() => { this.handleOpenConfirmModal(item) }}></Button>):''

        return [
          type,
          resource,
          items,
          created_at,
          updated_at,
          status,
          download,
          deleteItem
        ]
      })

      this.setState({ rows }, () => {
        cb && cb()
      })
    })
  }

  handlePageChange (p) {
    this.setState({ currentPage: p }, () => {
      this.getLog()
    })
  }

  toggleActive () {
    this.setState({ active: !this.state.active })
  }

  handleCalcDate (date) {
    var timeZone = publicTools.clientTimeZone()
    let timeStamp = new Date(date).getTime()
    let currentTime = timeZone.hour * 60 * 60 * 1000 + timeZone.munite * 60 * 1000

    let t = timeZone.prefix == "+" ? timeStamp + currentTime : timeStamp - currentTime

    return publicTools.getExactTime(t)
  }

  componentDidMount () {
    this.getLog()
  }

  render () {
    const { currentPage, active, hasPrevious, hasNext, loading, rows } = this.state

    return (
      <Frame>
        <div className="wrapper">
          <div className="container">
            <Card>
              <div className="spinner-rel-body">
                {loading && <Loading notFullScreen />}
                <div className="min-height300">
                  <DataTable
                    columnContentTypes={[
                      'text',
                      'numeric',
                      'numeric',
                      'numeric',
                      'numeric',
                      'text',
                      'text'
                    ]}
                    headings={[
                      'Type',
                      <div className="tc">Resource</div>,
                      <div className="tc">Items</div>,
                      <div className="tc">Start At</div>,
                      <div className="tc">End At</div>,
                      <div className="tc">Status</div>,
                      'Download',
                      ''
                    ]}
                    rows={rows}
                  />
                  {(!rows.length && !loading) && <div className="tc g9 mt100 f20">No Log</div>}
                </div>
                <Stack distribution="fill">
                  <div className="section-list_footer tc">
                    <Pagination
                      hasPrevious={!!hasPrevious}
                      onPrevious={() => {
                        let p = currentPage
                        if (p > 0) {
                          p--
                        }
                        this.handlePageChange(p)
                      }}
                      hasNext={!!hasNext}
                      onNext={() => {
                        let p = currentPage
                        if (!!hasNext) {
                          p++
                        }
                        this.handlePageChange(p)
                      }}
                    />
                  </div>
                </Stack>
              </div>
              {active && <Toast content="Delete Success" onDismiss={() => { this.toggleActive() }} />}
            </Card>
          </div>
        </div>
        <ConfirmModal
          ref="ConfirmModal"
          modalTitle="Delete this log?"
          modalText="Are you sure you want to delete this log?"
          onModalDelete={(item, cb) => { this.handleDelete(item, cb) }} />
      </Frame>
    )
  }
}

export default ActivityLog;