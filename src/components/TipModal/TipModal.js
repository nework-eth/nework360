import { Button, Modal } from 'antd'
import React, { Component } from 'react'

class TipModal extends Component {
  render () {
    return (
      <Modal
        title={ <h2>线索卡不足</h2> }
        visible={ this.props.visible }
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
        onCancel={ this.props.handleCancel }
      >
        <div>
          <p>本次报价需消耗 <span
            style={ {color: '#008bf7'} }>{ this.props.clueCount }</span> 张线索卡，您的线索卡余量为{ this.props.count }张</p>
          <Button
            type="primary"
            onClick={ this.props.handleConfirm }
            style={ {
              marginTop: '60px',
              marginRight: '20px',
              width: '160px',
              height: '50px',
            } }
          >
            去购买
          </Button>
          <Button
            onClick={ this.props.handleCancel }
            style={ {
              marginTop: '60px',
              width: '160px',
              height: '50px',
            } }
          >
            取消
          </Button>
        </div>
      </Modal>
    )
  }
}

export { TipModal }

