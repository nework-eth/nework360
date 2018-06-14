import { Button, Form, Icon, Input, message } from 'antd'
import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import { changePassword, forgetPasswordSendCode } from '../../service/auth'
import './static/style/index.less'

const FormItem = Form.Item
const InputGroup = Input.Group

class Page extends Component {

  state = {
    pwd: {
      value: '',
    },
    phoneNumber: {
      value: '',
    },
    messageCode: {
      value: '',
    },
    messageButton: {
      value: '获取验证码',
      disabled: true,
    },
    disabledTime: 0,
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const {
      phoneNumber,
      pwd,
      messageCode,
    } = this.state
    if (!phoneNumber.value) {
      message.error('请输入手机号')
      return
    }
    if (!messageCode.value) {
      message.error('请输入验证码')
      return
    }
    if (!pwd.value) {
      message.error('请输入密码')
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
    if (pwd.errorMsg) {
      message.error('请输入正确格式的密码')
      return
    }
    try {
      const { data: { desc, code } } = await changePassword({
        code: messageCode.value,
        phoneNumber: phoneNumber.value,
        pwd: pwd.value,
      })
      if (code !== 200) {
        message.error(desc)
        return
      }
      message.success('修改密码成功')
      browserHistory.push('/login')
    } catch (e) {
      message.error('网络连接失败，请检查网络后重试')
    }
  }

  startTimer = () => {
    if (this.timer) {
      return
    }
    this.setState({
      disabledTime: 60,
    }, () => {
      this.timer = this.timerReduce(() => this.timer = null)
    })
  }

  timerReduce = (cb) => {
    if (this.state.disabledTime) {
      this.setState((preState) => ({
        disabledTime: preState.disabledTime - 1,
      }))
      setTimeout(() => this.timerReduce(cb), 1000)
      return
    }
    cb()
  }

  handleMessageButtonClick = async () => {
    try {
      const { data: { code, desc } } = await forgetPasswordSendCode({ phoneNumber: this.state.phoneNumber.value })
      if (code === 200) {
        message.success('已发送短信验证码')
        this.startTimer()
        return
      }
      message.error(desc)
    } catch (e) {
      message.error('网络连接失败，请检查网络后重试')
    }
  }

  handlePhoneNumberChange = (e) => {
    const value = e.target.value
    this.setState((preState) => ({
      phoneNumber: {
        ...preState.phoneNumber,
        value: value.length > 11 ? value.slice(0, 11) : value,
      },
    }), () => {
      if (this.state.messageButton.value === '获取验证码') {
        const { validateStatus, errorMsg } = this.validatePhoneNumber(this.state.phoneNumber.value)
        console.log(validateStatus, errorMsg)
        if (validateStatus === 'success') {
          this.setState((preState) => ({
            messageButton: {
              ...preState.messageButton,
              disabled: false,
            },
          }))
        } else {
          this.setState((preState) => ({
            messageButton: {
              ...preState.messageButton,
              disabled: true,
            },
          }))
        }
      }
    })
  }
  validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
      return {
        validateStatus: 'error',
        errorMsg: '请输入手机号',
      }
    }
    if (phoneNumber.length < 5) {
      return {
        validateStatus: 'error',
        errorMsg: '请输入正确格式手机号',
      }
    }
    if (phoneNumber.length > 11) {
      return {
        value: phoneNumber.slice(0, 11),
        validateStatus: 'error',
        errorMsg: '请输入正确格式手机号',
      }
    }
    if (!/^1[\d]{10}$/.test(phoneNumber)) {
      return {
        validateStatus: 'error',
        errorMsg: '手机号格式不正确',
      }
    }
    return {
      validateStatus: 'success',
      errorMsg: null,
    }
  }

  handlePhoneNumberBlur = () => this.setState((preState) => ({
    phoneNumber: {
      value: preState.phoneNumber.value,
      ...this.validatePhoneNumber(preState.phoneNumber.value),
    },
  }))

  validateMessageCode = (messageCode) => {
    if (!messageCode) {
      return {
        validateStatus: 'error',
        errorMsg: '请输入验证码',
      }
    }

    if (messageCode.length < 4) {
      return {
        validateStatus: 'error',
        errorMsg: '验证码错误',
      }
    }

    if (messageCode.length > 4) {
      return {
        value: messageCode.slice(0, 4),
      }
    }

    console.log(/^\d{4}$/.test(messageCode))

    if (!/^\d{4}$/.test(messageCode)) {
      return {
        validateStatus: 'error',
        errorMsg: '验证码错误',
      }
    }

    return {
      validateStatus: 'success',
      errorMsg: null,
    }
  }

  handleMessageCodeChange = (e) => ((value) => this.setState((preState) => ({
    messageCode: {
      ...preState,
      value: value.length > 4 ? value.slice(0, 4) : value,
    },
  })))(e.target.value)

  handleMessageCodeBlur = () => this.setState((preState) => ({
    messageCode: {
      value: preState.messageCode.value,
      ...this.validateMessageCode(preState.messageCode.value),
    },
  }))

  handlePwdChange = (e) => {
    const value = e.target.value
    this.setState((preState) => ({
      pwd: {
        ...preState.pwd,
        value: value.length > 16 ? value.slice(0, 16) : value,
      },
    }))
  }

  validatePwd = (pwd) => {
    if (!pwd) {
      return {
        validateStatus: 'error',
        errorMsg: '请输入密码',
      }
    }
    if (pwd.length > 16) {
      return {
        validateStatus: 'error',
        errorMsg: '字数不能多于16位',
        value: pwd.value.slice(0, 16),
      }
    }
    if (pwd.length < 6) {
      return {
        validateStatus: 'error',
        errorMsg: '字数不能少于6位',
      }
    }
    if (/^\d+$/.test(pwd)) {
      return {
        validateStatus: 'error',
        errorMsg: '不能为纯数字',
      }
    }
    if (pwd.includes(' ')) {
      return {
        validateStatus: 'error',
        errorMsg: '密码不能包含空格',
      }
    }
    if (!/^[A-Za-z0-9&/()._|]+$/.test(pwd)) {
      return {
        validateStatus: 'error',
        errorMsg: '密码只能输入大小写英文、数字、特殊字符（除空格）',
      }
    }
    return {
      validateStatus: 'success',
      errorMsg: null,
    }
  }
  handlePwdBlur = () => {
    this.setState((preState) => ({
      pwd: {
        value: preState.pwd.value,
        ...this.validatePwd(preState.pwd.value),
      },
    }))
  }

  render () {
    const {
      phoneNumber,
      pwd,
      messageCode,
      messageButton,
      disabledTime,
    } = this.state
    return (
      <Form onSubmit={ this.handleSubmit } className="form-container">
        <h2>忘记密码</h2>
        <FormItem
          label="手机号"
          className="form-item"
          colon={ false }
          required={ false }
          help={ phoneNumber.errorMsg }
          validateStatus={ phoneNumber.validateStatus }
        >
          <Input
            placeholder="输入手机号"
            className="form-input"
            value={ phoneNumber.value }
            onChange={ this.handlePhoneNumberChange }
            onBlur={ this.handlePhoneNumberBlur }
          />
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
            <Input
              placeholder="4位数字短信验证码"
              className="form-input"
              style={ {
                width: '70%',
                borderRight: 'none',
              } }
              value={ messageCode.value }
              onChange={ this.handleMessageCodeChange }
              onBlur={ this.handleMessageCodeBlur }
            />
            <Button
              className="get-message-button"
              onClick={ this.handleMessageButtonClick }
              disabled={ disabledTime || messageButton.disabled }
            >
              { disabledTime ? `${disabledTime}S` : messageButton.value }
            </Button>
          </InputGroup>
        </FormItem>
        <FormItem
          label="新密码"
          className="form-item"
          colon={ false }
          required={ false }
          help={ pwd.errorMsg }
          validateStatus={ pwd.validateStatus }
        >
          <Input
            type="password"
            placeholder="设置新密码"
            className="form-input"
            value={ pwd.value }
            onChange={ this.handlePwdChange }
            onBlur={ this.handlePwdBlur }
          />
        </FormItem>
        <FormItem
          className="form-item"
        >
          <Button
            type="primary"
            htmlType="submit"
            className="operator-button"
          >
            提交
          </Button>
        </FormItem>
        <Link
          className="footer-link"
          to={ {
            pathname: '/login',
            state: { phoneNumber: phoneNumber.value },
          } }
        >
          <Icon
            type="left-circle-o"
            style={ { fontSize: 20, color: '#092235' } }
          />
          <span>&nbsp;&nbsp;返回</span>
        </Link>
      </Form>
    )
  }

  componentDidMount () {
    if (this.props.location.state && this.props.location.state.phoneNumber) {
      // this.props.form.setFieldsValue({ phoneNumber: this.props.location.state.phoneNumber })
      this.setState({
        phoneNumber: {
          value: this.props.location.state.phoneNumber,
        },
      })
    }
  }

}

export { Page as page }
