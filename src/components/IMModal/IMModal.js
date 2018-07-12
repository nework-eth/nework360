import { Button, Input, Modal } from 'antd'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import './static/style/index.less'

const {TextArea} = Input
const classNameSpace = 'im'

class IMModal extends Component {
  state = {
    rateValue: 0,
    textAreaValue: '',
  }

  jumpToDemand = () => {
    browserHistory.push({pathname: '/need-detail', state: {needsId: '201806251010289473493322'}})
  }

  render () {
    const {
      visible,
      needsId,
      nickname,
      phoneNumber,
      handleCancel,
      handleSubmit,
      jumpToDemand,
    } = this.props
    const {
      rateValue,
      textAreaValue,
    } = this.state
    return (
      <Modal
        title={ <h2>{ nickname }</h2> }
        visible={ visible }
        style={ {
          top: '0',
          paddingBottom: '0',
          left: 'calc(50% - 260px)',
        } }
        maskStyle={ {
          opacity: 0.9,
          backgroundColor: '#edf1f4',
        } }
        bodyStyle={ {
          height: 'calc(100vh - 70px)',
          borderRadius: '4px',
          boxShadow: '0 0 10px 0 rgba(9,34,53,0.10)',
        } }
        footer={ null }
        onCancel={ handleCancel }
      >
        <div className="im-container">
          <div className="im-top-wrapper">
            <p>{ phoneNumber }</p>
            <p><span onClick={ this.jumpToDemand }>查看需求</span><span>投诉</span></p>
          </div>
          <div className="im-content-wrapper">

          </div>
          <div className="im-input-wrapper">
            <TextArea
              rows={ 6 }
              value={ textAreaValue }
              style={ {padding: '13px 20px', resize: 'none', marginBottom: '20px'} }
              onChange={ this.handleTextAreaValueChange }
              placeholder="在这里输入您要发送的消息…"
            />
            <Button>发送</Button>
          </div>
        </div>
      </Modal>
    )
  }

  componentDidMount () {

  }
}

export { IMModal }