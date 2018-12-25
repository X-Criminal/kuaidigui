import React,{Component}                    from "react";
import { HashRouter as Router, Route, Switch, Link,withRouter } from 'react-router-dom';
import {Layout,Menu,Icon}        from "antd";
import axios    from "axios";
import imgErr   from "../img/jiazai001.png";

import "../css/home.css";
import "../font-icn/iconfont.css"
import HEADER    from "./component/header"
/**路由组件 */  
import Admin     from "./component/admin";
import Agent     from "./component/agent";
import User      from "./component/user";
import Equipment from "./component/equipment";
import Order     from "./component/order";
import Hotel     from "./component/hotel";
import Data      from "./component/data";
import Reviewed  from "./component/reviewed";
import Bill      from "./component/bill";
import SET       from "./component/set";
import Feedback  from "./component/feedback";
import Apply     from "./component/apply";
import Problem   from "./component/problem";
import { setInterval } from "core-js";



const {Header,Sider,Content} = Layout;
const SubMenu = Menu.SubMenu;
let url,WebMenu;
// const MenuItemGroup = Menu.ItemGroup;

class App extends Component{
        constructor(props){
            super(props)
            this.state={
                errTitle:"",
                errContent:"",
                isError:{isError:false,title:"",center:""},
                sup:false,
                height:"auto",
            }
        }


        componentWillMount(){
            url = sessionStorage.getItem("url");
            WebMenu =JSON.parse(sessionStorage.getItem("WebMenu"));
        }
        componentDidMount(){
            this.getProvinceByAll( );
            this.selectDhl( );
            if(JSON.stringify(WebMenu).indexOf("异常消息")>-1) this.Interval( );
            window.onhashchange=(e)=>{
                if(e.newURL.indexOf("problem")>-1){
                    this.setState({
                        sup:false
                    })
                }
                setTimeout(()=>{
                    let html=document.querySelector(".getHeight");
                    console.log(html)
                    if(html){
                        let height = html.offsetHeight;
                        this.setState({
                            height:height
                        })
                    }else{
                        this.setState({
                            height:"auto"
                        })
                    }
                },500)
            }
        }
        Interval=()=>{
            let _this = this;
            setInterval(()=>{
                _this.queryNewestExceptions( );
            },1000*60)
        }
        getProvinceByAll(){
            axios.post(url+"/deliveryLockers/wx/CountryController/getProvinceByAll")
                 .then((res)=>{
                     if(res.data.code===1000){
                            sessionStorage.setItem("ProvinceByAll",JSON.stringify(res.data.data))
                     }
                 }).catch((res)=>{
                     console.log(res)
                 })
        }
        selectDhl=()=>{
            axios.post(url+"/deliveryLockers/wx/expressDeliveryController/selectDhl",{keyword:""})
                 .then((res)=>{
                     if(res.data.code===1000&&res.data.message==="操作成功！"){
                         sessionStorage.setItem("selectDhl",JSON.stringify(res.data.data))
                     }
                 })
        }
        close=()=>{
            this.setState({
                isError:{isError:false,title:this.state.isError.title,center:this.state.isError.center},
            })
        }
        
        queryNewestExceptions=()=>{
                axios.post(url+"/deliveryLockers/web/exceptionsMessageController/queryNewestExceptions")
                .then((res)=>{
                    if(res.data.code===1000&&res.data.message==="操作成功！"){
                        if(this.state.isError.title!==res.data.data.area||this.state.isError.center!==res.data.data.content){
                            this.setState({
                                isError:{isError:true,title:res.data.data.area,center:res.data.data.content},
                                sup:true
                            })
                        }
                    }
                })
        }
        
        render(){
            return(
                <Router>
                     <Home 
                     isError={this.state.isError}
                     sup={this.state.sup}
                     close={this.close}
                     height={this.state.height}
                     />
                </Router>
            )
        }
}

const Home = withRouter((props)=>{
    const { location } = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    let text = JSON.stringify(WebMenu);
    return(
        <div className={"Home"} style={props.height!=="auto"?{height:props.height+150+"px"}:null}>
        <Layout>
            <Header>
                <HEADER pathSnippets={pathSnippets}/>
            </Header>
            <Layout>
                <Sider width="240">
                    <Menu
                        defaultSelectedKeys={['/']}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={pathSnippets}
                        mode="inline"
                        theme="dark"
                    >
                        {
                            text.indexOf("人员管理")>-1?
                            <SubMenu
                            key="user"
                            title={<span><i className='iconfont icon-renyuanguanli'></i><span>人员管理</span></span>}
                        >

                        { 
                            text.indexOf("管理员")>-1?<Menu.Item key="admin" >
                                <Link to="/admin">
                                        管理员
                                </Link>
                            </Menu.Item>:null
                        }
                        {
                            text.indexOf("快递员")>-1?
                                <Menu.Item key="agent">
                                    <Link to={"/agent"}>
                                        快递员
                                    </Link>
                                </Menu.Item>:null
                        }
                        {
                            text.indexOf("用户")>-1?
                            <Menu.Item key="user">
                                <Link to={"/user"}>
                                    用户
                                </Link>
                            </Menu.Item>:null
                        }
                            
                        </SubMenu>:null
                        }
                        {
                            text.indexOf("设备管理")>-1?
                            <Menu.Item key="equipment">
                                <Link to={"/equipment"}>
                                    <i className={"iconfont icon-biaoge"}></i>
                                    设备管理
                                </Link>
                            </Menu.Item>:null
                        }
                        {
                            text.indexOf("快递公司管理")>-1?
                            <Menu.Item key="order">
                                <Link to={"/order"}>
                                    <i className={"iconfont icon-kuaidi"}></i>
                                    快递公司管理
                                </Link>
                            </Menu.Item>:null
                        }
                        {
                            text.indexOf("订单管理")>-1?
                            <SubMenu
                                key="dingdan"
                                title={<span><i className={"iconfont icon-dingdan"}></i>&nbsp;&nbsp;<span>订单管理</span> </span>}
                                >
                                {
                                text.indexOf("发件订单管理")>-1?
                                <Menu.Item key="hotel">
                                    <Link to={"/hotel"}>
                                        发件订单管理
                                    </Link>
                                </Menu.Item>:null}
                                {
                                text.indexOf("存件订单管理")>-1?
                                <Menu.Item key="data">
                                        <Link to={"/data"}>
                                            存件订单管理
                                        </Link>
                                </Menu.Item>:null}
                                {
                                text.indexOf("订单服务费统计")>-1?
                                <Menu.Item key="reviewed">
                                        <Link to={"/reviewed"}>
                                        
                                            订单服务费统计
                                        </Link>
                                </Menu.Item>:null}
                                {
                                text.indexOf("快递员提现记录")>-1?
                                <Menu.Item key="bill">
                                        <Link to={"/bill"}>
                                            快递员提现记录
                                        </Link>
                                </Menu.Item>:null}
                             </SubMenu>:null
                        }
                        {
                            text.indexOf("消息管理")>-1?
                            <SubMenu
                            key="dingdan2"
                            title={<span><i className={"iconfont icon-lingdang"}></i>&nbsp;&nbsp;<span>消息管理</span> <i className="sup"  style={props.sup?{display:"block"}:{display:"none"}}> 异常消息 </i> </span>}
                        >
                           { 
                           text.indexOf("快递员申请")>-1?
                           <Menu.Item key="apply">
                                <Link to={"/apply"}>
                                    快递员申请
                                </Link>
                            </Menu.Item>:null}
                            {
                            text.indexOf("反馈信息")>-1?
                            <Menu.Item key="feedback">
                                <Link to={"/feedback"}>
                                反馈信息
                                </Link>
                            </Menu.Item>:null}
                            {
                            text.indexOf("异常消息")>-1?
                            <Menu.Item key="problem">
                                <Link to={"/problem"}>
                                异常消息
                                </Link>
                            </Menu.Item>:null}
                        </SubMenu>:null
                        }
                        {
                            text.indexOf("设置")>-1?
                        <Menu.Item key="set">
                            <Link to={"/set"}>
                                <i className={"iconfont icon-icon_set_up"}></i>
                                设置
                            </Link>
                        </Menu.Item>:null
                        }
                    </Menu>
                </Sider>
                <Content>
                    <Switch>
                        {
                            text.indexOf("管理员")>-1?       <Route  path="/admin"     component={ Admin}/>:null
                        }
                        {
                             text.indexOf("快递员")>-1?      <Route  path="/agent"     component={ Agent }/>:null
                        }
                        {
                            text.indexOf("用户")>-1?         <Route  path="/user"      component={ User}/>:null
                        }
                        {
                            text.indexOf("设备管理")>-1?     <Route  path="/equipment" component={ Equipment}/>:null
                        }
                        {
                            text.indexOf("快递公司管理")>-1? <Route  path="/order"     component={ Order}/>:null
                        }
                        {
                            text.indexOf("发件订单管理")>-1? <Route  path="/hotel"     component={ Hotel}/>:null
                        }
                        {
                            text.indexOf("存件订单管理")>-1? <Route  path="/data"      component={ Data}/>:null
                        }
                        {
                            text.indexOf("订单服务费统计")>-1? <Route  path="/reviewed"  component={ Reviewed}/>:null
                        }
                        {
                            text.indexOf("快递员提现记录")>-1? <Route  path="/bill"      component={ Bill}/>:null
                        }
                        {
                            text.indexOf("快递员申请")>-1? <Route  path="/apply"     component={ Apply}/>:null
                        }
                        {
                            text.indexOf("反馈信息")>-1? <Route  path="/feedback"  component={ Feedback}/>:null
                        }
                        {
                            text.indexOf("异常消息")>-1? <Route  path="/problem"   component={ Problem}/>:null
                        }
                        {
                            text.indexOf("设置")>-1? <Route  path="/set"       component={ SET}/>:null
                        }
                        {
                             text.indexOf("管理员")>-1?
                             <Route component={ Admin} />:
                             text.indexOf("快递员")>-1?
                             <Route component={ Agent }/>:
                             text.indexOf("用户")>-1?
                             <Route component={ User}/>:
                             text.indexOf("设备管理")>-1?
                             <Route component={ Equipment}/>:
                             text.indexOf("快递公司管理")>-1?
                             <Route component={ Order}/>:
                             text.indexOf("发件订单管理")>-1?
                             <Route component={ Hotel}/>:
                             text.indexOf("存件订单管理")>-1?
                             <Route component={ Data}/>:
                             text.indexOf("订单服务费统计")>-1?
                             <Route component={ Reviewed}/>:
                             text.indexOf("快递员提现记录")>-1?
                             <Route component={ Bill}/>:
                             text.indexOf("快递员申请")>-1?
                             <Route component={ Apply}/>:
                             text.indexOf("反馈信息")>-1?
                             <Route component={ Feedback}/>:
                             text.indexOf("异常消息")>-1?
                             <Route component={ Problem}/>:
                             text.indexOf("设置")>-1?
                             <Route component={ SET}/>:null
                        }
                    </Switch>
                </Content>
            </Layout>
        </Layout>
        <div className="HomeErr" style={props.isError.isError?{display:"block"}:{display:"none"}}>
             <Icon type="close" onClick={props.close}/>
             <img src={imgErr} alt="异常"/>
             <p>{props.isError.title}</p>
             <p>{props.isError.center}</p>
        </div>
      </div>
    )
})


export default App;