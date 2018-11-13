import React,{Component} from "react";
import {Input,Button,Radio} from "antd";
import {Link}               from "react-router-dom";
import Region         from "../../share/region";
import AddAdmin       from "./addAgent" ;
const RadioGroup = Radio.Group;
export default class App extends Component{
        constructor(props){
            super(props)
            this.state={
                    p:"",
                    c:"",
                    a:"",
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
                let _data=this.props.params;
            return(
                <div className={'adminSearch clear-fix'}>
                    <RadioGroup  defaultValue={(+_data.type)}>
                        <Link  to={`/AgentHotel/{"idAdmin":"${_data.idAdmin}","type":"1"}`}><Radio value={1}>酒店列表</Radio></Link>
                        <Link  to={`/AgentRole/{"idAdmin":"${_data.idAdmin}","type":"2"}`}> <Radio value={2}>角色列表</Radio></Link>
                    </RadioGroup>
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
                    <AddAdmin addAdmin={this.props.addAdmin} idAdmin={_data.idAdmin}/>
                </div>
            )
        }

}