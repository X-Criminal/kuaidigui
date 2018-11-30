import React from "react";
import {Button} from "antd";
import {Link,Route,Switch}   from "react-router-dom";
import Info                 from "./info";

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={

       }
    }
    goBack=()=>{
        window.history.go(-1)
    }
    
    render(){
        return(
            <div className={"HotelData admin"} style={{border:"none"}}>
                <h3>
                    <span onClick={this.goBack} style={{cursor:"pointer"}}>发件订单管理</span>>详情
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
                                                8888
                                            </td>
                                            <td>
                                                <span>微信流水号：</span>
                                                8888
                                            </td>
                                            <td>
                                                <span>
                                                付款方式：
                                                </span>
                                                8888
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>发件人：</span>
                                                8888
                                            </td>
                                            <td>
                                                <span>发件人电话：</span>
                                                8888
                                            </td>
                                            <td>
                                                <span>发件人地址：</span>
                                                8888
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>收件人：</span>
                                                8888
                                            </td>
                                            <td>
                                                <span>收件人电话：</span>
                                                8888
                                            </td>
                                            <td>
                                                <span>收件人地址：</span>
                                                8888
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>快递柜：</span>
                                                8888
                                            </td>
                                            <td>
                                                <span>柜子服务费：</span>
                                                8888
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
                                            8888
                                    </td>
                                    <td>
                                        <span>
                                            快递单号：
                                        </span>
                                            8888
                                    </td>
                                    <td>
                                        <span>
                                            快递费元：
                                        </span>
                                        8888
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>快递员：</span>
                                        8888
                                    </td>
                                    <td>
                                        <font>快递员电话：</font>
                                        8888
                                    </td>
                                    <td>
                                        <span>状态：</span>
                                        <b>已发件</b> 
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Link to={"/hotel/details/info"}>
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
                                <li>
                                    <span>下单时间：</span>
                                    <span>2018-07-22 08:04:33</span>
                                </li>
                                <li>
                                    <span>付运费时间：</span>
                                    <span>2018-07-22 08:04:33</span>
                                </li>
                                <li>
                                    <span>揽件时间：</span>
                                    <span>2018-07-22 08:04:33</span>
                                </li>
                                <li>
                                    <span>签收时间：</span>
                                    <span>2018-07-22 08:04:33</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Switch>
                    <Route path={"/hotel/details/info"} component={Info}/>
                </Switch>
            </div>
        )
    }
}