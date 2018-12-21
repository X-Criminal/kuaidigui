import React ,{Component} from "react";
import {message}          from "antd"
import Search             from "./orderSubclass/orderSearch";
import OrderLis           from "./orderSubclass/agentLis";
import axios from "axios"
import "../../css/order.css";
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            currPage:1,
            admins:[],
            name:"",
            totalItems:0,
        }
    }
    componentWillMount(){
        url=sessionStorage.getItem("url")
    }
    componentDidMount(){
        this.init()
    }

    onchange=( e )=>{
        this.setState({
            name:e.target.value
        })
    }

    init=(data)=>{
        let _data = {
            size:6,
            name:this.state.name,
            currPage:this.state.currPage
        }
        for(let i in data){
            _data[i] = data[i]
        }
        axios.post(url+"/deliveryLockers/web/dhlManageController/qeuryDhlList",_data)
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     this.setState({
                        admins:res.data.data,
                        totalItems:res.data.totalItems
                     })
                 }else{
                    message.error(res.data.message)
                 }
             })
    }

    upData=( )=>{
        this.init( )
    }
    emtPage=(e)=>{
        this.setState({
            currPage:e
        })
    }
    onPage=(e)=>{
        this.setState({
            currPage:e
        })
        this.init({ currPage:e})
    }
        render(){
            return(
                <div className={"order admin"}>
                         <h3>快递公司管理</h3>
                         <Search onSearch={this.onSearch} upData={this.upData} onchange={this.onchange}/>
                         <OrderLis strip={this.state.totalItems} onPage={this.onPage} emtPage={this.emtPage} admins={this.state.admins} upData={this.upData}/>
                </div>
            )
        }
}           