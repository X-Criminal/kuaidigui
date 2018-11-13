import React ,{Component} from "react";
import {Link}             from "react-router-dom";
import {Icon}             from "antd";
import axios              from "axios";
import Sraech             from "./RoleSubClass/search";
import RoleLis               from "./RoleSubClass/agentLis";
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            TypeAndId:"",
            condition:"",
             keywords:"",
                 page:1,
        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url")
        this.setState({
            TypeAndId:JSON.parse(this.props.match.params.data)
        })
    }

    componentDidMount(){
        this.init( )
    }
    /**初始化 */
    init=(data,cb)=>{
        let _data={
                idAdmin:this.state.TypeAndId.idAdmin,
               keywords:this.state.keywords,
              condition:this.state.condition,
             numberPage:8,
                   page:this.state.page,
        }
        if(data){
            for(let k in data){
                _data[k] = data[k]
            }
        }
        axios.post(url+"SmartPillow/web/agent/queryLowerAgentList",_data)
             .then((res)=>{
                if(res.data.code===1000&&res.data.data){
                    this.setState({
                        strip:res.data.data.strip,
                       admins:res.data.data.admins
                    })
              }else{
                this.setState({
                    strip:0,
                   admins:[ ]
                })
              }
                 cb&&cb()
             })
    }
    /**查询 */
    onSearch=(data,cb )=>{
        this.setState({
            condition:data.condition,
             keywords:data.keywords
       })
        this.init(data,()=>{
            cb&&cb( )
        })
    }
  /**删除 */
  deleData=( e ,cb)=>{
    axios.post(url+"SmartPillow/web/agent/deleteAgent",{idAdmin:e})
         .then((res)=>{
             if(res.data.code===1000){
                 this.init()
             }
            alert(res.data.message)
         })
        cb&&cb( )
    }
/**翻页 */
   emtPage=(e)=>{
       this.setState({
           page:e
       })
       this.init({page:e})
   }
    render(){
        return(
            <div className={"admin Role"}>
                <h3><Link to={"/agent"}>代理商管理</Link> <Icon type={"right"}/>详情</h3>
                <Sraech params={this.state.TypeAndId} onSearch={this.onSearch}/>
                <RoleLis strip={this.state.strip} admins={this.state.admins} deleData={this.deleData} emtPage={this.emtPage} router={this.props.match.url}/>
            </div>
        )
    }
}