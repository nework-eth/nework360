import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import './static/style/index.less'
import { forgetPasswordSendCode, changePassword } from '../../service/auth'

import { Link, browserHistory } from 'react-router'

const FormItem = Form.Item
const InputGroup = Input.Group

@Form.create()
class Page extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, { messageCode, password, phoneNumber }) => {
      if (!err) {
        try {
          const { data: { code, desc } } = changePassword({ phoneNumber, pwd: password, code: messageCode })
          if (code === 200) {
            message.success('修改密码成功', () => {
              browserHistory.push('/auth/login')
            })
            return
          }
          message.error(desc)
        } catch (e) {
          message.error('请求服务器失败')
        }
      }
    })
  }

  sendCode = () => {
    this.props.form.validateFields([ 'phoneNumber' ], async (err, { phoneNumber }) => {
      if (!err) {
        try {
          const { data: { code, desc } } = await forgetPasswordSendCode({ phoneNumber })
          if (code === 200) {
            message.success('已发送短信验证码')
            return
          }
          message.error(desc)
        } catch (e) {
          message.error('请求服务器失败')
        }
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
          label="短信验证码"
          className="form-item"
          colon={ false }
          required={ false }
        >
          <InputGroup compact>
            { getFieldDecorator('messageCode', {
              rules: [ { required: true, message: '请输入短信验证码!' } ],
            })(
              <Input
                placeholder="4位数字短信验证码"
                className="form-input"
                style={ {
                  width: '70%',
                  borderRight: 'none',
                } }
              />,
            ) }
            <Button
              className="get-message-button"
              onClick={ this.sendCode }
            >
              获取验证码
            </Button>
          </InputGroup>
        </FormItem>
        <FormItem
          label="新密码"
          className="form-item"
          colon={ false }
          required={ false }
        >
          { getFieldDecorator('password', {
            rules: [ { required: true, message: '请输入新密码!' } ],
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
          className="footer-link"
          to="/auth/login"
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

