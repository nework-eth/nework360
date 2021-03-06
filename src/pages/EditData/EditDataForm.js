import { Button, Checkbox, Input, message, Select, Upload } from 'antd'
import React from 'react'
import { baseUrl } from '../../service/config'
import './static/style/index.less'

const CheckboxGroup = Checkbox.Group

const {TextArea} = Input

const logoSrcList = [
  './images/宠物-icon.png',
  './images/健康-icon.png',
  './images/其他-icon.png',
  './images/家政-icon.png',
  './images/摄影摄像-icon.png',
  './images/教育培训-icon.png',
  './images/数码维修-icon.png',
  './images/活动-icon.png',
  './images/美容美甲-icon.png',
  './images/上门维修-icon.png',
  './images/婚礼策划-icon.png',
  './images/运动健身-icon.png',
]

const plainOptions = [
  {label: '工作日（周一到周五）', value: 'w'},
  {label: '周六', value: 'sat'},
  {label: '周日', value: 'sun'},
]

const Option = Select.Option

const SkillCardItem = ({logoSrc, title, index, deleteSkill}) => (<div className="skill-card-item">
  <img
    src={ logoSrc }
    alt="icon"
    width="40"
    height="40"
  />
  <p className="title">
    { title }
  </p>
  <p className="skill-index">
    技能{ index + 1 }
  </p>
  <i className="iconfont icon-delete1" onClick={ deleteSkill }/>
</div>)

const beforeUpload = (file) => {
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    message.error('请上传5M以内jpg/jpeg/gif/bmp/png格式的图片')
  }
  const typeArray = ['image/jpeg', 'image/png', 'image/bmp']
  const typeValid = typeArray.includes(file.type)
  if (!typeValid) {
    message.error('请上传5M以内jpg/jpeg/gif/bmp/png格式的图片')
  }
  return isLt5M && typeValid
}

function EditDataForm ({
                         selectedItem,
                         data: {
                           nickname,
                           phoneNumber,
                           email,
                           country,
                           avatar,
                           userId,
                           description,
                           province,
                           city,
                           isPartyB,
                           location,
                           specAddr,
                           serviceTime,
                         },
                         handleInput,
                         handleCountryChange,
                         handleProvinceChange,
                         handleCityChange,
                         countryOptions,
                         provinceOptions,
                         cityOptions,
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
                         skillList,
                         handleServiceTimeChange,
                         handleSaveBasic,
                         user,
                         deleteSkill,
                         handleShowAddSkillModal,
                         locationOptions,
                         handleLocationChange,
                         handleDescriptionInput,
                         isPwdError,
                         isNewPwdError,
                         isNewPwdRepeatError,
                         pwdErrorMsg,
                         newPwdErrorMsg,
                         newPwdRepeatErrorMsg,
                         handlePwdBlur,
                         handleNewPwdBlur,
                         handleNewPwdRepeatBlur,
                         jumpToAuth,
                       }) {
  switch (selectedItem) {
    case 'basic':
      return (<div className="edit-data-form-container">
        <h2>基本资料</h2>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">姓名</div>
            <div className="content">
              <Input value={ nickname } onChange={ handleInput('nickname') }/>
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
        { email && <div className="form-item-group">
          <div className="form-item">
            <div className="label">邮箱</div>
            <div className="content">
              { email }
            </div>
          </div>
          <div className="form-item">
            <div className="introduce">我们不会向其他用户透露您的个人邮箱地址</div>
          </div>
        </div> }
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">国家或地区</div>
            <div className="content">
              <Select
                className="select-item"
                value={ country }
                onChange={ handleCountryChange }
              >
                {
                  countryOptions.map(country =>
                    <Option
                      value={ country }
                      key={ country }
                    >
                      { country }
                    </Option>,
                  )
                }
              </Select>
            </div>
          </div>
        </div>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">省份/州</div>
            <div className="content">
              <Select
                className="select-item"
                value={ province }
                onChange={ handleProvinceChange }
                disabled={ !country }
              >
                {
                  provinceOptions.map(province =>
                    <Option
                      value={ province }
                      key={ province }
                    >
                      { province }
                    </Option>,
                  )
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
                value={ city }
                onChange={ handleCityChange }
                disabled={ !province }
              >
                {
                  cityOptions.map(city =>
                    <Option
                      value={ city }
                      key={ city }
                    >
                      { city }
                    </Option>,
                  )
                }
              </Select>
            </div>
          </div>
        </div>
        {
          isPartyB && <div className="form-item-group">
            <div className="form-item">
              <div className="label">小区名或街道名</div>
              <div className="content">
                <Select
                  mode="combobox"
                  value={ location }
                  placeholder="如不清楚可输入名称来搜索"
                  defaultActiveFirstOption={ false }
                  showArrow={ false }
                  onChange={ handleLocationChange }
                  className="place-select"
                >
                  { locationOptions.map(({name, address, district, adcode}) =>
                    <Option
                      value={ `${district} ${address} ${name}` }
                      key={ `${adcode}${address}` }
                    >
                      { `${district} ${address} ${name}` }</Option>,
                  ) }
                </Select>
              </div>
            </div>
            <div className="form-item">
              <div className="introduce">
                我们将根据该位置为你分配工作
              </div>
            </div>
          </div>
        }
        {
          isPartyB && <div className="form-item-group">
            <div className="form-item">
              <div className="label">具体地址（选填）</div>
              <div className="content">
                <Input
                  value={ specAddr }
                  onChange={ handleInput('specAddr') }
                />
              </div>
            </div>
          </div>
        }
        {
          isPartyB && <div className="form-item-group">
            <div className="form-item">
              <div className="label">营业时间</div>
              <div className="content">
                <CheckboxGroup options={ plainOptions } value={ serviceTime } onChange={ handleServiceTimeChange }/>
              </div>
            </div>
          </div>
        }
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">简介</div>
            <div className="content">
              <TextArea
                rows={ 8 }
                value={ description }
                onChange={ handleDescriptionInput }
              />
            </div>
          </div>
          <div className="form-item">
            <div className="introduce">Nework是建立在大家互相信任的基础上，进行运转，向大家介绍下自己吧
              告诉他们你会是一个怎么样的顾客或者服务商，你经常喜欢做哪些事情？作为服务商你的服务特色又是怎么样的？
            </div>
          </div>
        </div>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label"/>
            <div className="content">
              <Button type="primary" onClick={ handleSaveBasic }>
                保存
              </Button>
            </div>
          </div>
        </div>
      </div>)
    case 'avatar':
      return (<div className="edit-data-form-container">
        <h2>照片</h2>
        <p>清晰的工作或生活照片，会成为你和顾客互相认识的重要途径。请确保使用清晰的照片，并确认其中不包含你不希望其他人看到的个人敏感信息。</p>
        <div className="image-wrapper">
          <img src={ avatar || './images/headshot-default.png' } alt="头像" width={ 200 } height={ 200 }/>
          <img src="./images/headshot-mask.png" alt="头像遮罩" width={ 200 } height={ 200 } className="mask"/>
        </div>
        <div className="button-wrapper">
          <div style={ {marginTop: '20px'} }>
            <Upload
              beforeUpload={ beforeUpload }
              action={ `${baseUrl}/qiniu/uploadUserFile` }
              onChange={ (info) => {
                if (info.file.status !== 'uploading') {
                }
                if (info.file.status === 'done') {
                  if (info.file.response.code === 200) {
                    // console.log(info)
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
              data={ {userId, column: 'avatar'} }
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
              type="primary"
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
        <div className="skill-card-item-container">
          {
            skillList.map(({secondServiceTypeName, firstServiceTypeName, skillId}, index) => <SkillCardItem
              logoSrc={ logoSrcList.find(src => src.includes(firstServiceTypeName)) || './images/其他-icon.png' }
              title={ secondServiceTypeName }
              index={ index }
              key={ index }
              deleteSkill={ deleteSkill(skillId, !firstServiceTypeName, index) }
            />)
          }
        </div>
        <Button
          type="primary"
          onClick={ handleShowAddSkillModal }
        >
          新增技能
        </Button>
      </div>)
    case 'auth':
      return (<div className="edit-data-form-container">
        <h2>信任与认证</h2>
        <img src="./images/identify-id.png" alt="身份认证" width="40" height="40" className="auth-icon"/>
        <p className="auth-title">身份证或护照</p>
        <p>实名验证帮助用户之间建立信任，让每个人更安心地使用我们的服务。</p>
        <p>请放心，其他顾客和服务商不会看到您的身份信息。</p>
        { user.checkStatus && user.checkStatus !== -1
          ? user.checkStatus === 2 ? <div className="check-status">
              <div className="circle"><i className="iconfont icon-selected"/></div>
              <span>您已实名认证</span>
            </div>
            : <div className="check-status">
              <div className="circle"><i className="iconfont icon-selected"/></div>
              <span>待审核</span>
            </div>
          : <Button
            className="auth-button"
            type="primary"
            onClick={ jumpToAuth }
          >
            认证
          </Button> }
        <div className="horizontal-line"/>
        <img src="./images/identify-phone.png" alt="电话认证" width="40" height="40" className="auth-icon"/>
        <p className="auth-title">手机号认证</p>
        <p>使用经过验证的手机号可以令沟通变得更容易。</p>
        <p>我们将通过短信给您发送代码，或透过电话通话向您告知该代码。</p>
        { user.phoneNumber
          ? <div className="check-status">
            <div className="circle"><i className="iconfont icon-selected"/></div>
            <span>认证手机号：{ `${user.phoneNumber.slice(0, 2)} **** ${user.phoneNumber.slice(-3)}` }</span>
          </div>
          : <Button
            className="auth-button"
            type="primary"
            onClick={ handleShowModal('phoneNumber', '手机号认证') }
          >
            认证
          </Button>
        }
        <div className="horizontal-line"/>
        <img src="./images/identify-mail.png" alt="手机认证" width="40" height="40" className="auth-icon"/>
        <p className="auth-title">邮箱认证</p>
        <p>使用经过验证的邮箱，它能够让我们与你更安全便捷的沟通。</p>
        {
          user.email
            ? <div className="check-status">
              <div className="circle"><i className="iconfont icon-selected"/></div>
              <span>认证邮箱地址：{ user.email }</span>
            </div>
            : <Button
              className="auth-button"
              type="primary"
              onClick={ handleShowModal('email', '邮箱认证') }
            >
              认证
            </Button>
        }
      </div>)
    case 'account':
      return (<div className="edit-data-form-container">
        <h2>账号安全</h2>
        <h3>修改密码</h3>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">当前密码</div>
            <div className="content">
              <Input
                value={ pwd }
                onBlur={ handlePwdBlur }
                onChange={ handlePwdChange }
              />
            </div>
          </div>
          <div className="form-item">
            <div className="label"/>
            <div className="content">
              { isPwdError && <p className="error-tip">{ pwdErrorMsg }</p> }
            </div>
          </div>
        </div>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">新密码</div>
            <div className="content">
              <Input
                value={ newPwd }
                onBlur={ handleNewPwdBlur }
                onChange={ handleNewPwdChange }
              />
            </div>
          </div>
          <div className="form-item">
            <div className="label"/>
            <div className="content">
              { isNewPwdError && <p className="error-tip">{ newPwdErrorMsg }</p> }
            </div>
          </div>
        </div>
        <div className="form-item-group">
          <div className="form-item">
            <div className="label">确认密码</div>
            <div className="content">
              <Input
                value={ newPwdRepeat }
                onBlur={ handleNewPwdRepeatBlur }
                onChange={ handleNewPwdRepeatChange }
              />
            </div>
          </div>
          <div className="form-item">
            <div className="label"/>
            <div className="content">
              { isNewPwdRepeatError && <p className="error-tip">{ newPwdRepeatErrorMsg }</p> }
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
