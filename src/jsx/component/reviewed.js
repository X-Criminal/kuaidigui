import React ,{Component} from "react";
import axios              from "axios";
import Search             from "./userSubclass/search";
import Reviewed           from "./reviewedSubclass/adminLis";

let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            page:1,
            keywords:"",
        }
    }
    componentDidMount(){
        url = sessionStorage.getItem("url")
        this.init( )
    }

    /**初始化 */
    init=(data,cb)=>{
        let _data={
            numberPage:8,
            page:this.state.page,
            keywords:this.state.keywords,
        }
        if(data){
            for(let k in data){
                _data[k]=data[k]
                this.setState({
                    [k]:data[k]
                })
            }
        }
        axios.post(url+"/SmartPillow//web/agent/queryCheckadmin",_data)
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
                  cb&&cb( )
              })
    }

    /**提交搜索 */
    onSearch=( data,cb )=>{
        this.setState({
            keywords:data.keywords
        })
        this.init(data,(data)=>{
            cb&&cb(data)
        })
    }
    /**提交审核 */
    upData=(idAdmin)=>{
         axios.post(url+"SmartPillow/web/agent/updateCheckadmin",{"idAdmin":idAdmin})
              .then((res)=>{
                  console.log(res)
              })
    }
    /**删除审核 */
    deleData=( data, cb )=>{
        console.log(data)
        cb&&cb( )
    }
    /**翻页*/
    emtPage=(e)=>{
        this.setState({
            page:e
        })
        this.init({page:e})
    }

    render(){
            return(
                <div className={"reviewed admin"}>
                        <h3>审核通知</h3>
                        <Search onSearch={this.onSearch} placeholder={"输入账号，姓名搜索"}/>
                        <Reviewed strip={this.state.strip} admins={this.state.admins} upData={this.upData} deleData={this.deleData} emtPage={this.emtPage}/>
                </div>
            )
        }
}