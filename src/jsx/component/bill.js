import React ,{Component}           from "react";
import {Input,Button,Table}               from "antd";
const { Column } = Table;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            Lis:[]
        }
    }

        render(){
            return(
                <div className={"admin bill"}>
                       <h3>快递员提现记录</h3>
                       <div className={"search"}>
                            <span>快递公司</span>
                            <Input />
                            <span>快递员</span>
                            <Input />
                            <Button type="primary"> 
                                搜索
                            </Button>
                       </div>
                       <Table dataSource={this.state.Lis} className={"bill-table"}>
                            <Column
                            title="序号"
                            key="a"
                            />
                            <Column
                            title="快递公司"
                            key="b"
                            />
                             <Column
                            title="快递员"
                            key="c"
                            />
                            <Column
                            title="快递员电话"
                            key="d"
                            />
                            <Column
                            title="提现金额（元）"
                            key="e"
                            />
                            <Column
                            title="微信流水号"
                            key="f"
                            />
                            <Column
                            title="提现时间"
                            key="g"
                            />
                        </Table>
                </div>
            )
        }
}