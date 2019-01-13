import React , {Component}      from "react";
import {Icon,Button,message}                   from "antd";
import axios from "axios"
let id,url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            getUserCustom2ById:{},
            maxImg:"",
            isMax:false,
        }
    }
    
    componentWillMount(){
        id=this.props.match.params.data;
        url = sessionStorage.getItem("url");
    }
    componentDidMount(){
        this.getUserCustom2ById( )
    }

    BACK=()=>{
        window.history.back(-1)
    }

    getUserCustom2ById=()=>{
        axios.post(url+"/deliveryLockers/web/webTUserController/getUserCustom2ById",{id:id})
             .then((res)=>{
                if(res.data.code===1000&&res.data.message.indexOf("操作成功")>-1){
                    this.setState({
                        getUserCustom2ById:res.data.data
                    })
                }else{
                    message.error(res.data.message);
                }
             })
    }

    upDateUser(type){
        let _type = window.confirm("此操作将冻结该用户，是否继续？")
            if(_type){
                axios.post(url+"/deliveryLockers/web/webTUserController/updateUser",{id:id,type:type})
                .then((res)=>{
                        if(res.data.code===1000){
                            this.getUserCustom2ById( );
                            message.success(res.data.message);
                        }else{
                            message.error(res.data.match);
                        }
                }).catch((res)=>{
                    message.error("网络连接错误，请稍后再试！")
                })
            }
    }

    enlarge=(e)=>{
        this.setState({
            maxImg:e.target.src,
            isMax:true,
        })
    }
    onlarge=(e)=>{
        this.setState({
            maxImg:"",
            isMax:false,
        })
    }
    render(){
        let data = this.state.getUserCustom2ById;
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
                        <span>{data.id}</span>
                    </div>
                    <div>
                        <span>头像：</span>
                        <img src={data.pic} alt="头像"/>
                    </div>
                    <div>
                        <span>昵称：</span>
                        <span>{data.nickname}</span>
                    </div>
                    <div>
                        <span>联系电话：</span>
                        <span>{data.phone}</span>
                    </div>
                    <div>
                        <span>地址：</span>
                        <span>{data.address}</span>
                    </div>
                    <div>
                        <span>状态：</span>
                        {/* <span>{data.approveStatus===0?"未认证":data.approveStatus===1?"已认证"?data.approveStatus===2:"已冻结":"-"}</span> */}
                        {data.approveStatus===0?<span style={{color:"red"}}>未认证</span>:data.approveStatus===1?<span>已认证</span>:data.approveStatus===2?<span style={{color:"red"}}>已冻结</span>:<span>-</span>}
                    </div>
                </div>
                {
                    data.approveStatus===1?
                    <div className={"userData"}>
                        <div>
                            <span>姓名：</span>
                            <span>{data.realName}</span>
                        </div>
                        <div>
                            <span>身份证号：</span>
                            <span>{data.idNumber}</span>
                        </div>
                        <div>
                            <span>身份证：</span>
                            <span>
                                <img src={url+"/"+data.frontPic} alt={"userData"}   onClick={this.enlarge}/>
                                <img src={url+"/"+data.reversePic} alt={"userData"} onClick={this.enlarge}/>
                            </span>
                        </div>
                    </div>
                    :null
                }
               {this.state.isMax?<div className={"enlarge"} onClick={this.onlarge}>
                    <img src={this.state.maxImg} alt={"userData"} />
                </div>:null}
                <Button type="primary" onClick={this.upDateUser.bind(this,data.approveStatus===2?2:1)}>
                    {data.approveStatus===2?<span>解冻</span>:<span>冻结</span>}
                </Button>
            </div>
        )
    }
}