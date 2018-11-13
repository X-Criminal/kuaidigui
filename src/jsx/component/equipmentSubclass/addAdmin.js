import React from "react";
import {Button,Icon,Input,Select} from "antd";
import { Route, Switch, Link} from 'react-router-dom';
import Region               from "../share/region"


const Option = Select.Option;

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
        return(
            <div className={"addAdmin"} style={{"float":"right"}}>
                <Link to={"/ /addAdmin"}>
                    <Button type="primary">
                        添加管理员
                    </Button>
                </Link>
                <Switch>
                    <Route  path="/ /addAdmin"     render={ ()=> <AddAmin enData={this.enData}/>}/>
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
            admintype:1,
            age:"",
            identityCard:"",
            name:"",
            password:"",
            telephone:""
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
      if(typeof e !== "number"){
        this.setState({
            [e.target.name]:e.target.value
        })
       }else{
           this.setState({
            admintype:e,
            err:"",
            loading:false,
           })
       } 
    }
    postData=( )=>{
        this.setState({
            loading:true,
        })
        let data={
            address:this.state.address,
            admintype:this.state.admintype,
            age:(+this.state.age),
            adminRole:[{idRole:1}],
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
            window.location.href="/#/ "
        })
    }
    onfocus=( )=>{
        this.setState({
            err:"",
            loading:false,
        })
    }
        render(){
            return(
                <div className={"addAdminBox"}>
                        <div>
                              <h3>添加管理员 <Link to={"/ "}><Icon type={"close"}/></Link></h3>
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
                                    <div key={8}>
                                       <span>
                                          角色
                                       </span>
                                       <Select
                                            showSearch
                                            optionFilterProp="children"
                                            placeholder={'全部'}
                                            onChange={this.onchange}
                                            allowClear={true}
                                            name={"admintype"}
                                            className={"getroleName"}
                                            >
                                                <Option key={1} value={1}>普通管理员</Option>
                                                <Option key={2} value={2}>代理商</Option> 
                                        </Select>
                                   </div>  
                                   <div key={9}>
                                       <p style={{"color":"red","textAlign":"center"}}>{this.state.err}</p>
                                   </div>
                                   <div className={"adminDataBtn"} key={10}>
                                        <Button>
                                            <Link to={"/ "}>
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