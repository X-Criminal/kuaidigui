import React,{Component} from "react";
import {Input,Button} from "antd";
import AddAdmin       from "./addAgent" 

export default class App extends Component{
        constructor(props){
            super(props)
            this.state={
            }
        }
    /**储存用户输入 */
    getKeyWord=(e)=>{
        this.props.getKeyWord(e)
    }
        render(){
            return(
                <div className={'adminSearch clear-fix'}>
                    <span>
                        账号：
                    </span>
                    <Input className={"keyWord"} name={"id"} onChange={this.getKeyWord}/>
                    <span>
                        姓名：
                    </span>
                    <Input className={"keyWord"} name={"name"} onChange={this.getKeyWord}/>
                    <span>
                        快递公司：
                    </span>
                    <Input className={"keyWord"} name={"dname"} onChange={this.getKeyWord}/>
                    <span>
                        联系方式：
                    </span>
                    <Input className={"keyWord"} name={"phone"} onChange={this.getKeyWord}/>
                    <Button className={"Adminbtn"} type="primary" loading={this.state.loading} onClick={this.props.onSearch}>
                        搜索
                    </Button>
                    <AddAdmin addAdmin={this.props.addAdmin} courier={this.props.courier}/>
                </div>
            )
        }

}