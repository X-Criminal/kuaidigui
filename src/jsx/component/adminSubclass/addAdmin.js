import React                        from "react";
import {Button}                     from "antd";
import { Route, Switch, Link}       from 'react-router-dom';
import Ad                           from "./ad.js"



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
                <Link to={"/admin/addAdmin"}>
                    <Button type="primary">
                        <i className={"iconfont icon-tianjia"} style={{fontSize:"12px"}}></i>
                        &nbsp;
                        添加管理员
                    </Button>
                </Link>
                <Switch>
                    <Route  path="/admin/addAdmin"     render={ ()=>{return <Ad  />}}/>
                </Switch>
            </div>
        )

    }
}


