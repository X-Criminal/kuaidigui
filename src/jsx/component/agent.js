import React ,{Component} from "react"
//import axios             from "axios";
import Search            from "./agentSubclass/search";
import AgentLis          from "./agentSubclass/agentLis";
//let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
                page:1,
                idRole:0,
                keywords:"",
                condition:"",
                courier:[],
                admins:[{key:1,"序号":"序号","账号":"账号","姓名":"姓名","联系电话":"联系电话","快递公司":"快递公司","所属区域":"所属区域","状态":"状态"}],
        }
    }
    componentDidMount(){
        //url = sessionStorage.getItem("url");
        this.init()
    }

      /**初始化 */
      init=(data,cb)=>{
        let _data={
            numberPage:8,
            page:this.state.page,
            condition:this.state.condition,
            idRole:this.state.idRole,
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
        // axios.post(url+"SmartPillow/web/agent/getAgentList",_data)
        //       .then((res)=>{
        //           if(res.data.code===1000&&res.data.data){
        //                 this.setState({
        //                     strip:res.data.data.strip,
        //                    admins:res.data.data.admins
        //                 })
        //           }else{
        //             this.setState({
        //                 strip:0,
        //                admins:[ ]
        //             })
        //           }
        //           cb&&cb( )
        //       })
    }
    /**添加 */
    addAdmin=(data,cb)=>{

    }
    /**查询 */
    onSearch=(data,cb)=>{

    }
    /**绑定快递柜 */
    rowSelection=(data)=>{
        this.setState({
            courier:data
        })
    }
     /**删除 */
    deleData=( e ,cb)=>{

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
                <div className={"agent admin"}>
                        <h3>代理商管理</h3>
                        <Search courier={this.state.courier} addAdmin={this.addAdmin} onSearch={this.onSearch}/>
                        <AgentLis strip={this.state.strip} admins={this.state.admins} rowSelection={this.rowSelection} deleData={this.deleData} emtPage={this.emtPage}/>
                </div>
            )
        }
}