import { Button, Carousel, Rate } from 'antd'
import 'moment/locale/zh-cn'
import moment from 'moment/moment'
import React, { Component } from 'react'
import { DayPickerRangeController } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { getSkillByUserId, getUserById } from '../../service/editData'
import { getRate, getRelativeTime } from '../../utils'
import './static/style/index.less'

const isDayHighlighted = (serviceTimeList) => (value) => {
  if (serviceTimeList.includes('w') && serviceTimeList.includes('sat') && serviceTimeList.includes('sun')) {
    return true
  }
  if (serviceTimeList.includes('w') && serviceTimeList.includes('sat')) {
    return value.day() > 0
  }
  if (serviceTimeList.includes('sat') && serviceTimeList.includes('sun')) {
    return value.day() === 0 || value.day() === 6
  }
  if (serviceTimeList.includes('w') && serviceTimeList.includes('sun')) {
    return value.day() < 6
  }
  if (serviceTimeList.includes('w')) {
    return value.day() < 6 && value.day() > 0
  }
  if (serviceTimeList.includes('sat')) {
    return value.day() === 6
  }
  if (serviceTimeList.includes('sun')) {
    return value.day() === 0
  }
  return false
}

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

const SkillItem = ({logoSrc, title, index}) => (<div className="skill-card">
  <img
    src={logoSrc}
    alt="icon"
    width="40"
    height="40"
  />
  <p className="title">
    {title}
  </p>
  <p className="skill-index">
    技能{index + 1}
  </p>
</div>)

const mapState = (state) => ({
  user: state.user,
})

@connect(mapState)
class Profile extends Component {
  state = {
    data: {
      evaluate: {},
      serviceTime: '',
    },
    userId: {},
    skillList: [{}],
    skillTempList: [],
    showAllIntroduce: false,
    secondarySkillList: [],
  }
  getUserById = async () => {
    const {data: {data, code}} = await getUserById({userId: this.state.userId})
    if (code === 200) {
      this.setState({data})
      if (data.latitude) {
        /* eslint-disable no-undef */
        const map = new AMap.Map('mapContainer', {
          center: [data.longitude, data.latitude],
          zoom: 13,
        })
        const marker = new AMap.Marker({
          position: new AMap.LngLat(data.longitude, data.latitude),
          title: data.locaiton,
        })
        map.add(marker)
      }
    }
  }
  getSkillByUserId = async () => {
    const {data: {data, code}} = await getSkillByUserId({userId: this.state.userId})
    if (code === 200) {
      const skillList = Object.values(data.skill)
                              .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
      const skillTempList = data.skillTemp
      const secondarySkillList = [...skillList, ...skillTempList]
      this.setState({
        skillList,
        skillTempList,
        secondarySkillList,
      })
    }
  }
  jumpToEditData = () => {
    browserHistory.push('/editData')
  }
  jumpToPostDemand = () => {
    browserHistory.push({
      pathname: '/post-demand', state: {
        serviceName: this.state.skillList[0].secondServiceTypeName,
        serviceId: this.state.skillList[0].serviceId,
        partyBId: this.state.userId,
      },
    })
  }

  render () {
    const {
      data: {
        city,
        email,
        avatar,
        country,
        isPartyB,
        nickname,
        evaluate: {
          ave,
          count,
        },
        bossTimes,
        hireTimes,
        createTime,
        checkStatus,
        serviceTime,
        phoneNumber,
        description,
      },
      secondarySkillList,
    } = this.state
    return (
      <div className="profile-container">
        <main>
          <img src={avatar || './images/headshot-default.png'} alt="头像" width="100" height="100" className="avatar"/>
          <h2>您好，我是{nickname}</h2>
          <div className="info">
            <p className="position">{isPartyB ? city : this.props.location.cityName} · {country}</p>
            <Rate
              allowHalf
              disabled
              value={getRate(ave)}
              character={<i className="iconfont icon-rate-star-full"/>}
            />
            <p className="rate">{ave}</p>
            <p className="evaluation">({count}条评价)</p>
          </div>
          {description && <p className="introduce">
            {description}
          </p>}
          <div className="information-container">
            <div><i className="iconfont icon-hire"/>已雇佣{bossTimes}次</div>
            {isPartyB && <div><i className="iconfont icon-hire"/>被雇佣{hireTimes}次</div>}
            {checkStatus === 2 && <div><i className="iconfont icon-identified"/>实名认证</div>}
            <div><i className="iconfont icon-joined-time"/>已加入{getRelativeTime(createTime)}</div>
            {phoneNumber && <div><i className="iconfont icon-identified-phone"/>手机认证</div>}
            {email && <div><i className="iconfont icon-nav-message"/>邮箱认证</div>}
          </div>
          {isPartyB &&
          <div className="skill-carousel-container"><h3
            className="skill-title">技能<span>（{secondarySkillList.length}）</span>
          </h3>
            <Carousel
              dots={false}
              infinite={false}
              slidesToShow={4}
              slidesToScroll={1}
              arrows={true}
            >
              {
                secondarySkillList.map(({secondServiceTypeName, firstServiceTypeName}, index) => <SkillItem
                  logoSrc={logoSrcList.find(src => src.includes(firstServiceTypeName)) || './images/其他-icon.png'}
                  title={secondServiceTypeName}
                  index={index}
                  key={index}
                />)
              }
            </Carousel>
          </div>}
          {isPartyB && <div>
            <h3 className="location">营业时间与地点</h3>
            <div className="time-location-container">
              <DayPickerRangeController
                disabled={true}
                numberOfMonths={1}
                hideKeyboardShortcutsPanel
                monthFormat="YYYY[年]M[月]"
                isDayHighlighted={isDayHighlighted(serviceTime.split(','))}
                isDayBlocked={(value) => !moment().isBefore(value)}
              />
              <div id="mapContainer"/>
            </div>
          </div>}

        </main>
        <footer>
          {
            this.state.data.isPartyB
              ? this.props.user.userId === this.state.data.userId
              ? <Button type="primary" onClick={this.jumpToEditData}>编辑</Button>
              : <Button type="primary" onClick={this.jumpToPostDemand}>联系</Button>
              : this.props.user.userId === this.state.data.userId
              ? <Button type="primary" onClick={this.jumpToEditData}>编辑</Button>
              : ''
          }
        </footer>
      </div>
    )
  }

  componentDidMount () {
    /* eslint-disable no-undef */
    // console.log('AMap++++', AMap)
    if (this.props.location.state && this.props.location.state.userId) {
      this.setState({
        userId: this.props.location.state.userId,
      }, () => {
        this.getUserById()
        this.getSkillByUserId()
      })
    } else {
      this.getUserById()
      this.getSkillByUserId()
    }

  }
}

export { Profile as page }