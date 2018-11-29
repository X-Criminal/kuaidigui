import React                                               from "react";
import {Input,Checkbox,Button,Icon }                       from "antd";
import axios                                               from "axios";
import Region                                              from "../share/region";
import { Route, Switch, Link}                              from 'react-router-dom';
import Choice                                              from "./choice"

const CheckboxGroup = Checkbox.Group;
let id,url;
class Addadmin extends React.Component {
    constructor(props){
        super(props)
        this.state={
            Jurisdiction:[],
        }
    }

    onGo=()=>{
        window.history.back(-1)
    }
    componentDidMount(){
        url = sessionStorage.getItem("url");
         id = this.props.match.params.data;
         this.queryAdminDetails()
    }
    queryAdminDetails=()=>{
        axios.post(url+"/deliveryLockers/web/webMenuController/queryAdminDetails",{id:id})
             .then((res)=>{
                 console.log(res)
                 if(res.data.code===1000){

                 }
             })
    }

    addExpress=( )=>{
        let _data = this.state.Jurisdiction;
        _data.push({name:1})
        this.setState({
            Jurisdiction:_data
        })
    }
    render(){
        return(
            <div className={"ad"}>
                   <h3><span className={"_back"} onClick={this.onGo}>管理员管理</span>><span>管理员详情</span></h3>
                   <div className={"ad_body"}>
                        <div className={"txt"}>
                            <span>账号：</span>
                            <span>账号：</span>
                        </div>
                        <div className={"txt"}>
                            <span>姓名：</span>
                            <span>姓名：</span>
                        </div>
                        <div className={"txt"}>
                            <span>联系电话：</span>
                            <span>联系电话：</span>
                        </div>
                        <div className={"txt"}>
                            <span>密码：</span>
                            <span>密码：</span>
                        </div>
                        <div className={"Check clear-fix"}>
                             <span>菜单权限：</span>
                             <span>菜单权限：</span>
                        </div>
                        <div className={"Check clear-fix add"}>
                             <span>菜单权限：</span>
                             <span>菜单权限：</span>
                        </div>
                        <div className={"AdBtn txt"}>
                              <span></span>
                              <Button type={"primary"}>
                                  修改
                              </Button>
                        </div>
                   </div>
                   <Switch>
                       <Route path={"/admin/addAdmin/Choice"} render={ ()=>{return <Choice/>} }/>
                   </Switch>
            </div>
        )
    }
}

export default Addadmin;

const options = [
  { label: '快递员管理',     value: '1' },
  { label: '用户管理',       value: '2' },
  { label: '快递柜管理',     value: '3' },
  { label: '快递公司管理',   value: '4' },
  { label: '订单管理',       value: '5' },
  { label: '反馈信息管理',   value: '6' },
  { label: '消息管理',       value: '7' },
];
