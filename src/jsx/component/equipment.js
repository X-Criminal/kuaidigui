import React ,{Component}               from "react";
import axios                            from "axios";
import {Input,Select,Button,message}    from "antd";
import AddAdmin                         from "./equipmentSubclass/addAdmin" 

import Equipment         from "./equipmentSubclass/adminLis";
const Option = Select.Option;
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,

            admins:[],
            currPage:1,
            district:"",
            name:"",

            totalItems:0,
        }
    }
    componentWillMount(){
        url =  sessionStorage.getItem("url");
    }
    componentDidMount(){
        this.init()
    }
    init=(data,cb )=>{
        let _data ={
            size:6,
            currPage:this.state.currPage,
            name:this.state.name,
            district:this.state.district,
        }
        for(let k in data){
            _data[k] = data[k]
        }
        axios.post(url+"/deliveryLockers/web/deliveryLockerManageController/queryDeliveryLockerVO2List",_data)
             .then((res)=>{
                 if(res.data.code===1000){
                        this.setState({
                            admins:res.data.data,
                            totalItems:res.data.totalItems
                        })
                 }else{
                    message.error(res.data.message)
                 }
                 cb&&cb( )
             })
    }

    getName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }

    search=( )=>{

    }

     /**翻页 */
     emtPage=(e)=>{
        this.setState({
            page:e
        })
        this.init({page:e})
    }
        render(){
            return(
                <div className={"equipment admin"}>
                        <h3>设备管理</h3>
                    <div className={'adminSearch clear-fix'}>
                        <span>
                            搜索
                        </span>
                        <Input className={"name"} onChange={this.getName}/>
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
                        <AddAdmin/>
                    </div>
                    <Equipment totalItems={this.state.totalItems} emtPage={this.emtPage} admins={this.state.admins}/>
                </div>
            )
        }
}