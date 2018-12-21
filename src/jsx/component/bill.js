import React ,{Component}           from "react";
import {Input,Button,Table,message}               from "antd";
import axios from "axios"
import moment from "moment"
const { Column } = Table;
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            Lis:[],
            currPage:1,
            dhlName:"",
            userName:"",
            totalItems:0,
        }
    }
    componentWillMount(){
        url =sessionStorage.getItem("url")
    }

    componentDidMount(){
        this.getLis( )
    }

    getLis=( data )=>{
        let _data = {
            size:5,
            currPage:this.state.currPage,
            dhlName:this.state.dhlName,
            userName:this.state.userName,
        }
        for(let i  in data){
            _data[i] = data[i]
        }

            axios.post(url+"/deliveryLockers/web/courierWithdrawController/seleteCourierWithdrawVOList",_data)
            .then((res)=>{
                if(res.data.code===1000&&res.data.message==="操作成功！"){
                    this.setState({
                        Lis:res.data.data,
                        totalItems:res.data.totalItems
                    })
                }else{
                    message.error(res.data.message)
                }
            })
    }

    onPage=(e)=>{
        this.setState({
            currPage:e
        })
        this.getLis({
            currPage:e
        })
    }
    getData=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    search=()=>{
        this.getLis( )
    }

        render(){
            let data = this.state.Lis;
            for(let i =0;i<data.length;i++){
                data[i].index = i+1;
            }
            return(
                <div className={"admin bill"}>
                       <h3>快递员提现记录</h3>
                       <div className={"search"}>
                            <span>快递公司</span>
                            <Input name={"dhlName"} onChange={this.getData}/>
                            <span>快递员</span>
                            <Input name={"userName"} onChange={this.getData}/>
                            <Button type="primary" onClick={this.search}> 
                                搜索
                            </Button>
                       </div>
                       <Table 
                       dataSource={data} 
                       className={"bill-table"}
                       rowKey="index" 
                       pagination={{
                        defaultPageSize:5,
                        total:this.state.totalItems,
                        onChange:this.onPage
                       }}
                       >
                            <Column
                            title="序号"
                            key="id"
                            dataIndex="id"
                            />
                            <Column
                            title="快递公司"
                            key="dhlName"
                            dataIndex="dhlName"
                            />
                             <Column
                            title="快递员"
                            key="userName"
                            dataIndex="userName"
                            />
                            <Column
                            title="快递员电话"
                            key="phone"
                            dataIndex="phone"
                            />
                            <Column
                            title="提现金额（元）"
                            key="withdrawMoney"
                            dataIndex="withdrawMoney"
                            />
                            <Column
                            title="微信流水号"
                            key="serialNumber"
                            dataIndex="serialNumber"
                            />
                            <Column
                            title="提现时间"
                            key="createtime"
                            dataIndex="createtime"
                            render={(res)=>{
                                return <span>{ moment(res).format("YYYY-MM-DD")}</span>
                            }}
                            />
                        </Table>
                </div>
            )
        }
}