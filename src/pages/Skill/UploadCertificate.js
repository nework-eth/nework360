import React from 'react'

import { view as UploadItem } from '../../components/UploadItem/UploadItem'

const UploadWrapper = ({ title }) => {
  return (
    <div className="upload-item-wrapper">
      <UploadItem/>
      <p>{ title }</p>
    </div>
  )
}

function UploadAvatar ({ selectedCertification }) {
  return (
    <div className="upload-certificate-container">
      <h2 style={ { marginTop: '50px', marginBottom: '50px' } }>上传证件及本人照片</h2>
      {
        selectedCertification === 'idCard'
          ? <div className="upload-wrapper">
            {
              [ '正面照片（个人信息）', '背面照片（国徽）', '本人照片' ].map(item => <UploadWrapper title={ item } key={ item }/>)
            }
          </div>
          : <div className="upload-wrapper">
            {
              [ '护照个人信息页', '本人照片' ].map(item => <UploadWrapper title={ item }/>)
            }
          </div>
      }
      <p className="introduction">请保证证件及面部信息清晰可见，以保证快速通过认证</p>
      <p className="introduction">你的身份信息不会透露给顾客和其他服务商</p>
    </div>
  )
}

export { UploadAvatar as view }
