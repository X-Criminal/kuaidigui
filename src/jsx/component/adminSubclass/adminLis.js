import React,{Component}                         from "react"
import {Table,Button,Pagination,Tooltip }        from "antd"
import {Route, Switch, Link}                     from 'react-router-dom';
//import Region                           from "../share/region"
import Dele                                      from "../share/dele";
import Details                                   from "./details";
import Edit                                      from "./edit";
const {Column} =Table

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            upData:[],
            adminId:"",
        }
    }
    /**保存修改 */
    onUpdateAdmin(data){
        this.setState({
            upData:data
        })
    }
    /**保存删除 */
    onDeleteAdmin=(adminId)=>{
       this.setState({
            adminId:adminId
       })
       console.log(adminId)
    }
    /**提交修改数据 */
    enData=(data,cb )=>{
        this.props.upData(data,()=>{
            cb&&cb()
        })
    }
    /**判断删除 */
    DeleBox=(e)=>{
        if(e==="cancel"){
               window.history.go(-1)
        }else if(e==="sure" ){
            this.props.deleData(this.state.adminId,()=>{
                window.history.go(-1)
            })
        }
    }
    /**翻页 */
    onPage=(e)=>{
        this.props.emtPage(e)
    }
    render(){
        let data = this.props.admins;
        for(let i = 0;i<data.length;i++){
            data[i].index=i+1;
        }
        return(
            <div className={"AdminLis"}>
                    <Table
                        dataSource={data}
                        bordered
                        pagination={false}
                        rowKey={"index"}
                    >
                        <Column
                        title="序号"
                        dataIndex="index"
                        key="index"
                        />
                        <Column
                        title="账号"
                        dataIndex="account"
                        key="account"
                        />
                        <Column
                        title="姓名"
                        dataIndex="name"
                        key="name"
                        />
                        <Column
                        title="联系电话"
                        dataIndex="phone"
                        key="phone"
                        />
                        <Column
                        title="密码"
                        dataIndex="password"
                        key="password"
                        />
                        <Column
                        title="管辖区域"
                        dataIndex="jurisdiction"
                        key="jurisdiction"
                        />
                        <Column
                        title="操作"
                        key="id"
                        dataIndex="id"
                        render={(text) => {
                            return(
                                <div className={"caozuo"}>
                                    <Tooltip placement="bottom" title={"详情"}>
                                        <Button>
                                            <Link to={"/admin/details"+text}>
                                                <i className="iconfont icon-zhangdan"></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"编辑"}>
                                        <Button >
                                            <Link to={"/admin/edit"+text} className={"deleBtn"}>
                                                <i className="iconfont icon-bianji"></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title={"删除"}>
                                        <Button>
                                            <Link to={"/admin/DeleteAdmin/"+text} className={"deleBtn"} onClick={this.onDeleteAdmin.bind(this,text)}>
                                                <i className="iconfont icon-recyclebin"></i>
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                </div>
                            )
                        }}
                        />
                </Table>
                    <div  className={"page"}>
                        <span>共{this.props.totalItems}条</span>
                        <Pagination defaultCurrent={1} showQuickJumper  size="small" total={this.props.totalItems} defaultPageSize={6} onChange={this.onPage}/>
                    </div>
                    <Switch>
                        <Route path={"/admin/DeleteAdmin/"}  render={()=> <Dele DeleBox={this.DeleBox}/>}/>
                        <Route path={"/admin/details:data"} component={Details} />
                        <Route path={"/admin/edit:data"}    component={Edit}/>
                    </Switch>
            </div>
        )
    }
}
