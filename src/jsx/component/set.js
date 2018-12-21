import React ,{Component}                    from "react";
import {Select,Checkbox,InputNumber,Button,message}             from "antd";
import axios              from "axios";
const Option = Select.Option;
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            BaseSet:[ ],
            timeLimit:0,
            serviceCharge:0,
            paySide:1,
            id:"",
        }
        this.getTime = this.getTime.bind(this);
        this.getServiceCharge = this.getServiceCharge.bind(this);
        this.getPaySide = this.getPaySide.bind(this);
    }

    componentWillMount(){
     url = sessionStorage.getItem("url");
    }



    componentDidMount(){
            this.querySets( )
    }
    querySets=()=>{
        axios.post(url+"/deliveryLockers/web/setController/querySets")
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     let _data = res.data.data;
                        this.setState({
                            id:_data.id,
                            paySide:_data.paySide,
                            serviceCharge:_data.serviceCharge,
                            timeLimit:_data.timeLimit
                        })
                 }else{
                     message.error(res.data.message)
                 }
             })
    }
    getTime(e){
        this.setState({timeLimit:e})
    }
    getServiceCharge(e){
        this.setState({
            serviceCharge:e
        })
    }
    getPaySide(e){
        this.setState({paySide:e})
    }

    updateOrAddSets=()=>{
        let _data={
            id:this.state.id,
            paySide:this.state.paySide,
            serviceCharge:this.state.serviceCharge,
            timeLimit:this.state.timeLimit,
            type:1
        }
        axios.post(url+"/deliveryLockers/web/setController/updateOrAddSets",_data)
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                    message.success(res.data.message)
                 }else{
                     message.error(res.data.message)
                 }
             })
    }
    render(){
        return(
            <div className={"set admin"}>
                        <h3>设置</h3>
                        <div className={"setBody"}>
                            <div className={"time"}>
                                <span>快递柜取件时限</span>
                                <InputNumber value={this.state.timeLimit} onChange={this.getTime} style={{width:"400px"}}/>
                                <span>&nbsp;&nbsp;小时</span>
                            </div>
                            <div className={"money"}>
                                <span>快递柜服务费</span>
                                <InputNumber value={this.state.serviceCharge} onChange={this.getServiceCharge} style={{width:"400px"}}/>
                                <span>元/次</span>
                            </div>
                            <div className={"role"}>
                                <span>快递柜付款方</span>
                                <Select style={{ width: 400 }} value={this.state.paySide} onChange={this.getPaySide}>
                                        <Option value={1}>取件方</Option>
                                        <Option value={2}>存件方</Option>
                                </Select>
                            </div>
                            <div className={"_state clear-fix"}>
                                <span>消息通知方式</span>
                                <div>
                                    <h4>
                                        发快递
                                    </h4>
                                        <div className={"_stateIndex"}>
                                            <span>已保存：</span>
                                            <Checkbox name={"xiaoming"} onChange={this.xiaoming}>短信</Checkbox>
                                            <Checkbox>系统消息</Checkbox>
                                        </div>
                                        <div className={"_stateIndex"}>
                                            <span>代付款：</span>
                                            <Checkbox>短信</Checkbox>
                                             <Checkbox>系统消息</Checkbox>
                                        </div>
                                        <div className={"_stateIndex"}>
                                            <span>待寄件：</span>
                                            <Checkbox>短信</Checkbox>
                                            <Checkbox>系统消息</Checkbox>
                                        </div>
                                        <div className={"_stateIndex"}>
                                            <span>待定价：</span>
                                            <Checkbox>短信</Checkbox>
                                            <Checkbox>系统消息</Checkbox>
                                        </div>
                                        <div className={"_stateIndex"}>
                                            <span>待付运费：</span>
                                            <Checkbox>短信</Checkbox>
                                            <Checkbox>系统消息</Checkbox>
                                        </div>
                                        <div className={"_stateIndex"}>
                                            <span>待揽件：</span>
                                            <Checkbox>短信</Checkbox>
                                            <Checkbox>系统消息</Checkbox>
                                        </div>
                                        <div className={"_stateIndex"}>
                                            <span>已揽件：</span>
                                            <Checkbox>短信</Checkbox>
                                            <Checkbox>系统消息</Checkbox>
                                        </div>
                                        <div className={"_stateIndex"}>
                                            <span>已发件：</span>
                                            <Checkbox>短信</Checkbox>
                                            <Checkbox>系统消息</Checkbox>
                                        </div>
                                        <div className={"_stateIndex"}>
                                            <span>已取消：</span>
                                            <Checkbox>短信</Checkbox>
                                            <Checkbox>系统消息</Checkbox>
                                        </div>
                                    <h4>
                                        存快递
                                    </h4>
                                    <div className={"_stateIndex"}>
                                        <span>已存件：</span>
                                        <Checkbox>短信</Checkbox>
                                         <Checkbox>系统消息</Checkbox>
                                    </div>
                                    <div className={"_stateIndex"}>
                                            <span>已取件：</span>
                                            <Checkbox>短信</Checkbox>
                                            <Checkbox>系统消息</Checkbox>
                                    </div>
                                    <div className={"_stateIndex"}>
                                        <span>已取消：</span>
                                        <Checkbox>短信</Checkbox>
                                        <Checkbox>系统消息</Checkbox>
                                    </div>
                                </div>
                            </div>
                            <div> 
                                <span></span>
                                <Button style={{backgroundColor:"rgb(74,114,226)","color":"#fff"}} onClick={this.updateOrAddSets}>确定</Button>
                            </div>
                </div>
            </div>
        )
    }
}