import React,{Component}    from "react";
import {Input,Button,Icon}  from "antd";
import {Link,Switch,Route}  from "react-router-dom";

//const Option = Select.Option;
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
        super(this)
        this.state={

        }
    }
    render(){
        return(
            <div className={"orderAdd"}>

            </div>
        )
    }


}