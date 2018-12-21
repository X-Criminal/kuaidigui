import React,{Component}                from "react"
import {Table,Button,Pagination,Tooltip }        from "antd"
import {Route, Switch, Link}            from 'react-router-dom';
import Edit                             from "./edit";
import Dele                             from "../share/dele"
import UpDetails                        from "./upDetalis";
const {Column} =Table
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            upData:[],
            adminId:"",
            rowSelection:[],
        }
    }
    /**保存修改 */
    onUpdateAdmin(data){
        this.setState({
            upData:data
        })
    }
    /**保存删除 */
    onDeleteAdmin(adminId){
       this.setState({
            adminId:adminId
       })
    }
    /**提交修改数据 */
    enData=(data,cb )=>{
        this.props.upData(data,()=>{
            cb&&cb()
        })
    }
    /**判断删除 */
    DeleBox=(e)=>{
        if(e==="cancel"){
                window.location.href="/#/agent"
        }else if(e==="sure" ){
            this.props.deleData(this.state.adminId,()=>{
                window.location.href="/#/agent"
            })
        }
    }
    /**翻页 */
    onPage=(e)=>{
        this.props.emtPage(e)
    }
    rowSelection=(a,b)=>{
        this.props.rowSelection(a)
    }
    render(){
        let data
        if(this.props.admins){
             data = this.props.admins;
            for(let i = 0;i<data.length;i++){
                data[i].index=i+1;
                data[i].id2 = data[i].id+"@@@@@";
            }
        }else{
            data = [];
        }
       
        return(
            <div className={"AdminLis"}>
                    <Table 
                        rowKey="id2"
                        dataSource={data} 
                        bordered
                        pagination={false}
                        rowSelection={{onChange:this.rowSelection}}
                       
                        >
                        <Column
                        title="序号"
                        dataIndex="index"
                        key="index"
                        /> 
                        <Column
                        title="账号"
                        dataIndex="id"
                        key="id"
                        />
                        <Column
                        title="姓名"
                        dataIndex="name"
                        key="name"
                        />
                        <Column
                        title="联系电话"
                        dataIndex="phone"
                        key="phone"
                        />
                        <Column
                        title="快递公司"
                        dataIndex="userCouriers"
                        key="userCouriers"
                        render={(res)=>{
                            if(res){
                               return res.map((item,index)=> item?<p style={{marginBottom:"0"}} key={index} id={item.id}>{item.name}</p>:null)
                            }
                        }}
                        />
                        <Column
                        title="所属区域"
                        dataIndex="address"
                        key="address"
                        />
                        <Column
                        title="状态"
                        dataIndex="tStatus"
                        key="tStatus"
                        render={(res)=>{
                            return res===0?<span>正常</span>:res===1?<span style={{color:"red"}}>冻结</span>:"-"
                        }}
                        />
                        <Column
                        title="操作"
                        key="操作"
                        render={(text) => {
                            return(
                                <div>
                                      <Tooltip placement="bottom" title={"详情"}>
                                        <Button onClick={this.onUpdateAdmin.bind(this,text)}>
                                            <Link to={"/agent/Details"+text.id}>
                                                <i className="iconfont icon-zhangdan" style={{color:"#1fa0ff"}}></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"编辑"}>
                                        <Button onClick={this.onUpdateAdmin.bind(this,text.id)}>
                                            <Link to={"/agent/edit"+text.id} className={"deleBtn"}>
                                                <i className="iconfont icon-bianji"></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"删除"}>
                                        <Button onClick={this.onDeleteAdmin.bind(this,text.id)}>
                                            <Link to={"/agent/DeleteAdmin"} className={"deleBtn"}>
                                                <i className="iconfont icon-recyclebin"></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                </div>
                            )
                        }}
                        />
                </Table>
                    <div  className={"page"}>
                        <span>共{this.props.strip}条</span>
                        <Pagination defaultCurrent={1} total={this.props.strip} defaultPageSize={6} onChange={this.onPage}/>
                    </div>
                    <Switch>
                        <Route path={"/agent/Details:data"}  component={UpDetails}/>
                        <Route path={"/agent/edit:data"} render={()=>    <Edit upData={this.state.upData} enData={this.enData}/>}/>
                        <Route path={"/agent/DeleteAdmin"} render={()=> <Dele DeleBox={this.DeleBox}/>}/>
                    </Switch>
            </div>
        )
    }
}


