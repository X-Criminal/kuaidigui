import React,{Component}    from "react";
import {Input,Button,Icon,Select,message}  from "antd";
import {Link,Switch,Route}  from "react-router-dom";
import axios                from "axios"

const Option = Select.Option;
let url;
export default class App extends Component{
        constructor(props){
            super(props)
            this.state={
                  
            }
        }
        componentWillMount(){
            url = sessionStorage.getItem("url")
        }

        search=()=>{
            this.props.upData( )
        }
        render(){
            return(
                <div className={'adminSearch clear-fix'}>
                    <span style={{marginRight:"10px"}}>
                        名称
                    </span>
                    <Input className={"orderTion"} style={{"width":"200px"}} onChange={this.props.onchange}/>
                    <Button className={"Adminbtn"} type="primary" loading={this.state.loading} onClick={this.search}>
                        查询
                    </Button>
                    <Button type="primary" style={{float:"right"}} >
                        <Link to={"/order/add"}>
                            <Icon type="plus-circle" />
                            &nbsp;
                            添加快递公司
                        </Link>
                    </Button>
                    <Switch>
                        <Route path={"/order/add"} render={()=> <Add upData={this.props.upData}/>}/>
                    </Switch>
                </div>
            )
        }
}

class Add extends Component{
    constructor(props){
        super(props)
        this.state={
            SelectDhlAll:[],
            dhlCoding:"",
            logo:"",
            name:"",
            serviceCall:"",
        }
    }
    componentDidMount(){
        this.getSelectDhl()
    }
    getSelectDhl=()=>{
        axios.post(url+"/deliveryLockers/web/dhlManageController/queryDhlAndCodingList")
             .then((res)=>{
                 if(res.data.code===1000){
                    this.setState({
                        SelectDhlAll:res.data.data
                    })
                 }
             })
    }
    onchange=(data,b)=>{
        this.setState({
            dhlCoding:data,
            logo:b.props.logo,
            name:b.props.children
        })
    }
    serviceCall=(e)=>{
        this.setState({
            serviceCall:e.target.value
        })
    }
    addDhl=()=>{
        let _data = {
            dhlCoding:this.state.dhlCoding,
            logo:this.state.logo,
            name:this.state.name,
            serviceCall:this.state.serviceCall,
        }
        axios.post(url+"/deliveryLockers/web/dhlManageController/addDhl",_data)
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                    window.history.go(-1)
                    this.props.upData( );
                    message.success(res.data.message)
                 }else{
                     message.error(res.data.message)
                 }
             })
    }
    render(){
        return(
            <div className={"orderAdd admin"}>
                  <h3><Link to={"/order"}>快递公司管理</Link>><span>添加快递公司</span></h3>
                  <div className={"orderAddBody"}>
                    <div>
                        <span>
                            快递柜名称：
                        </span>
                        <Select style={{width:350}} onChange={this.onchange}>
                            {this.state.SelectDhlAll.map((item,index)=> <Option logo={item.logo} key={index} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </div>
                    <div>
                        <span>
                            服务电话：
                        </span>
                        <Input name={"serviceCall"} onChange={this.serviceCall}/>
                    </div>
                    <div>
                        <span>
                            
                        </span>
                        <Button onClick={this.addDhl}>提交</Button>
                    </div>
                  </div>
            </div>
        )
    }
}