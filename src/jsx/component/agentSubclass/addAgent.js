import React from "react";
import {Button,Icon,Select} from "antd";
import { Route, Switch, Link} from 'react-router-dom';
import axios from "axios";
let url;
const Option = Select.Option;
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url")
    }
    enData=( data ,cb)=>{
        this.props.addAdmin(data,(res)=>{
            cb&&cb()
        })
    }

    render(){
        return(
            <div className={"addAdmin"} style={{"float":"right"}}>
                    <Button type="primary" disabled={this.props.courier.length<=0?true:false}>
                        <Link to={"/agent/binding"}>
                            <i className="iconfont icon-bangding" style={{transform:"rotate(-45deg)"}}></i>
                            &nbsp;
                            绑定快递柜
                        </Link>
                    </Button>
                <Switch>
                    <Route  path="/agent/binding"  render={ ()=> <AddAmin enData={this.enData}/>}/>
                </Switch>
            </div>
        )

    }
}

class AddAmin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            index:[""],
            text:[[]]
        }
    }
    addEq=()=>{
        let index = this.state.index;
        let text = this.state.text;
        index.push("");
        text.push([])
        this.setState({
            index:index,
            text:text
        })
    }
    onSearch(e,type){
        axios.post(url+"/deliveryLockers/web/webDeliveryLockerController/getByDeliveryLockerVO2List",{keyword:type})
             .then((res)=>{
                 if(res.data.code===1000){
                    let text = this.state.text;
                    text[e] = res.data.data;
                    this.setState({
                        text:text
                    })
                 }
             })
    }
    onSelect(index,type){
        let index_ = this.state.index;
        index_[index]=type
        this.setState({
            index:index_
        })
    }
    postData=()=>{
        this.props.enData( this.state.index )
    }
        render(){
            return(
                <div className={"bindingBox"}>
                        <div>
                              <h3>绑定快递柜 <Link to={"/agent"}><Icon type={"close"}/></Link></h3>
                              <div className={"bindingData"}>
                                {this.state.index.map((item,index)=>
                                    <div key={index}>
                                        <span>
                                            快递柜:
                                        </span>
                                        <Select
                                                onSearch={this.onSearch.bind(this,index)}
                                                onSelect={this.onSelect.bind(this,index)}
                                                showSearch
                                                style={{ width: 230 }}
                                                filterOption={false}
                                                notFoundContent={null}
                                            >
                                                {/* <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="tom">Tom</Option> */}
                                                {
                                                    this.state.text[index].map((item,index)=><Option key={index} value={item.id}>{item.name}</Option>)
                                                }
                                        </Select>
                                        {
                                           index===0?<Button onClick={this.addEq} icon={"plus"} type={"primary"}></Button>:null
                                        }
                                </div>)}
                                   <div className={"adminDataBtn"} key={10}>
                                        <span>
                                        </span>
                                        <Button type={"primary"} loading={this.state.loading} onClick={this.postData}>
                                             确定
                                        </Button>
                                   </div>
                              </div>
                        </div>
                </div>
            )
        }
}