import { Button, Form, Input, message } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { setUser, setUserId } from '../../components/NavMenu/actions'
import { login } from '../../service/auth'
import './static/style/index.less'

const FormItem = Form.Item

const FooterStyle = { display: 'flex', justifyContent: 'space-between' }

const mapDispatch = (dispatch) => bindActionCreators({
  setUserId,
  setUser,
}, dispatch)

@connect(null, mapDispatch)
class Page extends Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const { phoneNumber, pwd } = this.state
    if (!phoneNumber.value) {
      return message.error('请输入手机号')
    }
    if (!pwd.value) {
      return message.error('请输入密码')
    }
    if (phoneNumber.errorMsg) {
      return message.error('请输入正确格式的手机号')
    }
    if (pwd.errorMsg) {
      return message.error('请输入正确格式的密码')
    }
    try {
      const { data: { code, desc, data } } = await login({ phoneNumber: phoneNumber.value, pwd: pwd.value })
      if (code !== 200) {
        return message.error(desc)
      }
      this.props.setUser(data)
      this.props.setUserId(data.userId)
      message.success('登录成功')
      browserHistory.push('/')
    } catch (e) {
      message.error('网络连接失败，请检查网络后重试')
    }

    // this.props.form.validateFields(async (err, { phoneNumber, password }) => {
    //   if (!err) {
    //     await login({ phoneNumber, pwd: password })
    //       .then(({ data: { code, desc, data } }) => {
    //         if (code === 200 && desc === 'success') {
    //           message.success('登录成功')
    //           console.log(data)
    //           this.props.setUser(data)
    //           this.props.setUserId(data.userId)
    //           browserHistory.push('/')
    //           return
    //         }
    //         message.error(desc)
    //       })
    //       .catch(e => {
    //         message.error('请求服务器失败')
    //       })
    //   }
    // })
  }

  state = {
    phoneNumber: {
      value: '',
    },
    pwd: {
      value: '',
    },
  }

  handlePhoneNumberChange = (e) => {
    const value = e.target.value
    this.setState((preState) => ({
      phoneNumber: {
        ...preState.phoneNumber,
        value: value.length > 11 ? value.slice(0, 11) : value,
      },
    }))
  }

  handlePwdChange = (e) => {
    const value = e.target.value
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
  handlePhoneNumberBlur = () => {
    this.setState((preState) => ({
      phoneNumber: {
        value: preState.phoneNumber.value,
        ...this.validatePhoneNumber(preState.phoneNumber.value),
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
    // const { getFieldDecorator } = this.props.form
    const { phoneNumber, pwd } = this.state
    return (
      <Form onSubmit={ this.handleSubmit } className="form-container">
        <h2>欢迎回来</h2>
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
          label="密码"
          className="form-item"
          colon={ false }
          required={ false }
          help={ pwd.errorMsg }
          validateStatus={ pwd.validateStatus }
        >
          <Input
            type="password"
            placeholder="输入密码"
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
            登录
          </Button>
        </FormItem>
        <div style={ FooterStyle }>
          <span className="captions">还没有账号？<Link to={ {
            pathname: '/register',
            state: { phoneNumber: phoneNumber.value },
          } }>去注册</Link></span>
          <span className="captions"><Link to={ {
            pathname: '/forget-password',
            state: { phoneNumber: phoneNumber.value },
          } }>忘记密码</Link></span>
        </div>
      </Form>
    )
  }

  componentDidMount () {
    if (this.props.location.state && this.props.location.state.phoneNumber) {
      this.setState({
        phoneNumber: {
          value: this.props.location.state.phoneNumber,
        },
      })
    }
  }
}

export { Page as page }
