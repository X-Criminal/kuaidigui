import React from "react";
import {Button,Icon,Input,Checkbox } from "antd";
import { Route, Switch, Link} from 'react-router-dom';
import Region               from "../../share/region"


const CheckboxGroup = Checkbox.Group;
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    enData=( data ,cb)=>{
        this.props.addAdmin(data,(res)=>{
            cb&&cb()
        })
    }
    render(){
        let _data = this.props.idAdmin
        return(
            <div className={"addAdmin"} style={{"float":"right"}}>
                <Link to={`/AgentRole/addAdmin/{"idAdmin":"${_data}","type":"2"}`}>
                    <Button type="primary">
                        添加代理商
                    </Button>
                </Link>
                <Switch>
                    <Route  path="/AgentRole/addAdmin/:data"     render={ ()=> <AddAmin enData={this.enData} idAdmin={_data}/>}/>
                </Switch>
            </div>
        )

    }
}

class AddAmin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            p:"",
            c:"",
            a:"",
            address:"",
            admintype:2,
            age:"",
            identityCard:"",
            name:"",
            password:"",
            telephone:"",
            adminRole:"",
        }
    }

    onRegion=(a,txt)=>{
        this.setState({
            [a]:txt,
            err:"",
            loading:false,
        })
    }
    onchange=( e )=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    _onchange=( e )=>{
        let adminRole=[]
        for(let i=0;i<e.length;i++){
            adminRole.push({idRole:e[i]})
        }
        this.setState({
            adminRole:adminRole
        })
    }
    postData=( )=>{
        this.setState({
            loading:true,
        })
        let data={
            address:this.state.address,
            admintype:this.state.admintype,
            age:(+this.state.age),
            adminRole:this.state.adminRole,
            identityCard:this.state.identityCard,
            name:this.state.name,
            password:this.state.password,
            telephone:this.state.telephone,
            area:this.state.p+this.state.c+this.state.a
        }
        for(let k in data){
            if(data[k].length<=0){
                    this.setState({
                        err:"资料请填写完整"
                    })
                    return false;
            }
        }

        this.props.enData(data,(data)=>{
            this.setState({
                loading:false
            })
            window.location.href=`/AgentRole/{"idAdmin":"${this.props.idAdmin}","type":"2"}`
        })
    }
    onfocus=( )=>{
        this.setState({
            err:"",
            loading:false,
        })
    }
        render(){
            let _data = this.props.idAdmin
            return(
                <div className={"addAdminBox"}>
                        <div>
                              <h3>添加管理员 <Link to={`/AgentRole/{"idAdmin":"${_data}","type":"2"}`}><Icon type={"close"}/></Link></h3>
                              <div className={"addAdminData"}>
                                   <div key={1}>
                                       <span>
                                           账号
                                       </span>
                                       <Input name={"telephone"} onChange={this.onchange} onFocus={this.onfocus}/>
                                   </div>
                                   <div key={2}>
                                       <span>
                                           密码
                                       </span>
                                       <Input name={"password"} onChange={this.onchange} onFocus={this.onfocus}/>
                                   </div>
                                   <div key={3}>
                                       <span>
                                           姓名
                                       </span>
                                       <Input name={"name"} onChange={this.onchange} onFocus={this.onfocus}/>
                                   </div>
                                   <div key={4}>
                                       <span>
                                           年龄
                                       </span>
                                       <Input name={"age"} onChange={this.onchange} onFocus={this.onfocus}/>
                                   </div>
                                   <div key={5}>
                                       <span>
                                           身份证
                                       </span>
                                       <Input name={"identityCard"} onChange={this.onchange} onFocus={this.onfocus}/>
                                   </div>
                                   <div key={6}>
                                       <span>
                                           地区
                                       </span>
                                       <Region onRegion={this.onRegion}/>
                                   </div>
                                   <div key={7}>
                                       <span>
                                          详细地址
                                       </span>
                                       <Input name={"address"} onChange={this.onchange} onFocus={this.onfocus}/>
                                   </div>
                                    <div key={8} className={"adminType clear-fix"}>
                                       <span>
                                          角色
                                       </span>
                                       <CheckboxGroup options={
                                           [
                                            { value: 3, label: '推客' },
                                            { value: 4, label: '创客' },
                                            { value: 6, label: '酒店' },
                                            { value: 5, label: '投资人' },
                                            { value: 2, label: '城市合伙人' },
                                            ]
                                           } onChange={this._onchange} />
                                   </div> 
                                   <div key={9}>
                                       <p style={{"color":"red","textAlign":"center"}}>{this.state.err}</p>
                                   </div>
                                   <div className={"adminDataBtn"} key={10}>
                                        <Button>
                                            <Link to={`/AgentRole/{"idAdmin":"${_data}","type":"2"}`}>
                                                取消
                                            </Link>
                                        </Button>
                                        <Button type={"primary"} loading={this.state.loading} onClick={this.postData}>
                                             确定
                                        </Button>
                                   </div>
                              </div>
                        </div>
                </div>
            )
        }
}