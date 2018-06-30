import { Button, Modal } from 'antd'
import React from 'react'

function ComplaintModal ({visible, handleCancel}) {
  return (
    <Modal
      title={ <h2>投诉</h2> }
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
        <p>发送您要投诉的用户联系方式及投诉内容到邮箱：</p>
        <p>wangqi@pmcaff.com</p>
        <Button
          onClick={ handleCancel }
          type="primary"
          style={ {
            marginTop: '40px',
            width: '160px',
            height: '50px',
          } }
        >
          知道了
        </Button>
      </div>
    </Modal>
  )
}

export { ComplaintModal }

