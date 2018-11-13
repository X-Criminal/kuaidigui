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
                        搜索
                    </span>
                    <Input className={"keyWord"} onChange={this.getKeyWord} placeholder={this.props.placeholder?this.props.placeholder:"输入关键字搜索"}/>
                    <Button className={"Adminbtn"} type="primary" loading={this.state.loading} onClick={this.search}>
                        查询
                    </Button>
                    {this.props.postData?this.props.postData:null}
                </div>
            )
        }

}