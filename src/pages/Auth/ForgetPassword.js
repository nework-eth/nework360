import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import './static/style/auth.less'

import { Link } from 'react-router'

const FormItem = Form.Item
const footerLink = {
  display: 'flex',
  color: '#092235',
  textDecoration: 'none',
}

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
        <h2>忘记密码</h2>
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
              placeholder="输入手机号"
              className="form-input"
            />,
          ) }
        </FormItem>
        <FormItem
          label="短信验证码"
          className="form-item"
          colon={ false }
          required={ false }
        >
          { getFieldDecorator('验证码', {
            rules: [ { required: true, message: 'Please input your Password!' } ],
          })(
            <Input
              type="password"
              placeholder="4位数字短信验证码"
              className="form-input"
            />,
          ) }
        </FormItem>
        <FormItem
          label="新密码"
          className="form-item"
          colon={ false }
          required={ false }
        >
          { getFieldDecorator('password', {
            rules: [ { required: true, message: 'Please input your Password!' } ],
          })(
            <Input
              type="password"
              placeholder="设置新密码"
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
            提交
          </Button>
        </FormItem>
        <Link
          style={ footerLink }
          to="/login"
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
}

export { Page as page }

