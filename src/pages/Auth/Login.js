import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import './static/style/auth.css'
import {Link} from 'react-router';

const FormItem = Form.Item

const FooterStyle = { display: 'flex', justifyContent: 'space-between' }

@Form.create()
class Page extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
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
          { getFieldDecorator('userName', {
            rules: [ { required: true, message: 'Please input your username!' } ],
          })(
            <Input
              placeholder="Username"
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
            rules: [ { required: true, message: 'Please input your Password!' } ],
          })(
            <Input
              type="password"
              placeholder="Password"
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
          <span className="captions">还没有账号？<Link to="/register">去注册</Link></span>
          <span className="captions"><Link to="/forget-password">忘记密码</Link></span>
        </div>
      </Form>
    )
  }
}

export { Page as page }
