import React,{Component}   from "react";
import {Checkbox,Icon,Select,Button,message}   from "antd";
import axios from "axios";
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            options:[],
            City:[],
            Area:[],

            provinceL:"",
            city:"",
            area:"",
            dhlIds:[],
        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url");
        if(this.props.userID.length<=0) window.history.go(-1);
    }
    componentDidMount(){
        this.selectDhl()
    }
    selectDhl=()=>{
        axios.post(url+"/deliveryLockers/wx/expressDeliveryController/selectDhl")
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     let data =res.data.data;
                     let options = [];
                     for(let i =0;i<data.length;i++){
                        options.push({label:data[i].name,value:data[i].id})
                     }
                     this.setState({
                        options:options
                     })
                 }
             })
    }
    Province=(e,b)=>{
        axios.post(url+"/deliveryLockers/wx/CountryController/getCityByParentid",{parentid:e})
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                    this.setState({
                        provinceL:b.props.name,
                        City:res.data.data
                    })
                 }else{
                     this.setState({
                         City:[]
                     })
                 }
             })
    }
    area=(e,b)=>{
        axios.post(url+"/deliveryLockers/wx/CountryController/getAreaByParentid",{parentid:e})
             .then((res)=>{
                if(res.data.code===1000&&res.data.message==="操作成功！"){
                    this.setState({
                        city:b.props.name,
                        Area:res.data.data
                    })
                 }else{
                     this.setState({
                        Area:[]
                     })
                 }
             })
    }
    getArea=(a,b)=>{
        this.setState({
            area:b.props.name
        })
    }

    getDhlIds=( data )=>{
        this.setState({
            dhlIds:data
        })
    }
    go_1=()=>{
        window.history.go(-1)
    }

    getUserData=()=>{
        let _data ={
            province:this.state.provinceL,
            city:this.state.city,
            area:this.state.area,
            dhlIds:this.state.dhlIds,
            id:this.props.userID,
        }
        axios.post(url+"/deliveryLockers/web/webTUserController/setIdentity",_data)
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                         window.history.go(-1)
                         message.success(res.data.message)
                 }else{
                         message.error(res.data.message)
                 }
                
             })
    }

    render( ){
      return(
          <div className={"change"}>
                <div>
                    <h3>设为快递员 <Icon onClick={this.go_1} type="close" style={{float:"right","lineHeight":"32px"}}/></h3>
                    <div className={"clear-fix"}>
                        <span>快递公司：</span>
                        <div>
                            <CheckboxGroup onChange={this.getDhlIds} options={this.state.options}/>
                        </div>
                    </div>
                    <div className={"clear-fix"}>
                        <span>所属区域：</span>
                        <div> <Select
                                    showSearch
                                    style={{ width: 120 }}
                                    placeholder="省"
                                    onChange={this.Province}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                {
                                    JSON.parse(sessionStorage.getItem("ProvinceByAll")).map((item,index)=><Option key={index} name={item.name} value={item.id}>{item.name}</Option>)
                                }
                                </Select>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Select
                                    showSearch
                                    style={{ width: 120 }}
                                    placeholder="市"
                                    onChange={this.area}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                {
                                    this.state.City.map((item,index)=><Option key={index} name={item.name} value={item.id}>{item.name}</Option>)
                                }
                                </Select>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Select
                                    showSearch
                                    onChange={this.getArea}
                                    style={{ width: 120 }}
                                    placeholder="区"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                {
                                    this.state.Area.map((item,index)=><Option key={index} value={item.id} name={item.name}>{item.name}</Option>)
                                }
                                </Select>
                                
                                </div>
                                <div className={"clear-fix"}>
                                        <span> &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <Button type="primary" onClick={this.getUserData}>确定</Button>
                                </div>
                    </div>
                </div>
          </div>
      )
    }

}