import React ,{Component}   from "react";
import {Input,Button,Table,message}       from "antd";
import axios    from "axios";
const { Column } = Table;
let url,dataId;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            Lis:[],
            currPage:1,
            name:"",
            selectedRowKeysArr:[],
        }
    }
    componentWillMount(){
        url =sessionStorage.getItem("url");
        
    }
    componentDidMount(){
        if(!this.props.Area) {window.history.go(-1);message.error("请先选择地区！")};
        this.init();
        dataId=window.location.hash.split("Choice2/")[1]||window.location.hash.split("Choice")[1];
    }
    init=(data)=>{
      let _data={
                size:8,
                area:this.props.Area,//786
                currPage:this.state.currPage,
                name:this.state.name,
         }
         for(let i in data){
             _data[i] = data[i]
         }
         axios.post(url+"/deliveryLockers/web/webMenuController/queryDeliveryLockerList",_data)
              .then((res)=>{
                 if(res.data.code===1000){
                    this.setState({
                        Lis:res.data.data,
                    })
                 }else{
                 }
              })
    }
    onGo=()=>{
        window.history.back(-1)
    }

     rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeysArr:selectedRows,
                })
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };
    onClick=( )=>{
        window.history.go(-1)
        this.props.onDeliveryId(this.state.selectedRowKeysArr,dataId)
    }
    onName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }

    onclick=(e)=>{
        this.init( )
    }
    onpage=(e)=>{
        this.setState({
            currPage:e,
        })
        this.init({ currPage:e })
    }
    render(){
       let data = this.state.Lis;
        return(
            <div className={"choice"}>
                <h3><span>管理员管理</span>><span className={"_back"} onClick={this.onGo}>添加管理员</span>><span>选择快递柜</span></h3>
                <div className={"serch"}>
                   <span>快递柜名称：</span>
                    <Input name={"name"} onChange={this.onName}/>
                   {/* <span>所在区域：</span>
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
                    </Select> */}
                    <Button type={"primary"} onClick={this.onclick}>
                        搜索
                    </Button>
                </div>
                <Table
                        className={"AdminLis"}
                        dataSource={data}
                        bordered
                        pagination={{
                            onChange:this.onpage
                        }}
                        rowSelection={this.rowSelection}
                        rowKey={"id"}
                >
                        <Column
                        title="快递柜名称"
                        dataIndex="name"
                        key="name"
                        />
                        <Column
                        title="服务费"
                        dataIndex="serviceCharge"
                        key="serviceCharge"
                        />
                        <Column
                        title="取件时限"
                        dataIndex="区间时限"
                        key="区间时限"
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
                        dataIndex="areaName"
                        key="areaName"
                        />
                         <Column
                        title="状态"
                        dataIndex="deviceStatus"
                        key="deviceStatus"
                        render={((res)=>{
                            return res===2?<span>正常</span>:<span style={{color:"red"}}>异常</span>
                        })}
                        />
                </Table>
                <Button type={"primary"} style={{margin:"30px"}} onClick={this.onClick}>
                    确定
                </Button>
            </div>
        )
    }
}