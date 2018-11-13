import React,{Component}                     from "react";
import {Button,Icon,Select}                  from "antd";
import Region                                from "../share/region"

const Option = Select.Option;
export default class App extends Component{
        constructor(props){
            super(props)
            this.state={

            }
        }


        BACK=()=>[
            window.history.back(-1)
        ]
        render(){
            return(
                <div className={"edit"}>
                      <h3><span onClick={this.BACK}>代理商管理</span>>修改快递员  <Icon type={"export"} onClick={this.BACK}/></h3>
                      <div className={"editBody"}>
                            <div>
                                <span>账号：</span>
                                <input disabled value={"小明"}/>
                            </div>
                            <div>
                                <span>姓名：</span>
                                <input disabled value={"小明"}/>
                            </div>
                            <div>
                                <span>联系电话：</span>
                                <input disabled value={"小明"}/>
                            </div>
                            <div>
                                <span>快递公司：</span>
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="快递公司"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select>
                            </div>
                            <div>
                                <span>所属区域：</span>
                                <Region />
                            </div>
                            <div className={"editBtn"}>
                                <span></span>
                                <Button type="primary">
                                    保存
                                </Button>
                            </div>
                      </div>
                </div>
            )
        }

}