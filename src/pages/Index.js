import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import Nav from '../components/Nav'
import Routes from '../routes'
import Loading from '../components/Loading'
import emitter from '../utilities/ev'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }

    // this.handleGetShopData()
  }

  init () {
    this.eventEmitter = emitter.addListener("openPlanModal", (permission) => {
      this.refs.PlanModal.handleModalOpen(permission)
    })
  }

  handleGetShopData () {

    // const getShop = () => { return axios.get(`${appEnvironment.apiURL}shopify/shop`) }
    // const getCurrentPlan = () => { return axios.get(`${appEnvironment.apiURL}plan/current`) }
    // const getPlan = () => { return axios.get(`${appEnvironment.apiURL}plan`) }

    // axios.all([getShop(), getCurrentPlan(), getPlan()]).then(axios.spread((shop, current, plan) => {
    //   window.__SHOP__ = shop.data.data.shop
    //   window.__CURRENT__ = current.data.data
    //   window.__PLAN__ = plan.data.data

    //   window.__PERMISSION__ = {
    //     isFree: __CURRENT__.id == 1,
    //     isBasic: __CURRENT__.id == 2,
    //     isPro: __CURRENT__.id == 3,
    //     hasExport: __CURRENT__.permission.includes('export'),
    //     hasImport: __CURRENT__.permission.includes('import'),
    //     hasBulkExport: __CURRENT__.permission.includes('bulk_export'),
    //     editorFieldsOptions: __CURRENT__.fields_permission.map(item => {return {...item,enable: item.enable.toString()}})
    //   }

    //   this.setState({ loading: false })
    // })).catch(err => {
    //   this.setState({ loading: false })
    // })
  }

  componentDidMount () {
    this.init()
  }

  componentWillUnmount () {
    emitter.removeListener(this.eventEmitter)
  }

  render () {
    return (
      <div>
        <AppProvider i18n={enTranslations}>
          <BrowserRouter>
            <Nav></Nav>
            {this.state.loading ? <Loading /> : <Routes />}
          </BrowserRouter>
        </AppProvider>
      </div>
    )
  }
}

export default App