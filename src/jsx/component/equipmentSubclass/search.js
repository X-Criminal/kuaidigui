import React,{Component} from "react";
import {Input,Button,Select} from "antd";
import AddAdmin       from "./addAdmin" 

const Option = Select.Option;
export default class App extends Component{
        constructor(props){
            super(props)
            this.state={
                    idRole:0,
                    keywords:"",
                    loading:false,
            }
        }
        render(){
            return(
                <div className={'adminSearch clear-fix'}>
                     <span>
                        搜索
                    </span>
                    <Input className={"name"} onChange={this.getKeyWord}/>
                    <span>
                        所有区域
                    </span>
                     <Select
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
                    </Select> 
                    <Button className={"Adminbtn"} type="primary" loading={this.state.loading} onClick={this.search}>
                        查询
                    </Button>
                    <AddAdmin addAdmin={this.props.addAdmin}/>
                </div>
            )
        }

}