import React ,{Component}           from "react";
import {Input,Button,Table,DatePicker,Tooltip }         from "antd";
import {Link} from "react-router-dom"
const { RangePicker } = DatePicker;

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

        render(){
            return(
                <div className={"hotel admin"}>
                       <h3>发件订单管理</h3>
                       <div className={"clear-fix"}>
                          <div className={"hotelSearch clear-fix"}>
                                <div>
                                      <span><span>订单编号：</span> <Input/></span>
                                      <span><span>状态：</span> <Input/></span>
                                      <span><span>快递柜：</span> <Input/></span>
                                      <span><span>所属区域：</span> <Input/></span>
                                </div>
                                <div>
                                      <span><span>快递公司：</span> <Input/></span>
                                      <span><span>快递员：</span> <Input/></span>
                                      <span><span>发件人：</span> <Input/></span>
                                      <span><RangePicker className={"RangePicker"}/></span>
                                </div>
                                <Button  type="primary">
                                    搜索
                                </Button>
                          </div>
                       <div className={"export"}>
                           <Button>
                           <i class="iconfont icon-daochu_icon"></i>
                               导出超时未取件订单
                           </Button>
                       </div>
                    
                       </div>
                       <Table  
                        columns={columns} 
                        dataSource={data} 
                        rowKey={"key"} 
                        bordered={true}
                        pagination={{
                          defaultPageSize:6,
                          total:11,
                          size:"small",
                          showQuickJumper:true
                        }}
                        >
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
    title: '序号',
    dataIndex: 'name',
    render: (text, row, index) => {
      if (index < data.length-1) {
        return <div>{text}</div>;
      }
      return {
        children: <div style={{textAlign:"right"}}>总计</div>,
        props: {
          colSpan: 7,
        },
      };
    },
  }, {
    title: '订单编号',
    dataIndex: 'age',
    render: renderContent,
  }, {
    title: '快递柜',
    dataIndex: 'tel',
    render: renderContent,
  }, {
    title: '发件人',
    dataIndex: 'phone',
    render: renderContent,
  }, {
    title: '快递公司',
    dataIndex: 'address',
    render: renderContent,
  }
  , {
    title: '快递员',
    dataIndex: 'address',
    render: renderContent,
  }
  , {
    title: '下单时间',
    dataIndex: 'address',
    render: renderContent,
  }
  , {
    title: '快递费（元）',
    dataIndex: 'address',
    render: (text, row, index) => {
      if (index < data.length-1) {
        return <span>{998}</span>;
      }
      return {
        children: <span>{text}</span>,
      };
    },
  }
  , {
    title: '柜子服务费（元）',
    dataIndex: 'address',
    render: (text, row, index) => {
      if (index < data.length-1) {
        return <span>{998}</span>;
      }
      return {
        children: <span>{text}</span>,
      };
    },
  }
  , {
    title: '总费用（元）',
    dataIndex: 'address',
    render: (text, row, index) => {
      if (index < data.length-1) {
        return <span>{998}</span>;
      }
      return {
        children: <span>{text}</span>,
      };
    },
  }
  , {
    title: '状态',
    dataIndex: 'address',
    render: (text, row, index) => {
      if (index < data.length-1) {
        return <a href="javascript:;">{text}</a>;
      }
      return {
        props: {
          colSpan: 2,
        },
      };
    },
  }
  , {
    title: '操作(详情/开锁)',
    dataIndex: 'address',
   render: (text, row, index) => {
      if (index < data.length-1) {
        return (<div className={"caozuo"}>
                 <Tooltip placement="bottom" title={"详情"}>
                      <Button>
                          <Link to={"/hotel/details"}>
                              <i className="iconfont icon-zhangdan"></i>
                          </Link>
                      </Button>
                  </Tooltip>
                  <Tooltip placement="bottom" title={"开锁"}>
                      <Button>
                          <Link to={"/hotel/open"} className={"deleBtn"}>
                              <i className="iconfont icon-suo"></i>
                          </Link>
                      </Button>
                  </Tooltip>
              </div>)
      }
      return {
        props: {
          colSpan: 2,
        },
      };
    },
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
  }, {
    key: '6',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  }];