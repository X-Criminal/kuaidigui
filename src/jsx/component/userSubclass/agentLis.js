import React,{Component}                        from "react";
import {Table,Pagination,Tooltip,Button}        from "antd";
import {Route, Switch, Link}                    from 'react-router-dom';
import Edit                                     from "./edit";
import Change                                   from "./change";

const {Column} =Table

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            upData:[],
            adminId:"",
            userID:"",
        }
    }
    /**翻页 */
    onPage=(e)=>{
        this.props.emtPage(e)
    }
    onDeleteAdmin=(data)=>{
        this.setState({
            userID:data
        })
    }
    render(){
        let data =this.props.admins;
        for(let i=0;i<data.length;i++){
            data[i].index = i+1;
            data[i].index2 = i+"10001";
        }
        return(
            <div className={"AdminLis"}>
                    <Table dataSource={data} pagination={false} rowKey={"index2"}>
                        <Column
                        title="序号"
                        dataIndex="index"
                        key="index"
                        />
                        <Column
                        title="账号"
                        dataIndex="id"
                        key="id"
                        />
                        <Column
                        title="昵称"
                        dataIndex="nickname"
                        key="nickname"
                        />
                        <Column
                        title="联系电话"
                        dataIndex="phone"
                        key="phone"
                        />
                        <Column
                        title="状态"
                        dataIndex="approveStatus"
                        key="approveStatus"
                        render={(res)=>{
                            return <span>{res===0?"未认证":res===1?"已认证":res===2?"已冻结":"-"}</span>
                        }}
                        />
                        <Column
                        title="姓名"
                        dataIndex="name"
                        key="name"
                        />
                         <Column
                        title="身份证号"
                        dataIndex="idNumber"
                        key="idNumber"
                        />
                         <Column
                        title="操作"
                        key="操作"
                        render={(res)=>{
                               return(
                                <div>
                                     <Tooltip placement="bottom" title={"详情"}>
                                        <Button>
                                            <Link to={"/user/edit"+res.id}>
                                                <i className="iconfont icon-zhangdan" style={{color:"#1fa0ff",fontSize:"20px",fontWeight:"600"}}></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"设为快递员"}>
                                        <Button onClick={this.onDeleteAdmin.bind(this,res.id)}>
                                            <Link to={"/user/change"} className={"deleBtn"}>
                                                <i className="iconfont icon-mn_kuaidiyuan" style={{color:"#1fa0ff",fontSize:"20px",fontWeight:"600"}}></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                </div>
                               )
                        }}
                        />
                </Table>
                    <div className={"page clear-fix"} style={{float:"right"}}>
                        <span>共{this.props.strip}条</span>
                        <Pagination 
                                    showQuickJumper 
                                    defaultCurrent={1} 
                                    size="small" 
                                    total={this.props.strip} 
                                    defaultPageSize={6} 
                                    onChange={this.onPage}/>
                    </div>
                    <Switch>
                        <Route path={"/user/edit:data"}     component={Edit}/>
                        <Route path={"/user/change"}   render={()=> <Change userID={this.state.userID}/>}/>
                    </Switch>
            </div>
        )
    }
}
