import React,{Component}    from "react";
import {Input,Button,Icon,Select}  from "antd";
import {Link,Switch,Route}  from "react-router-dom";
import axios                from "axios"

const Option = Select.Option;
let url;
export default class App extends Component{
        constructor(props){
            super(props)
            this.state={
                    p:"",
                    c:"",
                    a:"",
                    idRole:0,
                    keywords:"",
                    loading:false,
            }
        }
        componentWillMount(){
            url = sessionStorage.getItem("url")
        }


        render(){
            return(
                <div className={'adminSearch clear-fix'}>
                    <span style={{marginRight:"10px"}}>
                        名称
                    </span>
                    <Input className={"orderTion"} style={{"width":"200px"}}/>
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
                        <Route path={"/order/add"} render={()=> <Add/>}/>
                    </Switch>
                </div>
            )
        }
}

class Add extends Component{
    constructor(props){
        super(props)
        this.state={
            SelectDhlAll:[]
        }
    }
    componentDidMount(){
        this.getSelectDhl()
    }
    getSelectDhl=()=>{
        axios.post(url+"/deliveryLockers/wx/expressDeliveryController/selectDhl")
             .then((res)=>{
                 if(res.data.code===1000){
                    this.setState({
                        SelectDhlAll:res.data.data
                    })
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
                        <Select style={{width:350}}>
                            {this.state.SelectDhlAll.map((item,index)=> <Option key={index} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </div>
                    <div>
                        <span>
                            服务电话：
                        </span>
                        <Input/>
                    </div>
                    <div>
                        <span>
                            
                        </span>
                        <Button>提交</Button>
                    </div>
                        
                  </div>
            </div>
        )
    }
}