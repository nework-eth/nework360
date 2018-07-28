import { Badge, Dropdown, Menu, message } from 'antd'
import cookie from 'cookie'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import { bindActionCreators, combineReducers } from 'redux'
import { signOut } from '../../service/auth'
import { getUserById } from '../../service/editData'
import { getCityByIp } from '../../service/homepage'
import { deleteAllMessage, getMessage, ignoreAllMsg, updateMessageStatus } from '../../service/navMenu'
import store from '../../Store'
import { contains, deleteCookie } from '../../utils'
import { IMModal } from '../IMModal/IMModal'
import { setCityId, setCityName, setCountryId, setUser } from './actions'
import { positionReducer, userReducer } from './reducer'
import './static/style/index.less'

const specialLinkStyle = {
  color: '#082135',
  textDecoration: 'none',
}

const userLinkStyle = {
  color: '#082135',
  textDecoration: 'none',
}

const stateKey = 'position'

const initialState = {
  cityName: '北京',
  cityId: 110,
  countryId: 1,
}

const state = store.getState()
store.reset(combineReducers({
  ...store._reducers,
  [stateKey]: positionReducer,
  user: userReducer,
}), {
  ...state,
  [stateKey]: initialState,
  user: {
    userId: '',
  },
})

const mapState = (state) => ({
  user: state.user,
  userId: state.user.userId,
  avatar: state.user.avatar,
  cityName: state[stateKey].cityName,
  isPartyB: state.user.isPartyB,
})

const mapDispatch = (dispatch) => bindActionCreators({
  setCityName,
  setCityId,
  setCountryId,
  setUser,
}, dispatch)

@connect(mapState, mapDispatch)
class NavMenu extends Component {

  state = {
    userB: '',
    messageList: [],
    messageLimit: 5,
    selectedType: 'unread',
    messageCount: 0,
    IMModalAvatar: '',
    IMModalVisible: false,
    IMModalNickname: '',
    IMModalPhoneNumber: '',
    unreadMessageCount: 0,
    unreadMessageList: [],
    unreadMessageLimit: 5,
    messagePanelVisible: false,
  }

  handleSignOut = async () => {
    const {data: {code}} = await signOut()
    if (code === 200) {
      this.props.setUser({})
      deleteCookie('userId')
      browserHistory.push('/')
    }
  }
  getCityByIp = async () => {
    const {data: {data}} = await getCityByIp()
    if (data !== '未知城市') {
      this.props.setCityName(data.city)
      this.props.setCityId(data.cityId)
    } else {
      this.props.setCityName('北京')
      this.props.setCityId(110)
    }
  }
  getMessage = async () => {
    const {data: {data, code, pageinfo}} = await getMessage({
      userId: this.props.user.userId,
      limit: this.state.messageLimit,
    })
    if (code === 200) {
      this.setState({
        messageList: data,
        messageCount: pageinfo.totalCount,
      })
    }
  }
  getUnreadMessage = async () => {
    const {data: {data, code, pageinfo}} = await getMessage({
      userId: this.props.user.userId,
      status: 0,
      limit: this.state.unreadMessageLimit,
    })
    if (code === 200) {
      this.setState({
        unreadMessageList: data,
        unreadMessageCount: pageinfo.totalCount,
      })
    }
  }
  loadMore = () => {
    if (this.state.selectedType === 'unread') {
      this.setState(
        (preState) => ({
          unreadMessageLimit: preState.unreadMessageLimit + 5,
        }),
        () => this.getUnreadMessage(),
      )
    }
    if (this.state.selectedType === 'all') {
      this.setState(
        (preState) => ({
          messageLimit: preState.messageLimit + 5,
        }),
        () => this.getMessage(),
      )
    }
  }
  ignoreMessage = (id) => async () => {
    const {data: {code}} = await
      updateMessageStatus({id, status: -1})
    if (code === 200) {
      this.getMessage()
      this.getUnreadMessage()
    }
  }
  ignoreAll = async () => {
    const {data: {code}} = await ignoreAllMsg({userId: this.props.userId})
    if (code === 200) {
      message.success('已忽略全部消息')
      this.getMessage()
      this.getUnreadMessage()
    }
  }
  seeDetails = (action, id) => async () => {
    await this.ignoreMessage(id)()
    if (action.startsWith('needs')) {
      browserHistory.push({pathname: '/need-detail', state: {needsId: action.split('--')[1]}})
      await updateMessageStatus({id, status: -1})
      this.getMessage()
      return
    }
    if (action.startsWith('trans')) {
      browserHistory.push({pathname: '/wallet'})
      await updateMessageStatus({id, status: -1})
      this.getMessage()
      return
    }
    if (action.startsWith('non')) {
      browserHistory.push({pathname: '/profile', state: {userId: this.props.userId}})
      await updateMessageStatus({id, status: -1})
      this.getMessage()
      return
    }
    if (action.startsWith('order')) {
      browserHistory.push({pathname: '/need-order-detail', state: {needsId: action.split('--')[1]}})
      await updateMessageStatus({id, status: -1})
      this.getMessage()
      return
    }
    if (action.startsWith('im')) {
      const userBId = action.split('--')[1]
      const {data: {code, data}} = await getUserById({userId: userBId})
      if (code !== 200) {
        return
      }
      this.setState({
        userB: userBId,
        IMModalAvatar: data.avatar,
        IMModalVisible: true,
        IMModalNickname: data.nickname,
        IMModalPhoneNumber: data.phoneNumber,
        messagePanelVisible: false,
      })
      await updateMessageStatus({id, status: -1})
      this.getMessage()
    }
  }
  changeMessageListType = (type) => () => this.setState({
    selectedType: type,
  })
  selectedMessageList = () => {
    if (this.state.selectedType === 'unread') {
      return this.state.unreadMessageList
    }
    return this.state.messageList
  }
  toggleMessagePanelVisible = (e) => {
    e.stopPropagation()
    this.setState((preState) => ({
      messagePanelVisible: !preState.messagePanelVisible,
    }))
  }
  deleteAll = async () => {
    const {data: {code}} = await deleteAllMessage({userId: this.props.userId})
    if (code === 200) {
      message.success('删除成功')
      this.getMessage()
      this.getUnreadMessage()
    }
  }

  componentDidMount () {
    if (!(cookie.parse(document.cookie)).cityId) {
      this.getCityByIp()
    }
    if (this.props.userId) {
      this.getMessage()
      this.getUnreadMessage()
    }
    this.timer = setInterval(() => {
      if (this.props.userId) {
        this.getMessage()
        this.getUnreadMessage()
      }
    }, 10000)
    setTimeout(() => {
      document.addEventListener('click', e => {
        const messagePanel = document.querySelector('.message-panel-container')
        const messageArea = document.querySelector('.message-li')
        if (!contains(messageArea, e.target) && !contains(messagePanel, e.target)) {
          this.setState({
            messagePanelVisible: false,
          })
        }
      })
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
    this.timer = null
  }

  hideIMModal = () => {
    this.setState({
      userB: '',
      IMModalAmount: '',
      IMModalAvatar: '',
      IMModalVisible: false,
      IMModalNeedsId: '',
      IMModalQuoteId: '',
      IMModalNickname: '',
      IMModalPhoneNumber: '',
      IMModalServiceName: '',
      IMModalInstruction: '',
    })
  }

  render () {
    const {cityName} = this.props
    const {
      userB,
      messageCount,
      selectedType,
      IMModalAvatar,
      IMModalVisible,
      IMModalNickname,
      unreadMessageList,
      IMModalPhoneNumber,
      unreadMessageCount,
      messagePanelVisible,
    } = this.state
    return (
      <div className="top-nav-container">
        <ul>
          <div className="li-wrapper">
            <li className="li-item">
              <Link to="/" style={ {color: '#092235'} }>
                <i className="iconfont icon-logo logo-item"/>
              </Link>
            </li>
            <li className="vertical-line"/>
            <Link className="li-item" style={ {paddingRight: '10px', textDecoration: 'none', color: '#092235'} }
              to="/select-city">{ cityName }</Link>
          </div>
          {
            this.props.userId
              ? (
                <div className="li-wrapper">
                  { !this.props.user.isPartyB
                  && <li className="li-item user-li-item">
                    <Link to="/skill" style={ specialLinkStyle }>我要工作</Link>
                  </li>
                  }
                  <li className="li-item user-li-item">
                    <Link to="/list" style={ userLinkStyle }>我的订单</Link>
                  </li>
                  <li className="li-item user-li-item message-li" onClick={ this.toggleMessagePanelVisible }>
                    <Badge dot={ !!unreadMessageList.length }><span className="message-span">消息中心</span></Badge>
                  </li>
                  <li className="li-item user-li-item">
                    <Dropdown overlay={
                      <Menu>
                        <Menu.Item className="nav-ant-menu-item">
                          <Link to={ {pathname: '/profile', state: {userId: this.props.userId}} }>我的主页</Link>
                        </Menu.Item>
                        <Menu.Item className="nav-ant-menu-item">
                          <Link to="/wallet">钱包</Link>
                        </Menu.Item>
                        <Menu.Item className="nav-ant-menu-item">
                          <Link to="/editData">设置</Link>
                        </Menu.Item>
                        <Menu.Item className="nav-ant-menu-item">
                          <Link to="/" onClick={ this.handleSignOut }>退出登录</Link>
                        </Menu.Item>
                      </Menu>
                    }>
                      <img
                        src={ this.props.avatar || './images/headshot-default.png' }
                        alt="头像"
                        width="30"
                        height="30"
                        className="avatar"
                      />
                    </Dropdown>
                  </li>
                </div>
              )
              : <div className="li-wrapper">
                <li style={ {paddingRight: '20px', cursor: 'pointer'} } className="li-item">帮助</li>
                <li className="vertical-line"/>
                <li className="li-item"><Link to="/login" style={ specialLinkStyle }>登录</Link></li>
                <li
                  className="li-item" style={ {paddingLeft: '0'} }
                >
                  <Link to="/register" style={ specialLinkStyle }>注册</Link>
                </li>
              </div>
          }
        </ul>
        { messagePanelVisible && <div className="message-panel-container">
          <div className="message-panel-header">
            <div className="message-type-select-wrapper">
              <div
                className={
                  selectedType === 'unread'
                    ? 'selected-type message-type-select-item'
                    : 'message-type-select-item'
                }
                onClick={ this.changeMessageListType('unread') }
              >
                <span>未读消息</span>
              </div>
              <div
                className={
                  selectedType === 'all'
                    ? 'selected-type message-type-select-item'
                    : 'message-type-select-item'
                }
                onClick={ this.changeMessageListType('all') }
              >
                <span>全部消息</span>
              </div>
            </div>
            {
              selectedType === 'unread'
                ? <div className="ignore-all-operate" onClick={ this.ignoreAll }>全部忽略</div>
                : <div className="ignore-all-operate" onClick={ this.deleteAll }>全部删除</div>
            }
          </div>
          <div className="message-item-container-wrapper">
            { this.selectedMessageList().map(({
                                                id,
                                                action,
                                                status,
                                                msgType,
                                                seeDetails,
                                                msgContent,
                                                createTime,
                                              }) =>
              <MessageItem
                key={ id }
                type={ msgType }
                status={ status }
                content={ msgContent }
                seeDetails={ this.seeDetails(action, id) }
                updateTime={ createTime }
                ignoreMessage={ this.ignoreMessage(id) }
              />)
            }
          </div>
          { selectedType === 'unread' && (this.selectedMessageList()).length < unreadMessageCount &&
          <div className="message-panel-footer">
            <span onClick={ this.loadMore } className="virtual-button"><i
              className="iconfont icon-load-more"/>加载更多</span>
          </div>
          }
          {
            selectedType === 'all' && (this.selectedMessageList()).length < messageCount &&
            <div className="message-panel-footer">
            <span onClick={ this.loadMore } className="virtual-button"><i
              className="iconfont icon-load-more"/>加载更多</span>
            </div>
          }
        </div> }
        { IMModalVisible && <IMModal
          userA={ this.props.user.userId }
          userB={ userB }
          visible={ IMModalVisible }
          nickname={ IMModalNickname }
          avatarUrl={ IMModalAvatar }
          phoneNumber={ IMModalPhoneNumber }
          handleCancel={ this.hideIMModal }
        /> }
      </div>
    )
  }
}

const MessageItem = function ({
                                type,
                                status,
                                content,
                                seeDetails,
                                updateTime,
                                ignoreMessage,
                              }) {
  return (<div className="message-item-container">
    <div className="message-item-header">
      <p className="message-item-virtual-title">{ type }</p>
      <p className="message-item-date">{ updateTime }</p>
    </div>
    <div className="message-item-content-wrapper">
      <div className="message-item-content">{ content }</div>
      <div className="message-item-operate">
        { status === 0 && <span className="message-item-operate-item" onClick={ ignoreMessage }>忽略</span> }
        < span className='message-item-operate-item' onClick={ seeDetails }>查看</span>
      </div>
    </div>
  </div>)

}

export { NavMenu as view, stateKey, initialState }
