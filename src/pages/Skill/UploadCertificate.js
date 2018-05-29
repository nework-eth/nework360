import React from 'react'

import { view as UploadItem } from '../../components/UploadItem/UploadItem'

const UploadWrapper = ({ title, uploadUrl, userId, column }) => {
  return (
    <div className="upload-item-wrapper">
      <UploadItem
        action={ uploadUrl }
        userId={ userId }
        column={ column }
      />
      <p>{ title }</p>
    </div>
  )
}

function UploadAvatar ({ selectedCertification, uploadUrl, userId }) {
  return (
    <div className="upload-certificate-container">
      <h2 style={ { marginTop: '50px', marginBottom: '50px' } }>上传证件及本人照片</h2>
      {
        selectedCertification === 'idCard'
          ? <div className="upload-wrapper">
            {
              [
                {
                  title: '正面照片（个人信息）',
                  column: 'id_card_positive',
                },
                {
                  title: '背面照片（国徽）',
                  column: 'id_card_negative',
                },
                {
                  title: '本人照片',
                  column: 'photo',
                },
              ].map(({ title, column }) => <UploadWrapper
                title={ title }
                key={ title }
                uploadUrl={ uploadUrl }
                userId={ userId }
                column={ column }
              />)
            }
          </div>
          : <div className="upload-wrapper">
            {
              [
                {
                  title: '护照个人信息页',
                  column: 'passport_pic',
                },
                {
                  title: '本人照片',
                  column: 'photo',
                },
              ].map(({ title, column }) => <UploadWrapper
                title={ title }
                uploadUrl={ uploadUrl }
                userId={ userId }
                column={ column }
              />)
            }
          </div>
      }
      <p className="introduction">请保证证件及面部信息清晰可见，以保证快速通过认证</p>
      <p className="introduction">你的身份信息不会透露给顾客和其他服务商</p>
    </div>
  )
}

export { UploadAvatar as view }
