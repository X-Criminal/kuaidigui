import React,{Component}                from "react"
import {Table,Button,Input,Icon,Pagination,Checkbox }        from "antd"
import {Route, Switch, Link}            from 'react-router-dom';
import Region                           from "../../share/region"
import Dele                             from "../../share/dele"
const {Column} =Table
const CheckboxGroup = Checkbox.Group;
let router,inRouter;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            upData:[],
            adminId:"",
        }
    }
    componentWillMount(){
        router   = this.props.router.includes("AgentRole")?"/AgentRole":"/AgentHotel"
    }
    componentDidMount(){
        inRouter = this.props.router;
    }
    /**保存修改 */
    onUpdateAdmin(data){
        this.setState({
            upData:data
        })
    }
    /**保存删除 */
    onDeleteAdmin(adminId){
       this.setState({
            adminId:adminId
       })
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
                window.location.href="/#"+inRouter
        }else if(e==="sure" ){
            this.props.deleData(this.state.adminId,()=>{
                window.location.href="/#"+inRouter
            })
        }
    }
    /**翻页 */
    onPage=(e)=>{
        this.props.emtPage(e)
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
                        title="地区"
                        dataIndex="area"
                        key="area"
                        />
                        <Column
                        title="操作"
                        key="idAdmin"
                        render={(text) => {
                            return(
                                <div>
                                     {/* <Button onClick={this.onUpdateAdmin.bind(this,text)}>
                                        <Link to={"/AgentRole/"}>
                                            详情
                                        </Link>
                                    </Button> */}
                                    <Button onClick={this.onUpdateAdmin.bind(this,text)}>
                                        <Link to={router+"/UpdateAdmin"}>
                                            编辑
                                        </Link>
                                    </Button>
                                    <Button onClick={this.onDeleteAdmin.bind(this,text.idAdmin)} className={"deleBtn"}>
                                        <Link to={router+"/DeleteAdmin"} >
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
                        <Route path={router+"/UpdateAdmin"} render={()=> <UpdateAdmin upData={this.state.upData} enData={this.enData}/>}/>
                        <Route path={router+"/DeleteAdmin"} render={()=> <Dele DeleBox={this.DeleBox}/>}/>
                    </Switch>
            </div>
        )
    }
}

/**修改 */
class UpdateAdmin extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            p:"",
            c:"",
            a:"",
            address:"",
            admintype:"",
            age:"",
            identityCard:"",
            name:"",
            password:"",
            telephone:""
        }
    }

    onRegion=(a,txt)=>{
        this.setState({
            [a]:txt
        })
    }
    onchange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    _onchange=( e )=>{
        let adminRole=[]
        for(let i=0;i<e.length;i++){
            adminRole.push({idRole:e[i]})
        }
        this.setState({
            adminRole:adminRole
        })
    }
    postData=( )=>{
        this.setState({
            loading:true,
        })
        let data={
            address:this.state.address,
            idAdmin:this.props.upData.idAdmin,
            age:(+this.state.age),
            adminRole:this.state.adminRole,
            identityCard:this.state.identityCard,
            name:this.state.name,
            password:this.state.password,
            telephone:this.state.telephone,
            area:this.state.p+this.state.c+this.state.a
        }

        this.props.enData(data,(data)=>{
            this.setState({
                loading:false
            })
            window.location.href="/#/agent"
        })
    }
        render(){
            let updata;
            if(this.props.upData){
                updata= this.props.upData
            }else{
                updata={}
            }
            console.log()
            return(
                <div className={"addAdminBox"}>
                        <div>
                              <h3>编辑管理员 <Link to={"/agent"}><Icon type={"close"}/></Link></h3>
                              <div className={"addAdminData"}>
                                   <div key={1}>
                                       <span>
                                           账号
                                       </span>
                                       <Input name={"telephone"} onChange={this.onchange} placeholder={updata.telephone} />
                                   </div>
                                   <div key={2}>
                                       <span>
                                           密码
                                       </span>
                                       <Input name={"password"} onChange={this.onchange}  placeholder={updata.password}/>
                                   </div>
                                   <div key={3}>
                                       <span>
                                           姓名
                                       </span>
                                       <Input name={"name"} onChange={this.onchange} placeholder={updata.name}/>
                                   </div>
                                   <div key={4}>
                                       <span>
                                           年龄
                                       </span>
                                       <Input name={"age"} onChange={this.onchange} placeholder={updata.age}/>
                                   </div>
                                   <div key={5}>
                                       <span>
                                           身份证
                                       </span>
                                       <Input name={"identityCard"} onChange={this.onchange} placeholder={updata.identityCard}/>
                                   </div>
                                   <div key={6}>
                                       <span>
                                           地区
                                       </span>
                                       <Region onRegion={this.onRegion}/>
                                   </div>
                                   <div key={7}>
                                       <span>
                                          详细地址
                                       </span>
                                       <Input name={"address"} onChange={this.onchange} placeholder={updata.address}/>
                                   </div>
                                   <div key={8} className={"adminType clear-fix"}>
                                       <span>
                                          角色
                                       </span>
                                       <CheckboxGroup options={
                                           [
                                            { value: "3", label: '推客' },
                                            { value: "4", label: '创客' },
                                            { value: "6", label: '酒店' },
                                            { value: "5", label: '投资人' },
                                            { value: "2", label: '城市合伙人' },
                                            ]
                                           } onChange={this._onchange} defaultValue={updata.adminRole?updata.adminRole[0].idRoles.split(","):[]}/>
                                   </div> 
                                   <div className={"adminDataBtn"} key={10}>
                                        <Button>
                                            <Link to={"/agent"}>
                                                取消
                                            </Link>
                                        </Button>
                                        <Button type={"primary"} loading={this.state.loading} onClick={this.postData}>
                                             确定
                                        </Button>
                                   </div>
                              </div>
                        </div>
                </div>
            )
        }
}
