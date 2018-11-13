import React ,{Component}           from "react";
import {Table,Button,Icon,InputNumber}               from "antd";
import {Link,Switch,Route}                       from "react-router-dom"
const {Column} =Table
export default class App extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    enData=( data, cb )=>{
        this.props.enData(data,()=>{
            cb&&cb( )
        })
    }
    render(){
        return(
            <div className={"setTwo"}>
                <h4>其他设置</h4>
                <Table pagination={false} dataSource={this.props.BaseSet} rowKey={"idBase"}>
                    <Column 
                        title="按摩金额(元)"
                        key="massage"
                        dataIndex="massage"
                    />
                    <Column 
                        title="睡眠检测金额(元)"
                        key="sleep"
                        dataIndex="sleep"
                    />
                    <Column 
                        title="按摩时长(分)"
                        key="massagetime"
                        dataIndex="massagetime"
                    />
                    <Column 
                        title="睡眠时长(时)"
                        key="sleeptime"
                        dataIndex="sleeptime"
                    />
                    <Column 
                        title="提现税率"
                        key="taxrate"
                        render={(txt)=>{
                            return(
                                <span>{(txt.taxrate*100)+"%"}</span>
                            )
                        }}
                    />
                    <Column 
                        title="操作"
                        key="idBase"
                        render={(res)=>{
                            return(
                                <Link to={"/set/upData"}>
                                    <Button>
                                            编辑
                                    </Button>
                                </Link>
                            )
                        }}
                    />
                </Table>
                <Switch>
                    <Route path={"/set/upData"} render={()=> <UpdateAdmin BaseSet={this.props.BaseSet[0]} enData={this.enData}/>}/>
                </Switch>
            </div>
        )
    }
}

/**修改 */
class UpdateAdmin extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            massage:"",
            massagetime:"",
            sleep:"",
            sleeptime:"",
            taxrate:"",
        }
    }
    onmMssage=(e)=>{
        this.setState({
            massage:e
        })
    }
    onMassagetime=(e)=>{
        this.setState({
            massagetime:e
        })
    }
    onSleep=(e)=>{
        this.setState({
            sleep:e
        })
    }
    onSleeptime=(e)=>{
        this.setState({
            sleeptime:e
        })
    }
    onTaxrate = (e)=>{
        this.setState({
            taxrate:e/100
        })
    }


    postData=( )=>{
        this.setState({
            loading:true,
        })
        let data={
            idBase:this.props.BaseSet.idBase,
            massage:this.state.massage,
            massagetime:this.state.massagetime,
            sleep:this.state.sleep,
            sleeptime:this.state.sleeptime,
            taxrate:this.state.taxrate,
        }
        this.props.enData(data,(data)=>{
            this.setState({
                loading:false
            })
            window.location.href="/#/set"
        })
    }
        render(){
            let updata= this.props.BaseSet;
            if(!updata){
                window.location.href="/#/set";
                return null;
            }else{
                return(
                    <div className={"addAdminBox"}>
                            <div>
                                  <h3>编辑管理员 <Link to={"/set"}><Icon type={"close"}/></Link></h3>
                                  <div className={"addAdminData"}>
                                       <div key={1}>
                                           <span>
                                               按摩金额(元)
                                           </span>
                                           <InputNumber name={"massage"} onChange={this.onmMssage} placeholder={updata.massage} />
                                       </div>
                                       <div key={2}>
                                           <span>
                                               按摩时长(分)
                                           </span>
                                           <InputNumber name={"massagetime"} onChange={this.onMassagetime}  placeholder={updata.massagetime}/>
                                       </div>
                                       <div key={3}>
                                           <span>
                                               睡眠检测金额(元)
                                           </span>
                                           <InputNumber name={"sleep"} onChange={this.onSleep} placeholder={updata.sleep}/>
                                       </div>
                                       <div key={4}>
                                           <span>
                                               睡眠检测时间(时)
                                           </span>
                                           <InputNumber name={"sleeptime"} onChange={this.onSleeptime} placeholder={updata.sleeptime}/>
                                       </div>
                                       <div key={5}>
                                           <span>
                                               提现税率(%)
                                           </span>
                                           {/* <Input name={"taxrate"} onChange={this.onTaxrate} placeholder={updata.taxrate}/> */}
                                           <InputNumber
                                                defaultValue={updata.taxrate*100}
                                                min={0}
                                                max={100}
                                                formatter={value => `${value}%`}
                                                parser={value => value.replace('%', '')}
                                                onChange={this.onTaxrate}
                                                />
                                       </div>
                                       <div className={"adminDataBtn"} key={10}>
                                            <Button>
                                                <Link to={"/set"}>
                                                    取消
                                                </Link>
                                            </Button>
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
}