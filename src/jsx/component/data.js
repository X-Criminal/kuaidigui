import React ,{Component}           from "react";
import Search                       from "./userSubclass/search";
import { Radio ,DatePicker,Icon }   from 'antd';
import axios                        from "axios"
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';

import echarts from "echarts"
let upData = false,myChart,url;

const dateFormat = 'YYYY/MM/DD';
let initDate   = new Date( );
let inDate     = initDate.getFullYear()+"-"+(initDate.getMonth()+1)+"-"+initDate.getDate()
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
             date:[],
             amount:[],
             typeData:1,
             inDate:"",
             keywords:""
        }
    }
    onSearch=( e , cb)=>{
        this.setState({
            keywords:e.keywords
        })
        console.log(e);
        cb&&cb()
    }
    /**选择年月日 */
    onDateType=( type )=>{
        this.setState({
            typeData:type.target.value
        })
    this.init({type:type.target.value})
    }
    /**选择日期 */
    onDate=( type , date)=>{
        this.setState({
            inDate:date
        })

    }
    componentWillMount(){
        url = sessionStorage.getItem("url");
        this.setState({
            inDate:inDate
        })
    }
    /**初始化 */
    componentDidMount(){
        this.init()
    }
    /**初始化 */
    init( data ){
        let _data={
            startTime:this.state.inDate,
             keywords:this.state.keywords,
                 type:this.state.typeData
        }
        if(data){
            for(let k in data){
                _data[k] = data[k]
            }
        }
        axios.post(url+"/SmartPillow/web/wxorder/wxOrderStatistics",_data)
             .then((res)=>{
                if(upData){
                    UpData(this.state.date,this.state.amount,this.state.typeData )
                }else{
                    echart(this.state.date,this.state.amount,this.state.typeData)
                }
             })
    }

        render(){
            return(
                <div className={"Data admin"}>
                    <h3>
                        营销报销
                    </h3>    
                    <Search onSearch={this.onSearch} placeholder={"输入酒店，代理商名称"}/>
                    <div className={"Datanav"}>
                        <Radio.Group buttonStyle="solid" onChange={this.onDateType} defaultValue={this.state.typeData}>
                            <Radio.Button value={1}>周</Radio.Button>
                            <Radio.Button value={2}>月</Radio.Button>
                            <Radio.Button value={3}>年</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className={"DateBody"}>
                        <Icon type={"left"}/>
                        <DatePicker onChange={this.onDate} allowClear={false} locale={locale}  defaultValue={moment(initDate, dateFormat)}/>
                        <Icon type={"right"}/>
                    </div>
                    <div className={"echarts1"} style={{"width":"80%","height":"400px"}}></div>
                    <p className={"totalMoney"}>销售总额(元):</p>
                </div>
            )
        }
}




let sEries=[0],
    xAxis =[0];
function echart( _sEries, _xAxis,type){
    if(_sEries.length>0&&_xAxis){
        myChart = echarts.init(document.querySelector('.echarts1')); 
        iftype(type)
        for(let i = 0,idx = _sEries.length;i<idx;i++){
            sEries[i]=_sEries[i]
            xAxis[i] =_xAxis[i]
        }
        myChart.setOption({
            legend:{
                data:"销售量"
            },
            color: ['rgb(60,172,255)'],
            tooltip: {},
            xAxis: {
                data: sEries
            },
            yAxis: {
                
            },
            series: [{
                name:"销售额",
                type: 'bar',
                data: xAxis
            },
        ]
        });
        upData=!upData;
    }
}

function UpData(_sEries,_xAxis,type){
     iftype(type)
        for(let i = 0,idx = _sEries.length;i<idx;i++){
            sEries[i]=_sEries[i]
            xAxis[i] =_xAxis[i]
        }
        let option = myChart.getOption();
        option.xAxis[0].data=sEries;
        option.series[0].data = xAxis;
        myChart.setOption(option)
}
 function iftype(type){
    sEries=[];xAxis =[];
    if(type===1){
         for(let i = 0;i<7;i++){
            sEries.push("-");
            xAxis.push("0")
         }
    }else if(type===2){
        for(let i = 0;i<30;i++){
            sEries.push("-");
            xAxis.push("0")
         }
    }else if(type===3){
        for(let i = 0;i<12;i++){
            sEries.push("-");
            xAxis.push("0")
         }
    }
 }