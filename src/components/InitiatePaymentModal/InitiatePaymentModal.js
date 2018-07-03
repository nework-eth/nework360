import { Button, Input, Modal } from 'antd'
import React, { Component } from 'react'

class InitiatePaymentModal extends Component {
  state = {
    value: '',
  }

  render () {
    const {
      visible,
      handleCancel,
      handleSubmit,
    } = this.props
    return (
      <Modal
        title={ <h2>投诉</h2> }
        visible={ visible }
        style={ {
          top: 'calc(50% - 205px)',
        } }
        maskStyle={ {
          backgroundColor: '#edf1f4',
          opacity: 0.9,
        } }
        bodyStyle={ {
          width: '520px',
          boxShadow: '0 0 10px 0 rgba(9,34,53,0.10)',
          borderRadius: '4px',
        } }
        footer={ null }
        onCancel={ handleCancel }
      >
        <div>
          <p style={ {
            fontWeight: 'bold',
            marginBottom: '10px',
          } }>
            输入收款金额
          </p>
          <Input
            onChange={ e => this.setState({value: e.target.value}) }
            placeholder="请输入"
          />
          <div style={ {marginTop: '30px'} }>
            <Button
              type="primary"
              style={ {
                width: '160px',
                height: '50px',
                marginRight: '20px',
              } }
              onClick={ () => handleSubmit(this.state.value) }
            >
              发起收款
            </Button>
            <Button
              style={ {
                width: '160px',
                height: '50px',
              } }
              onClick={ handleCancel }
            >
              取消
            </Button>
          </div>
        </div>
      </Modal>
    )
  }
}

export { InitiatePaymentModal }

