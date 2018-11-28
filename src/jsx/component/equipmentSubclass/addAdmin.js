import React                        from "react";
import {Button,Input,Select }              from "antd";
import { Route, Switch, Link}       from 'react-router-dom';
import fetchJsonp                   from "fetch-jsonp";

let BMap,marker;
const Option = Select.Option;

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    enData=( data ,cb)=>{
        this.props.addAdmin(data,(res)=>{
            cb&&cb()
        })
    }
    render(){
        return(
            <div className={"addAdmin"} style={{"float":"right"}}>
                <Link to={"/equipment/addAdmin"}>
                    <Button type="primary">
                    <i className={"iconfont icon-tianjia"} style={{fontSize:"12px"}}></i>&nbsp;
                        添加管理员
                    </Button>
                </Link>
                <Switch>
                    <Route  path="/equipment/addAdmin"     render={ ()=> <AddAmin enData={this.enData}/>}/>
                </Switch>
            </div>
        )

    }
}

class AddAmin extends React.Component{
    constructor(props){
        super(props)
        this.state={

            isPosition:false,
            positionTxt:"",
        }
    }
    componentDidMount(){
        this.initMap()
    }

    _position=()=>{
            this.setState({
                positionTxt:this.state.lng+","+this.state.lat
            })
            fetchJsonp("http://api.map.baidu.com/geocoder/v2/?callback=callback&location="+this.state.lat+","+this.state.lng+"&output=json&pois=1&ak=YMWpSvrB8HfPaGXFHh1rXb6zDwEjTU5E")
                      .then((res)=>{
                          return res.json()
                      }).then((res)=>{
                          this.setState({
                            positionTxt:res.result.formatted_address+","+res.result.sematic_description
                          })
                      })
            
    }
    initMap=()=>{
        let _this = this;
            BMap = window.BMap
        var myCity = new BMap.LocalCity(); 
        myCity.get(_this.getCityByIP)
    }
    getCityByIP=(rs)=>{
        let _this =this;
        let cityName = rs.name;
        var map = new BMap.Map("allmap"); // 创建Map实例
        map.centerAndZoom(cityName, 10); // 初始化地图,设    置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        //map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        
        map.addEventListener('click', function (e) {
            let data={};
            _this.setState({
                lng:e.point.lng,
                lat:e.point.lat
            })
            data.lng = e.point.lng;
            data.lat = e.point.lat;
            let point = new BMap.Point(data.lng, data.lat); //将标注点转化成地图上的点
            if(marker) map.removeOverlay(marker );
            marker = new BMap.Marker(point); //将点转化成标注点
            map.addOverlay(marker); 
        })

    }

        render(){
            return(
                <div className={"addAdminBox equipAdd"}>
                        <div>
                              <h3> <Link to={"/equipment"}>快递柜管理</Link>>添加快递柜</h3>
                              <div className={"addAdminData"}>
                                   <div key={1} className={"text"}>
                                       <span>
                                           快递柜名称
                                       </span>
                                       <Input name={"telephone"} onChange={this.onchange} onFocus={this.onfocus}/>
                                   </div>
                                   <div key={2} className={"text"}>
                                       <span>
                                           快递柜行数
                                       </span>
                                       <Input name={"password"} onChange={this.onchange} onFocus={this.onfocus}/>
                                   </div>
                                   <div key={3} className={"text"}>
                                       <span>
                                           快递号列数
                                       </span>
                                       <Input name={"name"} onChange={this.onchange} onFocus={this.onfocus}/>
                                   </div>
                                   <div key={5} className={"text"}>
                                       <span>
                                           安装地址
                                       </span>
                                       <Input name={"map"} value={this.state.positionTxt} disabled/>&nbsp;&nbsp;
                                       <Button onClick={this._position}>地图选择</Button>
                                   </div>
                                   <div key={4} className={"text map clear-fix"}>
                                       <span>&nbsp;</span>
                                       <div id={"allmap"}></div>
                                    </div>
                                    <div className={"text"}>
                                       <span>
                                           服务费
                                       </span>
                                       <Input name={"name"} onChange={this.onchange} onFocus={this.onfocus}/>&nbsp;&nbsp;<b>元/次</b>
                                   </div>
                                   <div className={"text"}>
                                       <span>
                                           付款方
                                       </span>
                                       <Select style={{ width: 500 }}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled">Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                   </div>
                                   <div className={"text"}>
                                       <span>
                                           绑定快递员
                                       </span>
                                       <Select style={{ width: 240 }} placeholder={"选择快递公司"}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled">Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Select style={{ width: 240 }} placeholder={"选择快递员"}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled">Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                   </div>
                                   <div className={"text postBtn"}>
                                       <span>
                                           
                                       </span>
                                        <Button>提交</Button>
                                   </div>
                              </div>
                        </div>
                </div>
            )
        }
}