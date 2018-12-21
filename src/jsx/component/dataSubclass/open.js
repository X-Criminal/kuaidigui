import React,{Component}        from "react";
import {Icon,Input,Button,message }                   from "antd";
import {Link}                   from "react-router-dom";
import axios from "axios";
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            phone:"",
        }
    }
    componentWillMount(){
      url = sessionStorage.getItem("url")
    }
    componentDidMount(){
        if(this.props.getOpenData.length<=0) window.history.go(-1);
    }

        phone=(e)=>{
            this.setState({
                phone:e.target.value
            })
        }

    kaisuo=( )=>{
        if( this.state.phone.length<=0){
            message.error("请输入手机号码！");
            return false;
        }
        axios.post(url+"/deliveryLockers/web/saveOrderManageController/orderUnlocking",{orderId:this.props.getOpenData.id,phone:this.state.phone})
             .then((res)=>{
                 if(res.data.code===1000){
                     message.success(res.data.message)
                     window.history.go(-1);
                 }else{
                     message.error(res.data.message)
                 }
             })
    }
    render(){
        return(
            <div className={"infoBox open"}>
                    <div>
                        <h3>{this.props.getOpenData.deliveryName}-开锁  <Link to={"/data"}><Icon type="close"/></Link></h3>
                        <div className={"info-title"}>
                            <div>
                                 <span>取件人手机号</span>
                                 <Input placeholder={"请输入取件人手机号"} onChange={this.phone}/>
                            </div>
                            <div>
                                <span></span>
                                <Button type="primary" onClick={this.kaisuo}>
                                    确定
                                </Button>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}