import React                                         from "react";
import cookie                                        from "react-cookies";
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {Icon,Input,Button,Form}                      from "antd";
const FormItem = Form.Item;
export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    Cancellation=( )=>{
        cookie.remove("islogin")
        window.location.reload()
        // axios.get(sessionStorage.getItem("url")+"/SmartPillow//web/admin//adminCancellation")
        //      .then(()=>{
        //         window.location.reload()
        //      })
    }
    render(){
        return(
            <Router>
                <div>
                    <div className={"title"}>智能《快递柜》</div>
                    <div className={"out"}>
                        <Button>
                            退出
                            <i className={"iconfont icon-ai-out"}></i>
                        </Button>
                    </div>
                    <div className={"userName"}>
                        <i className={"iconfont icon-wulumuqishigongandashujuguanlipingtai-ico-"}></i>
                        <div className={"_userName"}>
                            <p>范柳原(13888888888)</p>
                             <p>超级管理员</p> 
                        </div>
                        <Icon type="caret-down" theme="filled"/>
                        <div className={"updateAdminPassword"}>
                                <i className={"iconfont icon-wulumuqishigongandashujuguanlipingtai-ico-"}></i>
                                <p>1388888888</p>
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

    /**提交修改 */
    enterLoading=( )=>{
        this.setState({
            loading:!this.state.loading
        })
    }

      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一致!');
        } else {
          callback();
        }
      }


    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={"updata"}>
                <div className={"updataBox"}>
                    <h2>修改密码  <Link to={"/"+this.props.pathSnippets}><Icon type={"close"} /></Link></h2>
                    <p>登录账号：13838384438</p>
                    <Form className={" clear-fix"}>
                        <div className={"updataTxt"}>
                            <div>
                                <span>用户名</span> <Input disabled={true} style={{"border":"none","backgroundColor":"#fff"}}/>
                            </div>
                            <FormItem>
                                    <span>原密码</span>
                                    {getFieldDecorator("oldPassword",{
                                        rules: [{ required: true, message: '请输入原密码!' }],
                                    })(
                                        <Input type={"password"}/>
                                    )
                                    }
                            </FormItem>
                            <FormItem>
                                    <span>新密码</span> 
                                        {getFieldDecorator("password",{
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
                                <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
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