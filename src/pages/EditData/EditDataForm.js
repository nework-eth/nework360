import { Button, Input, message, Select, Upload } from 'antd'
import React from 'react'
import { baseUrl } from '../../service/config'
import './static/style/index.less'

const Option = Select.Option

// const SkillCardItem = ({title},index) => {
//   return (
//     <div>
//       <img src="" alt=""/>
//       <p></p>
//       <p>技能{index}</p>
//     </div>
//   )
// }

function EditDataForm ({
                         selectedItem,
                         data: {
                           nickName,
                           phoneNumber,
                           email,
                           selectedCountry,
                           avatar,
                           userId,
                         },
                         handleInput,
                         handleCountryChange,
                         countryOptions,
                         pwd,
                         handlePwdChange,
                         newPwd,
                         handleNewPwdChange,
                         newPwdRepeat,
                         handleNewPwdRepeatChange,
                         handleChangePwdSubmit,
                         handleAvatarChange,
                         handleSave,
                         handleShowModal,
                       }) {
  switch (selectedItem) {
    case 'basic':
      return (<div className="edit-data-form-container">
        <h2>基本资料</h2>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">姓名</div>
            <div className="content">
              <Input value={ nickName } onChange={ handleInput('nickName') }/>
            </div>
          </div>
          <div className="form-item">
            <div className="introduce">你的公开个人资料将显示您的名字</div>
          </div>
        </div>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">手机号</div>
            <div className="content">
              { phoneNumber }
            </div>
          </div>
          <div className="form-item">
            <div className="introduce">只有在你和另一名Nework用户确认订单时，此资料才会被分享</div>
          </div>
        </div>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">邮箱</div>
            <div className="content">
              { email }
            </div>
          </div>
          <div className="form-item">
            <div className="introduce">我们不会向其他用户透露您的个人邮箱地址</div>
          </div>
        </div>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">国家或地区</div>
            <div className="content">
              <Select
                className="select-item"
                value={ selectedCountry }
                onChange={ handleCountryChange }
              >
                {
                  // countryOptions.map(country =>
                  //   <Option
                  //     value={ country }
                  //     key={ country }
                  //   >
                  //     { country }
                  //   </Option>,
                  // )
                }
              </Select>
            </div>
          </div>
        </div>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">省份/洲</div>
            <div className="content">
              <Select
                className="select-item"
                value={ selectedCountry }
                onChange={ handleCountryChange }
              >
                {
                  // countryOptions.map(country =>
                  //   <Option
                  //     value={ country }
                  //     key={ country }
                  //   >
                  //     { country }
                  //   </Option>,
                  // )
                }
              </Select>
            </div>
          </div>
        </div>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">城市</div>
            <div className="content">
              <Select
                className="select-item"
                value={ selectedCountry }
                onChange={ handleCountryChange }
              >
                {
                  // countryOptions.map(country =>
                  //   <Option
                  //     value={ country }
                  //     key={ country }
                  //   >
                  //     { country }
                  //   </Option>,
                  // )
                }
              </Select>
            </div>
          </div>
        </div>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">简介</div>
            <div className="content">
              <Input type="textarea"/>
            </div>
          </div>
        </div>
      </div>)
    case 'avatar':
      return (<div className="edit-data-form-container">
        <h2>照片</h2>
        <p>清晰的工作或生活照片，会成为你和顾客互相认识的重要途径。请确保使用清晰的照片，并确认其中不包含你不希望其他人看到的个人敏感信息。</p>
        <div className="image-wrapper">
          <img src={ avatar } alt="头像" width={ 200 } height={ 200 }/>
          <img src="./images/headshot-mask.png" alt="头像遮罩" width={ 200 } height={ 200 } className="mask"/>
        </div>
        <div className="button-wrapper">
          <div style={ { marginTop: '20px' } }>
            <Upload
              action={ `${baseUrl}/qiniu/uploadUserFile` }
              onChange={ (info) => {
                if (info.file.status !== 'uploading') {
                  console.log(info.file, info.fileList)
                }
                if (info.file.status === 'done') {
                  if (info.file.response.code === 200) {
                    console.log(info)
                    handleAvatarChange(info.file.response.data.path)
                    message.success('上传头像成功')
                    return
                  }
                  message.error(info.file.response.desc)
                } else if (info.file.status === 'error') {
                  message.error(`上传失败`)
                }
              } }
              showUploadList={ false }
              data={ { userId, column: 'avatar' } }
            >
              <Button
                style={ {
                  width: '160px',
                  height: '50px',
                } }
              >
                选择照片
              </Button>
            </Upload>
            <Button
              onClick={ handleSave('avatar') }
            >
              保存
            </Button>
          </div>
        </div>
      </div>)
    case 'skill':
      return (<div className="edit-data-form-container">
        <h2>我的技能</h2>
        <p className="skill-info">我们将根据你当前的技能，匹配合适你的工作。</p>
      </div>)
    case 'auth':
      return (<div className="edit-data-form-container">
        <h2>信任与认证</h2>
        <img src="./images/identify-id.png" alt="身份认证" width="40" height="40" className="auth-icon"/>
        <p className="auth-title">身份证或护照</p>
        <p>实名验证帮助用户之间建立信任，让每个人更安心地使用我们的服务；</p>
        <p>请放心，其他顾客和服务商不会看到您的身份信息。</p>
        <Button className="auth-button" type="primary">上传</Button>
        <div className="horizontal-line"/>
        <img src="./images/identify-phone.png" alt="邮箱认证" width="40" height="40" className="auth-icon"/>
        <p className="auth-title">手机号认证</p>
        <p>使用经过验证的手机号可以令沟通变得更容易；</p>
        <p>我们将通过短信给您发送代码，或透过电话通话向您告知该代码。</p>
        <Button
          className="auth-button"
          type="primary"
          onClick={ handleShowModal('phoneNumber', '手机号认证') }
        >
          认证
        </Button>
        <div className="horizontal-line"/>
        <img src="./images/identify-mail.png" alt="手机认证" width="40" height="40" className="auth-icon"/>
        <p className="auth-title">邮箱认证</p>
        <p>使用经过验证的邮箱，它能够让我们与你更安全便捷的沟通。</p>
        <Button
          className="auth-button"
          type="primary"
          onClick={ handleShowModal('email', '邮箱认证') }
        >
          认证
        </Button>
      </div>)
    case 'account':
      return (<div className="edit-data-form-container">
        <h2>账号安全</h2>
        <h3>修改密码</h3>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">当前密码</div>
            <div className="content">
              <Input value={ pwd } onChange={ handlePwdChange }/>
            </div>
          </div>
        </div>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">新密码</div>
            <div className="content">
              <Input value={ newPwd } onChange={ handleNewPwdChange }/>
            </div>
          </div>
        </div>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">确认密码</div>
            <div className="content">
              <Input value={ newPwdRepeat } onChange={ handleNewPwdRepeatChange }/>
            </div>
          </div>
        </div>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label"/>
            <div className="content">
              <Button type="primary" onClick={ handleChangePwdSubmit }>
                更新密码
              </Button>
            </div>
          </div>
        </div>
      </div>)
    default:
      return (<div/>)
  }
}

export { EditDataForm as view }
