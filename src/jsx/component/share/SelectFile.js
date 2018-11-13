import React                             from "react";
import { Upload, Button, Icon, message } from 'antd';
import reqwest from 'reqwest';


let url;
class Demo extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  }
  componentWillMount=()=>{
     url  = sessionStorage.getItem("url")
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      if(this.props.idHotel){
        formData.append("idHotel",this.props.idHotel)
      }
      console.log(this.props.idHotel)
      formData.append('file', file);
      console.log(formData)
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    reqwest({
      url:url+this.props.url||"",
      method: 'post',
      processData: false,
      data: formData,
      success: (res) => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success(res.message);
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  }

  render() {
    const { uploading } = this.state;
    const props = {
      action:url+this.props.url||"",
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    return (
      <div className={"upload clear-fix"}>
        <Upload {...props}>
          <Button type={"primary"}>
            <Icon type="upload" /> 导入数据
          </Button>
        </Upload>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUpload}
          disabled={this.state.fileList.length === 0}
          loading={uploading}
          style={this.state.fileList.length === 0?{"display":"none"}:{"display":"block"}}
        >
          确定上传
        </Button>
      </div>
    );
  }
}

export default Demo;