import React,{Component}                from "react"
import {Table,Button,Pagination,Tooltip }        from "antd"
import {Route, Switch, Link}            from 'react-router-dom';
//import Region                           from "../share/region"
import Dele                             from "../share/dele"
const {Column} =Table

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            upData:[],
            adminId:"",
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
                window.location.href="/#/ "
        }else if(e==="sure" ){
            this.props.deleData(this.state.adminId,()=>{
                window.location.href="/#/ "
            })
        }
    }
    /**翻页 */
    onPage=(e)=>{
        this.props.emtPage(e)
    }
    render(){
        return(
            <div className={"AdminLis"}>
                    <Table
                        dataSource={this.props.admins}
                        bordered
                        pagination={false}
                        rowKey={"序号"}
                    >
                        <Column
                        title="序号"
                        dataIndex="id"
                        key="id"
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
                        title="密码"
                        dataIndex="密码"
                        key="密码"
                        />
                        <Column
                        title="管辖区域"
                        dataIndex="管辖区域"
                        key="管辖区域"
                        />
                        <Column
                        title="操作"
                        dataIndex="序号"
                        key="序号"
                        render={(text) => {
                            return(
                                <div className={"caozuo"}>
                                    <Tooltip placement="bottom" title={"详情"}>
                                        <Button onClick={this.onUpdateAdmin.bind(this,text)}>
                                            <Link to={"/admin/UpdateAdmin"}>
                                                <i className="iconfont icon-zhangdan"></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"编辑"}>
                                        <Button onClick={this.onDeleteAdmin.bind(this,text.idAdmin)}>
                                            <Link to={"/admin/DeleteAdmin"} className={"deleBtn"}>
                                                <i className="iconfont icon-bianji"></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"删除"}>
                                        <Button onClick={this.onDeleteAdmin.bind(this,text.idAdmin)}>
                                            <Link to={"/admin/DeleteAdmin"} className={"deleBtn"}>
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
                        <Pagination defaultCurrent={1} showQuickJumper  size="small" total={this.props.strip} defaultPageSize={8} onChange={this.onPage}/>
                    </div>
                    <Switch>
                        <Route path={"/admin/DeleteAdmin"} render={()=> <Dele DeleBox={this.DeleBox}/>}/>
                    </Switch>
            </div>
        )
    }
}
