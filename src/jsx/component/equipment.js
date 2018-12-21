import React ,{Component}               from "react";
import axios                            from "axios";
import {Input,Button,message,Icon,Select}    from "antd";
import AddAdmin                         from "./equipmentSubclass/addAdmin" 

import Equipment         from "./equipmentSubclass/adminLis";
let url;
let userDeliverys=[{}];
const Option = Select.Option;
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
            deliveryIds:[],

            isbinding:false,
        }
    }
    componentWillMount(){
        url =  sessionStorage.getItem("url");
    }
    componentDidMount(){
        this.init();
        this.selectDhl( )
    }
    selectDhl=()=>{
        axios.post(url+"/deliveryLockers/wx/expressDeliveryController/selectDhl",{keyword:""})
             .then((res)=>{
                 if(res.data.code===1000){
                     sessionStorage.setItem("selectDhl",JSON.stringify(res.data.data))
                 }else{
                     message.error(res.data.message)
                 }
             })
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
                 if(res.data.code===1000&&res.data.message!=="没有数据"){
                        this.setState({
                            admins:res.data.data,
                            totalItems:res.data.totalItems
                        })
                 }else{
                    this.setState({
                        admins:[],
                        totalItems:0
                    })
                    message.error(res.data.message)
                 }
                 cb&&cb( )
             })
    }

    getName=(e)=>{
        //console.log(e.target.name+":"+e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    search=( )=>{
        this.init( )
    }
    upData=(data,cb)=>{
        // console.log(data)
        // let obj ={};
        // for(let k in data){
        //     if(data[k].length>0){
        //         obj[k] = data[k]
        //     }
        // }
        axios.post(url+"/deliveryLockers/web/deliveryLockerManageController/updateDeliveryLocker",data)
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     this.init( );
                     window.history.go(-1)
                 }else{
                     message.error(res.data.message)
                 }
             })
    }
     /**翻页 */
     emtPage=(e)=>{
        this.setState({
            currPage:e
        })
        this.init({currPage:e})
    }

    deleData=(data,cb)=>{
        axios.post(url+"/deliveryLockers/web/deliveryLockerManageController/delDeliveryLocker",{deliveryId:data})
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     this.init( )
                     message.success(res.data.message);
                 }else{
                     message.error(res.data.message)
                 }
                 cb&&cb( )
             })
    }

    /**选择绑定快递柜 */
    selectedRows=(data)=>{
        this.setState({
            deliveryIds:data
        })
    }
    bindingDeliveryLocker=( data )=>{
        let _arr =[]
        for(let k in data){
            if(data[k]["userId"]){
                _arr.push(data[k])
            }
        }
        axios.post(url+"/deliveryLockers/web/deliveryLockerManageController/bindingDeliveryLocker",{deliveryIds:this.state.deliveryIds,userDeliverys:_arr})
             .then((res)=>{
                 //console.log(res)
                 if(res.data.code===1000){
                    message.success(res.data.message);
                    this.binding( );
                 }
             })
    }

    binding=( )=>{
        this.setState({
            isbinding:!this.state.isbinding
        })
    }
        render(){
            return(
                <div className={"equipment admin"}>
                        <h3>设备管理</h3>
                    <div className={'adminSearch clear-fix'}>
                        <span>
                            设备名称：
                        </span>
                        <Input className={"name"} name={"name"} onChange={this.getName}/>
                        <span>
                            所有区域：
                        </span>
                        <Input style={{width:"250px"}} className={"district"} name={"district"} onChange={this.getName}/>
                        <Button className={"Adminbtn"} type="primary" loading={this.state.loading} onClick={this.search}>
                            查询
                        </Button>
                        <AddAdmin/>
                        <Button type="primary" className={"binding"} disabled={this.state.deliveryIds.length<=0?true:false} onClick={this.binding}>
                            <Icon type="paper-clip" />
                            绑定快递员
                        </Button>
                    </div>
                    <Equipment
                            deleData={this.deleData}
                            upData={this.upData}
                            totalItems={this.state.totalItems}
                            emtPage={this.emtPage}
                            admins={this.state.admins}
                            selectedRows={this.selectedRows}
                            />
                            {
                                this.state.isbinding?<Bangding bindingDeliveryLocker={this.bindingDeliveryLocker} binding={this.binding}/> :null
                            }
                </div>
            )
        }
}


class Bangding extends Component{
    constructor(props){
        super(props)
        this.state={
            queryCourierByDhlId:[],
            index:1,
        }
    }
    componentDidMount(){
        
    }
    getId=(id)=>{
        this.queryCourierByDhlId(id)
    }
    queryCourierByDhlId=(e)=>{
        axios.post(url+"/deliveryLockers/web/deliveryLockerManageController/queryCourierByDhlId",{dhlId:e})
             .then((res)=>{
                if(res.data.code===1000&&res.data.message==="操作成功！"){
                    this.setState({
                        queryCourierByDhlId:res.data.data
                    })
                }else{
                    this.setState({
                        queryCourierByDhlId:[]
                    })
                }
             })
    }
    addS=()=>{
        this.setState({
            index:this.state.index+1
        })
        userDeliverys.push({})
    }
    addBangDing=()=>{
        this.props.bindingDeliveryLocker(userDeliverys)
    }
    render(){
        return(
            <div className={"bangding"}>
                <div>
                    <h4>绑定快递员  <Icon type="close" style={{float:"right","lineHeight":"36px"}} onClick={this.props.binding}/></h4>
                    {
                        userDeliverys.map((item,index)=> <Bangdings key={index} abc={this.state.index} addS={this.addS} index={index}/>)
                    }
                    <Button className={"addBangding"} onClick={this.addBangDing}>
                        确定
                    </Button>
                </div>
            </div>
            )
    }
}

class Bangdings extends Component{
    constructor(props){
        super(props)
        this.state={
            queryCourierByDhlId:[]
        }
    }

    getId=(id)=>{
        this.queryCourierByDhlId(id);
        userDeliverys[this.props.index].dhlId = id
    }
    userId=(id)=>{
        userDeliverys[this.props.index].userId = id
    }
    queryCourierByDhlId=(e)=>{
        axios.post(url+"/deliveryLockers/web/deliveryLockerManageController/queryCourierByDhlId",{dhlId:e})
             .then((res)=>{
                if(res.data.code===1000&&res.data.message==="操作成功！"){
                    this.setState({
                        queryCourierByDhlId:res.data.data
                    })
                }else{
                    this.setState({
                        queryCourierByDhlId:[]
                    })
                }
             })
    }

    render(props){
        return(
            <div className={"clear-fix"}>
                        <span> {this.props.index===0?"快递员：":<span>&nbsp;</span>}</span>
                        <div className={"bangding-Select"}>
                            <Select placeholder={"选择快递公司"} style={{ width: 180}} onChange={this.getId}>
                                {JSON.parse(sessionStorage.getItem("selectDhl")).map((item,index)=><Option key={index} value={item.id}>{item.name}</Option>)}
                            </Select>
                            <Select placeholder={"选择快递员"} style={{ width: 180 }} onChange={this.userId}>
                                {
                                    this.state.queryCourierByDhlId.map((item,index)=><Option key={index} value={item.userId}>{item.name}</Option>)
                                }
                            </Select>
                        </div>
                        {this.props.index===0?<Button onClick={this.props.addS.bind(this,this.props.index)}>
                                                <Icon type="plus" />
                                            </Button>:null} 
                    </div>
        )
    }
}