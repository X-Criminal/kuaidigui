import React from "react";
import {Link}   from "react-router-dom";
import {message}     from "antd"
import axios from "axios";
import moment from "moment";

let url;

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            querySaveOrderDetails:{}
       }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url")
      }
      componentDidMount(){
          if(this.props.getXiangQing.length<=0) window.history.go(-1);
          console.log(this.props.getXiangQing)
          this.querySaveOrderDetails( )
      }

      querySaveOrderDetails=()=>{
        axios.post(url+"/deliveryLockers/web/saveOrderManageController/querySaveOrderDetails",{orderId:this.props.getXiangQing.id})
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     this.setState({
                        querySaveOrderDetails:res.data.data
                     })
                 }else{
                     message.error(res.data.message);
                     window.history.go(-1)
                 }
             })
              
      }
    goBack=()=>{
        window.history.go(-1)
    }
    
    render(){
        let data =this.state.querySaveOrderDetails;
        return(
            <div className={"HotelData admin"} style={{border:"none"}}>
                <h3>
                    <Link to="/data"><span>存件订单管理</span></Link>>详情
                </h3>
                <div className={"hotel-details-body"}>
                    <div className={"details-info-1"}>
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
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>存件人姓名：</span>
                                                {data.userName}
                                            </td>
                                            <td>
                                                <span>存件人电话：</span>
                                                {data.userPhone}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>取件人姓名：</span>
                                                {data.consigneeName}
                                            </td>
                                            <td>
                                                <span>取件人电话：</span>
                                                {data.consigneePhone}
                                            </td>
                                        </tr>
                                    </tbody>
                              </table>
                        </div>
                    </div>
                    <div className={"details-info-1"}>
                        <div >
                            <ul>
                                <li>
                                    <span>快递柜：</span>
                                    <span>{data.deliveryName}</span>
                                </li>
                                <li>
                                    <span>服务费（元）：</span>
                                    <span>{data.serviceCharge}</span>
                                </li>
                                <li>
                                    <span>状态：</span>
                                    <span>{data.orderStatus===1?"待取件":data.orderStatus===2?"已取件":data.orderStatus===3?"超时未取件":data.orderStatus===4?"已取消":"-"}</span>
                                </li>
                                <li>
                                    <span>下单时间：</span>
                                    <span>{moment(parseInt(data.createtime)).format("YYYY-MM-DD")}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}