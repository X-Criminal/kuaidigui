import React ,{Component} from "react";
import {Table,Button}            from "antd";

const {Column} =Table;
export default class App extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <div className={"setOne"}>
                <h4>分利比例设置</h4>
                <Table pagination={false} dataSource={admins} rowKey={"idRole"}>
                    <Column
                        title="角色名"
                        dataIndex="name"
                        key="name"
                     />
                      <Column
                        title="分利比"
                        dataIndex="Libby"
                        key="Libby"
                     />
                      <Column
                        title="权限"
                        dataIndex="Jurisdiction"
                        key="Jurisdiction"
                     />
                      <Column
                        title="操作"
                        key="idRole"
                        render={(res)=>{
                                 return(
                                    <Button>
                                        编辑
                                    </Button>
                                 )
                        }}
                     />
                </Table>
            </div>
        )
    }
}

let admins=[
    {name:"城市合伙人",Libby:"1%",Jurisdiction:"订单管理，营销报表",idRole:2},
    {name:"酒店",Libby:"5%",Jurisdiction:"订单管理，营销报表",idRole:3},
    {name:"创客",Libby:"6%",Jurisdiction:"订单管理，营销报表",idRole:4},
    {name:"推客",Libby:"7%",Jurisdiction:"订单管理，营销报表",idRole:5},
    {name:"投资人",Libby:"4564%",Jurisdiction:"订单管理，营销报表",idRole:6},
]
