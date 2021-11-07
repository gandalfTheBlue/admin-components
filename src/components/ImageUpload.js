import 'antd/es/modal/style'
import 'antd/es/slider/style'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import React from 'react'
import { apiBaseImg } from 'src/config'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file, callback) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    callback({ valid: false, message: '请上传JPG或PNG格式的照片' })
    return false
  }
  return true
}

class ImageUpload extends React.Component {
  state = {
    loading: false,
    imageUrl: this.props.imageUrl,
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, imageUrl: nextProps.imageUrl })
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.props.callback(info.file.response.data.url)
        this.setState({
          imageUrl,
          loading: false,
        })
      })
    }
  }

  getUpload = (imageUrl, uploadButton) => {
    return (
      <Upload
        disabled={this.props.disabled}
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={apiBaseImg}
        beforeUpload={(file) => beforeUpload(file, this.props.callback)}
        onChange={this.handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="图片" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    )
  }

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">照片</div>
      </div>
    )
    const { imageUrl } = this.state

    return this.getUpload(imageUrl, uploadButton)
  }
}

export default ImageUpload
