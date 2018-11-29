import React ,{Component}           from "react";
import {Input,Button,Table}         from "antd";

const {Column}   = Table;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

        render(){
            return(
                <div className={"hotel"}>
                       <h3>发件订单管理</h3>
                       <div className={"hotelSearch"}>
                             <div>
                                  <span>订单编号：<Input/></span>
                                  <span>状态：<Input/></span>
                                  <span>快递柜：<Input/></span>
                                  <span>所属区域：<Input/></span>
                             </div>
                             <div>
                                  <span>快递公司<Input/></span>
                                  <span>快递员：<Input/></span>
                                  <span>发件人<Input/></span>
                                  <span><Input/></span>
                             </div>
                            <Button>
                                搜索
                            </Button>
                       </div>
                       <div>
                           <Button>
                               导出超时未取件订单
                           </Button>
                       </div>
                       <Table  columns={columns} dataSource={data} rowKey={"key"} bordered={true}>
                           
                       </Table>
                </div>
            )
        }
}
const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index === data.length-1) {
      obj.props.colSpan = 0;
    }
    return obj;
  };
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: (text, row, index) => {
      if (index < 4) {
        return <a href="javascript:;">{text}</a>;
      }
      return {
        children: <a href="javascript:;">{text}</a>,
        props: {
          colSpan: 5,
        },
      };
    },
  }, {
    title: 'Age',
    dataIndex: 'age',
    render: renderContent,
  }, {
    title: 'Home phone',
    dataIndex: 'tel',
  }, {
    title: 'Phone',
    dataIndex: 'phone',
    render: renderContent,
  }, {
    title: 'Address',
    dataIndex: 'address',
    render: renderContent,
  }];

  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  }, {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  }];