import React,{Component}        from "react";
import {Icon,Steps ,message}                   from "antd";
//import {Link}                   from "react-router-dom";
import axios    from "axios"
const Step = Steps.Step;
let url ,id;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            lookLog:{},

            isloading:false,
        }
    }
    
    componentWillMount(){
        url = sessionStorage.getItem("url");
        //id =JSON.parse(window.decodeURIComponent(this.props.match.params.data));
        id =JSON.parse(window.decodeURIComponent(window.location.hash.split("/info")[1]));

       console.log(id)
    }
    componentDidMount(){
        this.lookLogistics( )
    }

    lookLogistics=()=>{
        axios.post(url+"/deliveryLockers/wx/personalCenterController/lookLogistics",{dhlCoding:id.dhlCoding,logisticCode:id.logisticCode})
             .then((res)=>{
                 if(res.data.code===1000&&res.data.message==="操作成功！"){
                     if(res.data.data){
                        this.setState({
                            lookLog:res.data.data,
                            isloading:true
                         })
                     }else{
                        this.setState({
                            lookLog:{ }
                         })
                     }
                 }else{
                     message.error(res.data.message)
                     this.setState({
                        lookLog:{},
                        isloading:true
                     })
                 }
             }).catch((res)=>{
                 this.setState({
                    isloading:true
                 })
             })
    }
    onGO=()=>{
        window.history.go(-1)
    }
    render(){
        let data = this.state.lookLog;
        return(
            <div className={"infoBox"}>
                    <div>
                        <h3>物流信息  <span onClick={this.onGO} style={{color:"#cecece",float:"right",cursor:"pointer"}}><Icon type="close"/></span></h3>
                        <div className={"info-title"}>
                            <div className={"_img"}>
                                <img src={url+id.logo} style={{width:"100%"}}/>
                            </div>
                            <div className={"title-info"}>
                                <p>物流公司：{id.dhlName}</p>
                                <p>物流编号：{data.LogisticCode}</p>
                                <p>物流电话：{id.serviceCall}</p>
                            </div>
                            {data.Traces&&data.Traces.length>0?
                            <Steps direction="vertical" size="small" current={data.Traces.length-1}>
                                {data.Traces.map((item,index)=> <Step key={index} title={item.AcceptTime}  description={item.AcceptStation} icon={<i className="iconfont icon-buzou"></i>}/>)}
                                {/* <Step title="finish"    description="This is a description." icon={<i className="iconfont icon-buzhou"></i>}/>
                                <Step title="wait"      description="This is a description." icon={<i className="iconfont icon-buzou"></i>}/>
                                <Step title="wait"      description="This is a description." icon={<i className="iconfont icon-buzou"></i>}/> */}
                            </Steps>:
                            <div>
                                {
                                    this.state.isloading?<span>暂无物流轨迹</span>:<span>信息获取中----<Icon type="loading" /></span>
                                }
                            </div>
                            }
                        </div>
                    </div>
            </div>
        )
    }
}