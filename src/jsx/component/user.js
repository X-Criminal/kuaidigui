import React ,{Component} from "react";
import axios              from "axios";
import Search             from "./userSubclass/search";
import UserLis            from "./userSubclass/agentLis";
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
                page:1,
                keyword:"",
                strip:0,
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
        axios.post(url+"/SmartPillow//web/user/getUserListBykeyword",_data)
              .then((res)=>{
                  if(res.data.code===1000&&res.data.data){
                        this.setState({
                            strip:res.data.data.strip,
                           admins:res.data.data.wxusers
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
    /**翻页 */
    emtPage=(e)=>{
        this.setState({
            page:e
        })
        this.init({page:e})
    }
        render(){
            return(
                <div className={"user admin"}>
                       <h3>用户管理</h3>
                       <Search onSearch={this.onSearch}/>
                       <UserLis strip={this.state.strip} emtPage={this.emtPage} admins={this.state.admins}/>
                </div>
            )
        }
}