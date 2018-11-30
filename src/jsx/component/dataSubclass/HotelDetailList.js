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
                    <Link to="/data"><span>发件订单管理</span></Link>>详情
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
                                                8888
                                            </td>
                                            <td>
                                                <span>微信流水号：</span>
                                                8888
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>存件人姓名：</span>
                                                8888
                                            </td>
                                            <td>
                                                <span>存件人电话：</span>
                                                8888
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>取件人姓名：</span>
                                                8888
                                            </td>
                                            <td>
                                                <span>取件人电话：</span>
                                                8888
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
                                    <span>2018-07-22 08:04:33</span>
                                </li>
                                <li>
                                    <span>服务费（元）：</span>
                                    <span>2018-07-22 08:04:33</span>
                                </li>
                                <li>
                                    <span>状态：</span>
                                    <span>2018-07-22 08:04:33</span>
                                </li>
                                <li>
                                    <span>下单时间：</span>
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