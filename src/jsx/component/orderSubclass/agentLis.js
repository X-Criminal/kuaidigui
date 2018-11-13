import React,{Component}                from "react"
import {Table,Pagination}        from "antd"


const {Column} =Table

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            upData:[],
            adminId:"",
        }
    }
    /**翻页 */
    onPage=(e)=>{
        this.props.emtPage(e)
    }

    rowSelection={
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
                    <Table dataSource={this.props.admins} pagination={false} rowKey={"ordernumber"} rowSelection={this.rowSelection} >
                        <Column
                        title="订单号"
                        dataIndex="ordernumber"
                        key="ordernumber"
                        />
                        <Column
                        title="用户"
                        key="name"
                        render={(txt)=>{
                                return(
                                    <span>{txt.wxuser?txt.wxuser.name:""}</span>
                                )
                        }}
                        />
                        <Column
                        title="订单金额"
                        dataIndex="money"
                        key="money"
                        />
                         <Column
                        title="订单时间"
                        dataIndex="createtime"
                        key="createtime"
                        />
                        <Column
                        title="设备编号"
                        key="txt.equipment.mac"
                        render={(txt)=>{
                            return(<span>{txt.equipment.mac}</span>)
                        }}
                        />
                         <Column
                        title="设备服务"
                        key="usemodel"
                        render={(txt)=>(
                            <span>{txt.usemodel===1?"按摩":txt.usemodel===2?"睡眠检测":txt.usemodel===3?"按摩加睡眠检测":"-"}</span>
                        )}
                        />
                         <Column
                        title="所属酒店"
                        key="txt.equipment.hotels.hotelname"
                        render={(txt)=>{
                            return(
                                <span>
                                      {txt.equipment.hotels.hotelname}
                                </span>
                            )
                        }}
                        />
                        <Column
                        title="所属角色"
                        key="txt.equipment.hotels.admin.name"
                        render={ (txt)=>{
                            return(<span>
                                    {txt.equipment.hotels.admin?txt.equipment.hotels.admin.name:""}
                                    </span>)
                        }}
                        />
                </Table>
                    <div  className={"page"}>
                        <span>共{this.props.strip}条</span>
                        <Pagination defaultCurrent={1} total={this.props.strip} defaultPageSize={8} onChange={this.onPage}/>
                    </div>
            </div>
        )
    }
}
