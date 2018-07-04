import moment from 'moment'
import QRCode from 'qrcode.react'
import React, { Component } from 'react'
import { view as Footer } from '../../components/Footer/index.js'
import { IMModal } from '../../components/IMModal/IMModal'
import { cancelOrder, getNeedOrderDetail, getPayInfo, selectPartyB } from '../../service/needOrderDetail/index'
import { view as NeedOrderDetailListItem } from './NeedOrderDetailLIstItem'
import './static/style/index.less'

const statusMap = {
  2: '等待报价',
  6: '等待选择服务',
  30: '等待服务',
  210: '等待支付',
  2310: '支付成功',
}

const generateButtonStatus = (orderStatus, selectedQuoteId, quotedId) => {
  if (statusMap[orderStatus] === '等待选择服务') {
    return 'select'
  }
  if (selectedQuoteId !== quotedId) {
    return 'disabled'
  }
  if (statusMap[orderStatus] === '等待服务') {
    return 'cancel'
  }
  if (statusMap[orderStatus] === '等待支付') {
    return 'pay'
  }
  if (statusMap[orderStatus] === '支付成功') {
    return 'evaluate'
  }
}

class NeedOrderDetail extends Component {

  state = {
    data: '',
    quotes: [],
    needsId: this.props.location.state ? this.props.location.state.needsId : '201806251010289473493322',
    orderStatus: '',
    selectedQuoteId: '',
  }
  getNeedOrderDetail = async () => {
    const {data: {data, code}} = await getNeedOrderDetail({needsId: this.state.needsId})
    if (code === 200) {
      this.setState({
        data: data.orders[0],
        quotes: data.orders[0].quotes,
        orderStatus: data.orders[0].status,
        selectedQuoteId: data.orders[0].quoteId,
      })
    }
  }
  selectPartyB = (needsId, quoteId) => async () => {
    const {data: {code}} = await selectPartyB({needsId, quoteId})
  }
  cancelOrder = () => cancelOrder({needsId: '201805261855396846258489'})
  IMInit = () => {
    /* eslint-disable no-undef */
    const conn = new WebIM.connection({
      isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
      https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : window.location.protocol === 'https:',
      url: WebIM.config.xmppURL,
      heartBeatWait: WebIM.config.heartBeatWait,
      autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
      autoReconnectInterval: WebIM.config.autoReconnectInterval,
      apiUrl: WebIM.config.apiURL,
      isAutoLogin: true,
    })
    conn.listen({
      onOpened: function (message) {
        console.log('open', message)
        //连接成功回调
        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
        // 则无需调用conn.setPresence();
      },
      onClosed: function (message) {
        console.log('close', message)
      },         //连接关闭回调
      onTextMessage: function (message) {console.log(message)},    //收到文本消息
      onEmojiMessage: function (message) {},   //收到表情消息
      onPictureMessage: function (message) {}, //收到图片消息
      onCmdMessage: function (message) {},     //收到命令消息
      onAudioMessage: function (message) {},   //收到音频消息
      onLocationMessage: function (message) {},//收到位置消息
      onFileMessage: function (message) {},    //收到文件消息
      onVideoMessage: function (message) {},   //收到视频消息
      onPresence: function (message) {},       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
      onRoster: function (message) {},         //处理好友申请
      onInviteMessage: function (message) {},  //处理群组邀请
      onOnline: function () {},                  //本机网络连接成功
      onOffline: function () {},                 //本机网络掉线
      onError: function (message) {
        console.log('error', message)
      },          //失败回调
      onBlacklistUpdate: function (list) {       //黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log(list)
      },
      onReceivedMessage: function (message) {},    //收到消息送达服务器回执
      onDeliveredMessage: function (message) {},   //收到消息送达客户端回执
      onReadMessage: function (message) {},        //收到消息已读回执
      onCreateGroup: function (message) {},        //创建群组成功回执（需调用createGroupNew）
      onMutedMessage: function (message) {},        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    })
    conn.open({
      apiUrl: WebIM.config.apiURL,
      user: '21',
      pwd: '21',
      appKey: WebIM.config.appkey,
    })
    // conn.registerUser({
    //   username: '21',
    //   password: '21',
    //   nickname: 'nickname',
    //   appKey: WebIM.config.appkey,
    //   success: function (msg) {console.log('success', msg) },
    //   error: function (e) {console.log('error', e) },
    //   apiUrl: WebIM.config.apiURL,
    // })
    // conn.close()
    // conn.close()
    var id = conn.getUniqueId()                 // 生成本地消息id
    var msg = new WebIM.message('txt', id)      // 创建文本消息
    msg.set({
      msg: 'message content',                  // 消息内容
      to: 'username',                          // 接收消息对象（用户id）
      roomType: false,
      success: function (id, serverMsgId) {
        console.log('send private text Success')
      },
      fail: function (e) {
        console.log('Send private text error')
      },
    })
    msg.body.chatType = 'singleChat'
    conn.send(msg.body)
  }
  pay = async () => {
    const {data: {data, code}} = await getPayInfo({channel: 'wx_pub_qr', amount: 200, needsId: '222222'})
    if (code === 200) {
      pingpp.createPayment(data, function (result, err) {
        console.log(result)
        console.log('error', err)
      })
    }
  }

  render () {
    const {
      title,
      quotes,
      needsId,
      orderStatus,
      selectedQuoteId,
    } = this.state
    return (
      <div className="order-detail-container">
        <main>
          <div className="order-detail-container-title-wrapper">
            <h2>{ title || '深度保洁' }</h2>
            <div className="date">
              { moment().format('YYYY年MM月DD日 HH:mm') }
            </div>
          </div>
          {
            quotes.map(({
                          user: {
                            score: {
                              ave,
                              count,
                            },
                            nickName,
                            hireTimes,
                            creatTime,
                          },
                          photo,
                          amount,
                          quoteId,
                        }) =>
              <NeedOrderDetailListItem
                pay={ this.pay }
                key={ quoteId }
                score={ ave }
                amount={ amount / 100 }
                nickname={ nickName }
                avatarSrc={ photo }
                hireTimes={ hireTimes }
                scoreCount={ count }
                joinedTime={ creatTime }
                cancelOrder={ cancelOrder }
                selectPartyB={ this.selectPartyB(needsId, quoteId) }
                buttonStatus={ generateButtonStatus(orderStatus, selectedQuoteId, quoteId) }
              />,
            )
          }
        </main>
        <QRCode value="http://sissi.pingxx.com/mock.php?ch_id=ch_1a1qvD0WnXv1aDqvL8yP0mjL&channel=alipay_qr"/>
        <IMModal
          visible={ false }
        />
        <Footer/>
      </div>
    )
  }

  componentDidMount () {
    this.getNeedOrderDetail()
  }

}

export { NeedOrderDetail as page }
