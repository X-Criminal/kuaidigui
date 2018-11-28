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
                    <Table dataSource={this.props.admins} pagination={false} rowKey={"ordernumber"} >
                        <Column
                        title="快递公司名称"
                        dataIndex="ordernumber"
                        key="ordernumber"
                        />
                        <Column
                        title="服务电话"
                        dataIndex="money"
                        key="money"
                        />
                         <Column
                        title="操作（修改/删除）"
                        dataIndex="createtime"
                        key="createtime"
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
