import React ,{Component}                         from "react";
import {Input,Button,Table,Tooltip,message,Select}               from "antd";
import axios from "axios";
import {Link,Switch,Route}                                     from "react-router-dom"
import moment from "moment";
const { Column } = Table;
let url;
const Option = Select.Option;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            Lis:[],

            currPage:1,
            name:"",
            phone:"",
            type:"",
        }
    }

    componentWillMount(){
        url = sessionStorage.getItem("url")
    }

    componentDidMount(){
        this.dispose( )
    }

    dispose=(data )=>{
        let _data={
            size:5,
            currPage:this.state.currPage,
            name:this.state.name,
            phone:this.state.phone,
            type:this.state.type,
        }
        for(let k in data){
            _data[k] = data[k]
        }
        axios.post(url+"/deliveryLockers/web/feedbackController/selectFeedbackVOList",_data)
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     this.setState({
                        Lis:res.data.data,
                        totalItems:res.data.totalItems,
                     })
                 }else{
                    this.setState({
                        Lis:[],
                        totalItems:0,
                     })
                    message.error(res.data.message)
                 }
             })
    }
    onPage=(e)=>{
        this.setState({
            currPage:e
        });
        this.dispose({
            currPage:e
        })
    }
    getData=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    getType=(e)=>{
        this.setState({
            type:e
        })
    }
    search=( )=>{
        this.dispose( )
    }

        render(){
            if(sessionStorage.getItem("isDispose")){ sessionStorage.removeItem("isDispose");this.dispose( );}
            let data =this.state.Lis;
                for(let i = 0;i<data.length;i++){
                     data[i].index = i+1;
                }
            return(
                <div className={"admin bill feedback"}>
                       <h3>反馈信息</h3>
                       <div className={"search"}>
                            <span>反馈人</span>
                            <Input name={"name"} onChange={this.getData}/>
                            <span>反馈人类型</span>
                            <Select style={{ width: 180 }} onChange={this.getType}>
                                    <Option value={""}>全部</Option>
                                    <Option value={1}>用户</Option>
                                    <Option value={2}>快递员</Option>
                            </Select>
                            <span>联系电话</span>
                            <Input name={"phone"} onChange={this.getData}/>
                            <Button type="primary" onClick={this.search}> 
                                搜索
                            </Button>
                       </div>
                       <Table 
                       dataSource={data} 
                       className={"bill-table"} 
                       rowKey={"id"}
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
                            title="反馈人"
                            key="userName"
                            dataIndex="userName"
                            />
                             <Column
                            title="反馈类型"
                            key="tType"
                            dataIndex="tType"
                            render={(res)=>{
                                return <span>{res===1?"用户":res===2?"快递员":"-"} </span>
                            }}
                            />
                            <Column
                            title="联系电话"
                            key="phone"
                            dataIndex="phone"
                            />
                            <Column
                            title="信息内容"
                            key="content"
                            dataIndex="content"
                            />
                            <Column
                            title="状态"
                            key="tStatus"
                            dataIndex="tStatus"
                            render={(res)=>{
                                return <span>{res===0?"未处理":res===1?"已处理":"-"} </span>
                            }}
                            />
                            <Column
                            title="处理时间"
                            key="processTime"
                            dataIndex="processTime"
                            render={(res)=>{
                               return <span> {res?moment(parseInt(res)).format("YYYY-MM-DD HH:mm:ss"):"-"}</span>
                            }}
                            />
                            <Column
                            title="操作（详情）"
                            key="id"
                            //dataIndex="id"
                            render={(res)=>{
                                return(
                                    <Tooltip placement="bottom" title={"详情"}>
                                        <Button style={{border:"none","background":"rgba(0,0,0,0)"}}>
                                            <Link to={"/feedback/details"+JSON.stringify({id:res.id,type:res.tStatus})} style={{color:"#1890ff"}}>
                                                <i className="iconfont icon-zhangdan"></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                )
                            }}
                            />
                        </Table>
                        <Switch>
                            <Route path={"/feedback/details:data"} render={() => <Details />} />
                        </Switch>
                </div>
            )
        }
}


let _id;
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
        _id = JSON.parse(window.unescape(window.location.hash.split("/details")[1]));
        console.log(_id)
       // _id = this.props.match.params.data;
    }

    componentDidMount(){
        this.selectFeedbackVODetails( )
    }

    selectFeedbackVODetails=( )=>{
        axios.post(url+"/deliveryLockers/web/feedbackController/selectFeedbackVODetails",{id:_id.id})
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     this.setState({
                        userData:res.data.data
                     })
                 }
             })
    }

    consentRoDisagree=( )=>{
        axios.post(url+"/deliveryLockers/web/feedbackController/dispose",{id:_id.id})
             .then((res)=>{
                 console.log(res)
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                    sessionStorage.setItem("isDispose",true)
                    window.history.go(-1);
                    message.success(res.data.message);
                 }else{
                    message.error(res.data.message);
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
                <h3><Link to={"/feedback"}>反馈信息</Link>>详情</h3>
                <div className={"ad_body"}>
                        <div className={"txt"}>
                            <span>反馈人：</span>
                            <span>{data.userName}</span>
                        </div>
                        <div className={"txt"}>
                            <span>联系电话：</span>
                            <span>{data.phone}</span>
                        </div>
                        <div className={"txt"}>
                            <span>反馈人类型：</span>
                            <span>{data.tType===1?"用户":data.tType===2?"快递员":"-"}</span>
                        </div>
                        <div className={"txt"}>
                            <span>信息内容：</span>
                            <span>{data.content}</span>
                        </div>
                        <div className={"txt imgBox"}>
                            <span>反馈图片：</span>
                            <span>{data.pics?data.pics.map((item,index)=> <img src={url+"/"+item} alt={"userData"} onClick={this.enlarge} key={index}/> ):null}</span>
                        </div>
                        <div className={"AdBtn txt"}>
                              <span></span>
                              {
                                  _id.type===0?
                                  <Button type={"primary"} onClick={this.consentRoDisagree}>
                                    处理
                                  </Button>:
                                  <Button type={"primary"} disabled={true}>
                                    已处理
                                  </Button>
                              }
                              
                        </div>
                    </div>
                    {this.state.isMax?<div className={"enlarge"} onClick={this.onlarge}>
                    <img src={this.state.maxImg} alt={"userData"} />
                </div>:null}
            </div>
        )
    }
}