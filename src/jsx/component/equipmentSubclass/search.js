import React,{Component} from "react";
import {Input,Button} from "antd";
import Region         from "../share/region";
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
        
/**搜索省市区 */
    onRegion=(a,txt)=>{
         this.setState({
             [a]:txt
            })
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
            keywords:e.target.value
        })
    }
        render(){
            return(
                <div className={'adminSearch clear-fix'}>
                    <span>
                        搜索
                    </span>
                     {/* <Select
                    showSearch
                    style={{width: 150, marginLeft: 10}}
                    optionFilterProp="children"
                    placeholder={'全部'}
                    onChange={this.handleChange}
                    allowClear={true}
                    name={"Aid"}
                    className={"getroleName"}
                    >
                       <Option key={1} value={1}>平台中心</Option>
                       <Option key={2} value={2}>城市合伙人</Option>
                       <Option key={3} value={3}>推客</Option>
                       <Option key={4} value={4}>创客</Option>
                       <Option key={5} value={5}>投资人</Option>
                       <Option key={6} value={6}>酒店</Option>
                    </Select> */}
                    <span>
                        地区
                    </span>
                    <Region onRegion={this.onRegion}/>
                    <span>
                        搜索
                    </span>
                    <Input className={"keyWord"} onChange={this.getKeyWord} placeholder={"搜索关键字(账号或姓名)"}/>
                    <Button className={"Adminbtn"} type="primary" loading={this.state.loading} onClick={this.search}>
                        查询
                    </Button>
                    <AddAdmin addAdmin={this.props.addAdmin}/>
                </div>
            )
        }

}