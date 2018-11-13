import React from "react";
import {Button,Icon,Input } from "antd";
import { Route, Switch, Link} from 'react-router-dom';

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    enData=( data ,cb)=>{
        this.props.addAdmin(data,(res)=>{
            cb&&cb()
        })
    }

    render(){
        return(
            <div className={"addAdmin"} style={{"float":"right"}}>
                    <Button type="primary" disabled={this.props.courier.length<=0?true:false}>
                        <Link to={"/agent/binding"}>
                            <i className="iconfont icon-bangding" style={{transform:"rotate(-45deg)"}}></i>
                            &nbsp;
                            绑定快递柜
                        </Link>
                    </Button>
                <Switch>
                    <Route  path="/agent/binding"  render={ ()=> <AddAmin enData={this.enData}/>}/>
                </Switch>
            </div>
        )

    }
}

class AddAmin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
        }
    }

        render(){
            return(
                <div className={"bindingBox"}>
                        <div>
                              <h3>绑定快递柜 <Link to={"/agent"}><Icon type={"close"}/></Link></h3>
                              <div className={"bindingData"}>
                                   <div key={1}>
                                       <span>
                                           账号:
                                       </span>
                                       <Input name={"telephone"} placeholder={"输入快递柜名称"} />
                                       <Button icon={"plus"} type={"primary"}></Button>
                                   </div>
                                   <div className={"adminDataBtn"} key={10}>

                                        <Button type={"primary"} loading={this.state.loading} onClick={this.postData}>
                                             确定
                                        </Button>
                                   </div>
                              </div>
                        </div>
                </div>
            )
        }
}