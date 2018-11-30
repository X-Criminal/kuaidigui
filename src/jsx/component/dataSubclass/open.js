import React,{Component}        from "react";
import {Icon,Input,Button }                   from "antd";
import {Link}                   from "react-router-dom";
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <div className={"infoBox open"}>
                    <div>
                        <h3>XXXX地方快递柜-开锁  <Link to={"/data"}><Icon type="close"/></Link></h3>
                        <div className={"info-title"}>
                            <div>
                                 <span>取件人手机号</span>
                                 <Input placeholder={"请输入取件人手机号"}/>
                            </div>
                            <div>
                                <span></span>
                                <Button type="primary">
                                    确定
                                </Button>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}