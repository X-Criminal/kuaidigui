import React,{Component}                    from "react";
import { HashRouter as Router, Route, Switch, Link,withRouter } from 'react-router-dom';
import {Layout,Menu}        from "antd";

import "../css/home.css";
import "../font-icn/iconfont.css"
import HEADER    from "./component/header"
/**路由组件 */  
import Admin     from "./component/admin";
import Agent     from "./component/agent";
import AgentRole  from "./component/details/detailsRole"
import AgentHotel from "./component/details/datailsHotel"
import User      from "./component/user";
import Equipment from "./component/equipment";
import Order     from "./component/order";
import Hotel     from "./component/hotel";
import Data      from "./component/data";
import Reviewed  from "./component/reviewed";
import Bill      from "./component/bill";
import SET       from "./component/set";



const {Header,Sider,Content} = Layout;
 const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class App extends Component{
        constructor(props){
            super(props)
            this.state={

            }
        }
        render(){
            return(
                <Router>
                     <Home/>
                </Router>
            )
        }
}

const Home = withRouter((props)=>{
    const { location } = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    return(
        <div className={"Home"}>
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
                        <SubMenu
                            key="user"
                            title={<span><i className='iconfont icon-renyuanguanli'></i><span>人员管理</span></span>}
                        >
                            <Menu.Item key="admin" >
                                <Link to="/admin">
                                        管理员
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="agent">
                                <Link to={"/agent"}>
                                    快递员
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="user">
                                <Link to={"/user"}>
                                    用户
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                            <Menu.Item key="equipment">
                                <Link to={"/equipment"}>
                                    <i className={"iconfont icon-biaoge"}></i>
                                    快递柜管理
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="order">
                                <Link to={"/order"}>
                                    <i className={"iconfont icon-kuaidi"}></i>
                                    快递公司管理
                                </Link>
                            </Menu.Item>

                            <SubMenu
                            key="dingdan"
                            title={<span><i className={"iconfont icon-dingdan"}></i>&nbsp;&nbsp;<span>订单管理</span> </span>}
                            >
                                <Menu.Item key="hotel">
                                    <Link to={"/hotel"}>
                                      
                                        发件订单管理
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="data">
                                    <Link to={"/data"}>
                                  
                                        存件订单管理
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="reviewed">
                                    <Link to={"/reviewed"}>
                                    
                                        订单服务费统计
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="bill">
                                    <Link to={"/bill"}>
                                    
                                        快递员提现记录
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                            key="xiaoxi"
                            title={<span><i className={"iconfont icon-lingdang"}></i>&nbsp;&nbsp;<span>消息管理</span> </span>}
                            >
                                <Menu.Item key="shenqing">
                                    <Link to={"/hotel"}>
                                        快递员申请
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="fankui">
                                    <Link to={"/data"}>
                                        反馈信息
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="yichang">
                                    <Link to={"/reviewed"}>
                                        异常消息
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="set">
                                <Link to={"/set"}>
                                <i className={"iconfont icon-icon_set_up"}></i>
                                    设置
                                </Link>
                            </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <Switch>
                            <Route  path="/admin"     component={ Admin}/> 
                            <Route  path="/agent"     component={ Agent }/>
                                <Route  path='/AgentRole/:data'  component={AgentRole}/>
                                <Route  path='/AgentHotel/:data' component={AgentHotel}/>
                            <Route  path="/user"      component={ User}/>
                            <Route  path="/equipment" component={ Equipment}/>
                            <Route  path="/order"     component={ Order}/>
                            <Route  path="/hotel"     component={ Hotel}/>
                            <Route  path="/data"      component={ Data}/>
                            <Route  path="/reviewed"  component={ Reviewed}/>
                            <Route  path="/bill"      component={ Bill}/>
                            <Route  path="/set"       component={ SET}/>
                            <Route                    component={ Admin} /> 
                    </Switch>
                </Content>
            </Layout>
        </Layout>
      </div>
    )
})


export default App;