import React, { Component } from 'react'
import { Form, Input, Button, Select, message } from 'antd'
import './static/style/index.less'
import { Link, browserHistory } from 'react-router'
import { sendCode, register } from '../../service/auth'

const FormItem = Form.Item
const InputGroup = Input.Group
const Option = Select.Option

@Form.create()
class Page extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, { messageCode, password, phoneNumber, userName }) => {
      if (!err) {
        try {
          const { data: { code, desc } } = await register({
            phoneNumber,
            nickNamne: userName,
            pwd: password,
            code: messageCode,
          })
          if (code === 200 && desc === 'success') {
            message.success('注册成功', () => {
              browserHistory.push('/auth/login')
            })
            return
          }
          message.error(desc)
        } catch (e) {
          console.log(e)
          message.error('请求服务器失败')
        }
      }
    })
  }

  sendCode = () => {
    this.props.form.validateFields([ 'phoneNumber' ], async (err, { phoneNumber }) => {
      if (!err) {
        try {
          const { data: { code, desc } } = await sendCode({ phoneNumber: +phoneNumber })
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
        <h2>创建账号</h2>
        <FormItem
          label="姓名"
          className="form-item"
          colon={ false }
          required={ false }
        >
          { getFieldDecorator('userName', {
            rules: [ { required: true, message: '请输入姓名!' } ],
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
          colon={ false }
          required={ false }
        >
          { getFieldDecorator('password', {
            rules: [ { required: true, message: '请输入密码!' } ],
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
          colon={ false }
          required={ false }
        >
          <InputGroup compact>
            <Select
              defaultValue="+86"
              className="region-select"
              dropdownClassName="drop-down"
            >
              <Option value="+86">中国（+86）</Option>
            </Select>
            { getFieldDecorator('phoneNumber', {
              rules: [ { required: true, message: '请输入手机号码!' } ],
            })(
              <Input
                placeholder="输入手机号"
                className="form-input"
                style={ { width: '69.2%' } }
              />,
            ) }
          </InputGroup>
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
}

export { Page as page }

