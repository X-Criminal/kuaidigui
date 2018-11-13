import React,{Component}                from "react";
import {Button,Icon}                    from "antd";

/**删除 */
export default class DeleDtata extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    btn( e ){
        this.props.DeleBox(e)
    }
    render( ){
        return(
            <div className={"deleBox"}>
                   <div >
                        <h4>删除</h4>
                        <div className={"deleTxt"}>
                             <Icon type={"info"}/><span>此操作将永久删除该条目，是否继续？</span>
                        </div>
                        <div className={"deldeBtn"}>
                            <Button onClick={this.btn.bind(this,"cancel")}>取消</Button>
                            <Button onClick={this.btn.bind(this,"sure")}type={"primary"}>确定</Button>
                        </div>
                   </div>
            </div>
        )
    }

}