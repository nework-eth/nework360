import { Button, Input } from 'antd'
import React from 'react'

const ModalForm = (
  {
    modalType,
    data: {phoneNumber, email},
    phoneCode,
    handleModalCancel,
    getPhoneCode,
    getMailCode,
    handleInput,
    handlePhoneCodeChange,
    handleMailCodeChange,
    verifyPhoneNumber,
    verifyEmail,
    handleSave,
    mailCode,
    emailDisabledTime,
    messageCodeDisabledTime,
  },
) => {
  switch (modalType) {
    case 'phoneNumber':
      return (<div className="edit-data-modal-form-container">
        <div className="form-item">
          <p className="title">手机号码</p>
          <Input value={ phoneNumber } onChange={ handleInput('phoneNumber') }/>
        </div>
        <div className="form-item">
          <p className="title">短信验证码</p>
          <div className="message-wrapper">
            <Input
              value={ phoneCode }
              style={ {
                width: '70%',
              } }
              onChange={ handlePhoneCodeChange }
            />
            <Button
              className="message-button"
              onClick={ getPhoneCode }
              disabled={ messageCodeDisabledTime }
            >
              { messageCodeDisabledTime ? `${messageCodeDisabledTime}S` : '获取验证码' }
            </Button>
          </div>
        </div>
        <div className="form-item">
          <Button type="primary" onClick={ verifyPhoneNumber }>确认</Button>
          <Button onClick={ handleModalCancel }>取消</Button>
        </div>
      </div>)
    case 'email':
      return (<div className="edit-data-modal-form-container">
        <div className="form-item">
          <p>邮箱地址</p>
          <Input value={ email } onChange={ handleInput('email') }/>
        </div>
        <div className="form-item">
          <p>邮箱验证码</p>
          <div className="message-wrapper">
            <Input
              value={ mailCode }
              style={ {
                width: '70%',
              } }
              onChange={ handleMailCodeChange }
            />
            <Button
              className="message-button"
              onClick={ getMailCode }
              disabled={ emailDisabledTime }
            >
              { emailDisabledTime ? `${emailDisabledTime}S` : '获取验证码' }
            </Button>
          </div>
        </div>
        <div className="form-item">
          <Button type="primary" onClick={ verifyEmail }>确认</Button>
          <Button onClick={ handleModalCancel }>取消</Button>
        </div>
      </div>)
    default:
      return null
  }
}

export { ModalForm as view }