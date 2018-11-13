import React,{Component} from "react";
import {Input,Button} from "antd";
import AddAdmin       from "./addAdmin" 

//const Option = Select.Option;
export default class App extends Component{
        constructor(props){
            super(props)
            this.state={
                    p:"",
                    c:"",
                    a:"",
                    idRole:0,
                    keywords:"",
                    loading:false,
            }
        }
        
    
    search=()=>{
        this.setState({
            loading:true,
        })
        let data ={
            condition:this.state.p+this.state.c+this.state.a,
               idRole:this.state.idRole,
             keywords:this.state.keywords
        }
        this.props.onSearch(data,(res)=>{
                this.setState({
                    loading:false
                })
        })
    }

    handleChange=(e)=>{
            this.setState({
                idRole:e||0
            })
    }
    getKeyWord=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
        render(){
            return(
                <div className={'adminSearch clear-fix'}>
                    <span>
                        账号
                    </span>
                        <Input className={"keyWord"} onChange={this.getKeyWord}/>
                    <span>
                        姓名
                    </span>
                        <Input className={"keyWord"} onChange={this.getKeyWord}/>
                    <span>
                        联系电话
                    </span>
                        <Input className={"keyWord"} onChange={this.getKeyWord}/>
                    <Button className={"Adminbtn"} type="primary" loading={this.state.loading} onClick={this.search}>
                        查询
                    </Button>
                    <AddAdmin addAdmin={this.props.addAdmin}/>
                </div>
            )
        }
}