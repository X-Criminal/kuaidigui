import React ,{Component}                         from "react";
import {Input,Button,Table}               from "antd";
import axios from "axios"
//import {Link}                                     from "react-router-dom"
import moment from "moment";
const { Column } = Table;
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            Lis:[],
            currPage:1,
            deliveryName:"",
            totalItems:0,
        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url")
    }
    componentDidMount(){
        this.selectExceptionsMessageList( )
    }

    selectExceptionsMessageList=(data)=>{
        let _data ={
            size:5,
            currPage:this.state.currPage,
            deliveryName:this.state.deliveryName,
        }
        for(let i in data){
            _data[i] = data[i]
        }
        axios.post(url+"/deliveryLockers/web/exceptionsMessageController/selectExceptionsMessageList",_data)
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     this.setState({
                        totalItems:res.data.totalItems,
                        Lis:res.data.data
                     })
                 }else{
                    this.setState({
                        totalItems:[],
                        Lis:0,
                     })
                 }
             })
    }
    getData=(e)=>{
        this.setState({
            deliveryName:e.target.value
        })
    }
    onPage=(e)=>{
        this.setState({
            currPage:e
        })
        this.selectExceptionsMessageList({
            currPage:e
        })
    }

    getIls=()=>{
        this.selectExceptionsMessageList( )
    }
        render(){
            let data =this.state.Lis;
            for(let i =0;i<data.length;i++){
                data[i].index = i+1;
            }
            return(
                <div className={"admin bill"}>
                       <h3>异常消息</h3>
                       <div className={"search"}>
                            <span>快递柜</span>
                            <Input name={"deliveryName"} onChange={this.getData}/>
                            <Button type="primary" onClick={this.getIls}> 
                                搜索
                            </Button>
                       </div>
                       <Table 
                       dataSource={data} 
                       className={"bill-table"}
                       rowKey={"index"}
                       pagination={{
                        defaultPageSize:5,
                        total:this.state.totalItems,
                        onChange:this.onPage,
                        size:"small",
                        //showSizeChanger:true,
                        showQuickJumper :true,
                       }}
                       >
                            <Column
                            title="序号"
                            key="index"
                            dataIndex="index"
                            />
                            <Column
                            title="快递柜"
                            key="deliveryName"
                            dataIndex="deliveryName"
                            />
                             <Column
                            title="所在区域"
                            key="area"
                            dataIndex="area"
                            />
                            <Column
                            title="消息内容"
                            key="content"
                            dataIndex="content"
                            />
                            <Column
                            title="时间"
                            key="createtime"
                            dataIndex="createtime"
                            render={(res)=>{
                                return <span>{res?moment(parseInt(res)).format("YYYY-MM-DD"):"-"}</span>
                            }}
                            />
                        </Table>
                </div>
            )
        }
}