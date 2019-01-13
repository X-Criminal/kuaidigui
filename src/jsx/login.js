import React,{Component}                        from "react";
import { Form, Icon, Input, Button,message}     from 'antd';
import axios                                    from "axios";
import cookie                                   from "react-cookies";
import "../css/login.css"
let url;
const FormItem = Form.Item;
class app extends Component{
    constructor(props){
        super(props)
        this.state={
                Switch:true,
                codeTxt:"获取验证码",
                loading:false,
                loginerr:"",
                resetAdminErr:"",
                code:"",
                user:"",
        }
    }
    /**获取地址 */
    componentWillMount(){
        url  = sessionStorage.getItem("url")
    }
    /***验证两次输入是否一致 */
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };

      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
          callback('两次输入的密码不一致!');
        } else {
          callback();
        }
      }

    /**登录 */
    handleSubmit = (e) => {
        //13647062910 123456
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              axios.post(url+"/deliveryLockers/web/webBasicFunctionController/login",values)
               // axios.post("http://172.16.10.16:8086/securitylock/web/admin/Login",values)
                     .then((res)=>{
                         if(res.data.code===1000){
                                cookie.save("islogin",true);
                                cookie.save("userData",res.data.data);
                                axios.defaults.headers.common['token'] =res.data.data.token;
                                this.getWebMenu( res.data.data.id )
                         }else{
                             this.setState({
                                loginerr:"账号或密码错误"
                             })
                         }
                     }).catch(()=>{
                         message.error("网络连接错误请稍后再试！")
                     })  
            }else{
              console.log(err)
          }
        });
      }
      getWebMenu(id){
        axios.post(url+"/deliveryLockers/web/webMenuController/getWebMenu",{adminId:id})
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                    sessionStorage.setItem("WebMenu",JSON.stringify(res.data.data));
                    this.props.login( );
                 }
             })
      }

      /**忘记密码 */
      resetAdminPassword=(e)=>{
            e.preventDefault( );
            let data={
                newPassword:"",
                    code:"",
                 account:"",
            };
            this.props.form.validateFields((err,values)=>{
                 if(!err){
                     data.newPassword=values.newPassword;
                         data.code=values.code;
                    data.account=values.account;
                        this.Postreset(data,(data)=>{
                            /**发送后回调 */
                            if(data.data.code===1000&&data.data.message.indexOf("成功")>-1){
                                message.success("密码修改成功");
                                this.pagIng( )
                            }else{
                                message.error(data.data.message);
                            }
                           // console.log(data)
                        })
                 }else{
                    console.log(err)
                 }
            })
      }
      Postreset=(data,cb)=>{
            axios.post(url+"/deliveryLockers/web/webBasicFunctionController/forgetPassword",data)
                 .then((res)=>{
                            cb&&cb(res)
                       })
      }

    /**登陆&&忘记密码*/
      pagIng=( )=>{
            this.setState({
                Switch:!this.state.Switch
            })
      }
    /***获取验证码 */
      onCode=()=>{
            let Time=61;
            this.setState({loading: true})
            let Interval= setInterval(()=>{
                    Time--;
                    this.setState({
                        codeTxt:Time+"s",
                    })
                    if(Time<=0){
                        this.setState({
                            codeTxt:"获取验证码",
                            loading: false
                        })
                        clearInterval(Interval)
                    }
            },1000)
            this.getCode( )
      }
    /**获取验证码 */
      getCode=( )=>{
          if( this.state.user.length<=0) return false;
            axios.post(url+"/deliveryLockers/wx/basicFunctionController/getCode?",{phone:this.state.user,type:"4"})
                 .then((res)=>{
                        if(res.data===1000){
                            message.success(res.data.message)
                        }
                 })
      }
    /**保存手机号 */
      getPhone=(e)=>{
            this.setState({
                [e.target.name]:e.target.value
            })
      }
     /**错误提示*/
      onfocus=()=>{
          this.setState({
            loginerr:""
          })
      }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={"login"}>
                 <div className={"loginBody"}>
                        <p className={"title"}>智能《快递柜》管理系统</p>
                        {
                            this.state.Switch?
                            <Form onSubmit={this.handleSubmit} className="login-form Login">
                            <h3>用户登陆</h3>
                            <FormItem>
                            {getFieldDecorator('account', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input  key={"请输入手机号或者邮箱"} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onFocus={this.onfocus} placeholder="账号" />
                            )}
                            </FormItem>
                            <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }] ,
                            })(
                                <Input prefix={<Icon key={"请输入密码"} type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onFocus={this.onfocus} placeholder="密码" />
                            )}
                            </FormItem>
                            <p className={"err"}>{this.state.loginerr}</p>
                            <div className={"clear-fix"}>
                                <p className={"resetAdminPassword"} onClick={this.pagIng}>忘记密码</p>
                            </div>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </FormItem>
                        </Form>
                        :
                        null
                        }
                        {
                            this.state.Switch?null:
                        <Form onSubmit={this.resetAdminPassword} className={"resetAdminPassword"}>
                            <h3>忘记密码</h3>
                            <FormItem>
                                {getFieldDecorator('account', {
                                        rules: [{ required: true, message: '请输入手机号!' }],
                                })(
                                        <Input placeholder="手机号" name={"user"} onChange={this.getPhone}/>
                                )}
                                
                            </FormItem>
                            <FormItem className={"code"}>
                                {getFieldDecorator('code', {
                                        rules: [{ required: true, message: '请输入验证码' }],
                                })(
                                        <Input placeholder="验证码"/>
                                )}
                                <Button loading={this.state.loading} type="primary" onClick={this.onCode}>{this.state.codeTxt}</Button>
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('newPassword', {
                                        rules: [{ required: true, message: '输入新密码!' },{validator:this.validateToNextPassword}],
                                })(
                                        <Input placeholder="输入新密码" type={"password"}/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('confirm', {
                                        rules: [{ required: true, message: '重复新密码' },{validator: this.compareToFirstPassword,}],
                                })(
                                        <Input placeholder="重复新密码" type={"password"}/>
                                )}
                            </FormItem>
                            <p className={"resetAdminErr"}>{this.state.resetAdminErr}</p>
                            <div className={"btn"}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    确定
                                </Button>
                                <Button className="login-form-button" onClick={this.pagIng}>
                                    返回登录
                                </Button>
                            </div>
                        </Form>
                        }
                 </div>
            </div>
        )
    }
}

const  WrappedNormalLoginForm  = Form.create( )(app);
export default WrappedNormalLoginForm;