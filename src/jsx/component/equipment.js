import React ,{Component} from "react";
//import axios              from "axios";

import Search            from "./equipmentSubclass/search";
import Equipment         from "./equipmentSubclass/adminLis";
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            admins:[{"key":1}],
            page:1,
            keywords:"",
        }
    }
    componentWillMount(){
        url =  sessionStorage.getItem("url");
        
    }

    /**搜索 */
    onSearch=(e,cb)=>{
        this.setState({
            keywords:url
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
                        <Search onSearch={this.onSearch} />
                        <Equipment strip={this.state.strip} emtPage={this.emtPage} admins={this.state.admins}/>
                </div>
            )
        }
}