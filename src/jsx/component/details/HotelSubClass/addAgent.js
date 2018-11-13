import React from "react";
import {Button,Icon,Input,InputNumber  } from "antd";
import { Route, Switch, Link} from 'react-router-dom';
import Region               from "../../share/region"
import Avatar                                from "../../share/Avatar";

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
                <Link to={`/AgentHotel/addAdmin/{"idAdmin":"${_data}","type":"2"}`}>
                    <Button type="primary">
                        添加酒店
                    </Button>
                </Link>
                <Switch>
                    <Route  path="/AgentHotel/addAdmin/:data"  render={ ()=> <AddAmin enData={this.enData} idAdmin={_data}/>}/>
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
            adminId:"",
            hotelname:"",
            businesslicense:"",
            floornumbers:"",
            hoteladdress:"",
            _hotelname:"",
            legalperson:"",
            roomnumbers:"",
            err:""
        }
    }

    /**省市区选择 */
    onRegion=(a,txt)=>{
        this.setState({
            [a]:txt,
            err:"",
            loading:false,
        })
    }
    /**获取用户输入 */
    onchange=( e )=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    /**获取图片地址 */
    upimg=( e )=>{
        this.setState({
            businesslicense:e.data,
            err:"",
            loading:false,
        })
    }
    /**房间数 */
    onRoomnumbers=(e)=>{
        this.setState({
            roomnumbers:e
        })
    }
    /**楼层数 */
    onFloornumbers=(e)=>{
        this.setState({
            floornumbers:e
        })
    }

    postData=( )=>{
        this.setState({
            loading:true,
        })
        let data={
            adminId:this.props.idAdmin,
            businesslicense:this.state.businesslicense,
            floornumbers:this.state.floornumbers,
            hoteladdress:this.state.p+this.state.c+this.state.a+this.state._hotelname,
            hotelname:this.state.hotelname,
            legalperson:this.state.legalperson,
            roomnumbers:this.state.roomnumbers,
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
            window.location.href=`/#/AgentHotel/{"idAdmin":"${this.props.idAdmin}","type":"1"}`
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
                      <h3>编辑管理员 <Link to={`/AgentHotel/{"idAdmin":"${_data}","type":"1"}`}><Icon type={"close"}/></Link></h3>
                      <div className={"addAdminData"}>
                           <div key={1}>
                               <span>
                                   酒店名称
                               </span>
                               <Input name={"hotelname"} onChange={this.onchange} onFocus={this.onfocus}/>
                           </div>
                           <div key={2}>
                               <span>
                                   酒店地址
                               </span>
                               <Region onRegion={this.onRegion}/>
                           </div>
                           <div key={3}>
                               <span>
                                   详细地址
                               </span>
                               <Input name={"_hotelname"} onChange={this.onchange} onFocus={this.onfocus}/>
                           </div>
                           <div key={4}>
                               <span>
                                   房间数
                               </span>
                               <InputNumber min={0} max={99999998}  onChange={this.onRoomnumbers} />
                           </div>
                           <div key={5}>
                               <span>
                                   楼层数
                               </span>
                               <InputNumber min={0} max={99999998}  onChange={this.onFloornumbers} />
                           </div>
                           <div key={6} className={"keyImg"}>
                               <span>
                                   营业执照
                               </span>
                               <Avatar upimg={this.upimg}/>
                           </div>
                           <div key={7}>
                               <span>
                                  法人
                               </span>
                               <Input name={"legalperson"} onChange={this.onchange} onFocus={this.onfocus}/>
                           </div> 
                           <div className={"adminDataBtn"} key={10}>
                                <Button>
                                    <Link to={`/AgentHotel/{"idAdmin":"${_data}","type":"1"}`}>
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