import React                                               from "react";
import {Input,Checkbox,Button,Icon,message }                       from "antd";
import axios                                               from "axios";
import Region                                              from "../share/region";
import { Route, Switch, Link}                              from 'react-router-dom';
import Choice                                              from "./choice"
let url,id;
const CheckboxGroup = Checkbox.Group;
let dele = [ ];
let add =[ ];

class Addadmin extends React.Component {
    constructor(props){
        super(props)
        this.state={
            account:"",
            name:"",
            password:"",
            phone:"",

            GXnumber:[],
              
            Area:"",
            deliverys:[],
            index:1,
            menuId:[],
            defaultValues:[],
            defaultValues_1:[],
            deliveryLocker__:[],
            options:[],
            deliveryId:[],
            userData:{deliveryLocker:[]},

        }
        this.getUserDtate = this.getUserDtate.bind(this);
    }
    Jurisdiction=[[]]
    componentWillMount(){
        url = sessionStorage.getItem("url");
        id = this.props.match.params.data;
    }
    componentDidMount(){
        this.queryAdminDetails();
        this.queryOptionalMenu();
        dele = [ ];
        add=[ ];
    }
    queryAdminDetails=()=>{
        axios.post(url+"/deliveryLockers/web/webMenuController/queryAdminDetails",{id:id})
             .then((res)=>{
                 if(res.data.code===1000){
                        this.setState({
                            userData:res.data.data,
                            deliveryLocker__:res.data.data.deliveryLocker||[]
                        })
                     this.defaultValue(res.data.data.menus);
                     
                 }else{
                    message.error(res.data.message)
                 }
             })
    }
    onGo=()=>{
        window.history.back(-1)
    }
    addExpress=( )=>{
      let GXnumber =this.state.GXnumber;
      GXnumber.push(0);
      add.push([])
      this.setState({
        GXnumber:GXnumber,
      })
    }
    getUserDtate(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    getArea=(id)=>{
        this.setState({
            Area:id
        })
    }

    onDeliveryId=(data,index)=>{
        this.Jurisdiction[index] = data;
        this.setState({

        })
    }
    Check=(e)=>{
        this.setState({
            defaultValues:e
        })
    }

    onAdd=()=>{
        let d1 = this.state.defaultValues,
            d2 = this.state.defaultValues_1,
            _deliveryId=[],
            menuId = [],
            delMenuId=[];
        /**添加 Start */
        for(let i = 0;i<d1.length;i++){
            if(d2.indexOf(d1[i])<=-1){
                menuId.push(d1[i])
            }
        }
        /**添加 End */
        /**删除 Start */
        for(let i = 0;i<d2.length;i++){
             if(d1.indexOf(d2[i])<=-1){
                delMenuId.push(d2[i])
             }
        }
        /**删除 End */

        /**
         * 
         */
        _deliveryId=[];
        for(let i = 0;i<add.length;i++){
            let data = add[i];
            for(let k =0;k<data.length;k++){
                _deliveryId.push(data[k].id)
            }
        }

        let _data={
            deliveryId:_deliveryId,
            id:id,
            menuId:menuId,
            delMenuId:dele,
        }
       if(this.state.name.length>0) _data.tAdminBase.name = this.state.name;
       if(this.state.password.length>0) _data.tAdminBase.name = this.state.password;
       if(this.state.phone.length>0) _data.tAdminBase.name = this.state.phone;
        axios.post(url+"/deliveryLockers/web/webMenuController/updateAdmin",_data)
             .then((res)=>{
                 message.success(res.data.message)
                 window.history.go(-1)
             })
    }
    defaultValue=(data)=>{
        if(!data){
            return false
        } ;
        let arr=[];
        for(let i=0;i<data.length;i++){
            arr.push(data[i].id)
        }
        this.setState({
            defaultValues:arr,
            defaultValues_1:arr
        })
    }
   
    queryOptionalMenu(){
        axios.post(url+"/deliveryLockers/web/webMenuController/queryOptionalMenu")
             .then((res)=>{
                 if(res.data.code===1000){
                        let data = [],_option = res.data.data;
                        for(let i =0,idx=_option.length;i<idx;i++){
                                data.push({value:_option[i].id,label:_option[i].menuName})
                        }
                     this.setState({
                        options:data,
                     })
                 }
             })
    }

    getPhone=(e)=>{
        let zz = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
        let value = e.target.value;
        if(!(zz.test(value))) {
            message.error("请输入正确的手机号！")
           this.setState({
                phone:""
           })
        }
    }

    render(){
        let data = this.state.userData;
        return(
            <div className={"ad getHeight"}>
                   <h3><span className={"_back"}><Link to={"/admin"}>管理员管理</Link></span>><span>修改管理员</span></h3>
                   <div className={"ad_body"}>
                        <div className={"txt"}>
                            <span>账号：</span>
                            <Input disabled={true} value={data.account} style={{background:"rgba(0,0,0,0)",border:"none",color:"black"}}/>
                        </div>
                        <div className={"txt"}>
                            <span>姓名：</span>
                            <Input name={"name"} onChange={this.getUserDtate} placeholder={data.name}/>
                        </div>
                        <div className={"txt"}>
                            <span>联系电话：</span>
                            <Input name={"phone"} onBlur={this.getPhone} value={this.state.phone} onChange={this.getUserDtate} placeholder={data.phone}/>
                        </div>
                        <div className={"txt"}>
                            <span>密码：</span>
                            <Input name={"password"} onChange={this.getUserDtate}  placeholder={data.password}/>
                        </div>
                        <div className={"Check clear-fix"}>
                             <span>菜单权限：</span>
                             <CheckboxGroup options={this.state.options} onChange={this.Check} value={this.state.defaultValues}/>
                        </div>
                        <div className={"Check clear-fix add"}>
                             <span>管辖快递柜：</span>
                             <div>
                             {this.state.deliveryLocker__.map((item,idx)=> <XZ key={idx+"-"} obj={item}/>)}
                             <Button type={"primary"} ghost onClick={this.addExpress}>
                                     <Icon type="plus-circle"/>
                                     添加管辖快递柜
                             </Button>
                             <GX GXnumber={this.state.GXnumber} />
                         </div>
                        </div>
                        <div className={"AdBtn txt"}>
                              <span></span>
                              <Button type={"primary"} onClick={this.onAdd}>
                                  保存
                              </Button>
                        </div>
                   </div>
                  
            </div>
        )
    }
}

export default Addadmin;


class XZ extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShow:true,
        }
    }
    
    dele=()=>{
        dele.push(this.props.obj.area);
        this.setState({
            isShow:false
        })
    }
    render(){
        return(
            <div className={"Check clear-fix add"} style={this.state.isShow?{display:"block"}:{display:"none"}}>
                    <p style={{marginBottom:"0",lineHeight:"60px",float:"left"}}>{this.props.obj.provinceName+this.props.obj.cityName+this.props.obj.areaName+"已"}绑定的快递柜：<span>{this.props.obj.name}</span></p>
                                            <Button  style={{backgroundColor:"red",color:"#fff",float:"left"}} onClick={this.dele}>删除</Button>
                    </div>
        )
    }

}

class GX extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Area:"",
            arr:[],
            index:""
        }
    }
    componentDidMount(){
        this.setState({
            index:this.props.index
        })
    }
    getArea=(id)=>{
        this.setState({
            Area:id
        })
    }
    onDeliveryId=(e,type)=>{
            add[type] = e;
            this.setState({
                arr:add
            })
    }
    render(){
        return(
            <div>
                {
                    this.props.GXnumber.map((item,index)=>
                        <div className={"Check clear-fix add"} key={index}>
                            <Region onGetArea={this.getArea}/>
                            <Button type={"primary"}>
                                <Link to={"/admin/edit"+id+"/Choice"+index}>
                                    选择快递柜
                                </Link>
                            </Button>
                            <br/>
                            <p>绑定的快递柜:{add[index].map((item,index)=> <span key={index}>{item.name},</span> )}</p>
                        </div>
                    )
                }
                <Switch>
                    <Route path={"/admin/edit"+id+"/Choice:data"} render={ ()=>{return <Choice Area={this.state.Area} onDeliveryId={this.onDeliveryId}/>}}/>
                </Switch>
            </div>
        )
    }
}
