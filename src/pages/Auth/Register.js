import { Button, Form, Input, message, Select } from 'antd'
import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import { register, sendCode } from '../../service/auth'
import './static/style/index.less'

const FormItem = Form.Item
const InputGroup = Input.Group
const Option = Select.Option

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
    messageButton: {
      value: '获取验证码',
      disabled: true,
    },
    disabledTime: 0,
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
    const success = await register({
      phoneNumber: phoneNumber.value,
      nickName: nickName.value,
      pwd: pwd.value,
      code: messageCode.value,
    })

    if (success) {
      message.success('注册成功')
      browserHistory.push('/')
      // todo:加上用户状态
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

  handleNickNameChange = (e) => {
    let value = e.target.value
    this.setState((preState) => ({
      nickName: {
        ...preState.nickname,
        value: value.length > 50 ? value.slice(0, 50) : value,
      },
    }))
  }

  handleNickNameBlur = () => this.setState((preState) => ({
    nickName: {
      value: preState.nickName.value,
      ...this.validateNickName(preState.nickName.value),
    },
  }))

  handlePhoneNumberChange = (e) => {
    const value = e.target.value
    this.setState((preState) => ({
      phoneNumber: {
        ...preState.phoneNumber,
        value: value.length > 11 ? value.slice(0, 11) : value,
      },
    }), () => {
      if (this.state.messageButton.value === '获取验证码') {
        const {validateStatus, errorMsg} = this.validatePhoneNumber(this.state.phoneNumber.value)
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

  handlePhoneNumberBlur = () => this.setState((preState) => ({
    phoneNumber: {
      value: preState.phoneNumber.value,
      ...this.validatePhoneNumber(preState.phoneNumber.value),
    },
  }))

  handlePwdChange = (e) => {
    let value = e.target.value
    this.setState((preState) => ({
      pwd: {
        ...preState.pwd,
        value: value.length > 16 ? value.slice(0, 16) : value,
      },
    }))
  }

  validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
      return {
        validateStatus: 'error',
        errorMsg: '请输入手机号',
      }
    }
    if (phoneNumber.length < 11) {
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
    if (!/^1[3578]\d{9}$/.test(phoneNumber)) {
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

  validateNickName = (nickName) => {
    if (!nickName) {
      return {
        validateStatus: 'error',
        errorMsg: '请输入姓名',
      }
    }

    if (!/^[\u4e00-\u9fa5&/()._|a-zA-Z ]+$/.test(nickName)) {
      return {
        validateStatus: 'error',
        errorMsg: '不超过50字符，只允许中英文以及&/()._|和空格',
      }
    }

    return {
      value: nickName.trim(),
      validateStatus: 'success',
      errorMsg: null,
    }
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
        value: pwd.slice(0, 16),
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
        errorMsg: '必须为6-16位，不能为纯数字',
      }
    }
    if (pwd.includes(' ')) {
      return {
        validateStatus: 'error',
        errorMsg: '密码不能包含空格',
      }
    }
    if (!/^[A-Za-z0-9]+$/.test(pwd)) {
      return {
        validateStatus: 'error',
        errorMsg: '请输入正确格式的密码',
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

  handleMessageCodeChange = (e) => {
    const value = e.target.value
    this.setState((preState) => ({
      messageCode: {
        ...preState,
        value: value.length > 4 ? value.slice(0, 4) : value,
      },
    }))
  }

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

  handleMessageCodeBlur = () => this.setState((preState) => ({
    messageCode: {
      value: preState.messageCode.value,
      ...this.validateMessageCode(preState.messageCode.value),
    },
  }))

  handleMessageButtonClick = async () => {
    const {data: {code}} = await sendCode({phoneNumber: this.state.phoneNumber.value})
    if (code === 200) {
      this.startTimer()
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

  render () {
    const {
      pwd,
      nickName,
      phoneNumber,
      messageCode,
      disabledTime,
      messageButton,
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
          <Input
            placeholder="姓名"
            className="form-input"
            value={ nickName.value }
            onChange={ this.handleNickNameChange }
            onBlur={ this.handleNickNameBlur }
          />
        </FormItem>
        <FormItem
          label="密码"
          className="form-item"
          colon={ false }
          required={ false }
          help={ pwd.errorMsg }
          validateStatus={ pwd.validateStatus }
        >
          <Input
            type="password"
            placeholder="密码"
            className="form-input"
            value={ pwd.value }
            onChange={ this.handlePwdChange }
            onBlur={ this.handlePwdBlur }
          />
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
            <Input
              placeholder="输入手机号"
              className="form-input"
              style={ {width: '69.2%'} }
              value={ phoneNumber.value }
              onChange={ this.handlePhoneNumberChange }
              onBlur={ this.handlePhoneNumberBlur }
            />
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
        <span className="captions">已经有账号了？<Link to={ {
          pathname: '/login',
          state: {phoneNumber: phoneNumber.value},
        } }>去登录</Link></span>
      </Form>
    )
  }

  componentDidMount () {
    if (this.props.location.state && this.props.location.state.phoneNumber) {
      this.setState({
          phoneNumber: {
            value: this.props.location.state.phoneNumber,
          },
        },
        () => {
          const e = {target: {value: this.props.location.state.phoneNumber}}
          this.handlePhoneNumberChange(e)
        })
    }
  }
}

export { Page as page }

