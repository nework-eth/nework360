import { Button, Input, Modal } from 'antd'
import React, { Component } from 'react'

const {TextArea} = Input

class QuoteModal extends Component {
  state = {
    value: '',
    textAreaValue: '',
  }

  handleTextAreaValueChange = (e) => {
    let str = e.target.value
    if (str.length > 200) {
      str = str.slice(0, 200)
    }
    this.setState({textAreaValue: str})
  }

  render () {
    const {
      visible,
      handleCancel,
      handleSubmit,
    } = this.props
    const {
      value,
      textAreaValue,
    } = this.state
    return (
      <Modal
        title={ <h2>报价</h2> }
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
            value={ value }
            style={ {
              paddingLeft: '20px',
            } }
            onChange={ e => this.setState({value: e.target.value}) }
            placeholder="请输入"
          />
          <p style={ {
            marginTop: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
          } }>
            填写报价说明 <span style={ {color: '#9ca6ae'} }>选填</span>
          </p>
          <TextArea
            rows={ 6 }
            value={ textAreaValue }
            style={ {padding: '13px 20px', resize: 'none', marginBottom: '20px'} }
            onChange={ this.handleTextAreaValueChange }
            placeholder="请输入"
          />
          <p>本次报价需消耗 5 张线索卡，提交报价后将自动扣除</p>
          <div style={ {marginTop: '20px'} }>
            <Button
              type="primary"
              style={ {
                width: '160px',
                height: '50px',
                marginRight: '20px',
              } }
              onClick={ () => handleSubmit(this.state.value, this.state.textAreaValue) }
            >
              提交报价
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

export { QuoteModal }

