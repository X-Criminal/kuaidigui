import React from "react";
import {Button,message} from "antd";
import {Link,Route,Switch}   from "react-router-dom";
import Info                 from "./info";
import axios from "axios";
import moment from "moment";
let url,id;
export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            Order:{},
       }
    }

    goBack=()=>{
        window.history.go(-1)
    }
    componentWillMount(){
        url = sessionStorage.getItem("url");
        id = this.props.match.params.data;
    }
    componentDidMount(){
        this.qeurySendOrderDetails( )
    }

    qeurySendOrderDetails=()=>{
        axios.post(url+"/deliveryLockers/web/sendOrderManageController/qeurySendOrderDetails",{id:id})
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     this.setState({
                        Order:res.data.data
                     })
                 }else{
                     message.error(res.data.message)
                 }
             })
    }

    render(){
        let data = this.state.Order;

        return(
            <div className={"HotelData admin"} style={{border:"none"}}>
                <h3>
                    <Link to="/hotel"><span>发件订单管理</span></Link>>详情
                </h3>
                <div className={"hotel-details-body"}>
                    <div className={"details-info-1"}>
                        <h4>发件信息</h4>
                        <div >
                              <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>
                                                    订单编号：
                                                </span>
                                                {data.orderNumber}
                                            </td>
                                            <td>
                                                <span>微信流水号：</span>
                                                {data.serialNumber}
                                            </td>
                                            <td>
                                                <span>
                                                付款方式：
                                                </span>
                                                {data.payMethod===1?"寄方付":data.payMethod===2?"收方付":"-"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>发件人：</span>
                                                {data.senderName}
                                            </td>
                                            <td>
                                                <span>发件人电话：</span>
                                                {data.senderPhone}
                                            </td>
                                            <td>
                                                <span>发件人地址：</span>
                                                {data.mabProvince+data.mabCity+data.mabArea+data.mabAddress}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>收件人：</span>
                                                {data.consigneeName}
                                            </td>
                                            <td>
                                                <span>收件人电话：</span>
                                                {data.consigneePhone}
                                            </td>
                                            <td>
                                                <span>收件人地址：</span>
                                                {data.abProvince+data.abCity+data.abArea+data.abAddress}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>快递柜：</span>
                                                {data.deliveryName}
                                            </td>
                                            <td>
                                                <span>柜子服务费：</span>
                                                {data.serviceCharge}
                                            </td>
                                        </tr>
                                    </tbody>
                              </table>
                        </div>
                    </div>
                    <div className={"details-info-1"}>
                        <h4>快递信息</h4>
                        <div >
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>
                                            快递公司：
                                        </span>
                                            {data.dhlName}
                                    </td>
                                    <td>
                                        <span>
                                            快递单号：
                                        </span>
                                            {data.expressNumber}
                                    </td>
                                    <td>
                                        <span>
                                            快递费元：
                                        </span>
                                        {data.expressFee}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>快递员：</span>
                                        {data.courierName}
                                    </td>
                                    <td>
                                        <span>快递员电话：</span>
                                        {data.courierPhone}
                                    </td>
                                    <td>
                                        <span>状态：</span>
                                        <b>已发件</b> 
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Link to={"/hotel/details"+id+"/info"+JSON.stringify({dhlCoding:data.dhlId,logisticCode:data.expressNumber,orderCode:data.orderNumber})}>
                                            <Button className={"state-info"}>查看物流信息</Button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                         </table>           
                        </div>
                    </div>
                    <div className={"details-info-1"}>
                        <h4>状态节点信息</h4>
                        <div >
                            <ul>
                                {data.statusVOs?data.statusVOs.map((item,index)=> 
                                    <li key={index}>
                                    <span>{item.statusName}</span>
                                    <span>{moment(parseInt( item.createtime)).format("YYYY-MM-DD HH:mm:ss")}</span>
                                </li>):null}
                            </ul>
                        </div>
                    </div>
                </div>
                <Switch>
                    <Route path={"/hotel/details"+id+"/info:data"} component={Info}/>
                </Switch>
            </div>
        )
    }
}