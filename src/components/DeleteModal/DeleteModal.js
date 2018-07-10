import { Button, Modal } from 'antd'
import React from 'react'

function DeleteModal ({visible, handleCancel, handleSubmit}) {
  return (
    <Modal
      title={ <h2>删除订单</h2> }
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
        <p>删除后将不可恢复此订单，是否删除？</p>
        <Button
          type="primary"
          onClick={ handleSubmit }
          style={ {
            marginTop: '60px',
            marginRight: '20px',
            width: '160px',
            height: '50px',
          } }
        >
          删除
        </Button>
        <Button
          onClick={ handleCancel }
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

export { DeleteModal }
