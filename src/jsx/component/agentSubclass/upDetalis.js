import React ,{Component}                               from      "react";
import {Icon,Tabs,Table,Pagination}                     from "antd";

const {Column} =Table
const TabPane = Tabs.TabPane;

export default class UpdateAdmin extends Component{
    constructor(props){
        super(props)
        this.state={
            A:[{key:1,"序号":"序号","订单编号":"订单编号","快递柜":"快递柜","发件人":"发件人","快递公司":"快递公司","付款方式":"付款方式","快递费(元)":"998","下单时间":"2018-08-08","状态":"状态"}],
            B:[{key:2,"快递柜名称":"快递柜名称","安放地址":"安放地址","服务费":"服务费","取件时限":"取件时限"}],
            C:[{key:3,"提现金额(元)":"1","微信流水号":"微信流水号","取件时限":"取件时限"}]
        }
    }
    Back=()=>{
        window.history.back(-1)
    }
        render(){
            return(
                <div className={"Details"}>
                        <div>
                              <h3><span onClick={this.Back}>编辑管理员</span>>快递员详情 <Icon type={"export"} onClick={this.Back}/></h3>
                              <div className={"addAdminData"}>
                                    <table className={"DateilsTable"}>
                                        <thead>
                                            <tr>
                                                <th>账号</th>
                                                <th>姓名</th>
                                                <th>联系电话</th>
                                                <th>身份证号</th>
                                                <th>快递公司</th>
                                                <th>所属区域</th>
                                                <th>状态</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>111111</td>
                                                <td>大明</td>
                                                <td>138888</td>
                                                <td>1388888888</td>
                                                <td>快递</td>
                                                <td>宝安区</td>
                                                <td>正常</td>
                                            </tr>
                                        </tbody>
                                    </table>
                              </div>
                        </div>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="订单列表" key="1">    <A lis={this.state.A}/> </TabPane>
                            <TabPane tab="快递柜列表" key="2">  <B lis={this.state.B}/>  </TabPane>
                            <TabPane tab="提现记录" key="3">    <C lis={this.state.C}/> </TabPane>
                        </Tabs>
                </div>
            )
        }
}

class A extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <div className={"A"}>
                <Table
                className={"lisA"}
                dataSource={this.props.lis}
                bordered
                pagination={false}
                rowKey={"key"}
            >
                    <Column
                        title="序号"
                        dataIndex="序号"
                        key="序号"
                    />
                    <Column
                        title="订单编号"
                        dataIndex="订单编号"
                        key="订单编号"
                    />
                    <Column
                        title="快递柜"
                        dataIndex="快递柜"
                        key="快递柜"
                    />
                    <Column
                        title="发件人"
                        dataIndex="发件人"
                        key="发件人"
                    />
                    <Column
                        title="快递公司"
                        dataIndex="快递公司"
                        key="快递公司"
                    />
                    <Column
                        title="付款方式"
                        dataIndex="付款方式"
                        key="付款方式"
                    />
                    <Column
                        title="快递费(元)"
                        dataIndex="快递费(元)"
                        key="快递费(元)"
                    />
                    <Column
                        title="下单时间"
                        dataIndex="下单时间"
                        key="下单时间"
                    />
                    <Column
                        title="状态"
                        dataIndex="状态"
                        key="状态"
                    />
                </Table>
                <Pagination showQuickJumper defaultCurrent={2} total={500} size="small"/>
            </div>
        )
    }
}
class B extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <div className={"B"}>
                <Table
                className={"lisB"}
                dataSource={this.props.lis}
                bordered
                pagination={false}
                rowKey={"key"}
                >
                    <Column
                        title="快递柜名称"
                        dataIndex="快递柜名称"
                        key="快递柜名称"
                    />
                    <Column
                        title="安放地址"
                        dataIndex="安放地址"
                        key="安放地址"
                    />
                    <Column
                        title="服务费"
                        dataIndex="服务费"
                        key="服务费"
                    />
                    <Column
                        title="取件时限"
                        dataIndex="取件时限"
                        key="取件时限"
                    />
                </Table>
                <Pagination showQuickJumper defaultCurrent={2} total={500} size="small"/>
            </div>
        )
    }
}
class C extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <div className={"C"}>
                <Table
                className={"lisB"}
                dataSource={this.props.lis}
                bordered
                pagination={false}
                rowKey={"key"}
                >
                    <Column
                        title="提现金额(元)"
                        dataIndex="提现金额(元)"
                        key="提现金额(元)"
                    />
                    <Column
                        title="微信流水号"
                        dataIndex="微信流水号"
                        key="微信流水号"
                    />
                    <Column
                        title="提现"
                        dataIndex="服务费"
                        key="服务费"
                    />
                    <Column
                        title="取件时限"
                        dataIndex="取件时限"
                        key="取件时限"
                    />
                </Table>
                <Pagination showQuickJumper defaultCurrent={2} total={500} size="small"/>
            </div>
        )
    }
}