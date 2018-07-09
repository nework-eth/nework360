import { Input, Modal } from 'antd'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'

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
        </div>
      </Modal>
    )
  }

  componentDidMount () {

  }
}

export { IMModal }