import React ,{Component} from "react";
import Search             from "./userSubclass/search";
import OrderLis           from "./orderSubclass/agentLis";
import axios              from "axios";
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
        url = sessionStorage.getItem("url")
    }
    componentDidMount(){
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
    axios.post(url+"/SmartPillow/web/wxorder/getOrderList",_data)
          .then((res)=>{
              if(res.data.code===1000&&res.data.data){
                    this.setState({
                        strip:res.data.data.strip,
                       admins:res.data.data.wxorders
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

     /**查询 */
     onSearch=( data,cb )=>{
        this.init(data,()=>{
            cb&&cb( )
        })
    }
    emtPage=(e)=>{
        this.setState({
            page:e
        })
        this.init({page:e})
    }
        render(){
            return(
                <div className={"order admin"}>
                         <h3>订单管理</h3>
                         <Search onSearch={this.onSearch} placeholder={"订单编号或者设备编号"}/>
                         <OrderLis strip={this.state.strip} emtPage={this.emtPage} admins={this.state.admins}/>
                </div>
            )
        }
}           