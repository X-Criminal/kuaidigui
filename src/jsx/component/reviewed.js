import React ,{Component} from "react";
import axios              from "axios";
import {message}     from "antd";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            page:1,
            keywords:"",

            totalServiceCharge:"",//总服务费
            totalSaveServiceCharge:"",//总存件服务费
            totalSendServiceCharge:"",//总寄件服务费

            daySaveServiceCharge:"",//当日存件服务费
            daySendServiceCharge:"",//当日寄件服务费

            monthSaveServiceCharge:"",//当月存件服务费
            monthSendServiceCharge:"",//当月寄件服务费

            yaerSaveServiceCharge:"",//当年存件服务费
            yaerSendServiceCharge:"",//当年寄件服务费
        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url")
    }

    componentDidMount(){
     // this.myChart()
     this.queryServiceCharge()
    }

    myChart=(totalSaveServiceCharge,totalSendServiceCharge)=>{
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['寄件服务费','存件服务费']
            },
            series: [
                {
                    name:'服务费',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    color:[
                           "#4ed8da","#e06950"
                    ],
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:totalSendServiceCharge, name:'寄件服务费'},
                        {value:totalSaveServiceCharge, name:'存件服务费'},
                    ]
                }
            ]
        });
    }

    queryServiceCharge=( )=>{
        axios.post(url+"/deliveryLockers/web/serviceChargeController/queryServiceCharge")
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     let _data = res.data.data
                        this.setState({
                            totalServiceCharge:_data.totalServiceCharge,
                            totalSaveServiceCharge:_data.totalSaveServiceCharge,
                            totalSendServiceCharge:_data.totalSendServiceCharge,
                            daySaveServiceCharge:_data.daySaveServiceCharge,
                            daySendServiceCharge:_data.daySendServiceCharge,
                            monthSaveServiceCharge:_data.monthSaveServiceCharge,
                            monthSendServiceCharge:_data.monthSendServiceCharge,
                            yaerSaveServiceCharge:_data.yaerSaveServiceCharge,
                            yaerSendServiceCharge:_data.yaerSendServiceCharge
                        })
                        this.myChart(_data.totalSaveServiceCharge,_data.totalSendServiceCharge)
                 }else{
                    message.error(res.data.message)
                 }
             })
    }

    render(){
            return(
                <div className={"reviewed admin"}>
                        <h3>订单服务费统计</h3>
                        <div className={"_map clear-fix"}>
                            <div className={"_map-title"}> <i></i> 总服务费 </div>
                            <div id="main" style={{ width: 500, height: 500 }}></div>
                            <div className={"Datanumber"}>
                                 <p>￥{this.state.totalServiceCharge}</p>
                                 <p>总服务费</p>
                            </div>
                            <div className={"reviewedName"}>
                                <div>
                                    <p><i></i><span>￥{this.state.totalSendServiceCharge}</span></p>
                                    <p>寄件服务费</p>
                                </div>
                                <div>
                                    <p><i></i><span>￥{this.state.totalSaveServiceCharge}</span></p>
                                    <p>存件服务费</p>
                                </div>
                            </div>
                        </div>
                        <div className={"_data"}>
                            <div className={"_map-title"}> <i></i> 今日服务费用 </div>
                            <div className={"_map-body1 clear-fix"}>
                                 <div>
                                    <p><i></i><span>￥{this.state.daySendServiceCharge}</span></p>
                                    <p>寄件服务费</p>
                                 </div>
                                 <div>
                                 <p><i></i><span>￥{this.state.daySaveServiceCharge}</span></p>
                                    <p>存件服务费</p>
                                 </div>
                             </div>
                            <div className={"_map-title"}> <i></i> 本月服务费用 </div>
                            <div className={"_map-body2 clear-fix"}>
                                 <div>
                                    <p><i></i><span>￥{this.state.monthSendServiceCharge}</span></p>
                                    <p>寄件服务费</p>
                                 </div>
                                 <div>
                                 <p><i></i><span>￥{this.state.monthSaveServiceCharge}</span></p>
                                    <p>存件服务费</p>
                                 </div>
                             </div>
                            <div className={"_map-title"}> <i></i> 今年服务费用 </div>
                            <div className={"_map-body3 clear-fix"}>
                                 <div>
                                    <p><i></i><span>￥{this.state.yaerSendServiceCharge}</span></p>
                                    <p>寄件服务费</p>
                                 </div>
                                 <div>
                                 <p><i></i><span>￥{this.state.yaerSaveServiceCharge}</span></p>
                                    <p>存件服务费</p>
                                 </div>
                             </div>
                        </div>
                </div>
            )
        }
}