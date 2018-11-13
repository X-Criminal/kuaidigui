import React                                               from "react";
import {Input,Checkbox,Button,Icon }                       from "antd";
import Region                                              from "../share/region";
import { Route, Switch, Link}                              from 'react-router-dom';
import Choice                                              from "./choice"

const CheckboxGroup = Checkbox.Group;
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
                   <h3><span className={"_back"} onClick={this.onGo}>管理员管理</span>><span>添加管理员</span></h3>
                   <div className={"ad_body"}>
                        <div className={"txt"}>
                            <span>账号：</span>
                            <Input disabled={true} style={{background:"rgba(0,0,0,0)",border:"none"}}/>
                        </div>
                        <div className={"txt"}>
                            <span>姓名：</span>
                            <Input />
                        </div>
                        <div className={"txt"}>
                            <span>联系电话：</span>
                            <Input />
                        </div>
                        <div className={"txt"}>
                            <span>密码：</span>
                            <Input />
                        </div>
                        <div className={"Check clear-fix"}>
                             <span>菜单权限：</span>
                             <CheckboxGroup options={options}/>
                        </div>
                        <div className={"Check clear-fix add"}>
                             <span>菜单权限：</span>
                             <div>
                             {this.state.Jurisdiction.map((item,idx)=>{
                              return(
                                    <div key={idx} className={"Check clear-fix add"}>
                                            <Region/>
                                            <Button type={"primary"}>
                                                <Link to={"/admin/addAdmin/Choice"}>
                                                    选择快递柜
                                                </Link>
                                            </Button>
                                    </div>
                              ) 
                            })}

                                 <div className={"JurisdLis clear-fix"}>
                                    <Region/>
                                    <Button type={"primary"}>
                                        <Link to={"/admin/addAdmin/Choice"}>
                                            选择快递柜
                                        </Link>
                                    </Button>
                                    <Button type={"primary"} ghost onClick={this.addExpress}>
                                        <Icon type="plus-circle" />
                                        添加管辖快递柜
                                    </Button>
                                </div>
                             </div>
                        </div>
                        <div className={"AdBtn txt"}>
                              <span></span>
                              <Button type={"primary"}>
                                  保存
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
