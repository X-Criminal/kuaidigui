import React,{Component}             from "react";
import {Link,Switch,Route}           from "react-router-dom"
import {Input,Select,Button,Icon,DatePicker ,Pagination }   from "antd";


const {RangePicker } = DatePicker;
const Option = Select.Option;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    
    render(){
        let arr=[];
        for(let i =0;i<50;i++){
            arr.push(i)
        }
        return(
            <div className={"details admin"}>
                <h3><Link to={"/equipment"}>快递柜管理</Link> > <span>快递柜详情</span> </h3>
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
                            <td>快递柜名称</td>
                            <td>格子数</td>
                            <td>共享个数</td>
                            <td>独享个数</td>
                            <td>使用数</td>
                            <td>服务费</td>
                            <td>付款方</td>
                            <td>安防地址</td>
                            <td><Link to={"/equipment/details/query"}><i className="iconfont icon-yanjing"></i></Link> </td>
                        </tr>
                    </tbody>
                </table>
                <p>绑定快递员：小明，小草，小萌</p>
                <div className={"cabinet"}>
                    <p><span><i></i>共享</span><span><i></i>独享</span><span><i></i>使用中</span></p>
                    <ul className={"clear-fix"}>
                        {arr.map((item,index)=> <li key={index}><Link to={"/equipment/details/edit"}><h4>{item}</h4></Link></li>)}
                    </ul>
                </div>
                <Switch>
                    <Route path={"/equipment/details/edit"}  render={()=> <Edit/> }/>
                    <Route path={"/equipment/details/query"} render={()=> <DETAILS/>}/>
                </Switch>
            </div>
        )
    }
}


class Edit extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    BACK(){
        window.history.go(-1)
    }
    render(){
        return(
            <div className={"edit"}>
                <div>
                    <h3>设置02号柜子 <Icon type="close" onClick={this.BACK}/></h3>
                    <div>
                        <span>柜子名称：</span>
                        <Input/>
                    </div>
                    <div>
                        <span>服务费：</span>
                        <Input/>
                        <span>元</span>
                    </div>
                    <div>
                        <span>使用方式</span>
                        <Select defaultValue="lucy" style={{ width: 500}} className={"xuanze"}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled">Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                    <div>
                        <span>
                            柜子尺寸
                        </span>
                        <Input placeholder={"宽"}/>
                        <Input placeholder={"高"}/>
                        <Input placeholder={"深"}/>
                        <span>cm</span>
                    </div>
                    <div>
                        <span></span>
                        <Button className={"editBtn"}>
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

        }
    }
    BACK(){
        window.history.go(-1)
    }
    render(){
        return(
            <div className={"details admin details_searchA"}>
                <h3><Link to={"/equipment"}>快递柜管理</Link> > <span style={{cursor: "pointer"}} onClick={this.BACK}>快递柜详情</span>><span>单元门开锁记录</span> </h3>
                <div className={"details_search"}>
                    <span>快递柜名称：保安新村快递柜</span>
                    <span>
                        快递员：
                        <Input />
                    </span>
                    <span>
                        联系电话：
                        <Input />
                    </span>
                    <span>
                        <RangePicker/>
                    </span>
                    <Button type={"primary"}>
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
                        <tr>
                            <td>快递柜名称</td>
                            <td>格子数</td>
                            <td>共享个数</td>
                            <td>独享个数</td>
                            <td>使用数</td>
                       </tr>
                    </tbody>
                </table>
                <Pagination showQuickJumper defaultCurrent={2} size="small"  total={500} />
            </div>
        )
    }
}