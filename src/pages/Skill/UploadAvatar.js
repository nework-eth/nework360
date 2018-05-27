import React from 'react'

import { Upload, Button, message } from 'antd'

const props = {
  name: 'file',
  action: 'http://localhost:8080/qiniu/uploadUserFile',
  data: { userId: 2, column: 'avatar' },
  onChange (info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  showUploadList: false,
}

function UploadAvatar ({ selectedType }) {
  return (
    <div>
      <h2 style={ { marginTop: '50px' } }>上传一张您的头像照片或者Logo图案？</h2>
      <img src="" alt="" width={200} height={200}/>
      <div>
        <Upload { ...props }>
          <Button type="upload">选择图片</Button>
        </Upload>
      </div>
    </div>
  )
}

export { UploadAvatar as view }
