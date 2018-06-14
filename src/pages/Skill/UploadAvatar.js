import { Button, message, Upload } from 'antd'
import React, { Component } from 'react'
import { baseUrl } from '../../service/config'

class UploadAvatar extends Component {
  state = {
    errorTip: '',
  }
  beforeUpload = (file) => {
    this.setState({
      errorTip: '',
    })
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      this.setState({
        errorTip: '请上传5M以内jpg/jpeg/gif/bmp/png格式的图片',
      })
    }
    const typeArray = [ 'image/jpeg', 'image/png', 'image/bmp' ]
    const typeValid = typeArray.includes(file.type)
    if (!typeValid) {
      this.setState({
        errorTip: '请上传5M以内jpg/jpeg/gif/bmp/png格式的图片',
      })
    }
    return isLt5M && typeValid
  }

  render () {
    const { avatarSrc, userId, handleUploadAvatar, updateImageSrc } = this.props
    return (
      <div>
        <h2 style={ { marginTop: '50px', marginBottom: '50px' } }>上传一张您的头像照片或者Logo图案？</h2>
        <div style={ { position: 'relative' } }>
          <img
            src={ avatarSrc || './images/headshot-default.png' }
            alt="头像"
            width={ 200 }
            height={ 200 }
          />
          <img
            src="./images/headshot-mask.png"
            alt="头像蒙层"
            width={ 200 }
            height={ 200 }
            style={ { position: 'absolute', left: 0, top: 0 } }
          />
          <div style={ { marginTop: '20px' } }>
            <Upload
              action={ `${baseUrl}/qiniu/uploadUserFile` }
              beforeUpload={ this.beforeUpload }
              onChange={ (info) => {
                if (info.file.status !== 'uploading') {
                  console.log(info.file, info.fileList)
                }
                if (info.file.status === 'done') {
                  if (info.file.response.code === 200) {
                    updateImageSrc(info.file.response.data.path, 'avatar').then(res => {
                      console.log('res', res)
                      if (res.data.code !== 200) {
                        message.error(res.data.desc)
                        return
                      }
                      handleUploadAvatar(info.file.response.data.path)
                      message.success('上传头像成功')
                    }).catch(e => {
                      message.error('网络连接失败，请检查网络后重试')
                    })
                    return
                  }
                  message.error(info.file.response.desc)
                } else if (info.file.status === 'error') {
                  message.error(`上传失败`)
                }
              } }
              showUploadList={ false }
              data={ { userId, column: 'avatar' } }
            >
              <Button
                type="primary"
                style={ {
                  width: '160px',
                  height: '50px',
                } }
              >
                选择图片
              </Button>
            </Upload>
            <div className="error-tip">
              {
                this.state.errorTip
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export { UploadAvatar as view }
