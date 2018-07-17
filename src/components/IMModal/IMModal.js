import { Icon, Input, Modal } from 'antd'
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
        <img src={ avatarUrl } alt="头像" width="40" height="40"/>
        <div>
          <div className="im-message-top-info">
            <div className="im-message-nickname">{ nickname }</div>
            <div className="im-message-time">{ getRelativeMinutes(time) }</div>
          </div>
          <div className="im-message-content">{ msg }</div>
        </div>
      </div>
    )
  }
  return (
    <div className="im-message-right-wrapper">
      <div>
        <div className="im-message-time">{ getRelativeMinutes(time) }</div>
        <div className="im-message-content">{ msg }</div>
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

  // IMInit = () => {
  //   /* eslint-disable no-undef */
  //   const conn = new WebIM.connection({
  //     isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  //     https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : window.location.protocol === 'https:',
  //     url: WebIM.config.xmppURL,
  //     heartBeatWait: WebIM.config.heartBeatWait,
  //     autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  //     autoReconnectInterval: WebIM.config.autoReconnectInterval,
  //     apiUrl: WebIM.config.apiURL,
  //     isAutoLogin: true,
  //   })
  //   conn.listen({
  //     onOpened: function (message) {
  //       console.log('open', message)
  //       //连接成功回调
  //       // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
  //       // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
  //       // 则无需调用conn.setPresence();
  //     },
  //     onClosed: function (message) {
  //       console.log('close', message)
  //     },         //连接关闭回调
  //     onTextMessage: (message) => {
  //       console.log(message)
  //       this.getIMDialog()
  //     },    //收到文本消息
  //     onEmojiMessage: function (message) {},   //收到表情消息
  //     onPictureMessage: function (message) {}, //收到图片消息
  //     onCmdMessage: function (message) {},     //收到命令消息
  //     onAudioMessage: function (message) {},   //收到音频消息
  //     onLocationMessage: function (message) {},//收到位置消息
  //     onFileMessage: function (message) {},    //收到文件消息
  //     onVideoMessage: function (message) {},   //收到视频消息
  //     onPresence: function (message) {},       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
  //     onRoster: function (message) {},         //处理好友申请
  //     onInviteMessage: function (message) {},  //处理群组邀请
  //     onOnline: function () {},                  //本机网络连接成功
  //     onOffline: function () {},                 //本机网络掉线
  //     onError: function (message) {
  //       console.log('error', message)
  //     },          //失败回调
  //     onBlacklistUpdate: function (list) {       //黑名单变动
  //       // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
  //       console.log(list)
  //     },
  //     onReceivedMessage: function (message) {},    //收到消息送达服务器回执
  //     onDeliveredMessage: function (message) {},   //收到消息送达客户端回执
  //     onReadMessage: function (message) {},        //收到消息已读回执
  //     onCreateGroup: function (message) {},        //创建群组成功回执（需调用createGroupNew）
  //     onMutedMessage: function (message) {},        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
  //   })
  //   const options = {
  //     apiUrl: WebIM.config.apiURL,
  //     user: `21`,
  //     pwd: `21`,
  //     nickname: 'nickname',
  //     appKey: WebIM.config.appkey,
  //   }
  //   conn.open(options)
  //   this.setState({
  //     connect: conn,
  //   })
  //   // conn.registerUser({
  //   //   username: '20',
  //   //   password: '20',
  //   //   nickname: 'mega',
  //   //   appKey: WebIM.config.appkey,
  //   //   success: function (msg) {console.log('success', msg) },
  //   //   error: function (e) {console.log('error', e) },
  //   //   apiUrl: WebIM.config.apiURL,
  //   // })
  //   // conn.close()
  //   // conn.close()
  //   // 生成本地消息id
  //   // setTimeout(()=>{
  //   //   var id = conn.getUniqueId()
  //   //   var msg = new WebIM.message('txt', id)      // 创建文本消息
  //   //   msg.set({
  //   //     msg: 'this is a test',                  // 消息内容
  //   //     to: '21',                          // 接收消息对象（用户id）
  //   //     roomType: false,
  //   //     success: function (id, serverMsgId) {
  //   //       console.log('send private text Success')
  //   //     },
  //   //     fail: function (e) {
  //   //       console.log('Send private text error')
  //   //     },
  //   //   })
  //   //   msg.body.chatType = 'singleChat'
  //   //   conn.send(msg.body)
  //   // }, 1000)
  // }

  // getIMMsg = async () => {
  //   const {data: {code, data}} = await getIMMsg({
  //     sender: `${this.props.userB}`,
  //     receiver: `${this.props.userA}`,
  //   })
  //   if (code === 200) {
  //     this.setState({
  //       msgList: data.reduce((pre, next) => [...pre, ...next.bodies], []),
  //     })
  //   }
  // }

  getIMDialog = async () => {
    const {data: {code, data}} = await getIMDialog({
      sender: `${this.props.userB}`,
      receiver: `${this.props.userA}`,
    })
    if (code === 200) {
      this.setState(
        {
          msgList: Object.values(data).reduce((pre, next) => [...pre, ...next], [])
                         .sort((cur, next) => Date.parse(cur.createTime) - Date.parse(next.createTime)),
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
      bodies: JSON.stringify(msg),
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
      message.error('IM已断开')
    })
    connect.on('message', (obj) => {
      console.log(obj)
      this.getIMDialog()
    })
    this.setState({
      connect,
    })
  }

  sendMessage = (msg) => {
    if (!this.state.connect) {
      return
    }
    const connect = this.state.connect
    connect.emit('message', {
      from: this.props.userA,
      to: this.props.userB,
      msg: {type: 'text', msg},
    }, () => {
      this.insertMsg(msg)
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
      <Modal
        title={ <h2>{ nickname }</h2> }
        visible={ visible }
        style={ {
          top: '0',
          paddingBottom: '0',
          left: 'calc(50% - 260px)',
        } }
        maskStyle={ {
          opacity: 0.9,
          backgroundColor: '#edf1f4',
        } }
        bodyStyle={ {
          height: 'calc(100vh - 72px)',
          borderRadius: '4px',
          boxShadow: '0 0 10px 0 rgba(9,34,53,0.10)',
        } }
        footer={ null }
        onCancel={ handleCancel }
      >
        <div className="im-container">
          <div className="im-top-wrapper">
            <p>{ phoneNumber }</p>
            <p><span onClick={ this.jumpToNeedDetail }
              style={ {color: '#008bf7', marginRight: '10px'} }>查看需求</span><span>|</span><span
              style={ {color: '#008bf7', marginLeft: '10px', cursor: 'pointer'} }
              onClick={ this.showComplaintModal }>投诉</span></p>
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
                  msg={ bodies.msg }
                  key={ id }
                  type={ receiver === this.props.user.userId ? 'left' : 'right' }
                  time={ createTime }
                  avatarUrl={ this.props.avatarUrl }
                />)
            }
          </div>
          <div className="im-input-wrapper">
            <TextArea
              rows={ 5 }
              value={ textAreaValue }
              style={ {padding: '13px 20px', resize: 'none', marginBottom: '20px'} }
              onChange={ this.handleTextAreaValueChange }
              onPressEnter={ this.handleSubmit }
              placeholder="在这里输入您要发送的消息…"
            />
            <div className="icon-wrapper">
              <Icon type="enter" onClick={ this.handleSubmit }/>
            </div>
          </div>
        </div>
        <ComplaintModal
          visible={ complaintModalVisible }
          handleCancel={ this.handleComplaintModalCancel }
        />
      </Modal>
    )
  }

  componentDidMount () {
    this.IMInit()
    this.getIMDialog()
  }
}

export { IMModal }