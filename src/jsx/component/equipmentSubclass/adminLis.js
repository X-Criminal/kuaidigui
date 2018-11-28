import React,{Component}                         from "react";
import {Table,Button,Pagination,Tooltip }        from "antd";
import {Route, Switch, Link}                     from 'react-router-dom';
import Dele                                      from "../share/dele";
import DetaIls                                   from "./detaIls"
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

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      }
    render(){
        return(
            <div className={"AdminLis"}>
                    <Table 
                       dataSource={this.props.admins} 
                       pagination={false} 
                       rowKey={"key"}
                       rowSelection={this.rowSelection}
                       >
                        <Column
                        title="序号"
                        dataIndex="telephone"
                        key="telephone"
                        />
                        <Column
                        title="快递柜名称"
                        dataIndex="password"
                        key="password"
                        />
                        <Column
                        title="服务费"
                        dataIndex="name"
                        key="name"
                        />
                        <Column
                        title="付款方"
                        dataIndex="age"
                        key="age"
                        />
                        <Column
                        title="格子数"
                        dataIndex="identityCard"
                        key="identityCard"
                        />
                        <Column
                        title="使用数"
                        dataIndex="3"
                        key="3"
                        />
                          <Column
                        title="所在区域"
                        dataIndex="34"
                        key="45"
                        />
                          <Column
                        title="状态"
                        dataIndex="76"
                        key="76"
                        />
                        <Column
                        title="操作(详情,修改,删除)"
                        key="idAdmin"
                        render={(text) => {
                            return(
                                <div>
                                    <Tooltip placement="bottom" title={"详情"}>
                                        <Button onClick={this.onUpdateAdmin.bind(this,text)}>
                                            <Link to={"/equipment/details"}>
                                                <i className="iconfont icon-zhangdan" style={{color:"#1890ff"}}></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"编辑"}>
                                        <Button onClick={this.onDeleteAdmin.bind(this,text.idAdmin)}>
                                            <Link to={"/equipment/DeleteAdmin"} className={"deleBtn"}>
                                                <i className="iconfont icon-bianji"></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"删除"}>
                                        <Button onClick={this.onDeleteAdmin.bind(this,text.idAdmin)}>
                                            <Link to={"/equipment/DeleteAdmin"} className={"deleBtn"}>
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
                        <Route path={"/equipment/details"}      component={DetaIls}/>
                        <Route path={"/agent/DeleteAdmin"} render={()=> <Dele DeleBox={this.DeleBox}/>}/>
                    </Switch>
            </div>
        )
    }
}
