import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd'

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload (file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}

class UploadItem extends Component {
  state = {
    loading: false,
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }))
    }
  }

  render () {
    const uploadButton = (
      <div>
        <Icon type={ this.state.loading ? 'loading' : 'plus' }/>
      </div>
    )
    const imageUrl = this.state.imageUrl
    const { action, column, userId } = this.props
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="upload-item"
        showUploadList={ false }
        action={ action }
        data={
          {
            userId,
            column,
          }
        }
        beforeUpload={ beforeUpload }
        onChange={ this.handleChange }
      >
        { imageUrl ? <img src={ imageUrl } alt="avatar"/> : uploadButton }
      </Upload>
    )
  }
}

export { UploadItem as view }