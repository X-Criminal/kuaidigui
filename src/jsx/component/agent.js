import React ,{Component} from "react";
import axios             from "axios";
import {message}          from "antd";
//import cookie             from "react-cookies";
import Search            from "./agentSubclass/search";
import AgentLis          from "./agentSubclass/agentLis";
//import ScrollNumber from "antd/lib/badge/ScrollNumber";
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            currPage:1,
            dname:"",
            id:"",
            name:"",
            phone:"",

            strip:0,
            courier:[],
            admins:[{key:1,"序号":"序号","账号":"账号","姓名":"姓名","联系电话":"联系电话","快递公司":"快递公司","所属区域":"所属区域","状态":"状态"}],
        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url");
    }
    componentDidMount(){
        this.init()
    }

      /**初始化 */
    init=(data)=>{
          let _data ={
            size:6,
            currPage:this.state.currPage,
            dname:this.state.dname,
            id:this.state.id,
            name:this.state.name,
            phone:this.state.phone,
          }
          for(let i in data){
              _data[i]=data[i]
          }
          axios.post(url+"/deliveryLockers/web/webTUserController/getUserCustom3ByParams",_data)
               .then((res)=>{
                    if(res.data.code===1000){
                        this.setState({
                            admins:res.data.data,
                            strip:res.data.totalItems,
                        })
                    }else{
                        this.setState({
                            admins:[],
                            strip:0,
                        })
                        message.error(res.data.message)
                    }
                })
                .catch(()=>{
                    message.error("网络连接错误，请稍后再试！")
                })
    }

    /**添加 */
    addAdmin=(data,cb)=>{

    }
    getKeyWord=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    /**查询 */
    onSearch=( )=>{
        this.init( )
    }
    /**绑定快递柜 */
    rowSelection=(data)=>{
        let arr=[];
        var reg = new RegExp("@","g");
        for(let i=0;i<data.length;i++){
             arr.push(data[i].replace(reg,""))
        }
        this.setState({
             courier:arr
       })
    }
     /**删除 */
    deleData=( e ,cb)=>{

    }
    /**翻页 */
    emtPage=(e)=>{
        this.setState({
            currPage:e
        })
        this.init({currPage:e})
    }

        render(){
            return(
                <div className={"agent admin"}>
                        <h3>快递员管理</h3>
                        <Search courier={this.state.courier} addAdmin={this.addAdmin} onSearch={this.onSearch} getKeyWord={this.getKeyWord}/>
                        <AgentLis onSearch={this.onSearch} strip={this.state.strip} admins={this.state.admins} rowSelection={this.rowSelection} deleData={this.deleData} emtPage={this.emtPage}/>
                </div>
            )
        }
}