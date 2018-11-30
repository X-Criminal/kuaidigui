import React,{Component}        from "react";
import {Icon,Steps }                   from "antd";
import {Link}                   from "react-router-dom";
const Step = Steps.Step;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <div className={"infoBox"}>
                    <div>
                        <h3>物流信息  <Link to={"/hotel/details"}><Icon type="close"/></Link></h3>
                        <div className={"info-title"}>
                            <div className={"_img"}>

                            </div>
                            <div className={"title-info"}>
                                <p>物流公司：1111111</p>
                                <p>物流编号：1111111</p>
                                <p>物流电话：1111111</p>
                            </div>
                            <Steps direction="vertical" size="small" current={1}>
                                <Step title="finish"    description="This is a description." icon={<i class="iconfont icon-buzhou"></i>}/>
                                <Step title="wait"      description="This is a description." icon={<i class="iconfont icon-buzou"></i>}/>
                                <Step title="wait"      description="This is a description." icon={<i class="iconfont icon-buzou"></i>}/>
                            </Steps>
                        </div>
                    </div>
            </div>
        )
    }
}