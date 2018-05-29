import React from 'react'

import { Upload, Button, message } from 'antd'
import { baseUrl } from '../../service/config'

const props = {
  name: '头像',
  action: `${baseUrl}/qiniu/uploadUserFile`,
  data: { userId: 2, column: 'avatar' },
  onChange (info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`上传成功`)
    } else if (info.file.status === 'error') {
      message.error(`上传失败`)
    }
  },
  showUploadList: false,
}

function UploadAvatar ({ avatarSrc, userId, handleUploadAvatar }) {
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
            onChange={ (info) => {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
              }
              if (info.file.status === 'done') {
                message.success(`上传成功`)
              } else if (info.file.status === 'error') {
                message.error(`上传失败`)
              }
            } }
            showUploadList={ false }
            data={ { userId, column:'avatar' } }
          >
            <Button
              type="primary"
              style={ {
                width: '160px',
                height: '50px',
              } }
            >选择图片</Button>
          </Upload>
        </div>
      </div>
    </div>
  )
}

export { UploadAvatar as view }
