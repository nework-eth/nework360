import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import './static/style/index.less'
import { Link, browserHistory } from 'react-router'
import { login } from '../../service/auth'

const FormItem = Form.Item

const FooterStyle = { display: 'flex', justifyContent: 'space-between' }

@Form.create()
class Page extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, { phoneNumber, password }) => {
      if (!err) {
        await login({ phoneNumber, pwd: password }).then(res => {
          if (res.code === 200) {
            browserHistory.push('/select-city')
          }
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
          <span className="captions">还没有账号？<Link to="/auth/register">去注册</Link></span>
          <span className="captions"><Link to="/auth/forget-password">忘记密码</Link></span>
        </div>
      </Form>
    )
  }
}

export { Page as page }
