import React ,{Component} from "react";
import axios              from "axios";

import One     from "./setSubclass/setOne";
import Two     from "./setSubclass/setTwo";
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            BaseSet:[ ]
        }
    }

    componentDidMount(){
        url = sessionStorage.getItem("url");
        this.queryBaseSet( )
    }

    queryBaseSet=( )=>{
        let arr=[]
        axios.get(url+"SmartPillow/web/baseset/queryBaseSet")
             .then((res)=>{
                 if(res.data.code===1000){
                        arr.push(res.data.data)
                        this.setState({
                            BaseSet:arr
                        })
                 }else{
                        arr=[]
                 }
                 
             })
    }

    /**其他设置修改 */
    enData=(data,cb)=>{
        axios.post(url+"SmartPillow/web/baseset/updateBaseSet",data)
             .then((res)=>{
                 if(res.data.code===1000){
                     this.queryBaseSet( )
                 }else{
                     alert(res.data.message)
                 }
             })
        cb&&cb( )
    }

        render(){
            return(
                <div className={"set admin"}>
                        <h3>设置</h3>
                        <One />
                        <Two BaseSet={this.state.BaseSet} enData={this.enData}/>
                </div>
            )
        }
}