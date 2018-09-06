import { Drawer, Icon, Input } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { getIMDialog, insertMsg } from '../../service/im'
import { getRelativeMinutes } from '../../utils'
import { ComplaintModal } from '../ComplaintModal/ComplaintModal'
import './static/style/index.less'

const {TextArea} = Input

const MessageItem = ({
                       msg,
                       type,
                       time,
                       nickname,
                       avatarUrl,
                     }) => {
  if (type === 'left') {
    return (
      <div className="im-message-left-wrapper">
        <img src={avatarUrl} alt="头像" width="40" height="40"/>
        <div>
          <div className="im-message-top-info">
            <div className="im-message-nickname">{nickname}</div>
            <div className="im-message-time">{getRelativeMinutes(time)}</div>
          </div>
          <div className="im-message-content">{msg}</div>
        </div>
      </div>
    )
  }
  return (
    <div className="im-message-right-wrapper">
      <div>
        <div className="im-message-time">{getRelativeMinutes(time)}</div>
        <div className="im-message-content">{msg}</div>
      </div>
    </div>
  )
}

const mapState = (state) => ({
  user: state.user,
})

@connect(mapState)
class IMModal extends Component {
  state = {
    connect: '',
    msgList: [],
    rateValue: 0,
    textAreaValue: '',
    complaintModalVisible: false,
  }

  getIMDialog = async () => {
    const {data: {code, data}} = await getIMDialog({
      sender: `${this.props.userB}`,
      receiver: `${this.props.userA}`,
    })
    if (code === 200) {
      this.setState(
        {
          msgList: Object.values(data).reduce((pre, next) => [...pre, ...next], [])
                         .sort((cur, next) => cur.createTime - next.createTime),
        },
        () => {
          const container = document.querySelector('#imContentContainer')
          container.scrollTop = container.scrollHeight
        },
      )
    }
  }

  insertMsg = async (msg) => {
    const {data: {code}} = await insertMsg({
      bodies: JSON.stringify({type: 'text', msg}),
      status: 0,
      sender: `${this.props.userA}`,
      receiver: `${this.props.userB}`,
    })
    if (code === 200) {
      this.getIMDialog()
    }
  }

  // sendMessage = (originMsg) => {
  //   const id = this.state.connect.getUniqueId()
  //   const msg = new WebIM.message('txt', id)
  //   msg.set({
  //     msg: originMsg,
  //     to: `${this.props.userB}`,
  //     roomType: false,
  //     success: async (id, serverMsgId) => {
  //       await this.insertMsg({
  //         type: 'text',
  //         msg: originMsg,
  //       })
  //       this.getIMDialog()
  //     },
  //     fail (e) {
  //       console.log(e)
  //     },
  //   })
  //   msg.body.chatType = 'singleChat'
  //   this.state.connect.send(msg.body)
  // }

  IMInit = () => {
    /* eslint-disable no-undef */
    const connect = io.connect('http://nework-im.rdc.waibaodashi.com', {
      query: {
        userId: this.props.user.userId,
      },
    })
    connect.on('disconnect', () => {
      // console.log('disconnect')
    })
    connect.on('message', (obj) => {
      // console.log('message')
      setTimeout(() => this.getIMDialog(), 100)
    })
    this.setState({
      connect,
    })
  }

  sendMessage = async (msg) => {
    if (!this.state.connect) {
      return
    }
    const connect = this.state.connect
    await this.insertMsg(msg)
    connect.emit('message', {
      from: this.props.userA,
      to: this.props.userB,
      msg: {type: 'text', msg},
    })
  }

  handleTextAreaValueChange = (e) => {
    let str = e.target.value
    if (str.length > 500) {
      str = str.slice(0, 500)
    }
    this.setState({
      textAreaValue: str,
    })
  }

  handleSubmit = async () => {
    const msg = this.state.textAreaValue
    this.setState({
      textAreaValue: '',
    })
    this.sendMessage(msg)
  }

  jumpToNeedDetail = () => browserHistory.push({
    pathname: '/need-detail',
    state: {
      amount: this.props.amount,
      needsId: this.props.needsId,
      quoteId: this.props.quoteId,
    },
  })
  showComplaintModal = () => this.setState({complaintModalVisible: true})
  handleComplaintModalCancel = () => this.setState({complaintModalVisible: false})

  render () {
    const {
      visible,
      nickname,
      phoneNumber,
      handleCancel,
    } = this.props
    const {
      msgList,
      textAreaValue,
      complaintModalVisible,
    } = this.state
    return (
      <Drawer
        width="500"
        height="100vh"
        title={<h2>{nickname}</h2>}
        footer={null}
        onClose={handleCancel}
        visible={visible}
        maskStyle={{
          opacity: 0.9,
          backgroundColor: '#edf1f4'
        }}
      >
        <div className="im-container">
          <div className="im-top-wrapper">
            <p>{phoneNumber}</p>
            <p><span onClick={this.jumpToNeedDetail}
              style={{color: '#008bf7', marginRight: '10px', cursor: 'pointer'}}>查看需求</span><span
              style={{color: '#edf1f4'}}>|</span><span
              style={{color: '#008bf7', marginLeft: '10px', cursor: 'pointer'}}
              onClick={this.showComplaintModal}>投诉</span></p>
          </div>
          <div className="im-content-wrapper" id="imContentContainer">
            {
              msgList.length > 0 && msgList.map(({
                                                   id,
                                                   bodies,
                                                   receiver,
                                                   createTime,
                                                 }) =>
                <MessageItem
                  msg={bodies.msg}
                  key={id}
                  type={receiver === this.props.user.userId ? 'left' : 'right'}
                  time={createTime}
                  avatarUrl={this.props.avatarUrl || './images/headshot-default.png'}
                />)
            }
          </div>
          <div className="im-input-wrapper">
            <TextArea
              rows={5}
              value={textAreaValue}
              style={{padding: '13px 20px', resize: 'none', marginBottom: '20px'}}
              onChange={this.handleTextAreaValueChange}
              onPressEnter={this.handleSubmit}
              placeholder="在这里输入您要发送的消息…"
            />
            <div className="icon-wrapper">
              <Icon type="enter" onClick={this.handleSubmit}/>
            </div>
          </div>
        </div>
        <ComplaintModal
          visible={complaintModalVisible}
          handleCancel={this.handleComplaintModalCancel}
        />
      </Drawer>
    )
  }

  componentDidMount () {
    this.IMInit()
    this.getIMDialog().then(() => {
      if (!this.state.msgList.length) {
        this.insertMsg(
          `${this.props.serviceName} ¥ ${this.props.amount / 100}
          
          ${this.props.instruction}`,
        ).then(this.getIMDialog())
      }
    })
  }
}

export { IMModal }