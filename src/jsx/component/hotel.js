import React ,{Component}                               from "react";
import {Input,Button,Table,DatePicker,Tooltip,Select,message}         from "antd";
import {Link,Switch,Route}                              from "react-router-dom"
import cookie from "react-cookies";
import HotelDetails                                     from "./hotelSubclass/HotelDetailList";
import Open                                             from "./hotelSubclass/open"
import axios  from "axios"
import moment from "moment";
const {Option} = Select
const { RangePicker } = DatePicker;
const {Column} = Table;
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
          selectDhls:[],
          datas:[],

          area:"",
          courierName:"",
          currPage:1,
          dhlId:"",
          dlName:"",
          endTime:"",
          orderNumber:"",
          orderStatus:"",
          startTime:"",
          size:"",
          userName:"",

          serviceCharge:0,
          expressFee:0,
          Total:0,
        }
    }

    componentWillMount(){
      url = sessionStorage.getItem("url")
    }

    componentDidMount(){
      this.selectDhl( );
      this.init( )
    }
    /**获取所有快递公司 */
    selectDhl=()=>{
      axios.post(url+"/deliveryLockers/wx/expressDeliveryController/selectDhl",{keyword:""})
         .then((res)=>{
           if(res.data.code===1000&&res.data.message==="操作成功！"){
              this.setState({
                selectDhls:res.data.data
              })
           }else{
              message.error("快递公司列表获取失败！")
              this.setState({
                selectDhls:[],
              })
           }
         })
    }
    /**快递公司 */
    getDhlId=(e)=>{
      this.setState({
        dhlId:e
      })
    }
    /**状态 */
    getOrderStatus=(e)=>{
      this.setState({
        orderStatus:e
      })
    }
    /**时间点 */
    getTime=(e,b)=>{
      this.setState({
        endTime:b[1],
        startTime:b[0]
      })
    }
    /**获取用户输入数据 */
    onchangeData=(e)=>{
      this.setState({
        [e.target.name]:e.target.value,
      })
    }
    onPage=(e)=>{
      this.setState({
          currPage:e
      })
      this.init({
        currPage:e
      })
    }

    init=(data)=>{
      let _data ={
        adminId:cookie.load("userData").id,
          size:5,
          area:this.state.area,
          courierName:this.state.courierName,
          currPage:this.state.currPage,
          dhlId:this.state.dhlId,
          dlName:this.state.dlName,
          endTime:this.state.endTime,
          orderNumber:this.state.orderNumber,
          orderStatus:this.state.orderStatus,
          startTime:this.state.startTime,
          name:this.state.userName,
      }
      for(let i in data){
          _data[i] = data[i]
      }
      axios.post(url+"/deliveryLockers/web/sendOrderManageController/querySendOrderListCount",_data)
           .then((res)=>{
              if(res.data.code===1000&&res.data.message==="操作成功！"){
                let serviceCharge=0;
                let expressFee = 0;
                let Total=0;
                let _data = res.data.data;
                for(let i = 0;i<_data.length;i++){
                  _data[i].index = i+1;
                  _data[i].key= "@!@"+i+"@!@"
                  _data[i]["Total"]=_data[i].serviceCharge+_data[i].expressFee;
                  serviceCharge+=_data[i].serviceCharge*1000;
                  expressFee   +=_data[i].expressFee*1000;
                  Total += _data[i].Total*1000
                }
                _data.push({orderNumber:"!!@@!!",key:"!-!",index:"-",expressFee:"--",Total:"---",orderStatus:"----",id:"-------"})
                  this.setState({
                    expressFee:expressFee/1000,
                    serviceCharge:serviceCharge/1000,
                    datas:_data,
                    totalItems:res.data.totalItems,
                    Total:Total/1000,
                  })
              }else{
                message.error(res.data.message)
              }
           })
    }

    exportOrder=()=>{
      let data = url+"/deliveryLockers/web/sendOrderManageController/exportOrder?orderStatus=3&currPage="
      +this.state.currPage
      +"&dhlId="+
      this.state.dhlId
      +"&dlName="
      +this.state.dlName
      +"&endTime="
      +this.state.endTime
      +"&orderNumber="
      +this.state.orderNumber
      +"&size=5&startTime="
      +this.state.startTime
      +"&name="+this.state.userName;
      this.downloadFile(data)
    }

    downloadFile(url){
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      //link.setAttribute('download', 'excel1111.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    _init=()=>{
      this.init( )
    }

    renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === this.state.datas.length-1) {
        obj.props.colSpan = 0;
      }
      return obj;
    }

    render(){
            return(
                <div className={"hotel admin"}>
                       <h3>发件订单管理</h3>
                       <div className={"clear-fix"}>
                          <div className={"hotelSearch clear-fix"}>
                                <div>
                                      <span><span>订单编号：</span> <Input name={"orderNumber"} onChange={this.onchangeData}/></span>
                                      <span><span>状态：</span> <Select style={{ width: 150 }}  onChange={this.getOrderStatus}>
                                                                      <Option value={""}>全部</Option>
                                                                      <Option value={1}>待取件</Option>
                                                                      <Option value={2}>已取件</Option>
                                                                      <Option value={3}>超时未取件</Option>
                                                                    </Select></span>
                                      <span><span>快递柜：</span> <Input   name={"dlName"}        onChange={this.onchangeData}/></span>
                                      <span><span>所属区域：</span> <Input name={"area"}          onChange={this.onchangeData}/></span>
                                </div>
                                <div>
                                      <span><span>快递公司：</span>  <Select style={{ width: 150 }} onChange={this.getDhlId}>
                                                                      <Option value={""}>全部</Option>
                                                                      {this.state.selectDhls.map((res,index)=><Option key={index} value={res.id}>{res.name}</Option>)}
                                                                    </Select></span>
                                      <span><span>快递员：</span> <Input    name={"courierName"}  onChange={this.onchangeData}/></span>
                                      <span><span>发件人：</span> <Input name={"userName"}        onChange={this.onchangeData}/></span>
                                      <span><RangePicker style={{textAlign:"center"}} className={"RangePicker"} onChange={this.getTime}/></span>
                                </div>
                                <Button  type="primary" onClick={this._init}>
                                    搜索
                                </Button>
                          </div>
                       <div className={"export"}>
                           <Button onClick={this.exportOrder}>
                           <i className="iconfont icon-daochu_icon"></i>
                               导出超时未取件订单
                           </Button>
                       </div>
                    
                       </div>
                       <Table  
                        dataSource={this.state.datas} 
                        rowKey={"key"} 
                        bordered={true}
                        pagination={{
                          defaultPageSize:6,
                          total:this.state.totalItems,
                          size:"small",
                          showQuickJumper:true,
                          onChange:this.onPage,
                        }}
                        >
                          <Column
                            title="序号"
                            dataIndex="index"
                            key="index"
                            render={(text, row, index) => {
                                    if (index < this.state.datas.length-1) {
                                      return <div>{text}</div>;
                                    }
                                    return {
                                      children: <div style={{textAlign:"right"}}>总计</div>,
                                      props: {
                                        colSpan: 7,
                                      },
                                    };
                                  }}
                          />
                           <Column
                            title="订单编号"
                            dataIndex="orderNumber"
                            key="orderNumber"
                            render={this.renderContent}
                          />
                          <Column
                            title="快递柜"
                            dataIndex="deliveryName"
                            key="deliveryName"
                            render={this.renderContent}
                          />
                          <Column
                            title="发件人"
                            dataIndex="senderName"
                            key="senderName"
                            render={this.renderContent}
                          />
                           <Column
                            title="快递公司"
                            dataIndex="dhlName"
                            key="dhlName"
                            render={this.renderContent}
                          />
                           <Column
                            title="快递员"
                            dataIndex="courierName"
                            key="courierName"
                            render={this.renderContent}
                          />
                           <Column
                            title="下单时间"
                            dataIndex="createtime"
                            key="createtime"
                            render={(value, row, index) => {
                                    const obj = {
                                      children:moment(parseInt(value)).format("YYYY-MM-DD HH:mm:ss"),
                                      props: {},
                                    };
                                    if (index === this.state.datas.length-1) {
                                      obj.props.colSpan = 0;
                                    }
                                    return obj;
                                  }}
                          />
                          <Column
                            title="快递费（元）"
                            dataIndex="expressFee"
                            key="expressFee"
                            render={ (text, row, index) => {
                              if (index < this.state.datas.length-1) {
                                return <span>{text}</span>;
                              }
                              return {
                                children:<span style={{color:"red",fontSize:"20px",fontWeight:"600"}}>{this.state.expressFee+""}</span>,
                              };
                            }}
                          />
                          <Column
                            title="快递柜服务费（元）"
                            dataIndex="serviceCharge"
                            key="serviceCharge"
                            render={ (text, row, index) => {
                              if (index < this.state.datas.length-1) {
                                return <span>{text}</span>;
                              }
                              return {
                                children:<span style={{color:"red",fontSize:"20px",fontWeight:"600"}}>{this.state.serviceCharge+""}</span>,
                              };
                            }}
                          />
                           <Column
                            title="总费用"
                            dataIndex="Total"
                            key="Total"
                            render={ (text, row, index) => {
                              if (index < this.state.datas.length-1) {
                                return <span>{text}</span>;
                              }
                              return {
                                children:<span style={{color:"red",fontSize:"20px",fontWeight:"600"}}>{this.state.Total+""}</span>,
                              };
                            }}
                          />
                          <Column
                            title="状态"
                            dataIndex="orderStatus"
                            key="orderStatus"
                            render={(value, row, index) => {
                              const obj = {
                                children: value===1?"待取件":value===2?"已取件":value===3?<span style={{color:"red"}}>超时未取件</span>:"-",
                                props: {},
                              };
                              if (index === this.state.datas.length-1) {
                                obj.props.colSpan = 2;
                                obj.children="";
                              }
                              return obj;
                            }}
                          />
                          <Column
                            title="操作（详情/开始）"
                          //  dataIndex="id"
                            key="id"
                            render={(text, row, index) => {
                                  if (index < this.state.datas.length-1) {
                                    return (<div className={"caozuo"}>
                                             <Tooltip placement="bottom" title={"详情"}>
                                                  <Button>
                                                      <Link to={"/hotel/details"+text.id}>
                                                          <i className="iconfont icon-zhangdan"></i>
                                                      </Link>
                                                  </Button>
                                              </Tooltip>
                                              <Tooltip placement="bottom" title={"开锁"}>
                                                  <Button>
                                                      <Link to={"/hotel/open"+JSON.stringify({id:text.id,name:text.deliveryName})} className={"deleBtn"}>
                                                          <i className="iconfont icon-suo"></i>
                                                      </Link>
                                                  </Button>
                                              </Tooltip>
                                          </div>)
                                  }
                                  return {
                                    props: {
                                      colSpan: 0,
                                    },
                                  };
                                }}
                          />
                       </Table>
                       <Switch>
                          <Route path={"/hotel/details:data"} component={HotelDetails}/>
                          <Route path={"/hotel/Open:data"}    component={Open}   />
                       </Switch>
                </div>
            )
    }
}