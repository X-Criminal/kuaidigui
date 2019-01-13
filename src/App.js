import React, { Component }  from 'react';
import Login                 from "./jsx/login.js";
import Home                  from "./jsx/Home.js"
import cookie                from "react-cookies";
import axios from "axios";
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './App.css';
import "antd/dist/antd.css";
import "./css/admin_init.css";
import "./css/set.css";
import "./css/DataStyle.css";
import "./css/dele.css";
import "./css/reviewed.css";
import "./css/hotel.css";
import "./css/equipment.css";
import "./css/header.css";
import "./css/agent.css";
import "./css/user.css";
import "./css/buill.css";

class App extends Component {
  constructor(props){
    super(props)
    this.state={
        islogin:false,
    }
  }
  componentWillMount(){
    sessionStorage.setItem("url","https://guigui.zhongdianwl.com");
    //cookie.save("islogin",true)
   // cookie.save("userData",{name:"xiaoming"})
  }
  componentDidMount(){
      if(cookie.load("islogin")){
          this.setState({
            islogin:true,
          })
          axios.defaults.headers.common['token'] =cookie.load("userData").token;
      }else{
        this.setState({
          islogin:false,
        })
      }
  }
  login=( )=>{
    cookie.save("islogin",true)
    this.setState({
        islogin:true,
    })
  }
  render() {
    return (
          <div id={"App"}>
            <LocaleProvider locale={zh_CN}>
              <Router  login={this.login} islogin={this.state.islogin}/>
            </LocaleProvider>
         </div>
    );
  }
}

export default App;

function Router(props){
  if(props.islogin){
     return <Home />
  }else{
    return <Login login={props.login}/>
  }
}