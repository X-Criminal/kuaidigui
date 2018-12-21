import React ,{Component} from "react";
import axios              from "axios";
import Search             from "./userSubclass/search";
import UserLis            from "./userSubclass/agentLis";
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            admins:[{key:1,}],
            strip:0,
            currPage:1,
            id:"",
            name:"",
            phone:"",
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
            size:6,
            currPage:this.state.currPage,
            name:this.state.name,
            phone:this.state.phone,
            id:this.state.id,
        }
        if(data){
            for(let k in data){
                _data[k]=data[k]
                this.setState({
                    [k]:data[k]
                })
            }
        }
        axios.post(url+"/deliveryLockers/web/webTUserController/getUserCustomByParams",_data)
              .then((res)=>{
                  if(res.data.code===1000&&res.data.data){
                        this.setState({
                            strip:res.data.totalItems,
                           admins:res.data.data
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

    onchange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    /**查询 */
    onSearch=( data,cb )=>{
        this.init(null,()=>{
            cb&&cb( )
        })
    }
    /**翻页 */
    emtPage=(e)=>{
        this.setState({
            currPage:e
        })
        this.init({currPage:e})
    }
        render(){
            return(
                <div className={"user admin"}>
                       <h3>用户管理</h3>
                       <Search onSearch={this.onSearch}  onchange={this.onchange}/>
                       <UserLis strip={this.state.strip} emtPage={this.emtPage} admins={this.state.admins}/>
                </div>
            )
        }
}