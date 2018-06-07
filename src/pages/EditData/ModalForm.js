import { Button, Input } from 'antd'
import React from 'react'

const ModalForm = (
  {
    modalType,
    data: { phoneNumber, email },
    messageCode,
    handleModalCancel,
    getMessageCode,
    handleInput,
    handleMessageCodeChange,
    verifyPhoneNumber,
    handleSave,
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
              value={ messageCode }
              style={ {
                width: '70%',
              } }
              onChange={ handleMessageCodeChange }
            />
            <Button
              className="message-button"
              onClick={ getMessageCode }
            >
              获取验证码
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
          <Input value={ email }/>
        </div>
        <div className="form-item">
          <p>邮箱验证码</p>
          <div className="message-wrapper">
            <Input
              value={ messageCode }
              style={ {
                width: '70%',
              } }
            />
            <Button
              className="message-button"
            >
              获取验证码
            </Button>
          </div>
        </div>
        <div className="form-item">
          <Button type="primary">确认</Button>
          <Button onClick={ handleModalCancel }>取消</Button>
        </div>
      </div>)
    default:
      return null
  }
}

export { ModalForm as view }