import React,{Component}                from "react";
import {Table,Pagination,Tooltip,Button,message,Input}        from "antd";
import {Link,Switch,Route}    from "react-router-dom";
import axios from "axios";

const {Column} =Table;
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            upData:[],
            adminId:"",

            onEdit:{length:0},
            onDeleteAdmin:"",
        }
    }


    componentWillMount(){
        url = sessionStorage.getItem("url")
    }

/**修改 */
    onEdit=(data)=>{
        this.setState({
            onEdit:data
        })
    }
/**删除 */
    onDeleteAdmin=(data)=>{
       let isdel = window.confirm("此操作将永久删除该条目，是否继续？");
       if(!isdel) return false;
       axios.post(url+"/deliveryLockers/web/dhlManageController/delDhl",{id:data.id})
            .then((res)=>{
                if(res.data.code===1000&&res.data.message==="操作成功！"){
                    this.props.upData( )
                    message.success(res.data.message)
                }else{
                    message.error(res.data.message)
                }
                
            })
    }
    
    render(){
        let data = this.props.admins;
        for(let i = 0;i<data.length;i++){
            data[i].index = i+1;
        }
        return(
            <div className={"AdminLis"}>
                    <Table dataSource={this.props.admins} pagination={false} rowKey={"index"}>
                        <Column
                        title="序号"
                        dataIndex="index"
                        key="index"
                        />
                        <Column
                        title="快递公司名称"
                        dataIndex="name"
                        key="name"
                        />
                        <Column
                        title="服务电话"
                        dataIndex="serviceCall"
                        key="serviceCall"
                        />
                         <Column
                        title="操作（修改/删除）"
                      //dataIndex="dhlCoding"
                        key="dhlCoding"
                        render={(res)=>{
                            return(
                                <div>
                                    <Tooltip placement="bottom" title={"编辑"}>
                                        <Button onClick={this.onEdit.bind(this,res)}>
                                            <Link to={"/order/edit"} className={"deleBtn"}>
                                                <i className="iconfont icon-bianji"></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"删除"}>
                                        <Button onClick={this.onDeleteAdmin.bind(this,res)}>
                                                <i className="iconfont icon-recyclebin"></i>
                                        </Button>
                                    </Tooltip>
                                </div>
                            )
                        }}
                        />
                </Table>
                    <div  className={"page"}>
                        <span>共{this.props.strip}条</span>
                        <Pagination defaultCurrent={1} total={this.props.strip} defaultPageSize={6} onChange={this.props.onPage}/>
                    </div>
                    <Switch>
                        <Route path={"/order/edit"} render={()=> <Add onEdit={this.state.onEdit} upData={this.props.upData}/>}/>
                    </Switch>
            </div>
        )
    }
}


class Add extends Component{
    constructor(props){
        super(props)
        this.state={
            SelectDhlAll:[],
            dhlCoding:"",
            logo:"",
            name:"",
            serviceCall:"",
        }
    }
    componentDidMount(){
        console.log(this.props.onEdit)
        if(this.props.onEdit.length<=0) window.history.go(-1);
    }

    // getSelectDhl=()=>{
    //     axios.post(url+"/deliveryLockers/wx/expressDeliveryController/selectDhl")
    //          .then((res)=>{
    //              if(res.data.code===1000){
    //                 this.setState({
    //                     SelectDhlAll:res.data.data
    //                 })
    //              }
    //          })
    // }


    serviceCall=(e)=>{
        this.setState({
            serviceCall:e.target.value
        })
    }
    addDhl=()=>{
        let _data = {
            id:this.props.onEdit.id,
            dhlCoding:this.props.onEdit.dhlCoding,
            logo:this.props.onEdit.logo,
            name:this.props.onEdit.name,
            serviceCall:this.state.serviceCall,
        }
        axios.post(url+"/deliveryLockers/web/dhlManageController/updateDhl",_data)
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                    window.history.go(-1)
                    this.props.upData( );
                    message.success(res.data.message)
                 }else{
                     message.error(res.data.message)
                 }
             })
    }
    render(){
        return(
            <div className={"orderAdd admin"}>
                  <h3><Link to={"/order"}>快递公司管理</Link>><span>修改</span></h3>
                  <div className={"orderAddBody"}>
                    <div>
                        <span>
                            快递柜名称：
                        </span>
                        <Input name={"serviceCall"} disabled={true} value={this.props.onEdit.name}/>
                    </div>
                    <div>
                        <span>
                            服务电话：
                        </span>
                        <Input name={"serviceCall"} onChange={this.serviceCall}/>
                    </div>
                    <div>
                        <span>
                            
                        </span>
                        <Button onClick={this.addDhl}>提交</Button>
                    </div>
                  </div>
            </div>
        )
    }
}