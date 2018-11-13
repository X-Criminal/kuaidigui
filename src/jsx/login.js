import React,{Component}                        from "react";
import { Form, Icon, Input, Button}             from 'antd';
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
        if (value && value !== form.getFieldValue('Password')) {
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
              axios.post(url+"SmartPillow/web/admin/adminLogin",values)
               // axios.post("http://172.16.10.16:8086/securitylock/web/admin/Login",values)
                     .then((res)=>{
                         if(res.data.code===1000){
                                cookie.save("islogin",true);
                                this.props.login( )
                         }else{
                             this.setState({
                                loginerr:"账号或密码错误"
                             })
                         }
                     })   
            }else{
              console.log(err)
          }
        });
      }

      /**忘记密码 */
      resetAdminPassword=(e)=>{
            e.preventDefault( );
            let data={
                password:"",
                    code:"",
               telephone:"",
            };
            this.props.form.validateFields((err,values)=>{
                 if(!err){
                     data.password=values.Password;
                         data.code=values.code;
                    data.telephone=values.Telephone;
                        this.Postreset(data,()=>{
                            /**发送后回调 */
                            console.log(data)
                        })
                 }else{
                    console.log(err)   
                 }
            })
      }
      Postreset=(data,cb)=>{
            axios.post(url+"SmartPillow/web/admin/resetAdminPassword",data)
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
            axios.get(url+"/SmartPillow//web/admin/sendSmsCode?telephone="+this.state.user)
                 .then((res)=>{
                        if(res.data!==1000){
                            alert(res.data.message)
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
                            {getFieldDecorator('telephone', {
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
                            <p className={"resetAdminPassword"} onClick={this.pagIng}>忘记密码</p>
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
                                {getFieldDecorator('Telephone', {
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
                                {getFieldDecorator('Password', {
                                        rules: [{ required: true, message: '输入新密码!' },{validator:this.validateToNextPassword}],
                                })(
                                        <Input placeholder="输入新密码" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('confirm', {
                                        rules: [{ required: true, message: '重复新密码' },{validator: this.compareToFirstPassword,}],
                                })(
                                        <Input placeholder="重复新密码"/>
                                )}
                            </FormItem>
                            <p className={"resetAdminErr"}>{this.state.resetAdminErr}</p>
                            <div className={"btn"}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    确定
                                </Button>
                                <Button className="login-form-button" onClick={this.pagIng}>
                                    返回登陆
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