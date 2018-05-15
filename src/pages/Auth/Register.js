import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import './static/style/auth.less'
import {Link} from 'react-router'

const FormItem = Form.Item

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
        <h2>创建账号</h2>
        <FormItem
          label="姓名"
          className="form-item"
          colon={false}
          required={false}
        >
          { getFieldDecorator('userName', {
            rules: [ { required: true, message: 'Please input your username!' } ],
          })(
            <Input
              placeholder="姓名"
              className="form-input"
            />,
          ) }
        </FormItem>
        <FormItem
          label="密码"
          className="form-item"
          colon={false}
          required={false}
        >
          { getFieldDecorator('password', {
            rules: [ { required: true, message: 'Please input your Password!' } ],
          })(
            <Input
              type="password"
              placeholder="密码"
              className="form-input"
            />,
          ) }
        </FormItem>
        <FormItem
          label="手机号码"
          className="form-item"
          colon={false}
          required={false}
        >
          { getFieldDecorator('mobile', {
            rules: [ { required: true, message: 'Please input your Password!' } ],
          })(
            <Input
              type="number"
              placeholder="手机号码"
              className="form-input"
            />,
          ) }
        </FormItem>
        <FormItem
          label="短信验证码"
          className="form-item"
          colon={false}
          required={false}
        >
          { getFieldDecorator('message', {
            rules: [ { required: true, message: 'Please input your Password!' } ],
          })(
            <Input
              placeholder="4位数字短信验证码"
              className="form-input"
            />,
          ) }
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
        <span className="captions">已经有账号了？<Link to="/login">去登录</Link></span>
      </Form>
    )
  }
}

export { Page as page }

