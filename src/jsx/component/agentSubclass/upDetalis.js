import React ,{Component}                               from      "react";
import {Icon,Tabs,Table,Pagination,message}                     from "antd";
import axios                                            from "axios";

const {Column} =Table
const TabPane = Tabs.TabPane;

let id,url;
export default class UpdateAdmin extends Component{
    constructor(props){
        super(props)
        this.state={
            getUserCustom3ById:{ userCouriers:[]},
            
            A:[{key:1,"序号":"序号","订单编号":"订单编号","快递柜":"快递柜","发件人":"发件人","快递公司":"快递公司","付款方式":"付款方式","快递费(元)":"998","下单时间":"2018-08-08","状态":"状态"}],
            B:[{key:2,"快递柜名称":"快递柜名称","安放地址":"安放地址","服务费":"服务费","取件时限":"取件时限"}],
            C:[{key:3,"提现金额(元)":"1","微信流水号":"微信流水号","取件时限":"取件时限"}]
        }
    }
    componentWillMount(){
        id = this.props.match.params.data;
        url= sessionStorage.getItem("url")
    }
    componentDidMount(){
        this.getUserCustom3ById( )
    }
    getUserCustom3ById=()=>{
        axios.post(url+"/deliveryLockers/web/webTUserController/getUserCustom3ById",{id:id})
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message.indexOf("没有数据")<=-1){
                     this.setState({
                        getUserCustom3ById:res.data.data
                     })
                 }else{
                    message.error(res.data.message);
                 }
             })
    }
    Back=()=>{
        window.history.back(-1)
    }
        render(){
            return(
                <div className={"Details"}>
                        <div>
                              <h3><span onClick={this.Back}>快递员管理</span>>快递员详情 <Icon type={"export"} onClick={this.Back}/></h3>
                              <div className={"addAdminData"}>
                                    <table className={"DateilsTable"}>
                                        <thead>
                                            <tr>
                                                <th>账号</th>
                                                <th>姓名</th>
                                                <th>联系电话</th>
                                                <th>身份证号</th>
                                                <th>快递公司</th>
                                                <th>所属区域</th>
                                                <th>状态</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{this.state.getUserCustom3ById.id}</td>
                                                <td>{this.state.getUserCustom3ById.name}</td>
                                                <td>{this.state.getUserCustom3ById.phone}</td>
                                                <td>{this.state.getUserCustom3ById.idNumber}</td>
                                                <td>{this.state.getUserCustom3ById.userCouriers.map((item,index)=> item?<span key={index}>{item.name}，</span>:null)}</td>
                                                <td>{this.state.getUserCustom3ById.address}</td>
                                                <td>{this.state.getUserCustom3ById.tStatus===0?"正常":"冻结"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                              </div>
                        </div>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="订单列表" key="1">    <A /> </TabPane>
                            <TabPane tab="快递柜列表" key="2">  <B lis={this.state.B}/>  </TabPane>
                            <TabPane tab="提现记录" key="3">    <C lis={this.state.C}/> </TabPane>
                        </Tabs>
                </div>
            )
        }
}

class A extends Component{
    constructor(props){
        super(props)
        this.state={
            currPage:1,
            Lis:[],
            totalItems:0,
        }
    }
    componentDidMount( ){
        this.getDeliveryLockerCustomByUserId( )
    }

    getDeliveryLockerCustomByUserId=(currPage)=>{
        let _data={
            size:4,
            currPage:this.state.currPage,
            id:id
        }
        if(currPage) _data.currPage = currPage;
        axios.post(url+"/deliveryLockers/web/webSendOrderController/getSendOrderCustomByCourierId",_data)
             .then((res)=>{
                    if(res.data.code===1000&&res.data.message.indexOf("没有数据")<=-1){
                        this.setState({
                            Lis:res.data.data,
                            totalItems:res.data.totalItems
                        })
                    }else{
                        this.setState({
                            Lis:[],
                            totalItems:0,
                            currPage:1
                        })
                    }
             })
    }
    page=(e)=>{
        this.setState({
            currPage:e,
        })
        this.getDeliveryLockerCustomByUserId(e)
    }
    render(){
        let data = this.state.Lis;
        for(let i=0;i<data.length;i++){
            data[i].index=i+1;
        }
        return(
            <div className={"A"}>
                <Table
                className={"lisA"}
                dataSource={data}
                bordered
                pagination={false}
                rowKey={"index"}
            >
                    <Column
                        title="序号"
                        dataIndex="index"
                        key="index"
                    />
                    <Column
                        title="订单编号"
                        dataIndex="orderNumber"
                        key="orderNumber"
                    />
                    <Column
                        title="快递柜"
                        dataIndex="courierArk"
                        key="courierArk"
                    />
                    <Column
                        title="发件人"
                        dataIndex="uname"
                        key="uname"
                    />
                    <Column
                        title="快递公司"
                        dataIndex="dname"
                        key="dname"
                    />
                    <Column
                        title="付款方式"
                        dataIndex="payMethod"
                        key="payMethod"
                        render={(res)=>{
                            return <span>{res===1?"寄方付":res===2?"收方付":"-"}</span>
                        }}
                    />
                    <Column
                        title="快递费(元)"
                        dataIndex="expressFee"
                        key="expressFee"
                    />
                    <Column
                        title="下单时间"
                        dataIndex="createtime"
                        key="createtime"
                    />
                    <Column
                        title="状态"
                        dataIndex="statusName"
                        key="statusName"
                    />
                </Table>
                <Pagination showQuickJumper total={this.state.totalItems} size="small" onChange={this.page} defaultPageSize={4}/>
            </div>
        )
    }
}
class B extends Component{
    constructor(props){
        super(props)
        this.state={
            currPage:1,
            Lis:[],
            totalItems:0,
        }
    }
    componentDidMount(){
        this.getDeliveryLockerCustomByUserId()
    }
    getDeliveryLockerCustomByUserId=(currPage)=>{
        let _data={
            size:4,
            currPage:this.state.currPage,
            id:id
        }
        if(currPage) _data.currPage=currPage;
        axios.post(url+"/deliveryLockers/web/webDeliveryLockerController/getDeliveryLockerCustomByUserId",_data)
             .then((res)=>{
                if(res.data.code===1000&&res.data.message.indexOf("没有数据")<=-1){
                    this.setState({
                        Lis:res.data.data,
                        totalItems:res.data.totalItems
                    })
                }else{
                    this.setState({
                        Lis:[],
                        totalItems:0,
                        currPage:1
                    })
                }
             })
    }
    page=(e)=>{
        this.setState({
            currPage:e
        })
        this.getDeliveryLockerCustomByUserId(e)
    }

    render(){
        let data = this.state.Lis;
        let _data = [ ];
        let index = 0;
        for(let i =0;i<data.length;i++){
            if(data[i]){
                data[i].index = index++
                _data.push(data[i])
            }
        }
        return(
            <div className={"B"}>
                <Table
                className={"lisB"}
                dataSource={_data}
                bordered
                pagination={false}
                rowKey={"key"}
                >
                    <Column
                        title="快递柜名称"
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title="安放地址"
                        dataIndex="layAddreass"
                        key="layAddreass"
                    />
                    <Column
                        title="服务费"
                        dataIndex="serviceCharge"
                        key="serviceCharge"
                    />
                    <Column
                        title="取件时限"
                        dataIndex="timeLimit"
                        key="timeLimit"
                    />
                </Table>
                <Pagination showQuickJumper defaultPageSize={4} total={this.state.totalItems} size="small" onChange={this.page}/>
            </div>
        )
    }
}

class C extends Component{
    constructor(props){
        super(props)
        this.state={
            Lis:[],
            currPage:1,
            totalItems:0
        }
    }
    componentDidMount(){
        this.getDeliveryLockerCustomByUserId()
    }
    getDeliveryLockerCustomByUserId=(currPage)=>{
        let _data={
            size:4,
            currPage:this.state.currPage,
            id:id
        }
        if(currPage) _data.currPage=currPage;
        axios.post(url+"/deliveryLockers/web/webWithdrawDepositRecordController/getWithdrawDepositRecordByUserId",_data)
             .then((res)=>{
                if(res.data.code===1000&&res.data.message.indexOf("没有数据")<=-1){
                    this.setState({
                        Lis:res.data.data,
                        totalItems:res.data.totalItems
                    })
                }else{
                    this.setState({
                        Lis:[],
                        totalItems:0,
                        currPage:1
                    })
                }
             })
    }
    page=(e)=>{
        this.setState({
            currPage:e
        })
        this.getDeliveryLockerCustomByUserId(e)
    }

    render(){
        let data = this.state.Lis;
        for(let i = 0 ;i<data.length;i++){
            data[i].index=i+1;
        }
        return(
            <div className={"C"}>
                <Table
                className={"lisB"}
                dataSource={data}
                bordered
                pagination={false}
                rowKey={"index"}
                >
                    <Column
                        title="序号"
                        dataIndex="index"
                        key="index"
                    />
                    <Column
                        title="提现金额(元)"
                        dataIndex="money"
                        key="money"
                    />
                    <Column
                        title="微信流水号"
                        dataIndex="serialNumber"
                        key="serialNumber"
                    />
                    <Column
                        title="提现时间"
                        dataIndex="createtime"
                        key="createtime"
                    />
                  
                </Table>
                <Pagination showQuickJumper defaultPageSize={4} total={this.state.totalItems} size="small" onChange={this.page}/>
            </div>
        )
    }
}