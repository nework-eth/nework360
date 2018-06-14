import React from 'react'

import { view as UploadItem } from '../../components/UploadItem/UploadItem'

import './static/style/index.less'

const UploadWrapper = ({ title, uploadUrl, userId, column, src, handleUpload, updateImageSrc }) => {
  return (
    <div className="upload-item-wrapper">
      <UploadItem
        action={ uploadUrl }
        userId={ userId }
        column={ column }
        src={ src }
        handleUpload={ handleUpload }
        updateImageSrc={ updateImageSrc }
      />
      <p>{ title }</p>
    </div>
  )
}

function UploadCerificate ({
                             selectedCertification,
                             uploadUrl,
                             userId,
                             idCardPositiveSrc,
                             idCardNegativeSrc,
                             photoSrc,
                             passportSrc,
                             handleUpload,
                             updateImageSrc,
                           }) {
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
                  src: idCardPositiveSrc,
                  type: 'idCardPositiveSrc',
                },
                {
                  title: '背面照片（国徽）',
                  column: 'id_card_negative',
                  src: idCardNegativeSrc,
                  type: 'idCardNegativeSrc',
                },
                {
                  title: '本人照片',
                  column: 'photo',
                  src: photoSrc,
                  type: 'photoSrc',
                },
              ].map(({ title, column, src, type }) => <UploadWrapper
                title={ title }
                key={ title }
                uploadUrl={ uploadUrl }
                userId={ userId }
                column={ column }
                src={ src }
                updateImageSrc={ updateImageSrc }
                handleUpload={ handleUpload(type) }
              />)
            }
          </div>
          : <div className="upload-wrapper">
            {
              [
                {
                  title: '护照个人信息页',
                  column: 'passport_pic',
                  src: passportSrc,
                  type: 'passportSrc',
                },
                {
                  title: '本人照片',
                  column: 'photo',
                  src: photoSrc,
                  type: 'photoSrc',
                },
              ].map(({ title, column, src, type }) => <UploadWrapper
                title={ title }
                uploadUrl={ uploadUrl }
                userId={ userId }
                column={ column }
                src={ src }
                updateImageSrc={ updateImageSrc }
                handleUpload={ handleUpload(type) }
              />)
            }
          </div>
      }
      <p className="introduction"><i className="iconfont icon-identity-tip"
        style={ { fontSize: '16px' } }/>&nbsp;请保证证件及面部信息清晰可见，以保证快速通过认证</p>
      <p className="introduction"><i className="iconfont icon-identity-lock"
        style={ { fontSize: '16px' } }/>&nbsp;你的身份信息不会透露给顾客和其他服务商</p>
    </div>
  )
}

export { UploadCerificate as view }
