import React,{Component} from "react";
import {Input,Button} from "antd";
import AddAdmin       from "./addAdmin" 

//const Option = Select.Option;
export default class App extends Component{
        constructor(props){
            super(props)
            this.state={
                    loading:false,
                    account:"",
                    nameL:"",
                    phone:"",
            }
        }
        
    
    search=()=>{
        this.setState({
            loading:true,
        })
        let data ={
            account:this.state.account,
            name:this.state.name,
            phone:this.state.phone
        }
        this.props.onSearch(data,(res)=>{
                this.setState({
                    loading:false
                })
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
                        <Input className={"keyWord"} name={"account"} onChange={this.getKeyWord}/>
                    <span>
                        姓名
                    </span>
                        <Input className={"keyWord"} name={"name"} onChange={this.getKeyWord}/>
                    <span>
                        联系电话
                    </span>
                        <Input className={"keyWord"} name={"phone"} onChange={this.getKeyWord}/>
                    <Button className={"Adminbtn"} type="primary" loading={this.state.loading} onClick={this.search}>
                        查询
                    </Button>
                    <AddAdmin addAdmin={this.props.addAdmin}/>
                </div>
            )
        }
}