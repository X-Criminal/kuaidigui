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
        return(
            <div className={"AdminLis"}>
                    <Table 
                        dataSource={this.props.admins} 
                        bordered
                        pagination={false}
                        rowSelection={{onChange:this.rowSelection}}
                        rowKey={"key"}
                        >
                        <Column
                        title="序号"
                        dataIndex="序号"
                        key="序号"
                        />
                        <Column
                        title="账号"
                        dataIndex="账号"
                        key="账号"
                        />
                        <Column
                        title="姓名"
                        dataIndex="姓名"
                        key="姓名"
                        />
                        <Column
                        title="联系电话"
                        dataIndex="联系电话"
                        key="联系电话"
                        />
                        <Column
                        title="快递公司"
                        dataIndex="快递公司"
                        key="快递公司"
                        />
                        <Column
                        title="所属区域"
                        dataIndex="所属区域"
                        key="所属区域"
                        />
                        <Column
                        title="状态"
                        dataIndex="状态"
                        key="状态"
                        />
                        <Column
                        title="操作"
                        key="idAdmin"
                        render={(text) => {
                            return(
                                <div>
                                      <Tooltip placement="bottom" title={"详情"}>
                                        <Button onClick={this.onUpdateAdmin.bind(this,text)}>
                                            <Link to={"/agent/Details"}>
                                                <i className="iconfont icon-zhangdan" style={{color:"#1fa0ff"}}></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"编辑"}>
                                        <Button onClick={this.onDeleteAdmin.bind(this,text.idAdmin)}>
                                            <Link to={"/agent/edit"} className={"deleBtn"}>
                                                <i className="iconfont icon-bianji"></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"删除"}>
                                        <Button onClick={this.onDeleteAdmin.bind(this,text.idAdmin)}>
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
                        <Pagination defaultCurrent={1} total={this.props.strip} defaultPageSize={8} onChange={this.onPage}/>
                    </div>
                    <Switch>
                        <Route path={"/agent/Details"} render={()=> <UpDetails upData={this.state.upData} enData={this.enData}/>}/>
                        <Route path={"/agent/edit"} render={()=>    <Edit />}/>
                        <Route path={"/agent/DeleteAdmin"} render={()=> <Dele DeleBox={this.DeleBox}/>}/>
                    </Switch>
            </div>
        )
    }
}


