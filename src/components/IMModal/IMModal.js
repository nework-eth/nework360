import { Input, Modal } from 'antd'
import React, { Component } from 'react'

const {TextArea} = Input
const classNameSpace = 'im'

class IMModal extends Component {
  state = {
    rateValue: 0,
    textAreaValue: '',
  }

  render () {
    const {
      visible,
      nickname,
      handleCancel,
      handleSubmit,
    } = this.props
    const {
      rateValue,
      textAreaValue,
    } = this.state
    return (
      <Modal
        title={ <h2>Rennaiqian</h2> }
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
        <div>
          <div>
            <p>17756119429</p>
            <p><span>查看需求</span><span>投诉</span></p>
          </div>
        </div>
      </Modal>
    )
  }

  componentDidMount () {

  }
}

export { IMModal }