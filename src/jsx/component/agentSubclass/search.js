import React,{Component} from "react";
import {Input,Button} from "antd";
import AddAdmin       from "./addAgent" 

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



    /**储存用户输入 */
    getKeyWord=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

        render(){
            return(
                <div className={'adminSearch clear-fix'}>
                    <span>
                        账号：
                    </span>
                    <Input className={"keyWord"} onChange={this.getKeyWord}/>
                    <span>
                        姓名：
                    </span>
                    <Input className={"keyWord"} onChange={this.getKeyWord}/>
                    <span>
                        快递公司：
                    </span>
                    <Input className={"keyWord"} onChange={this.getKeyWord}/>
                    <span>
                        联系方法：
                    </span>
                    <Input className={"keyWord"} onChange={this.getKeyWord}/>
                    <Button className={"Adminbtn"} type="primary" loading={this.state.loading} onClick={this.search}>
                        搜索
                    </Button>
                    <AddAdmin addAdmin={this.props.addAdmin} courier={this.props.courier}/>
                </div>
            )
        }

}