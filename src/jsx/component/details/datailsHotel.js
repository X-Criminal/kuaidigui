import React ,{Component} from "react";
import {Link}             from "react-router-dom";
import {Icon}             from "antd";
import axios              from "axios"
import Sraech             from "./HotelSubClass/search";
import RoleLis            from "./HotelSubClass/agentLis";
let url,TypeAndId;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            condition:"",
             keywords:"",
                 page:1,
                 idAdmin:""
        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url");
           
    }
    componentDidMount(){
        this.init( )
    }
    /**初始化 */
    init=(data,cb)=>{
        let _data={
                idAdmin:TypeAndId.idAdmin,
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
        axios.post(url+"SmartPillow/web/agent/queryAdminHotelRoleList",_data)
             .then((res)=>{
                if(res.data.code===1000&&res.data.data){
                    this.setState({
                        strip:res.data.data.strip,
                       admins:res.data.data.hotels
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
    axios.post(url+"SmartPillow/web/agent/deleteAdminHotelRole",{idHotel:e})
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
   /**添加*/
   addAdmin=(data,cb)=>{
    axios.post(url+"SmartPillow//web/hotel/addHot",data)
         .then((res)=>{
             if(res.data.code===1000){
                 this.init( )
             }
             cb&&cb( )
         }).catch((err)=>{
             alert("网络错误，请稍后再试");
             cb&&cb( )
         })
        
   }
   /**修改 */
   upData=(data,cb)=>{
        console.log(data)
        axios.post(url+"/SmartPillow//web/agent/updateAdminHotelRole",data)
             .then((res)=>{
                 console.log(res)
                 cb&&cb()
             })
   }
    render(){
            TypeAndId=this.props.match.params.data.indexOf("{")>-1?JSON.parse(this.props.match.params.data):""
        return(
            <div className={"admin Role"}>
                <h3><Link to={"/agent"}>代理商管理</Link> <Icon type={"right"}/>详情</h3>
                <Sraech params={TypeAndId} onSearch={this.onSearch} addAdmin={this.addAdmin}/>
                <RoleLis  upData={this.upData} strip={this.state.strip} admins={this.state.admins} deleData={this.deleData} emtPage={this.emtPage} router={this.props.match.url} params={this.state.TypeAndId}/>
            </div>
        )
    }
}