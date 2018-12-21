import React from "react";
import {Select} from "antd";
import axios from "axios";

const Option = Select.Option;
let url;
export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            ProvinceByAll:[],
            ProvinceId:"",
            CityAll:[],
            CityId:"",
            AreaAll:[],
            Area:"",
        }
    }
    componentWillMount(){
            url = sessionStorage.getItem("url")
    }
    componentDidMount() {
        //组件第一次render时执行
       this.setState({
           ProvinceByAll:JSON.parse(sessionStorage.getItem("ProvinceByAll"))
       })
    }

    handleChange1 = (value) => {
            this.setState({
                ProvinceId:value
            })
            this.getCityByParentid(value)
    };
    handleChange2 = (value) => {
        this.getAreaByParentid(value)
    }
    getCityByParentid(id){
        axios.post(url+"/deliveryLockers/wx/CountryController/getCityByParentid",{parentid:id})
             .then((res)=>{
                 if(res.data.code===1000){
                        this.setState({
                            CityAll:res.data.data
                        })
                 }
             })
    }
    getAreaByParentid(id){
        axios.post(url+"/deliveryLockers/wx/CountryController/getAreaByParentid",{parentid:id})
        .then((res)=>{
            if(res.data.code===1000){
                   this.setState({
                        AreaAll:res.data.data
                   })
            }
        })
    }
    handleChange3=(id)=>{
        this.props.onGetArea(id)
    }

    render(){
        return(
            <div className={"region"}>
                 <Select
                    showSearch
                    style={{width: 110, marginLeft: 10}}
                    optionFilterProp="children"
                    onChange={this.handleChange1}
                    placeholder={"省"}
                    allowClear={true}
                    name={"sheng"}
                >
                    {
                        this.state.ProvinceByAll.map((item,index)=> <Option key={index} value={item.id}>{item.name}</Option>)
                    }
                </Select>
                <Select
                    showSearch
                    style={{width: 110, marginLeft: 10}}
                    placeholder="市"
                    optionFilterProp="children"
                    onChange={this.handleChange2}
                    allowClear={true}
                >
                        {
                       this.state.CityAll.map((item,index)=> <Option key={index} value={item.id}>{item.name}</Option>) 
                        }
                </Select>
                <Select
                    showSearch
                    style={{width: 110, marginLeft: 10}}
                    placeholder="区"
                    optionFilterProp="children"
                    onChange={this.handleChange3}
                    allowClear={true}
                >
                    {
                        this.state.AreaAll.map((item,index)=><Option key={index} value={item.id}>{item.name}</Option> )
                    }
                </Select>
            </div>
        )
    }

}