import React, { Component }  from 'react';
import Login                 from "./jsx/login.js";
import Home                  from "./jsx/Home.js"
import cookie                from "react-cookies";
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './App.css';
import "antd/dist/antd.css";


class App extends Component {
  constructor(props){
    super(props)
    this.state={
        islogin:true,
    }
  }
  componentWillMount(){
    sessionStorage.setItem("url","https://www.znx158.com/")
  }
  componentDidMount(){
      if(cookie.load("islogin")){
          this.setState({
            islogin:true,
          })
      }else{
        this.setState({
          islogin:true,
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