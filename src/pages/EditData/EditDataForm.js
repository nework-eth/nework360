import { Input } from 'antd'
import React from 'react'
import './static/style/index.less'

function EditDataForm ({ selectedItem, data: { nickName } }) {
  switch (selectedItem) {
    case 'basic':
      return (<div className="edit-data-form-container">
        <h2>基本资料</h2>
        <div className="form-item">
          <div className="label">姓名</div>
          <div className="content"><Input value={ nickName }/></div>
        </div>
      </div>)
    case 'photo':
      return (<div className="edit-data-form-container">
        <h2>照片</h2>
      </div>)
    case 'skill':
      return (<div className="edit-data-form-container">
        <h2>我的技能</h2>
      </div>)
    case 'auth':
      return (<div className="edit-data-form-container">
        <h2>信任与认证</h2>
      </div>)
    case 'account':
      return (<div className="edit-data-form-container">
        <h2>账号安全</h2>
      </div>)
    default:
      return (<div/>)
  }
}

export { EditDataForm as view }
