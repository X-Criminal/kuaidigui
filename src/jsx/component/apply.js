import React ,{Component}                         from "react";
import {Input,Button,Table,Tooltip,message,Select}               from "antd";
import {Link,Switch,Route}                        from "react-router-dom";
import axios from "axios"
import "../../css/apply.css";
const { Column } = Table;
const Option = Select.Option;
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            Lis:[],
            currPage:1,
            dhlId:"",
            name:"",
            phone:"",

            selectDhls:[],
        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url")
    }

    componentDidMount(){
        this.init( )
        this.selectDhl( )
    }

    selectDhl=()=>{
        axios.post(url+"/deliveryLockers/wx/expressDeliveryController/selectDhl",{keyword:""})
             .then((res)=>{
                if(res.data.code===1000&&res.data.message==="操作成功！"){
                    this.setState({
                        selectDhls:res.data.data
                    })
                }else{
                    message.error(res.data.message)
                }
             })
    }

    init=(data)=>{
        let _data={
            size:5,
            currPage:this.state.currPage,
            dhlId:this.state.dhlId,
            name:this.state.name,
            phone:this.state.phone
        }
        for(let i in data){
            _data[i]= data[i]
        }
        axios.post(url+"/deliveryLockers/web/applicantCourierController/selectApplicantCourierVOList",_data)
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     this.setState({
                        Lis:res.data.data,
                        totalItems:res.data.totalItems
                     })
                 }else{
                     message.error(res.data.message)
                 }
             })
    }
    onPage=(e)=>{
        this.setState({
            currPage:e
        })
        this.init({
            currPage:e
        })
    }
    serach=()=>{
        this.init( )
    }

    select=(e)=>{
        this.setState({
            dhlId:e
        })
    }
    getData=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
        render(){
            let data = this.state.Lis;
            for(let i = 0 ;i<data.length;i++){
                data[i].index = i+1;
            }
            return(
                <div className={"admin bill apply"}>
                       <h3>快递员申请</h3>
                       <div className={"search"}>
                            <span>姓名</span>
                            <Input name={"name"} onChange={this.getData}/>
                            <span>快递公司</span>
                            <Select
                                    onChange={this.select}
                                    showSearch
                                    style={{ width: 200 }}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {this.state.selectDhls.map((item,index)=><Option key={index} value={item.id}>{item.name}</Option> )}
                                </Select>
                            <span>联系方式</span>
                            <Input name={"phone"} onChange={this.getData}/>
                            <Button type="primary" onClick={this.serach}> 
                                搜索
                            </Button>
                       </div>
                       <Table 
                       dataSource={data} 
                       rowKey={"index"}
                       className={"bill-table"}
                       pagination={{
                        defaultPageSize:5,
                        total:this.state.totalItems,
                        onChange:this.onPage
                       }}
                       >
                            <Column
                            title="序号"
                            key="index"
                            dataIndex="index"
                            />
                            <Column
                            title="账号"
                            key="userId"
                            dataIndex="userId"
                            />
                             <Column
                            title="昵称"
                            key="nickname"
                            dataIndex="nickname"
                            />
                            <Column
                            title="姓名"
                            key="name"
                            dataIndex="name"
                            />
                            <Column
                            title="联系电话"
                            key="phone"
                            dataIndex="phone"
                            />
                            <Column
                            title="身份证号"
                            key="idNumber"
                            dataIndex="idNumber"
                            />
                            <Column
                            title="快递公司"
                            key="dhlNames"
                            dataIndex="dhlNames"
                            />
                            <Column
                            title="操作（详情）"
                            key="id"
                           // dataIndex="id"
                            render={(res)=>{
                                return(
                                    <Tooltip placement="bottom" title={"详情"}>
                                        <Link to={"/apply/details"+JSON.stringify({id:res.id,userId:res.userId}) }>
                                            <Button style={{border:"none",color:"#1890ff"}}>
                                                <i className="iconfont icon-zhangdan"></i>
                                            </Button>
                                        </Link>
                                    </Tooltip>
                                )
                            }}
                            />
                        </Table>
                        <Switch>
                            <Route path={"/apply/details:data"}  component={Details}/>
                        </Switch>
                </div>
            )
        }
}
let _id;
let userId;
class Details extends Component{
    constructor(props){
        super(props)
        this.state={
                userData:{},
                maxImg:"",
                isMax:false,
        }
    }
    componentWillMount(){
        _id = JSON.parse(this.props.match.params.data).id;
        userId=JSON.parse(this.props.match.params.data).userId;
    }
    componentDidMount(){
        this.applicantCourierVODetails( )
    }
    applicantCourierVODetails=()=>{
        axios.post(url+"/deliveryLockers/web/applicantCourierController/applicantCourierVODetails",{id:_id})
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     this.setState({
                        userData:res.data.data
                     })
                 }else{
                     message.error(res.data.message)
                 }
             })
    }

    consentRoDisagree=(type)=>{
        axios.post(url+"/deliveryLockers/web/applicantCourierController/consentRoDisagree",{id:_id,type:type,userId:userId})
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     window.history.go(-1)
                     message.success(res.data.message)
                 }else{
                    message.error(res.data.message)
                 }
             })
    }
    enlarge=(e)=>{
        this.setState({
            maxImg:e.target.src,
            isMax:true,
        })
    }
    onlarge=(e)=>{
        this.setState({
            maxImg:"",
            isMax:false,
        })
    }

    render(){
        let data = this.state.userData;
        return(
            <div className={"apply bill bill-details ad"}>
                <h3><Link to={"/apply"}>快递员申请</Link>>详情</h3>
                <div className={"ad_body"}>
                        <div className={"txt"}>
                            <span>账号：</span>
                            <span>{data.userId}</span>
                        </div>
                        <div className={"txt"}>
                            <span>昵称：</span>
                            <span>{data.nickname}</span>
                        </div>
                        <div className={"txt"}>
                            <span>姓名：</span>
                            <span>{data.name}</span>
                        </div>
                        <div className={"txt"}>
                            <span>联系电话：</span>
                            <span>{data.phone}</span>
                        </div>
                        <div className={"txt"}>
                            <span>快递公司：</span>
                            <span>{data.dhlNames}</span>
                        </div>
                        <div className={"Check clear-fix"}>
                             <span>身份证号：</span>
                             <span>{data.idNumber}</span>
                        </div>
                        <div className={"Check clear-fix add img"}>
                             <span>身份证：</span>
                             <span style={{width:"auto"}}>
                                <img src={url+data.frontPic} alt="身份证" onClick={this.enlarge}/>&nbsp;&nbsp;&nbsp;&nbsp; 
                                <img src={url+data.reversePic} alt="身份证" onClick={this.enlarge}/>
                            </span>
                        </div>
                        <div className={"AdBtn txt"}>
                              <span></span>
                              <Button onClick={this.consentRoDisagree.bind(this,2)}>
                                  不同意
                              </Button>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <Button type={"primary"} onClick={this.consentRoDisagree.bind(this,1)}>
                                  同意
                              </Button>
                        </div>
                    </div>
                    {this.state.isMax?<div className={"enlarge"} onClick={this.onlarge}>
                    <img src={this.state.maxImg} alt={"userData"} />
                    </div>:null}
            </div>
        )
    }
}