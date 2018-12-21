import React,{Component}                         from "react";
import {Table,Button,Pagination,Tooltip }        from "antd";
import {Route, Switch, Link}                     from 'react-router-dom';
import Dele                                      from "../share/dele";
import DetaIls                                   from "./detaIls"
import Edit                                      from "./edit"
const {Column} =Table;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            EditDtate:"",
            adminId:"",
        }
    }
    /**保存修改 */
    onEdit(data){
        this.setState({
            EditDtate:data
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
                window.history.go(-1)
        }else if(e==="sure" ){
            this.props.deleData(this.state.adminId,()=>{
                window.history.go(-1)
            })
        }
    }
    /**翻页 */
    onPage=(e)=>{
        this.props.emtPage(e)
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            let ids=[];
            for(let i = 0;i<selectedRows.length;i++){
                ids.push(selectedRows[i].id)
            }
            this.props.selectedRows(ids)
       //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      }
    render(){
        let data = this.props.admins;
        for(let i =0;i<data.length;i++){
            data[i].index = i+1;
            data[i].render1 = i+"99898"
        }
        return(
            <div className={"AdminLis"}>
                    <Table 
                       dataSource={data} 
                       pagination={false} 
                       rowKey={"index"}
                       rowSelection={this.rowSelection}
                       >
                        <Column
                        title="序号"
                        dataIndex="index"
                        key="index"
                        />
                        <Column
                        title="设备编号"
                        dataIndex="mac"
                        key="mac"
                        />
                        <Column
                        title="设备名称"
                        dataIndex="name"
                        key="name"
                        />
                        <Column
                        title="服务费"
                        dataIndex="serviceCharge"
                        key="serviceCharge"
                        />
                        <Column
                        title="付款方"
                        dataIndex="payer"
                        key="payer"
                        render={(res)=>{
                            return <span>{res===1?"存件方":res===2?"取件方":"-"}</span>
                        }}
                        />
                        <Column
                        title="格子数"
                        dataIndex="gridNumber"
                        key="gridNumber"
                        />
                          <Column
                        title="使用数"
                        dataIndex="useNumber"
                        key="useNumber"
                        />
                         <Column
                        title="所在区域"
                        dataIndex="layAddreass"
                        key="layAddreass"
                        />
                          <Column
                        title="状态"
                        dataIndex="deviceStatus"
                        key="deviceStatus"
                        render={(res)=>{
                            return <span>{res===1?"正常":res===2?"异常":"-"}</span>
                        }}
                        />
                        <Column
                        title="操作(详情,修改,删除)"
                        key="render1"
                        render={(text) => {
                            return(
                                <div>
                                    <Tooltip placement="bottom" title={"详情"}>
                                        <Button >
                                            <Link to={"/equipment/details"+text.id}>
                                                <i className="iconfont icon-zhangdan" style={{color:"#1890ff"}}></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"编辑"}>
                                        <Button onClick={this.onEdit.bind(this,text.id)}>
                                            <Link to={"/equipment/edit"+text.id} className={"deleBtn"}>
                                                <i className="iconfont icon-bianji"></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"删除"}>
                                        <Button onClick={this.onDeleteAdmin.bind(this,text.id)}>
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
                        <span>共{this.props.totalItems}条</span>
                        <Pagination defaultCurrent={1} total={this.props.totalItems} defaultPageSize={6} onChange={this.onPage}/>
                    </div>
                    <Switch>
                        <Route path={"/equipment/details:data"}             component={DetaIls}/>
                        <Route path={"/equipment/edit:data"}                render={()=> <Edit EditDtate={this.state.EditDtate} enData={this.enData}/>}/>
                        <Route path={"/equipment/DeleteAdmin"} render={()=> <Dele DeleBox={this.DeleBox}/>}/>
                    </Switch>
            </div>
        )
    }
}
