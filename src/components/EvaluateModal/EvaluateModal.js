import { Button, Input, Modal, Rate } from 'antd'
import React, { Component } from 'react'

const {TextArea} = Input

// function EvaluateModal ({
//                           visible,
//                           nickname,
//                           handleCancel,
//                           handleSubmit,
//                         }) {
//   return (
//     <Modal
//       title={ <h2>填写对 { nickname } 的评价</h2> }
//       visible={ visible }
//       style={ {top: 'calc(50% - 205px)'} }
//       maskStyle={ {
//         backgroundColor: '#edf1f4',
//         opacity: 0.9,
//       } }
//       bodyStyle={ {
//         width: '520px',
//         boxShadow: '0 0 10px 0 rgba(9,34,53,0.10)',
//         borderRadius: '4px',
//       } }
//       footer={ null }
//       onCancel={ handleCancel }
//     >
//       <div>
//         <p>发送您要投诉的用户联系方式及投诉内容到邮箱：</p>
//         <p>wangqi@pmcaff.com</p>
//         <Button
//           onClick={ handleCancel }
//           type="primary"
//           style={ {
//             marginTop: '40px',
//             width: '160px',
//             height: '50px',
//           } }
//         >
//           知道了
//         </Button>
//       </div>
//     </Modal>
//   )
// }

class EvaluateModal extends Component {
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
        title={ <h2>填写对 { nickname } 的评价</h2> }
        visible={ visible }
        style={ {top: 'calc(50% - 205px)'} }
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
          <Rate
            allowHalf
            defaultValue={ rateValue }
            character={ <i className="iconfont icon-rate-star-full" style={ {fontSize: '30px'} }/> }
            onChange={ (rateValue) => this.setState({rateValue}) }
          />
          <p style={ {
            marginTop: '30px',
            fontWeight: 'bold',
            marginBottom: '10px',
          } }>
            评价内容
          </p>
          <TextArea
            rows={ 6 }
            value={ textAreaValue }
            style={ {padding: '13px 20px', resize: 'none'} }
            onChange={ (e) => this.setState({textAreaValue: e.target.value}) }
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
              onClick={ () => handleSubmit(rateValue, textAreaValue) }
            >
              提交评价
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

export { EvaluateModal }

