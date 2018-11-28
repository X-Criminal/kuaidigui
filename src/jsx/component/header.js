import React                                         from "react";
import cookie                                        from "react-cookies";
import axios                                         from "axios";
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {Icon,Input,Button,Form,message}              from "antd";
const FormItem = Form.Item;
let url;
export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    Cancellation=( )=>{
        cookie.remove("userData");
        cookie.remove("islogin");
        window.location.reload();

    }
    render(){
        return(
            <Router>
                <div>
                    <div className={"title"}>智能《快递柜》</div>
                    <div className={"out"}>
                        <Button onClick={this.Cancellation}>
                            退出
                            <i className={"iconfont icon-ai-out"}></i>
                        </Button>
                    </div>
                    <div className={"userName"}>
                        <i className={"iconfont icon-wulumuqishigongandashujuguanlipingtai-ico-"}></i>
                        <div className={"_userName"}>
                            <p>{cookie.load("userData").name+"("+cookie.load('userData').phone+")"}</p>
                            <p>{cookie.load("userData").adminType===1?"超级管理员":"-"}</p> 
                        </div>
                        <Icon type="caret-down" theme="filled"/>
                        <div className={"updateAdminPassword"}>
                                <i className={"iconfont icon-wulumuqishigongandashujuguanlipingtai-ico-"}></i>
                                <p>{cookie.load('userData').phone}</p>
                                <Link to={"/"+this.props.pathSnippets+"/updateAdminPassword"}>
                                    <Button type="primary">
                                        修改密码
                                    </Button>
                                </Link>
                         </div>
                    </div>
                    <Switch>
                        <Route path={"/"+this.props.pathSnippets[0]+"/updateAdminPassword"} render={( )=> <Updata pathSnippets={this.props.pathSnippets[0]}/>}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

class updata extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url")
    }

    /**提交修改 */
    enterLoading=( )=>{
        this.setState({
            loading:!this.state.loading
        })
    }

      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
          callback('两次输入的密码不一致!');
        } else {
          callback();
        }
      }

      handleSubmit=( e )=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
                let data = {
                    account:cookie.load("userData").phone,
                    newPassword:values.newPassword,
                    password:values.password
                }
                axios.post(url+"/deliveryLockers/web/webBasicFunctionController/updatePassword",data)
                     .then((res)=>{
                         if(res.data.code===1000){
                             alert("修改成功，请重新登录！");
                             cookie.remove("userData");
                             cookie.remove("islogin");
                             window.location.reload();
                         }else{
                             message.error(res.data.message)
                                this.setState({
                                    loading:!this.state.loading
                                })
                         }
                     })
        })
      }


    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={"updata"}>
                <div className={"updataBox"}>
                    <h2>修改密码  <Link to={"/"+this.props.pathSnippets}><Icon type={"close"} /></Link></h2>
                    <p>登录账号：{cookie.load("userData").phone}</p>
                    <Form className={" clear-fix"}  onSubmit={this.handleSubmit}>
                        <div className={"updataTxt"}>
                            <div>
                                <span>用户名</span> <Input disabled={true} style={{"border":"none","backgroundColor":"#fff"}} value={cookie.load("userData").name}/>
                            </div>
                            <FormItem>
                                    <span>原密码</span>
                                    {getFieldDecorator("password",{
                                        rules: [{ required: true, message: '请输入原密码!' }],
                                    })(
                                        <Input type={"password"}/>
                                    )
                                    }
                            </FormItem>
                            <FormItem>
                                    <span>新密码</span> 
                                        {getFieldDecorator("newPassword",{
                                            rules: [{ required: true, message: '请输入密码!' }],
                                        })(
                                            <Input type={"password"}/>
                                        )
                                        }
                                </FormItem>
                                <FormItem>
                                <span>重复新密码</span>
                                        {getFieldDecorator("confirmPassword",{
                                            rules: [{ required: true, message: '请输入密码!' },{validator: this.compareToFirstPassword}],
                                        })(
                                            <Input type={"password"}/>
                                        )
                                        }
                            </FormItem>
                            <div>
                                <Button>
                                    <Link to={"/"+this.props.pathSnippets}>
                                        取消
                                    </Link>
                                </Button>
                                <Button type="primary"  htmlType="submit" loading={this.state.loading} onClick={this.enterLoading}>
                                        确定
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
const  Updata  = Form.create( )(updata);