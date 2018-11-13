import React ,{Component}   from "react";
import {Input,Button,Select,Table}       from "antd";

const { Column } = Table;
const Option = Select.Option;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            rowSelection:[]
        }
    }
    onGo=()=>{
        window.history.back(-1)
    }
    render(){
        return(
            <div className={"choice"}>
                <h3><span >管理员管理</span>><span className={"_back"} onClick={this.inGo}>添加管理员</span>><span>选择快递柜</span></h3>
                <div className={"serch"}>
                   <span>快递柜名称：</span>
                    <Input />
                   <span>所在区域：</span>
                   <Select
                        showSearch
                        className={"_choice"}
                        style={{ width: 200 }}
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                    <Button type={"primary"}>
                        搜索
                    </Button>
                </div>
                <Table
                        className={"AdminLis"}
                        dataSource={data}
                        bordered
                        pagination={false}
                        rowSelection={this.state.rowSelection}
                        rowKey={"key"}
                >
                        <Column
                        title="快递柜名称"
                        dataIndex="快递柜名称"
                        key="快递柜名称"
                        />
                        <Column
                        title="服务费"
                        dataIndex="服务费"
                        key="服务费"
                        />
                        <Column
                        title="区间时限"
                        dataIndex="区间时限"
                        key="区间时限"
                        />
                        <Column
                        title="格子数"
                        dataIndex="格子数"
                        key="格子数"
                        />
                        <Column
                        title="使用数"
                        dataIndex="使用数"
                        key="使用数"
                        />
                         <Column
                        title="所在区域"
                        dataIndex="所在区域"
                        key="所在区域"
                        />
                         <Column
                        title="状态"
                        dataIndex="状态"
                        key="状态"
                        />
                </Table>
                <Button type={"primary"} style={{margin:"30px"}}>
                    确定
                </Button>
            </div>
        )
    }
}

const data = [{
    key: '1',
    快递柜名称: '快递柜名称',
    服务费: '服务费',
    区间时限:"区间时限",
    格子数: '格子数',
    使用数: "使用数",
    所在区域: "所在区域",
    状态: "状态",
  }];
  