import React ,{Component} from "react";
//import axios              from "axios";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

//let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            page:1,
            keywords:"",
        }
    }
    componentDidMount(){
      //  url = sessionStorage.getItem("url")
      this.myChart()
    }

    myChart=()=>{
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
                data:['直接访问','邮件营销']
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
                        {value:335, name:'寄件服务费'},
                        {value:310, name:'存件服务费'},
                    ]
                }
            ]
        });
    }

    render(){
            return(
                <div className={"reviewed admin"}>
                        <h3>订单服务费统计</h3>
                        <div className={"_map clear-fix"}>
                            <div className={"_map-title"}> <i></i> 总服务费 </div>
                            <div id="main" style={{ width: 500, height: 500 }}></div>
                            <div className={"Datanumber"}>
                                 <p>￥12345612</p>
                                 <p>总服务费</p>
                            </div>
                            <div className={"reviewedName"}>
                                <div>
                                    <p><i></i><span>￥99998</span></p>
                                    <p>寄件服务费</p>
                                </div>
                                <div>
                                    <p><i></i><span>￥99998</span></p>
                                    <p>寄件服务费</p>
                                </div>
                            </div>
                        </div>
                        <div className={"_data"}>
                            <div className={"_map-title"}> <i></i> 今日服务费用 </div>
                            <div className={"_map-body1 clear-fix"}>
                                 <div>
                                    <p><i></i><span>￥99998</span></p>
                                    <p>寄件服务费</p>
                                 </div>
                                 <div>
                                 <p><i></i><span>￥99998</span></p>
                                    <p>存件服务费</p>
                                 </div>
                             </div>
                            <div className={"_map-title"}> <i></i> 本月服务费用 </div>
                            <div className={"_map-body2 clear-fix"}>
                                 <div>
                                    <p><i></i><span>￥99998</span></p>
                                    <p>寄件服务费</p>
                                 </div>
                                 <div>
                                 <p><i></i><span>￥99998</span></p>
                                    <p>存件服务费</p>
                                 </div>
                             </div>
                            <div className={"_map-title"}> <i></i> 今年服务费用 </div>
                            <div className={"_map-body3 clear-fix"}>
                                 <div>
                                    <p><i></i><span>￥99998</span></p>
                                    <p>寄件服务费</p>
                                 </div>
                                 <div>
                                 <p><i></i><span>￥99998</span></p>
                                    <p>存件服务费</p>
                                 </div>
                             </div>
                        </div>
                </div>
            )
        }
}