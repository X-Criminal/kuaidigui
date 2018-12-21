import React,{Component}        from "react";
import {Icon,Input,Button,message }                   from "antd";
import {Link}                   from "react-router-dom";
import axios    from "axios"
let url,id,name;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            phone:"",
        }
    }

    componentWillMount(){
        url = sessionStorage.getItem("url");
        id =JSON.parse(this.props.match.params.data).id;
        name = JSON.parse(this.props.match.params.data).name;
      }
      
      getPhone=( e )=>{
        this.setState({
            phone:e.target.value
        })
      }

      _init=()=>{
          if(this.state.phone.length<=0){ message.error("请输入手机号！"); return false;}; 
        axios.post(url+"/deliveryLockers/web/sendOrderManageController/orderUnlocking",{id:id,phone:this.state.phone})
             .then((res)=>{
                if(res.data.code===1000){
                       window.history.go(-1);
                       message.success(res.data.message);
                }else{
                    message.error(res.data.message);
                }
             })
      }
    render(){
        return(
            <div className={"infoBox open"}>
                    <div>
                        <h3>{name}-开锁  <Link to={"/hotel"}><Icon type="close"/></Link></h3>
                        <div className={"info-title"}>
                            <div>
                                 <span>取件人手机号</span>
                                 <Input placeholder={"请输入取件人手机号"} onChange={this.getPhone}/>
                            </div>
                            <div>
                                <span></span>
                                <Button type="primary" onClick={this._init}>
                                    确定
                                </Button>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}