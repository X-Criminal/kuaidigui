import React,{Component}                     from "react";
import {Button,Icon,Select,Checkbox,message}                  from "antd";
import axios from "axios";
const CheckboxGroup = Checkbox.Group;

const Option = Select.Option;
let url,id;
export default class App extends Component{
        constructor(props){
            super(props)
            this.state={
                getCityByParentid:[],
                getAreaByParentid:[],
                user:{userCouriers:{}},
                plainOptions:[],
                defa:[],
                T_province:"",
                T_city:"",
                T_area:"",
            }
        }
        componentWillMount(){
            url = sessionStorage.getItem("url");
            id=window.location.hash.split("agent/edit")[1];
        }
        componentDidMount(){
            this.init( );
            this.getPlainOptions( );
        }

        BACK=()=>{
            window.history.back(-1)
        }
        getPlainOptions=()=>{
            let arr =[];
            let option = JSON.parse(sessionStorage.getItem("selectDhl"));
            for(let i = 0;i<option.length;i++){
                arr.push({label:option[i].name,value:option[i].id})
            }
            this.setState({
                plainOptions:arr,
            })
        }

        getParentid=(e,type)=>{
           
            this.setState({
                province:e,
                T_province:type.props.children,
            })
            if(typeof e !=="undefined") this.getCityByParentid(e);
         }
         /**市 */
         getCityByParentid=(id)=>{
             axios.post(url+"/deliveryLockers/wx/CountryController/getCityByParentid",{parentid:id})
                  .then((res)=>{
                      if(res.data.code===1000){
                            this.setState({
                                getCityByParentid:res.data.data,
                            })
                      }
                  })
         }

         getGradeid=(e,type)=>{
            this.setState({
               city:e,
               T_city:type.props.children
            })
          this.getAreaByParentid(e)
        }
        /**区 */
        getAreaByParentid=(id)=>{
            axios.post(url+"/deliveryLockers/wx/CountryController/getAreaByParentid",{"parentid":id})
                 .then((res)=>{
                       if(res.data.code===1000){
                           this.setState({
                               getAreaByParentid:res.data.data
                           })
                       }
                 })
        }
        getArea=(e,type)=>{
            this.setState({
                area:e,
                T_area:type.props.children
            })
         }
         init=()=>{
              axios.post(url+"/deliveryLockers/web/webTUserController/getUserCustom3ById",{id:id})
                 .then((res)=>{
                     if(res.data.code===1000&&res.data.message==="操作成功！"){
                         let arr =[];
                         for(let i=0;i<res.data.data.userCouriers.length;i++){
                             arr.push(res.data.data.userCouriers[i].id)
                         }
                        this.setState({
                            user:res.data.data,
                            defa:arr
                        })
                     }
                 })
         }
         onDefa=( e )=>{
            this.setState({
                defa:e
            })
         }
         upData=()=>{
             let data={
                area:this.state.T_area,
                city:this.state.T_city,
                province:this.state.T_province,
                id:id,
                dhlId:this.state.defa
             }
            axios.post(url+"/deliveryLockers/web/webTUserController/chengeUser",data)
                 .then((res)=>{
                     if(res.data.code===1000&&res.data.message.indexOf("操作成功")>-1){
                            window.history.go(-1);
                            message.success(res.data.message);
                            this.props.onSearch( );
                     }else{
                        message.error(res.data.message)
                     }
                 })
         }
          
        render(){
            return(
                <div className={"edit"}>
                      <h3><span onClick={this.BACK}>快递员管理</span>>修改快递员  <Icon type={"export"} onClick={this.BACK}/></h3>
                      <div className={"editBody"}>
                            <div>
                                <span>账号：</span>
                                <input disabled value={this.state.user.id||""} />
                            </div>
                            <div>
                                <span>姓名：</span>
                                <input disabled value={this.state.user.name||""}/>
                            </div>
                            <div>
                                <span>联系电话：</span>
                                <input disabled value={this.state.user.phone||""}/>
                            </div>
                            <div className={"kdgs clear-fix"}>
                                <span>快递公司：</span>
                                <CheckboxGroup options={this.state.plainOptions} value={this.state.defa} onChange={this.onDefa}/>
                            </div>
                            <div>
                                <span>所属区域：</span>
                                 <Select
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder="省"
                                    onChange={this.getParentid}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {JSON.parse(sessionStorage.getItem("ProvinceByAll")).map((item,index)=><Option key={index} value={item.id}>{item.name}</Option> )}
                                </Select>
                                <Select
                                    showSearch
                                    onChange={this.getGradeid}
                                    style={{ width: 150 }}
                                    placeholder="市"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {this.state.getCityByParentid.map((item,index)=><Option key={index} value={item.id}>{item.name}</Option> )}
                                </Select>
                                <Select
                                    showSearch
                                    onChange={this.getArea}
                                    style={{ width: 150 }}
                                    placeholder="区"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {this.state.getAreaByParentid.map((item,index)=><Option key={index} value={item.id}>{item.name}</Option> )}
                                </Select>
                            </div>
                            <div className={"editBtn"}>
                                <span></span>
                                <Button type="primary" onClick={this.upData}>
                                    保存
                                </Button>
                            </div>
                      </div>
                </div>
            )
        }

}