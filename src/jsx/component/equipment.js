import React ,{Component} from "react";
import axios              from "axios";
import Select            from "./share/SelectFile"

import Search            from "./userSubclass/search";
import Equipment         from "./equipmentSubclass/adminLis";
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            page:1,
            keywords:"",
        }
    }
    componentWillMount(){
        url =  sessionStorage.getItem("url");
        this.init()
    }
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
        axios.post(url+"SmartPillow/web/admin/getAdminAndRole",_data)
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
    /**搜索 */
    onSearch=(e,cb)=>{
        this.setState({
            keywords:e
        })
        this.init(e,()=>{
            cb&&cb( )
        })
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
                <div className={"equipment admin"}>
                        <h3>设备管理</h3>
                        <Search onSearch={this.onSearch} 
                                postData={<Select url={"SmartPillow/web/equipment/importEqupment"}/>}/>
                        <Equipment strip={this.state.strip} emtPage={this.emtPage} admins={this.state.admins}/>
                </div>
            )
        }
}