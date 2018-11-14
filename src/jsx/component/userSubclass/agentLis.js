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
        }
    }
    /**翻页 */
    onPage=(e)=>{
        this.props.emtPage(e)
    }
    onUpdateAdmin=(data)=>{

    }
    onDeleteAdmin=(data)=>{

    }
    render(){
        return(
            <div className={"AdminLis"}>
                    <Table dataSource={this.props.admins} pagination={false} rowKey={"key"}>
                        <Column
                        title="序号"
                        dataIndex="序号"
                        key="序号"
                        />
                        <Column
                        title="昵称"
                        dataIndex="昵称"
                        key="昵称"
                        />
                        <Column
                        title="联系电话"
                        dataIndex="联系电话"
                        key="联系电话"
                        />
                        <Column
                        title="状态"
                        dataIndex="状态"
                        key="状态"
                        />
                        <Column
                        title="姓名"
                        dataIndex="姓名"
                        key="姓名"
                        />
                         <Column
                        title="身份证号"
                        dataIndex="身份证号"
                        key="身份证号"
                        />
                         <Column
                        title="操作"
                        key="key"
                        render={(res)=>{
                               return(
                                <div>
                                     <Tooltip placement="bottom" title={"详情"}>
                                        <Button onClick={this.onUpdateAdmin.bind(this,res)}>
                                            <Link to={"/user/edit"}>
                                                <i className="iconfont icon-zhangdan" style={{color:"#1fa0ff",fontSize:"20px",fontWeight:"600"}}></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"设为快递员"}>
                                        <Button onClick={this.onDeleteAdmin.bind(this,res)}>
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
                                    defaultPageSize={8} 
                                    onChange={this.onPage}/>
                    </div>
                    <Switch>
                        <Route path={"/user/edit"}     render={()=> <Edit />}/>
                        <Route path={"/user/change"}   render={()=> <Change />}/>
                    </Switch>
            </div>
        )
    }
}
