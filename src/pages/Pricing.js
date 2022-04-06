import React from 'react';
import { Layout, Card, TextContainer, DisplayText, TextStyle, ResourceList, Button, Icon, Stack, List, ProgressBar, Banner } from '@shopify/polaris';
import {TickMinor,AlertMinor} from '@shopify/polaris-icons';
import Loading from '../components/Loading'
class Pricing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usedScale:0,
      usedSize:0,
      totalSize:0,
      currentPlanId:"",
      planDataAll:[],
      loading: false,
      isClickable:false,
      errText:"",
      errStatus:false,
      planDataAlloptions:["Unlimited Fields"," Field Types","Export","Import","Rich Text","Bulk Export","storage_file_size","upload_file_size"]
    }
    this.apiURL = `${window.appEnvironment.apiURL}plan/change`
    this.apiURLUsedtotal = `${window.appEnvironment.apiURL}uploaded/usedtotal`
  }
  componentDidMount () {
    this.usedTotal()
    this.setState({ planDataAll: this.planData(window.__PLAN__),currentPlanId: window.__CURRENT__.id})
  }
  planData (windowPlan) {
    for(var item in windowPlan){
      var thisDataArr = []
      for(var i in windowPlan[item].permission){
        switch(windowPlan[item].permission[i]){
          case "export":
          thisDataArr.push("Export")
            break;
          case "import":
            thisDataArr.push("Import")
          break;
          case "rich_text":
            thisDataArr.push("Rich Text")
          break;
          case "bulk_export":
            thisDataArr.push("Bulk Export");
          break;
          case "global_metafields":
            thisDataArr.push("Global Metafields");
          break;
        }
      }
      var windowPlanNew = this.state.planDataAlloptions.map((x,index) => {
        if (index == 0) {
          return x;
        }
        if (index == 1) {
          return windowPlan[item].fields_type + x;
        }
        for(var i in thisDataArr){
          if(x == thisDataArr[i]){
            return x;
          }
        }
        if(x=="storage_file_size"){
          return 'Import file up to '+windowPlan[item][x]/1024/1024+'M';
        }
        if(x=="upload_file_size"){
          return windowPlan[item][x]/1024/1024+'MB Image/File Upload'
        }
      });
      let windowPlanFilter = windowPlanNew.filter(function (value, index, array) {
        return value != undefined;
      });
      windowPlan[item].permissionList=windowPlanFilter
    }
    return windowPlan
  }

  usedTotal () {
    window.axios.get(this.apiURLUsedtotal).then(res => {
      var usedSize = Math.floor(res.data.data.used/1024/1024 * 100) / 100
      var totalSize = res.data.data.total/1024/1024
      var newUsedScale = usedSize/totalSize*100
      this.setState({usedScale:newUsedScale,usedSize:usedSize,totalSize:totalSize})
    }).catch(err => {
      console.log(err)
    })
  }
  
  planChange (e,id) {
    if(this.state.currentPlanId!=id){
      this.setState({loading:true})
      window.axios.post(this.apiURL, { id:id }).then(res => {
        if(res.data.status==200){
          if(res.data.data.redirect_url==""&&id==1){
            window.location.reload();
          }else{
            window.top.location.href = res.data.data.redirect_url
          }
        }else{
          this.setState({loading:false,errStatus:true,errText:res.data.msg})
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  initialize () {
    this.planList()
  }
  render () {
    const styleComponentIcon = {
      icons: {
        color: "#000"
      }
    };
    let listArr = this.state.planDataAll.map((item,index)=>{
      var btnValue = ""
      if(this.state.currentPlanId==item.id){
        btnValue = "Current Plan"
      }else{
        if (item.id==1) {
          btnValue = "Free Plan"
        } else if(item.id==2) {
          btnValue = "Upgrade to Basic"
        } else if(item.id==3) {
          btnValue = "Upgrade to Pro"
        }
      }
      var currentColor=(item.id == this.state.currentPlanId?"top_color":"")
      return (
        <Layout.Section oneThird index={index} key={index}>
          <Card title={item.name}>
            <div className={`pricing_title ${currentColor}`}>
              {item.price == 0 &&
                <div className="pricing_title_con">
                  <span>Free</span>
                </div>
              }
              {item.price != 0 &&
                <div className="pricing_title_con">
                  <sup> USD $</sup>
                  <span>{item.price}</span>
                  <sub>/month</sub>
                </div>
              }
            </div>
            <ResourceList
              resourceName={{ singular: 'product', plural: 'products' }}
              items={item.permissionList}
              renderItem={(listItem) => {
                return (
                  <ResourceList.Item>
                    <Stack spacing="extraTight">
                      <Icon source={TickMinor} color="blueDark" />
                      <TextStyle variation="strong">{listItem}</TextStyle>
                    </Stack>
                  </ResourceList.Item>
                );
              }}
            />
            <Card.Section>
              <div className={item.id == this.state.currentPlanId?"current":""}>
                <Button primary={item.id == this.state.currentPlanId?true:false} onClick={(e) => { this.planChange(e,item.id) }}>{btnValue}</Button>
              </div>
            </Card.Section>
          </Card>
        </Layout.Section>
      )
    });
    return (
      <div className="wrapper pricing_container">
        <div className="container">
          <TextContainer spacing="tight">
            <DisplayText size="large">Use Metafields Master Pro to get more functions！</DisplayText>
          </TextContainer>
          <div className="mt20">
            <ProgressBar progress={this.state.usedScale} />
            <p className="mt10">The storage space you have used:{this.state.usedSize}M/{this.state.totalSize}M</p>
          </div>
          <div className="mt20">
          {this.state.errStatus && 
            <Banner status="warning">
              <p>
                {this.state.errText}
              </p>
            </Banner>
          }
          </div>
          <div className="mt20 pt20">
          
          {this.state.loading && <Loading notFullScreen />}
            <Layout>
              {listArr}
            </Layout>
          </div>
        </div>
      </div>
    )
  }
}

export default Pricing