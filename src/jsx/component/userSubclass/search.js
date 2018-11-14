import React,{Component} from "react";
import {Input,Button} from "antd";
export default class App extends Component{
        constructor(props){
            super(props)
            this.state={
                    keywords:"",
                    loading:false,
            }
        }
        
    
    search=()=>{
        this.setState({
            loading:true,
        })
        let data ={
             keywords:this.state.keywords
        }
        this.props.onSearch(data,(res)=>{
                this.setState({
                    loading:false
                })
        })
    }

    getKeyWord=(e)=>{
        this.setState({
            keywords:e.target.value
        })
    }
        render(){
            return(
                <div className={'adminSearch clear-fix'}>
                    <span>
                        账号：
                    </span>
                    <Input className={"keyWord"} onChange={this.getKeyWord} />
                    <span>
                        姓名：
                    </span>
                    <Input className={"keyWord"} onChange={this.getKeyWord} />
                    <span>
                        联系电话：
                    </span>
                    <Input className={"keyWord"} onChange={this.getKeyWord} />
                    <Button className={"Adminbtn"} type="primary" loading={this.state.loading} onClick={this.search}>
                       搜索
                    </Button>
                    {this.props.postData?this.props.postData:null}
                </div>
            )
        }

}