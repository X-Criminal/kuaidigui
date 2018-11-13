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
    render(){
        return(
            <div className={"AdminLis"}>
                    <Table dataSource={this.props.admins} pagination={false} rowKey={"idUser"}>
                        <Column
                        title="微信号"
                        dataIndex="wxnumber"
                        key="wxnumber"
                        />
                        <Column
                        title="姓名"
                        dataIndex="name"
                        key="name"
                        />
                        <Column
                        title="年龄"
                        dataIndex="age"
                        key="age"
                        />
                        <Column
                        title="性别"
                        key="gender"
                        render={ (txt)=>{
                            return(<span>
                                    {txt.gender===1?"男":"女"}
                                    </span>)
                        }}
                        />
                        <Column
                        title="电话"
                        dataIndex="phone"
                        key="phone"
                        />
                        <Column
                        title="身份证"
                        dataIndex="createtime"
                        key="createtime"
                        />
                         <Column
                        title="住址"
                        dataIndex="address"
                        key="address"
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
