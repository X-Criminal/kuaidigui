import React from "react";
import SelectFile from "../share/SelectFile";

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={

       }
    }
    goBack=()=>{
        window.history.go(-1)
    }
    
    render(){
        return(
            <div className={"HotelData admin"}>
                <h3><span onClick={this.goBack}>酒店管理</span>>酒店详情</h3>
                <div className={"titleANDadd"}>
                    <h4> 大酒店</h4> 
                    <div ><SelectFile idHotel={this.props.idHotel} url={this.props.url}/></div>
                </div> 
            </div>
        )
    }
}