import React,{Component} from "react";
import axios             from "axios";
import {message}         from "antd";
import Search            from "./adminSubclass/search";
import AdminLis          from "./adminSubclass/adminLis";
import "../../css/admin.less"
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            account:"",
            currPage:1,
            name:"",
            phone:"",


            admins:[],
            totalItems:0,

        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url");
    }
    componentDidMount(){
        this.init()
    }
    init=(data,cb)=>{
         let _data ={
            size:6,
            phone:this.state.phone,
            account:this.state.account,
            name:this.state.name,
            currPage:this.state.currPage,
         }
         for(let k  in data){
             _data[k] = data[k]
         }
         axios.post(url+"/deliveryLockers/web/webMenuController/getTAdminCustomByParams",_data)
              .then((res)=>{
                  if(res.data.code===1000&&res.data.message!=="没有数据！"){
                      this.setState({
                        admins:res.data.data,
                        totalItems:res.data.totalItems
                      })
                  }else{
                    this.setState({
                        admins:[],
                        totalItems:0
                      })
                      message.error(res.data.message)
                  }
                  cb&&cb( )
              }).catch((res)=>{
                  message.error("网络连接错误，请稍后再试！")
              })
    }
     
    onAddData=(data)=>{
        axios.post(url+"/deliveryLockers/web/webMenuController/addAdmin",data)
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     this.init()
                     window.history.go(-1);
                     message.success("添加成功！");
                 }else{
                     message.error(res.data.message)
                 }
             })
    }

    /**翻页 */
    emtPage=(e)=>{
        this.setState({
            currPage:e
        })
        this.init({currPage:e})
    }

    onSearch=(data,cb)=>{
        this.init(data,cb)
    }
    deleData=(data,cb)=>{
        axios.post(url+"/deliveryLockers/web/webMenuController/delAdmin",{id:data})
             .then((res)=>{
                 if(res.data.code===1000){
                        this.init( )
                        message.success(res.data.message);
                        cb&&cb( )
                 }else{
                     message.error(res.data.message)
                 }
             })
    }

        render(){
            return(
                <div className="admin">
                    <h3>管理员管理</h3>
                    <Search onSearch={this.onSearch} onAddData={this.onAddData}/>
                    <AdminLis totalItems={this.state.totalItems} admins={this.state.admins} emtPage={this.emtPage} deleData={this.deleData}/>
                </div>
            )
        }

}