import React,{Component} from "react";
import axios             from "axios";
import Search            from "./adminSubclass/search";
import AdminLis          from "./adminSubclass/adminLis";
import "../../css/admin.less"
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            page:1,
            condition:"",
            idRole:0,
            keywords:"",
            strip:0,
            admins:[{"序号":"小明","账号":"123456","姓名":"123456","联系电话":"123456","密码":"123456","管辖区域":"123456","id":1}],
        }
    }
    componentDidMount(){
        url = sessionStorage.getItem("url");
       // this.init()
    }

    // /**初始化 */
    // init=(data,cb)=>{
    //     let _data={
    //         numberPage:8,
    //         page:this.state.page,
    //         condition:this.state.condition,
    //         idRole:this.state.idRole,
    //         keywords:this.state.keywords,
    //     }
    //     if(data){
    //         for(let k in data){
    //             _data[k]=data[k]
    //             this.setState({
    //                 [k]:data[k]
    //             })
    //         }
    //     }
    //     axios.post(url+"SmartPillow/web/admin/getAdminAndRole",_data)
    //           .then((res)=>{
    //               if(res.data.code===1000&&res.data.data){
    //                     this.setState({
    //                         strip:res.data.data.strip,
    //                        admins:res.data.data.admins
    //                     })
    //               }else{
    //                 this.setState({
    //                     strip:0,
    //                    admins:[ ]
    //                 })
    //               }
    //               cb&&cb( )
    //           })
    // }

    /**添加 */
    addAdmin=(data,cb)=>{
        axios.post(url+"SmartPillow/web/admin/addAdmin",data)
             .then((res)=>{
                 this.init()
                 alert(res.data.message)
                 cb&&cb(res)
             })
    }
    /**查询 */
    onSearch=(data,cb)=>{
        this.setState({
            keywords:data.keywords
        })
        this.init(data,(data)=>{
            cb&&cb(data)
        })
    }
    /**修改 */
    upData=(data,cb)=>{
        axios.post(url+"/SmartPillow/web/admin/updateAdmin",data)
             .then((res)=>{
                    if(res.data.code===1000){
                         this.init()
                          alert("修改成功")
                    }else{
                          alert("修改失败")
                    }
                cb&&cb()
             })
    }
     /**删除 */
    deleData=( e ,cb)=>{
        axios.post(url+"/SmartPillow//web/admin/deleteAdmin",{idAdmin:e})
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
                <div className="admin">
                    <h3>管理员管理</h3>
                    <Search addAdmin={this.addAdmin} onSearch={this.onSearch}/>
                    <AdminLis strip={this.state.strip} admins={this.state.admins} upData={this.upData} deleData={this.deleData} emtPage={this.emtPage}/>
                </div>
            )
        }

}