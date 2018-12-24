import React                                                from "react";
import {Button ,message}                                            from "antd";
import axios                                                from "axios";
import { Route, Switch,Link}                                     from 'react-router-dom';
import Edit                                               from "./edit"

let id,url;
class Addadmin extends React.Component {
    constructor(props){
        super(props)
        this.state={
            // Jurisdiction:[],
            userData:{},
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
                 if(res.data.code===1000){
                        this.setState({
                            userData:res.data.data
                        })
                 }else{
                    message.error(res.data.message)
                 }
             })
    }
    render(){
        let userDate = this.state.userData;
        return(
            <div className={"ad"}>
                   <h3><span className={"_back"} onClick={this.onGo}>管理员管理</span>><span>管理员详情</span></h3>
                   <div className={"ad_body"}>
                        <div className={"txt"}>
                            <span>账号：</span>
                            <span>{userDate.account}</span>
                        </div>
                        <div className={"txt"}>
                            <span>姓名：</span>
                            <span>{userDate.name}</span>
                        </div>
                        <div className={"txt"}>
                            <span>联系电话：</span>
                            <span>{userDate.phone}</span>
                        </div>
                        <div className={"txt"}>
                            <span>密码：</span>
                            <span>{userDate.password}</span>
                        </div>
                        <div className={"Check clear-fix"}>
                             <span>菜单权限：</span>
                             <span>{userDate.menus?userDate.menus.map((item,index)=><span key={index}>{item.menuName},</span>):null}</span>
                        </div>
                        <div className={"Check clear-fix add"}>
                             <span>管辖快递柜：</span>
                             <span>{userDate.deliveryLocker?userDate.deliveryLocker.map((item,index)=><span key={index}>{item.name},</span>):null}</span>
                        </div>
                        <div className={"AdBtn txt"}>
                              <span></span>
                              <Button type={"primary"}>
                                 <Link to={"/admin/details"+id+"/edit"+id}>
                                    修改
                                 </Link>
                              </Button>
                        </div>
                   </div>
                   <Switch>
                       <Route path={"/admin/details:data/edit:data"} component={Edit}/>
                   </Switch>
            </div>
        )
    }
}

export default Addadmin;

// const options = [
//   { label: '快递员管理',     value: '1' },
//   { label: '用户管理',       value: '2' },
//   { label: '快递柜管理',     value: '3' },
//   { label: '快递公司管理',   value: '4' },
//   { label: '订单管理',       value: '5' },
//   { label: '反馈信息管理',   value: '6' },
//   { label: '消息管理',       value: '7' },
// ];
