import React               from "react";
import { Upload, message } from 'antd';




let url;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg'||"image/png"||"image/bpm";
    if (!isJPG) {
      message.error('图片格式不正确！');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error('请上传小于10m的图片');
    }
    return isJPG && isLt2M;
  }

  export default class Avatar extends React.Component {
    state = {
      loading: false,
    };
    componentWillMount(){
        url = sessionStorage.getItem("url")
    }
    handleChange = (info) => {
        if(info.file.response){
            this.props.upimg(info.file.response)
        }
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({
          imageUrl,
          loading: false,
        }));
      }
    }
  
    render() {
      const uploadButton = (
        <div style={{width:"100%"}}>
          <div className="ant-upload-text">请选择图片</div>
        </div>
      );
      const imageUrl = this.state.imageUrl;
      return (
        <Upload
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={url+"SmartPillow//web/hotel/uploadBusinesslicense"}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
      );
    }
  }