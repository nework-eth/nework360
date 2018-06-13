import { Button, Form, Input, message, Select } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router'
import { register } from '../../service/auth'
import './static/style/index.less'

const FormItem = Form.Item
const InputGroup = Input.Group
const Option = Select.Option

@Form.create()
class Page extends Component {

  state = {
    pwd: {
      value: '',
    },
    nickName: {
      value: '',
    },
    messageCode: {
      value: '',
    },
    phoneNumber: {
      value: '',
    },
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const {
      pwd,
      nickName,
      messageCode,
      phoneNumber,
    } = this.state
    if (!nickName.value) {
      message.error('请输入用户名')
      return
    }
    if (!pwd.value) {
      message.error('请输入密码')
      return
    }
    if (!phoneNumber.value) {
      message.error('请输入手机号')
      return
    }
    if (!messageCode.value) {
      message.error('请输入验证码')
      return
    }
    if (nickName.errorMsg) {
      message.error('请输入正确格式的用户名')
      return
    }
    if (pwd.errorMsg) {
      message.error('请输入正确格式的密码')
      return
    }
    if (phoneNumber.errorMsg) {
      message.error('请输入正确格式的手机号')
      return
    }
    if (messageCode.errorMsg) {
      message.error('请输入正确格式的验证码')
      return
    }
    try {
      const { data: { code, desc } } = await register({
        phoneNumber: phoneNumber.value,
        nickName: nickName.value,
        pwd: pwd.value,
        code: messageCode.value,
      })
      if (code !== 200) {
        message.error(desc)
        return
      }
      message.success('注册成功')
    } catch (e) {
      message.error('请求服务器失败')
    }
    // this.props.form.validateFields(async (err, { messageCode, password, phoneNumber, nickName }) => {
    //   if (!err) {
    //     try {
    //       const { data: { code, desc } } = await register({
    //         phoneNumber,
    //         nickName,
    //         pwd: password,
    //         code: messageCode,
    //       })
    //       if (code === 200 && desc === 'success') {
    //         message.success('注册成功', () => {
    //           browserHistory.push('/auth/login')
    //         })
    //         return
    //       }
    //       message.error(desc)
    //     } catch (e) {
    //       console.log(e)
    //       message.error('请求服务器失败')
    //     }
    //   }
    // })
  }

  sendCode = () => {
    // this.props.form.validateFields([ 'phoneNumber' ], async (err, { phoneNumber }) => {
    //   if (!err) {
    //     try {
    //       const { data: { code, desc } } = await sendCode({ phoneNumber: +phoneNumber })
    //       if (code === 200) {
    //         message.success('已发送短信验证码')
    //         return
    //       }
    //       message.error(desc)
    //     } catch (e) {
    //       message.error('请输入正确格式的手机号')
    //     }
    //   }
    // })
  }

  render () {
    // const { getFieldDecorator } = this.props.form
    const {
      nickName,
      phoneNumber,
      pwd,
      messageCode,
    } = this.state
    return (
      <Form onSubmit={ this.handleSubmit } className="form-container">
        <h2>创建账号</h2>
        <FormItem
          label="姓名"
          className="form-item"
          colon={ false }
          required={ false }
          help={ nickName.errorMsg }
          validateStatus={ nickName.validateStatus }
        >
          { /*{ getFieldDecorator('nickName', {*/ }
          { /*rules: [*/ }
          { /*{ required: true, message: '请输入姓名' },*/ }
          { /*{ pattern: /^[\u4e00-\u9fa5a-zA-Z&/()._| ]+$/, message: '不超过50字符，只允许中英文及&/()._|' },*/ }
          { /*{ max: 50, message: '不超过50字符，只允许中英文及&/()._|' },*/ }
          { /*],*/ }
          { /*})(*/ }
          <Input
            placeholder="姓名"
            className="form-input"
            value={ nickName.value }
          />
          { /*) }*/ }
        </FormItem>
        <FormItem
          label="密码"
          className="form-item"
          colon={ false }
          required={ false }
          help={ pwd.errorMsg }
          validateStatus={ pwd.validateStatus }
        >
          { /*{ getFieldDecorator('password', {*/ }
          { /*rules: [*/ }
          { /*{ required: true, message: '请输入密码' },*/ }
          { /*{ max: 16, message: '必须为6-16位,不能为纯数字' },*/ }
          { /*{ min: 6, message: '必须为6-16位,不能为纯数字' },*/ }
          { /*{ pattern: /[a-zA-Z]/, message: '必须为6-16位,不能为纯数字' },*/ }
          { /*{ pattern: /^[a-zA-Z0-9]+$/, message: '请输入正确格式的密码' },*/ }
          { /*],*/ }
          { /*})(*/ }
          <Input
            type="password"
            placeholder="密码"
            className="form-input"
            value={ pwd.value }
          />
          { /*) }*/ }
        </FormItem>
        <FormItem
          label="手机号码"
          className="form-item"
          colon={ false }
          required={ false }
          help={ phoneNumber.errorMsg }
          validateStatus={ phoneNumber.validateStatus }
        >
          <InputGroup compact>
            <Select
              defaultValue="+86"
              className="region-select"
              dropdownClassName="drop-down"
            >
              <Option value="+86">中国（+86）</Option>
            </Select>
            { /*{ getFieldDecorator('phoneNumber', {*/ }
            { /*rules: [*/ }
            { /*{ required: true, message: '请输入手机号' },*/ }
            { /*{ len: 11, message: '请输入正确格式的手机号' },*/ }
            { /*{ pattern: /^1[3578]/, message: '请输入正确格式的手机号' },*/ }
            { /*],*/ }
            { /*})(*/ }
            <Input
              placeholder="输入手机号"
              className="form-input"
              style={ { width: '69.2%' } }
              value={ phoneNumber.value }
              onChange={ this.handlePhoneNumberChange }
            />
            { /*,*/ }
            { /*) }*/ }
          </InputGroup>
        </FormItem>
        <FormItem
          label="短信验证码"
          className="form-item"
          colon={ false }
          required={ false }
          help={ messageCode.errorMsg }
          validateStatus={ messageCode.validateStatus }
        >
          <InputGroup compact>
            { /*{ getFieldDecorator('messageCode', {*/ }
            { /*rules: [ { required: true, message: '请输入短信验证码!' } ],*/ }
            { /*})(*/ }
            <Input
              placeholder="4位数字短信验证码"
              className="form-input"
              style={ {
                width: '70%',
                borderRight: 'none',
              } }
              value={ messageCode.value }
            />
            { /*,*/ }
            { /*) }*/ }
            <Button
              className="get-message-button"
              onClick={ this.sendCode }
              disabled={ !this.props.form.getFieldValue('phoneNumber') || this.props.form.getFieldError('phoneNumber') }
            >
              获取验证码
            </Button>
          </InputGroup>
        </FormItem>
        <span className="captions middle-captions">点击注册或继续即表示我同意Nework的 <Link>服务条款</Link> 和 <Link>隐私政策</Link>。</span>
        <FormItem
          className="form-item"
        >
          <Button
            type="primary"
            htmlType="submit"
            className="operator-button"
          >
            注册
          </Button>
        </FormItem>
        <span className="captions">已经有账号了？<Link to="/auth/login">去登录</Link></span>
      </Form>
    )
  }

  componentDidMount () {
    if (this.props.location.state && this.props.location.state.phoneNumber) {
      // this.props.form.setFieldsValue({ phoneNumber: this.props.location.state.phoneNumber })
      this.setState({
        phoneNumber: this.props.location.state.phoneNumber,
      })
    }
  }

  handlePhoneNumberChange (value) {

  }

  handlePhoneNumberBlur () {

  }

  handlePwdChange () {

  }

  handlePwdBlur () {

  }

  handleMessageCodeChange () {

  }

  handleMessageCodeBlur () {

  }
}

export { Page as page }

