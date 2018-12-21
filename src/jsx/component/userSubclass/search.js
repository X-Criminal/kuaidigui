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
        this.props.onSearch({},(res)=>{
                this.setState({
                    loading:false
                })
        })
    }

    getKeyWord=(e)=>{
        this.props.onchange(e)
        // this.setState({
        //     keywords:e.target.value
        // })
    }
        render(){
            return(
                <div className={'adminSearch clear-fix'}>
                    <span>
                        账号：
                    </span>
                    <Input className={"keyWord"} name={"id"} onChange={this.getKeyWord} />
                    <span>
                        姓名：
                    </span>
                    <Input className={"keyWord"} name={"name"} onChange={this.getKeyWord} />
                    <span>
                        联系电话：
                    </span>
                    <Input className={"keyWord"} name={"phone"} onChange={this.getKeyWord} />
                    <Button className={"Adminbtn"} type="primary" loading={this.state.loading} onClick={this.search}>
                       搜索
                    </Button>
                    {this.props.postData?this.props.postData:null}
                </div>
            )
        }

}