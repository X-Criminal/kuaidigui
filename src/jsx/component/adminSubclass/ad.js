import React                                               from "react";
import {Input,Checkbox,Button,Icon,message }                       from "antd";
import axios                                               from "axios";
import Region                                              from "../share/region";
import { Route, Switch, Link}                              from 'react-router-dom';
import Choice                                              from "./choice"
let url;
const CheckboxGroup = Checkbox.Group;
class Addadmin extends React.Component {
    constructor(props){
        super(props)
        this.state={
            account:"",
            name:"",
            password:"",
            phone:"",

            Area:"",
            deliverys:[],
            index:1,
            menuId:[],
            deliveryId:[],
            Jurisdiction:[[]],
        }
        this.getUserDtate = this.getUserDtate.bind(this);
    }
    Jurisdiction=[[]]
    componentWillMount(){
        url = sessionStorage.getItem("url")
    }
    componentDidMount(){
        this.queryAccount()
        this.queryOptionalMenu();
    }
    onGo=()=>{
        window.history.back(-1)
    }
    
    queryAccount(){
        axios.post(url+"/deliveryLockers/web/webMenuController/queryAccount")
             .then((res)=>{
                 if(res.data.code===1000){
                     this.setState({
                        account:res.data.data
                     })
                 }
             })
    }
    addExpress=( )=>{
        this.setState({
            index:this.state.index+1
        })
        this.Jurisdiction.push([]);
        this.setState({
            Jurisdiction: this.Jurisdiction
        })
    }
    getUserDtate(e){
        this.setState({
            [e.target.name]:e.target.value
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
    getArea=(id)=>{
        this.setState({
            Area:id,
        })
    }

    onDeliveryId=(data,index)=>{
        this.Jurisdiction[index] = data;
        this.setState({
            Jurisdiction:this.Jurisdiction
        })
    }
    Check=(e)=>{
        this.setState({
            menuId:e
        })
    }

    onAdd=()=>{
        let _deliveryId=[]
        for(let i = 0 ;i<this.Jurisdiction.length;i++){
            let data = this.Jurisdiction[i];
            for(let k = 0;k<data.length;k++){
                _deliveryId.push(data[k].id)
            }
        }
        let _data={
            deliveryId:_deliveryId,
            menuId:this.state.menuId,
            tAdminBase:{
                account:this.state.account,
                name:this.state.name,
                password:this.state.password,
                phone:this.state.phone
            }
        }
        if(_data.deliveryId.length<=0&&_data.menuId.length<=0){
            message.error("资料请填写完整！")
            return false;
        }
        for(let j in _data.tAdminBase){
            if(_data.tAdminBase[j].length<=0){
                message.error("资料请填写完整！")
                return false;
            }
        }
        this.props.onAddData( _data )
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

    render(){
        return(
            <div className={"ad"}>
                   <h3><span className={"_back"}><Link to={"/admin"}>管理员管理</Link></span>><span>添加管理员</span></h3>
                   <div className={"ad_body"}>
                        <div className={"txt"}>
                            <span>账号：</span>
                            <Input disabled={true} value={this.state.account} style={{background:"rgba(0,0,0,0)",border:"none",color:"black"}}/>
                        </div>
                        <div className={"txt"}>
                            <span>姓名：</span>
                            <Input name={"name"} onChange={this.getUserDtate}/>
                        </div>
                        <div className={"txt"}>
                            <span>联系电话：</span>
                            <Input name={"phone"} value={this.state.phone} onChange={this.getUserDtate} onBlur={this.getPhone}/>
                        </div>
                        <div className={"txt"}>
                            <span>密码：</span>
                            <Input name={"password"} onChange={this.getUserDtate}/>
                        </div>
                        <div className={"Check clear-fix"}>
                             <span>菜单权限：</span>
                             <CheckboxGroup options={this.state.options} onChange={this.Check}/>
                        </div>
                        <div className={"Check clear-fix add"}>
                             <span>管辖快递柜：</span>
                             <div>
                             {this.state.Jurisdiction.map((item,idx)=>{
                              return(
                                    <div key={idx} index={this.state.index} className={"Check clear-fix add"}>
                                            <Region onGetArea={this.getArea}/>
                                            <Button type={"primary"}>
                                                <Link to={"/admin/addAdmin/Choice2/"+idx}>
                                                    选择快递柜
                                                </Link>
                                            </Button>
                                            {
                                                idx === 0?
                                                <Button type={"primary"} ghost onClick={this.addExpress}>
                                                    <Icon type="plus-circle" />
                                                    添加管辖快递柜
                                                </Button>:null
                                            }
                                            <br/>
                                            <p>选中的快递柜子：{this.state.Jurisdiction[idx].map((item,index)=><span key={index}>{item.name}，</span> )}</p>
                                    </div>
                              )
                            })}
                             </div>
                        </div>
                        <div className={"AdBtn txt"}>
                              <span></span>
                              <Button type={"primary"} onClick={this.onAdd}>
                                  保存
                              </Button>
                        </div>
                   </div>
                   <Switch>
                       <Route path={"/admin/addAdmin/Choice2/"} render={ ()=>{return <Choice Area={this.state.Area} onDeliveryId={this.onDeliveryId}/>}}/>
                   </Switch>
            </div>
        )
    }
}

export default Addadmin;

