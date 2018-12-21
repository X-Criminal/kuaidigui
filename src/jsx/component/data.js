import React ,{Component}                               from "react";
import {Input,Button,Table,DatePicker,Tooltip,Select,message }         from "antd";
import {Link,Switch,Route}                              from "react-router-dom"
import HotelDetails                                     from "./dataSubclass/HotelDetailList";
import Open                                             from "./dataSubclass/open"
import axios  from "axios"
import moment from "moment";

let url;
const { RangePicker } = DatePicker;
const {Option} = Select
const {Column} = Table;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
          selectDhls:[],
          datas:[],
          serviceCharge:0,

          areaName:"",
          consigneeName:"",
          currPage:1,
          deliveryName:"",
          endTime:"",
          orderNumber:"",
          orderStatus:"",
          startTime:"",
          userName:"",

          getOpenData:{length:0},
          getXiangQing:{length:0}
        }
    }
    componentWillMount(){
      url = sessionStorage.getItem("url")
    }
    componentDidMount(){
      this.init()
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
    _init=()=>{
      this.init( )
    }

    init=(data)=>{
      let _data ={
          size:5,
          areaName:this.state.areaName,
          consigneeName:this.state.consigneeName,
          currPage:this.state.currPage,
          deliveryName:this.state.deliveryName,
          endTime:this.state.endTime,
          orderNumber:this.state.orderNumber,
          orderStatus:this.state.orderStatus,
          startTime:this.state.startTime,
          userName:this.state.userName,
      }
      for(let i in data){
          _data[i] = data[i]
      }
      axios.post(url+"/deliveryLockers/web/saveOrderManageController/querySaveOrderVO2List",_data)
           .then((res)=>{
              if(res.data.code===1000&&res.data.message==="操作成功！"){
                let serviceCharge=0;
                let _data = res.data.data;
                for(let i = 0;i<_data.length;i++){
                  _data[i].index = i+1;
                  _data[i].keykey = "@!@"+i+"@!@"
                  serviceCharge+=_data[i].serviceCharge;
                }
                _data.push({index:"--"})

                  this.setState({
                    serviceCharge:serviceCharge,
                    datas:_data,
                    totalItems:res.data.totalItems,
                  })
              }else{
                message.error(res.data.message)
              }
           })
    }
    renderContent= (value, row, index) => {
            const obj = {
              children: value,
              props: {},
            };
            if (index === this.state.datas.length-1) {
              obj.props.colSpan = 0;
            }
            return obj;
       };

       querySaveOrderVO2List=()=>{
        window.open(url+"/deliveryLockers/web/saveOrderManageController/exportList?size=5&areaName="+this.state.areaName
                                                                                                    +"&consigneeName="
                                                                                                    +this.state.consigneeName
                                                                                                    +"&currPage="
                                                                                                    +this.state.currPage
                                                                                                    +"&deliveryName="
                                                                                                    +this.state.deliveryName
                                                                                                    +"&endTime="
                                                                                                    +this.state.endTime
                                                                                                    +"&orderNumber="
                                                                                                    +this.state.orderNumber
                                                                                                    +"&orderStatus="
                                                                                                    +"3"
                                                                                                    +"&startTime="
                                                                                                    +this.state.startTime
                                                                                                    +"&userName="
                                                                                                    +this.state.userName
                                                                                                    )
       }

       getOpenData=(data)=>{
         this.setState({
            getOpenData:data
         })
       }
       getXiangQing=(data)=>{
         this.setState({
            getXiangQing:data
         })
       }
        render(){           
            return(
                <div className={"hotel admin"}>
                       <h3>存件订单管理</h3>
                       <div className={"clear-fix"}>
                          <div className={"hotelSearch clear-fix"}>
                                <div>
                                      <span><span>订单编号：</span> <Input name={"orderNumber"} onChange={this.onchangeData}/></span>
                                      <span><span>状态：</span> <Select style={{ width: 150 }}  onChange={this.getOrderStatus}>
                                                                      <Option value={""}>全部</Option>
                                                                      <Option value={"1"}>待取件</Option>
                                                                      <Option value={"2"}>已取件</Option>
                                                                      <Option value={"3"}>超时未取件</Option>
                                                                      <Option value={"4"}>已取消</Option>
                                                                    </Select></span>
                                      <span><span>快递柜：</span> <Input   name={"deliveryName"}        onChange={this.onchangeData}/></span>
                                      <span style={{width:243,display:"inline-block"}}></span>
                                </div>
                                <div>
                                      <span><span>所属区域：</span><Input    name={"areaName"}  onChange={this.onchangeData}/></span>
                                      <span><span>取件员：</span>  <Input    name={"consigneeName"}  onChange={this.onchangeData}/></span>
                                      <span><span>发件人：</span>  <Input name={"userName"}        onChange={this.onchangeData}/></span>
                                      <span><RangePicker style={{textAlign:"center"}} className={"RangePicker"} onChange={this.getTime}/></span>
                                </div>
                                <Button  type="primary" onClick={this._init}>
                                    搜索
                                </Button>
                          </div>
                       <div className={"export"}>
                           <Button onClick={this.querySaveOrderVO2List}>
                           <i className="iconfont icon-daochu_icon"></i>
                               导出超时未取件订单
                           </Button>
                       </div>
                    
                       </div>
                       <Table  
                        dataSource={this.state.datas} 
                        rowKey={"index"} 
                        bordered={true}
                        pagination={{
                          defaultPageSize:6,
                          total:this.state.totalItems,
                          size:"small",
                          showQuickJumper:true,
                          onChange:this.onPage
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
                            title="存件人"
                            dataIndex="userName"
                            key="userName"
                            render={this.renderContent}
                          />
                           <Column
                            title="取件人"
                            dataIndex="consigneeName"
                            key="consigneeName"
                            render={this.renderContent}
                          />
                          <Column
                            title="下单时间"
                            dataIndex="createtime"
                            key="createtime"
                            render={(value, row, index) => {
                                    const obj = {
                                      children:moment(parseInt(value)).format("YYYY-MM-DD"),
                                      props: {},
                                    };
                                    if (index === this.state.datas.length-1) {
                                      obj.props.colSpan = 0;
                                    }
                                    return obj;
                                  }}
                          />
                          <Column
                            title="状态"
                            dataIndex="orderStatus"
                            key="orderStatus"
                            render={(value, row, index) => {
                              const obj = {
                                children:value===1?"待取件":value===2?"已取件":value===3?"超时未取件":value===4?"已取消":"-",
                                props: {},
                              };
                              if (index === this.state.datas.length-1) {
                                obj.props.colSpan = 0;
                              }
                              return obj;
                            }}
                          />
                           <Column
                            title="柜子服务费（元）"
                            dataIndex="serviceCharge"
                            key="serviceCharge"
                            render={ (text, row, index) => {
                                    if (index < this.state.datas.length-1) {
                                      return <span>{text}</span>;
                                    }
                                    return {
                                      children:<span style={{color:"red",fontSize:"16px"}}>{this.state.serviceCharge+""}</span>,
                                    };
                                  }}
                          />
                          <Column
                            title="操作（详情/开始）"
                          //  dataIndex="id"
                            key="id"
                            render={ (text, row, index) => {
                                    if (index < this.state.datas.length-1) {
                                      return (<div className={"caozuo"}>
                                               <Tooltip placement="bottom" title={"详情"}>
                                                    <Button onClick={this.getXiangQing.bind(this,text)}>
                                                        <Link to={"/data/details"}>
                                                            <i className="iconfont icon-zhangdan"></i>
                                                        </Link>
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip placement="bottom" title={"开锁"}>
                                                    <Button onClick={this.getOpenData.bind(this,text)}>
                                                        <Link to={"/data/open"} className={"deleBtn"}>
                                                            <i className="iconfont icon-suo"></i>
                                                        </Link>
                                                    </Button>
                                                </Tooltip>
                                            </div>)
                                    }
                                    return {
                                      props: {
                                        colSpan:1,
                                      },
                                    };
                                  }}
                          />
                       </Table>
                       <Switch>
                          <Route path={"/data/details/"} render={()=> <HotelDetails getXiangQing={this.state.getXiangQing}/>}/>
                          <Route path={"/data/Open/"}    render={()=> <Open getOpenData={this.state.getOpenData}/>}/>
                       </Switch>
                </div>
            )
        }
}