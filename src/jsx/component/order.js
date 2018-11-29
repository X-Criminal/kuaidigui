import React ,{Component} from "react";
import Search             from "./orderSubclass/orderSearch";
import OrderLis           from "./orderSubclass/agentLis";
import "../../css/order.css"
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            page:1,
            keywords:"",
        }
    }
    componentWillMount(){
       
    }
    componentDidMount(){
        
    }
        render(){
            return(
                <div className={"order admin"}>
                         <h3>快递公司管理</h3>
                         <Search onSearch={this.onSearch} placeholder={"订单编号或者设备编号"}/>
                         <OrderLis strip={this.state.strip} emtPage={this.emtPage} admins={this.state.admins}/>
                </div>
            )
        }
}           