import React , {Component}      from "react";
import {Icon,Button}                   from "antd";

import userImg                  from "../../../img/login.png";
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    
    BACK=()=>{
        window.history.back(-1)
    }
    render(){
        return(
            <div className={"edit"}>
                <h3>
                    <span onClick={this.BACK} >用户管理</span>
                    >
                    <span>详情</span>
                    <Icon type={"export"} onClick={this.BACK}/>
                </h3>
                <div className={"editBody"}>
                    <div>
                        <span>账号：</span>
                        <span>131313113</span>
                    </div>
                    <div>
                        <span>头像：</span>
                        <img src={userImg} alt="头像"/>
                    </div>
                    <div>
                        <span>昵称：</span>
                        <span>131313113</span>
                    </div>
                    <div>
                        <span>联系电话：</span>
                        <span>131313113</span>
                    </div>
                    <div>
                        <span>地址：</span>
                        <span>131313113</span>
                    </div>
                </div>
                <div className={"userData"}>
                    <div>
                        <span>姓名：</span>
                        <span>张三</span>
                    </div>
                    <div>
                        <span>身份证号：</span>
                        <span>429424244444222</span>
                    </div>
                    <div>
                        <span>身份证：</span>
                        <span>
                            <img src={userImg} alt={"userData"}/>
                            <img src={userImg} alt={"userData"}/>
                        </span>
                    </div>
                </div>
                <Button type="primary">
                    冻结
                </Button>
            </div>
        )
    }
}