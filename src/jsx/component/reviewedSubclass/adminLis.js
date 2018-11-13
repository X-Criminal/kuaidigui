import React,{Component}                from "react"
import {Table,Button,Pagination }        from "antd"
import {Route, Switch, Link}            from 'react-router-dom';
import Dele                             from "../share/dele"
const {Column} =Table

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            upData:[],
            adminId:"",
        }
    }
    /**保存删除 */
    onDeleteAdmin(adminId){
       this.setState({
            adminId:adminId
       })
    }
    /**判断删除 */
    DeleBox=(e)=>{
        if(e==="cancel"){
                window.location.href="/#/reviewed"
        }else if(e==="sure" ){
            this.props.deleData(this.state.idAdmin,()=>{
                window.location.href="/#/reviewed"
            })
        }
    }
    /**翻页 */
    onPage=(e)=>{
        this.props.emtPage(e)
    }
    /**同意审核 */
    onUpdateAdmin=( res )=>{
        this.props.upData(res)
    }
    render(){
        return(
            <div className={"AdminLis"}>
                    <Table dataSource={this.props.admins} pagination={false} rowKey={"idAdmin"}>
                        <Column
                        title="账号"
                        dataIndex="telephone"
                        key="telephone"
                        />
                        <Column
                        title="密码"
                        dataIndex="password"
                        key="password"
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
                        title="身份证"
                        dataIndex="identityCard"
                        key="identityCard"
                        />
                        <Column
                        title="角色"
                        dataIndex="adminRole"
                        key="adminRole"
                        render={(res)=>{
                            return(
                                res.map((item,index)=><span key={index}>{item.roleName}</span>)
                            )
                        }}
                        />
                        <Column
                        title="操作"
                        key="idAdmin"
                        render={(text) => {
                            return(
                                <div>
                                    <Button onClick={this.onUpdateAdmin.bind(this,text.idAdmin)}>
                                            同意
                                    </Button>
                                    <Button onClick={this.onDeleteAdmin.bind(this,text)}>
                                        <Link to={"/reviewed/DeleteAdmin"} className={"deleBtn"}>
                                            删除
                                        </Link>
                                    </Button>
                                </div>
                            )
                        }}
                        />
                </Table>
                    <div  className={"page"}>
                        <span>共{this.props.strip}条</span>
                        <Pagination defaultCurrent={1} total={this.props.strip} defaultPageSize={8} onChange={this.onPage}/>
                    </div>
                    <Switch>
                        <Route path={"/reviewed/DeleteAdmin"} render={()=> <Dele DeleBox={this.DeleBox}/>}/>
                    </Switch>
            </div>
        )
    }
}


