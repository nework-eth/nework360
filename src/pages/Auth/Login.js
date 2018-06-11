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
@Form.create()
class Page extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, { phoneNumber, password }) => {
      if (!err) {
        await login({ phoneNumber, pwd: password })
          .then(({ data: { code, desc, data } }) => {
            if (code === 200 && desc === 'success') {
              message.success('登录成功')
              console.log(data)
              this.props.setUser(data)
              this.props.setUserId(data.userId)
              browserHistory.push('/')
              return
            }
            message.error(desc)
          })
          .catch(e => {
            message.error('请求服务器失败')
          })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={ this.handleSubmit } className="form-container">
        <h2>欢迎回来</h2>
        <FormItem
          label="手机号"
          className="form-item"
          colon={ false }
          required={ false }
        >
          { getFieldDecorator('phoneNumber', {
            rules: [ { required: true, message: '请输入手机号!' } ],
          })(
            <Input
              placeholder="输入手机号"
              className="form-input"
            />,
          ) }
        </FormItem>
        <FormItem
          label="密码"
          className="form-item"
          colon={ false }
          required={ false }
        >
          { getFieldDecorator('password', {
            rules: [ { required: true, message: '请输入密码!' } ],
          })(
            <Input
              type="password"
              placeholder="输入密码"
              className="form-input"
            />,
          ) }
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
            pathname: '/auth/register',
            state: { phoneNumber: this.props.form.getFieldValue('phoneNumber') },
          } }>去注册</Link></span>
          <span className="captions"><Link to={ {
            pathname: '/auth/forget-password',
            state: { phoneNumber: this.props.form.getFieldValue('phoneNumber') },
          } }>忘记密码</Link></span>
        </div>
      </Form>
    )
  }
}

export { Page as page }
