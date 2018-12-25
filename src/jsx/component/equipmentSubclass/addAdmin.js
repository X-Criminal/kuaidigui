import React                                from "react";
import {Button,Input,Select,message,Icon ,InputNumber }  from "antd";
import { Route, Switch, Link}               from 'react-router-dom';
import axios                                from "axios";
import fetchJsonp                           from "fetch-jsonp";

let BMap,marker,map,url,userDeliverys=[{}];
const Option = Select.Option;

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            DhlId:"",

        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url")
    }
    enData=( data ,cb)=>{
        axios.post(url+"/deliveryLockers/web/deliveryLockerManageController/addDeliveryLocker",data)
             .then((res)=>{
                 if(res.data.code ===1000){
                     cb&&cb( );
                     message.success(res.data.message);
                 }else{
                     message.error(res.data.message);
                 }
             })
    }
    render(){
        return(
            <div className={"addAdmin"} style={{"float":"right"}}>
                <Link to={"/equipment/addAdmin"}>
                    <Button type="primary">
                    <i className={"iconfont icon-tianjia"} style={{fontSize:"12px"}}></i>&nbsp;
                        添加快递柜
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

            selectDhl:[],
            queryCourierByDhlId:[],

            number:0,
            GetProvinceByAll:[],
            getCityByParentid:[],
            getAreaByParentid:[],

            serviceCharge:"",
            latitude:0,
            longitude:0,
            layAddreass:"",
            lineNumber:"",
            mac:"",
            name:"",
            payer:"",
            province:"",
            rankNumber:"",
            userDeliverys:[],
            city:"",
            area:"",

            lng:"",
            lat:"",

            isFromData:false,
        }
    }
    componentDidMount(){
        this.initMap( );
        this.getSelectDhl( );
        this.getProvinceByAll( );
     
    }

/**地图*/
    _position=()=>{
        if(this.state.isFromData&&this.state.layAddreass.length>0){
            fetchJsonp("https://api.map.baidu.com/geocoder/v2/?&output=json&address="+this.state.layAddreass+"&ak=YMWpSvrB8HfPaGXFHh1rXb6zDwEjTU5E")
            .then((res)=>{
                return res.json()
            }).then((res)=>{
                let point = new BMap.Point(res.result.location.lng, res.result.location.lat);
                this.setState({longitude:res.result.location.lng,latitude:res.result.location.lat});
                if(marker) map.removeOverlay(marker);
                marker = new BMap.Marker(point); //将点转化成标注点
                map.addOverlay(marker); 
            })
            return false;
        }

            this.setState({
                layAddreass:this.state.lng+","+this.state.lat
            })
            fetchJsonp("https://api.map.baidu.com/geocoder/v2/?callback=callback&location="+this.state.latitude+","+this.state.longitude+"&output=json&pois=1&ak=YMWpSvrB8HfPaGXFHh1rXb6zDwEjTU5E")
                      .then((res)=>{
                          return res.json()
                      }).then((res)=>{
                          this.setState({
                            layAddreass:res.result.sematic_description
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
        map = new BMap.Map("allmap"); // 创建Map实例
        map.centerAndZoom(cityName, 10); // 初始化地图,设    置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        //map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        
        map.addEventListener('click', function (e) {
            let data={};
            _this.setState({
                longitude:e.point.lng,
                latitude:e.point.lat,
                isFromData:false
            })
            data.lng = e.point.lng;
            data.lat = e.point.lat;
            let point = new BMap.Point(data.lng, data.lat); //将标注点转化成地图上的点
            if(marker) map.removeOverlay(marker );
            marker = new BMap.Marker(point); //将点转化成标注点
            map.addOverlay(marker); 
        })
    }
    /**地图-END-*/
        arr={}
    /**快递公司 */
        getSelectDhl=()=>{
            axios.post(url+"/deliveryLockers/wx/expressDeliveryController/selectDhl")
                .then((res)=>{
                        if(res.data.code===1000){
                            this.setState({
                                selectDhl:res.data.data
                            })
                        }else{
                            message.error(res.data.message)
                        }
                })
        }
    /**快递公司-END- */
    onAddCourier=()=>{
        userDeliverys.push({})
        this.setState({
            number:this.number+1
        })
    }
    /**服务费 */
    Number=(e)=>{
        this.setState({
            serviceCharge:e
        })
    }
    /**付款方 */
    payer=(e)=>{
        this.setState({
            payer:e
        })
    }
    onchange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        })
    }
    /**获取省市 */
     getProvinceByAll=()=>{
        axios.post(url+"/deliveryLockers/wx/CountryController/getProvinceByAll")
             .then((res)=>{
                if(res.data.code===1000){
                    this.setState({
                        GetProvinceByAll:res.data.data
                    })
                }
             })
     }
     /**-----省------ */
     getParentid=(e)=>{
        this.setState({
            province:e
        })
        if(typeof e !=="undefined") this.getCityByParentid(e);
     }
     /**市 */
     getCityByParentid=(id)=>{
         axios.post(url+"/deliveryLockers/wx/CountryController/getCityByParentid",{parentid:id})
              .then((res)=>{
                  if(res.data.code===1000){
                        this.setState({
                            getCityByParentid:res.data.data,
                        })
                  }
              })
     }
     getGradeid=(e)=>{
         this.setState({
            city:e
         })
       this.getAreaByParentid(e)
     }
     /**区 */
     getAreaByParentid=(id)=>{
         axios.post(url+"/deliveryLockers/wx/CountryController/getAreaByParentid",{"parentid":id})
              .then((res)=>{
                    if(res.data.code===1000){
                        this.setState({
                            getAreaByParentid:res.data.data
                        })
                    }
              })
     }
     getArea=(e)=>{
        this.setState({
            area:e
        })
     }
    /**------省市-END------ */
    layAddreass=(e)=>{
        this.setState({
            isFromData:true,
            layAddreass:e.target.value
        })
    }
    /**提交数据 */
    onData=()=>{
        let data = {
            serviceCharge:this.state.serviceCharge,
            latitude:this.state.latitude,
            longitude:this.state.longitude,
            layAddreass:this.state.layAddreass,
            lineNumber:this.state.lineNumber,
            mac:this.state.mac,
            name:this.state.name,
            payer:this.state.payer,
            province:this.state.province,
            rankNumber:this.state.rankNumber,
            userDeliverys:userDeliverys,
            city:this.state.city,
            area:this.state.area
        }
        this.props.enData(data,()=>{
            window.history.go(-1)
        })
    }
    render(){
            return(
                <div className={"addAdminBox equipAdd"}>
                        <div>
                              <h3> <Link to={"/equipment"}>设备管理</Link>>添加快递柜</h3>
                              <div className={"addAdminData"}>
                                    <div key={0} className={"text"}>
                                       <span>
                                           设备编号
                                       </span>
                                       <Input name={"mac"} onChange={this.onchange}/>
                                   </div>
                                   <div key={1} className={"text"}>
                                       <span>
                                           快递柜名称
                                       </span>
                                       <Input name={"name"} onChange={this.onchange}/>
                                   </div>
                                   <div key={2} className={"text"}>
                                       <span>
                                           快递柜行数
                                       </span>
                                       <Input name={"lineNumber"} onChange={this.onchange}/>
                                   </div>
                                   <div key={3} className={"text"}>
                                       <span>
                                           快递号列数
                                       </span>
                                       <Input name={"rankNumber"} onChange={this.onchange} />
                                   </div>
                                   <div className={"text"}>
                                       <span>
                                           安装地区
                                       </span>
                                       <Select style={{ width: 140 }} placeholder={"省"} onChange={this.getParentid}  allowClear={true}>
                                           {this.state.GetProvinceByAll.map((item,index)=><Option key={index} value={item.id}>{item.name}</Option>)}
                                        </Select>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Select style={{ width: 140 }} placeholder={"市"} onChange={this.getGradeid}  allowClear={true}>
                                           { this.state.getCityByParentid.map((item,index)=><Option key={index} value={item.id}>{item.name}</Option>)}
                                        </Select>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Select style={{ width: 140 }} placeholder={"区"} onChange={this.getArea}  allowClear={true}>
                                           { this.state.getAreaByParentid.map((item,index)=><Option key={index} value={item.id}>{item.name}</Option>)}
                                        </Select>
                                   </div>
                                   <div key={5} className={"text"}>
                                       <span>
                                           安装地址
                                       </span>
                                       <Input name={"map"} value={this.state.layAddreass} onChange={this.layAddreass}/>&nbsp;&nbsp;
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
                                       <InputNumber style={{ width: 500,height:36 }} name={"serviceCharge"} onChange={this.Number} />&nbsp;&nbsp;<b>元/次</b>
                                   </div>
                                   <div className={"text"}>
                                       <span>
                                           付款方
                                       </span>
                                       <Select style={{ width: 500 }} name={"payer"} onChange={this.payer}>
                                            <Option value="1">存件方</Option>
                                            <Option value="2">取件方</Option>
                                        </Select>
                                   </div>
                                        {userDeliverys.map((item,index)=><App2 onAddCourier={this.onAddCourier} key={index} index={index} selectDhl={this.state.selectDhl} number={this.state.number}></App2>)}
                                   <div className={"text postBtn"}>
                                       <span>
                                       </span>
                                        <Button onClick={this.onData}>提交</Button>
                                   </div>
                              </div>
                        </div>
                </div>
            )
    }
}



class App2 extends React.Component{
    constructor(props){
        super(props)
        this.state={
            queryCourierByDhlId:[],
        }
    }
    getDhlId=(e)=>{
        if(typeof e ==="undefined"){ userDeliverys[this.props.index]["dhlId"]="";userDeliverys[this.props.index]["userId"] =""}
        this.queryCourierByDhlId(e)
        userDeliverys[this.props.index]["dhlId"] = e
    }
    /**快递员 */
        queryCourierByDhlId=(id)=>{
            axios.post(url+"/deliveryLockers/web/deliveryLockerManageController/queryCourierByDhlId",{dhlId:id})
                .then((res)=>{
                    if(res.data.code===1000&&res.data.message!=="没有数据"){
                        this.setState({
                            queryCourierByDhlId:res.data.data,
                        })
                    }else{
                        this.setState({
                            queryCourierByDhlId:[],
                        })
                    }
                }).catch(()=>{
                    this.setState({
                        queryCourierByDhlId:[],
                    })
                })
        }
        CourierByDhlId=(e)=>{
                if(typeof e ==="undefined")  userDeliverys[this.props.index]["userId"] = "";
                 userDeliverys[this.props.index]["userId"] = e;
        }
        /**快递员 -END*/
    render(){
        return(
            <div className={"text"}>
            <span>
                {this.props.index===0?"绑定快递员":""}
            </span>
            <Select style={{ width: 240 }} placeholder={"选择快递公司"} onChange={this.getDhlId}  allowClear={true}>
                 {this.props.selectDhl.map((item,index)=><Option key={index} value={item.id}>{item.name}</Option>)}
             </Select>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <Select style={{ width: 240 }} placeholder={"选择快递员"} onChange={this.CourierByDhlId} allowClear={true}>
                {this.state.queryCourierByDhlId.map((item,index)=> <Option key={index} value={item.userId}>{item.name}</Option>)}
             </Select>
             {
                 this.props.index===0?<Button style={{height:"30px",marginLeft:"15px"}} onClick={this.props.onAddCourier}><Icon type="plus"/></Button>:null
             }
            </div>
        )
    }
}