import React from 'react'

// import { Input, Select } from 'antd'

function UploadAvatar ({selectedType}) {
  return (
    <div>
      <h2 style={ { marginTop: '50px' } }>上传证件及本人照片</h2>
      <div>
        <div>upload</div>
        <div>upload</div>
        <div>upload</div>
      </div>
      <p>请保证证件及面部信息清晰可见，以保证快速通过认证</p>
      <p>你的身份信息不会透露给顾客和其他服务商</p>
    </div>
  )
}

export { UploadAvatar as view }


