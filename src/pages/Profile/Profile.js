import { Button, Carousel, Rate } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import React, { Component } from 'react'
import { DayPickerRangeController } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getSkillByUserId, getUserById } from '../../service/editData'
import './static/style/index.less'

// const CompanyItem = ({
//                        companyName,
//                        blockChainNumber,
//                        introduce,
//                        logoSrc,
//                      }) => (
//   <div className="company-card">
//     <img
//       src="./images/company-logo-default.png"
//       alt="公司头像"
//       width="40"
//       height="40"
//     />
//     <p className="company-name">{ companyName }</p>
//     <p className="block-chain-number">区块链编号：{ blockChainNumber }</p>
//     <p className="company-introduce">
//       { introduce }
//     </p>
//   </div>
// )

const logoSrcList = [
  './images/宠物-icon.png',
  './images/健康-icon.png',
  './images/其他-icon.png',
  './images/家政-icon.png',
  './images/摄影摄像-icon.png',
  './images/教育培训-icon.png',
  './images/数码维修-icon.png',
  './images/活动-icon.png',
  './images/美容美甲-icon.png',
  './images/上门维修-icon.png',
  './images/婚礼策划-icon.png',
  './images/运动健身-icon.png',
]

const SkillItem = ({ logoSrc, title, index }) => (<div className="skill-card">
  <img
    src={ logoSrc }
    alt="icon"
    width="40"
    height="40"
  />
  <p className="title">
    { title }
  </p>
  <p className="skill-index">
    技能{ index + 1 }
  </p>
</div>)

const mapState = (state) => ({
  user: state.user,
})

@connect(mapState)
class Profile extends Component {
  state = {
    data: {},
    skillList: [],
  }
  getUserById = async () => {
    // try {
    const { data: { data } } = await getUserById({ userId: this.props.user.userId })
    this.setState({ data })
    // } catch (e) {
    //   message.error('网络连接失败，请检查网络后重试')
    // }
  }
  getSkillByUserId = async () => {
    // try {
    // const { data: { code, data, desc } } = await getSkillByUserId({ userId: this.props.user.userId })
    // if (code !== 200) {
    //   message.error(desc)
    //   return
    // }
    const { data: { data } } = await getSkillByUserId({ userId: this.props.user.userId })
    const secondarySkillList = Object.values(data).reduce((previousValue, currentValue) => [ ...previousValue, ...currentValue ])
    this.setState({
      skillList: secondarySkillList,
    })
    // } catch (e) {
    //   message.error('网络连接失败，请检查网络后重试')
    // }
  }

  constructor (props) {
    super(props)
    moment.locale('fr')
    setTimeout(() => {
      console.log(moment.locale())
    })
    moment.weekdays()
  }

  render () {
    const { data: { avatar, nickname, isPartyB } } = this.state
    return (
      <div className="profile-container">
        <main>
          <img src={ avatar } alt="头像" width="100" height="100" className="avatar"/>
          <h2>您好，我是{ this.props.user.nickname }</h2>
          <div className="info">
            <p className="position">北京 · 中国</p>
            <Rate
              allowHalf
              disabled
              defaultValue={ 4.5 }
              character={ <i className="iconfont icon-rate-star-full"/> }
            />
            <p className="rate">{ 4.5 }</p>
            <p className="evaluation">(12条评价)</p>
          </div>
          <p className="introduce">
            { /*“ONE”#一宿设计#的团队主要来自上海。我们认同这座城市所赋予的精神及社会价值,公平、活力、创造、包容。虽然可能在不同地区的人们对这座城市有不同的解读,但我们希望您通过这样一个浓缩的空间,亲身体验一下这座城市的魅力,而不是别人口中的上海。上海不是一座围城,她是海,纳百川。这座城市的生命力从浦西一直延伸到浦东但我们希望您通过这样一个浓缩的空间,亲身体验一下这座城市的魅力,而不是别人口中的上海。上海不是一座围城,她是海,纳百川。这座城市的生命力从浦西一直延伸到浦东*/ }
            { this.props.user.description }
          </p>
          <a href="">查看更多介绍</a>
          <div className="information-container">
            <div><i className="iconfont icon-hire"/>被雇佣128次</div>
            <div><i className="iconfont icon-identified"/>实名认证</div>
            <div><i className="iconfont icon-joined-time"/>已加入</div>
            { this.props.user.phoneNumber && <div><i className="iconfont icon-identified-phone"/>手机认证</div> }
            { this.props.user.email && <div><i className="iconfont icon-nav-message"/>邮箱认证</div> }
          </div>
          { isPartyB && <div><h3 className="skill-title">技能<span>（{ this.state.skillList.length }）</span></h3>
            <Carousel
              dots={ false }
              infinite={ false }
              slidesToShow={ 4 }
              slidesToScroll={ 1 }
              arrows={ true }
            >
              {
                this.state.skillList.map(({ secondServiceTypeName, firstServiceTypeName }, index) => <SkillItem
                  logoSrc={ logoSrcList.find(src => src.includes(firstServiceTypeName)) || './images/其他-icon.png' }
                  title={ secondServiceTypeName }
                  index={ index }
                  key={ index }
                />)
              }
            </Carousel>
          </div> }
          {
            isPartyB &&
            <div>
              <h3 className="location">营业时间与地点</h3>
              <div className="time-location-container">
                <DayPickerRangeController
                  numberOfMonths={ 1 }
                  hideKeyboardShortcutsPanel
                  monthFormat="YYYY[年]M[月]"
                  date={ moment() }
                />
                <div id="mapContainer"/>
              </div>
            </div>
          }
        </main>
        <footer>
          <Button type="primary">
            <Link to="/editData" style={ { textDecoration: 'none' } }>编辑</Link>
          </Button>
        </footer>
      </div>
    )
  }

  componentDidMount () {
    /* eslint-disable no-undef */
    // const map = new AMap.Map('mapContainer')
    /* eslint-disable no-undef */
    // console.log('AMap++++', AMap)
    this.getUserById()
    this.getSkillByUserId()
  }

  // getJoinTime = () => {
  //   const currentTime = Date.now()
  //   console.log(currentTime - new Date(this.props.user.createTime))
  // }
}

export { Profile as page }