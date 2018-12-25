import React,{Component}                                            from "react";
import {Link,Switch,Route}                                          from "react-router-dom";
import {Input,Select,Button,Icon,DatePicker ,Pagination,message }   from "antd";
import axios from "axios"
import moment from "moment"

const {RangePicker } = DatePicker;
const Option = Select.Option;
let url,id;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            queryDeliveryLockerDetails:{dhlAndUser:[]},
            cabinetList:[],
        }
    }
        componentWillMount(){
            id = this.props.match.params.data;
            url= sessionStorage.getItem("url")
        }
        componentDidMount(){
            this.queryDeliveryLockerDetails()
        }

    queryDeliveryLockerDetails=()=>{
        axios.post(url+"/deliveryLockers/web/deliveryLockerManageController/queryDeliveryLockerDetails",{deliveryId:id})
             .then((res)=>{
                 if(res.data.message==="操作成功！"&&res.data.code===1000){
                    this.setState({
                        queryDeliveryLockerDetails:res.data.data,
                        cabinetList:res.data.data.cabinetList,
                     })
                 }else{
                     message.error(res.data.message)
                 }
             })
    }
    addCabinet=( )=>{
        this.queryDeliveryLockerDetails( )
    }
    render(){
        let arr=[];
        for(let i =0;i<50;i++){
            arr.push(i)
        }
        let _data = this.state.queryDeliveryLockerDetails;
        if(!_data.dhlAndUser) _data.dhlAndUser=[];
        let _cabinetList = this.state.cabinetList||[];
        return(
            <div className={"details admin getHeight"}>
                <h3><Link to={"/equipment"}>设备管理</Link> > <span>快递柜详情</span> </h3>
                <table>
                    <thead>
                        <tr>
                            <td>快递柜名称</td>
                            <td>格子数</td>
                            <td>共享个数</td>
                            <td>独享个数</td>
                            <td>使用数</td>
                            <td>服务费</td>
                            <td>付款方</td>
                            <td>安防地址</td>
                            <td>单元门开锁记录</td>
                        </tr>
                    </thead>     
                    <tbody>
                        <tr>
                            <td>{_data.name}</td>
                            <td>{_data.gridNumber}</td>
                            <td>{_data.shareNumber}</td>
                            <td>{_data.inprocNumber}</td>
                            <td>{_data.useNumber}</td>
                            <td>{_data.serviceCharge}</td>
                            <td>{_data.payer===1?"存件方":_data.payer===2?"取件方":"-"}</td>
                            <td>{_data.layAddreass}</td>
                            <td><Link to={"/equipment/details"+id+"/query"}><i className="iconfont icon-yanjing"></i></Link> </td>
                        </tr>
                    </tbody>
                </table>
                <p>绑定快递员：{_data.dhlAndUser.map((item,index)=><span key={index}>{item}，</span>)}</p>
                <div className={"cabinet"}>
                    <p><span><i></i>共享</span><span><i></i>独享</span><span><i></i>使用中</span></p>
                    <ul className={"clear-fix"}>
                        {/*arr.map((item,index)=>
                             <li key={index}>
                                <Link to={"/equipment/details"+id+"/aedit"+(index+1)} key={index}>
                                    {
                                        _cabinetList.map((a,b)=> a.id===item+1?
                                        <div className={a.useStatus===2?"shiyong":a.useWay===1?"gongxiang":a.useWay===2?"duxiang":"-"} key={b}>
                                            <h4>{item+1}</h4>
                                            <p>寄存费:{a.serviceCharge}元</p>
                                            <p>{a.width+"wX"+a.high+"hX"+a.length+"d cm"}</p>
                                        </div>
                                        : null)
                                    }
                                 </Link>   
                        </li>) */}
                        {
                            _cabinetList.map((item,index)=> 
                            <li key = {index}>
                                <Link to={"/equipment/details"+id+"/aedit"+JSON.stringify({name:item.name,serviceCharge:item.serviceCharge,useWay:item.useWay,width:item.width,height:item.high,length:item.length,id:item.id})}>
                                    <div className={item.useStatus===2?"shiyong":item.useWay===1?"gongxiang":item.useWay===2?"duxiang":"-"}>
                                        <h4>{item.name}</h4>
                                        <p>服务费:{item.serviceCharge}元</p>
                                        <p>{item.width+"wX"+item.high+"hX"+item.length+"cm"}</p>
                                    </div>
                                </Link>
                            </li>)
                        }
                    </ul>
                </div>
                <Switch>
                    <Route path={"/equipment/details"+id+"/aedit:data"}      render={()=> <Edit addCabinet={this.addCabinet} _cabinetList={_cabinetList}/>}/>
                    <Route path={"/equipment/details"+id+"/query"}           render={()=> <DETAILS/>}/>
                </Switch>
            </div>
        )
    }
}


class Edit extends Component{
    constructor(props){
        super(props)
        this.state={
            high:"",
            _length:"",
            name:"",
            useWay:"",
            width:"",
            serviceCharge:"",

            dataId:"",
            arr:[],
        }
    }
    componentWillMount(){
        this.setState({
            dataId:JSON.parse(window.decodeURIComponent(window.location.hash.split("/aedit")[1])),
        })
    }
    componentDidMount(){
       
    }

    BACK(){
        window.history.go(-1)
    }
    addCabinet=( )=>{
            let data = {
                deliveryId:id,
                id:this.state.dataId.id,
                high:this.state.high,
                length:this.state._length,
                name:this.state.name.length<=0?this.state.dataId.name:this.state.name,
                useWay:this.state.useWay,
                width:this.state.width,
                serviceCharge:this.state.serviceCharge
            }
            axios.post(url+"/deliveryLockers/web/deliveryLockerManageController/updateCabinet",data)
                 .then((res)=>{
                     if(res.data.code===1000&&res.data.message==="操作成功！"){
                        this.props.addCabinet( )
                        window.history.go(-1)
                        message.success(res.data.message)
                     }else{
                         message.error(res.data.message)
                     }
                 })
    }
    onchange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    useWay=(e)=>{
        this.setState({
            useWay:e
        })
    }
    render(){
        let userData = this.state.dataId;
        return(
            <div className={"edit getHeight"}>
                <div>
                    <h3>{this.state.dataId.name}<Icon type="close" onClick={this.BACK}/></h3>
                    <div>
                        <span>柜子名称：</span>
                        <Input name={"name"} onChange={this.onchange} placeholder={userData.name}/>
                    </div>
                    <div>
                        <span>服务费：</span>
                        <Input name={"serviceCharge"} onChange={this.onchange} placeholder={userData.serviceCharge}/>
                        <span>元</span>
                    </div>
                    <div>
                        <span>使用方式</span>
                        <Select style={{ width: 500}} className={"xuanze"} name={"useWay"} placeholder={userData.useWay===1?"共享":userData.useWay===2?"独享":"--"} onChange={this.useWay}>
                            <Option value={1}>共享</Option>
                            <Option value={2}>独享</Option>
                        </Select>
                    </div>
                    <div>
                        <span>
                            柜子尺寸
                        </span>
                        <Input placeholder={userData.width}  name={"width"}    onChange={this.onchange}/>
                        <Input placeholder={userData.height} name={"high"}     onChange={this.onchange}/>
                        <Input placeholder={userData.length} name={"_length"}  onChange={this.onchange}/>
                        <span>cm</span>
                    </div>
                    <div>
                        <span></span>
                        <Button className={"editBtn"} onClick={this.addCabinet}>
                            确定
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

class DETAILS extends Component{
    constructor(props){
        super(props)
        this.state={
            currPage:1,
            name:"",
            deliveryId:"",
            phone:"",
            timeMin:"",
            timeMax:"",

            Lis:[]
        }
    }
    componentDidMount(){
        this.queryUnlockingRecordList( )
    }
    BACK(){
        window.history.go(-1)
    }

    Picker=(e,b)=>{
        this.setState({
            timeMin:b[0],
            timeMax:b[1]
        })
    }
    onchange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    queryUnlockingRecordList=(data)=>{
        let _data={
            size:6,
            currPage:this.state.currPage,
            deliveryId:id,
            name:this.state.name,
            phone:this.state.phone,
            timeMax:this.state.timeMax,
            timeMin:this.state.timeMin
        }
        if(data){
            for(let k in data){
                _data[k] = data[k]
            }
        }
        axios.post(url+"/deliveryLockers/web/deliveryLockerManageController/queryUnlockingRecordList",_data)
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

    onsearch=()=>{
        this.queryUnlockingRecordList( )
    }
    onPage=(page)=>{
        this.setState({
            currPage:page
        })
        this.queryUnlockingRecordList({currPage:page})
    }

    render(){
        return(
            <div className={"details admin details_searchA"}>
                <h3><Link to={"/equipment"}>设备管理</Link> > <span style={{cursor: "pointer"}} onClick={this.BACK}>快递柜详情</span>><span>单元门开锁记录</span> </h3>
                <div className={"details_search"}>
                    <span>快递柜名称：保安新村快递柜</span>
                    <span>
                        快递员：
                        <Input name={"name"} onChange={this.onchange}/>
                    </span>
                    <span>
                        联系电话：
                        <Input name={"phone"} onChange={this.onchange}/>
                    </span> 
                    <span>
                        <RangePicker onChange={this.Picker}/>
                    </span>
                    <Button type={"primary"} onClick={this.onsearch}>
                        搜索
                    </Button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>快递员</td>
                            <td>联系电话</td>
                            <td>所属快递公司</td>
                            <td>开锁时间</td>
                        </tr>
                    </thead>     
                    <tbody>
                       {
                           this.state.Lis.map((item,index)=> 
                           <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.userName}</td>
                                <td>{item.phone}</td>
                                <td>{item.dhlname}</td>
                                <td>{moment(item.createtime).format("YYYY-MM-DD")}</td>
                           </tr>)
                       }
                    </tbody>
                </table>
                <Pagination showQuickJumper defaultPageSize={6} size="small" total={this.state.totalItems} onChange={this.onPage}/>
            </div>
        )
    }
}