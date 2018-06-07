import { Button, Carousel, DatePicker, message, Rate } from 'antd'
import React, { Component } from 'react'
import { getUserById } from '../../service/editData'
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

const SkillItem = ({ iconSrc, title, index }) => (<div className="skill-card">
  <img
    src="./images/宠物-icon.png"
    alt="icon"
    width="40"
    height="40"
  />
  <p className="title">
    保洁
  </p>
  <p className="skill-index">
    技能{ index }
  </p>
</div>)

class Profile extends Component {
  state = {
    data: {},
  }
  getUserById = async () => {
    try {
      const { data: { data, desc, code } } = await getUserById({ userId: 11 })
      this.setState({ data })
      console.log(data)
    } catch (e) {
      message.error('请求服务器失败')
    }
  }

  render () {
    const { data: { avatar, nickName, isPartyB } } = this.state
    return (
      <div className="profile-container">
        <main>
          <img src={ avatar } alt="头像" width="100" height="100" className="avatar"/>
          <h2>您好，我是{ nickName }</h2>
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
            “ONE”#一宿设计#的团队主要来自上海。我们认同这座城市所赋予的精神及社会价值,公平、活力、创造、包容。虽然可能在不同地区的人们对这座城市有不同的解读,但我们希望您通过这样一个浓缩的空间,亲身体验一下这座城市的魅力,而不是别人口中的上海。上海不是一座围城,她是海,纳百川。这座城市的生命力从浦西一直延伸到浦东但我们希望您通过这样一个浓缩的空间,亲身体验一下这座城市的魅力,而不是别人口中的上海。上海不是一座围城,她是海,纳百川。这座城市的生命力从浦西一直延伸到浦东
          </p>
          <a href="">查看更多介绍</a>
          <div className="information-container">
            <div><i className="iconfont icon-hire"/>被雇佣128次</div>
            <div><i className="iconfont icon-identified"/>实名认证</div>
            <div><i className="iconfont icon-joined-time"/>已加入3年2个月</div>
            <div><i className="iconfont icon-identified-phone"/>手机认证</div>
            <div><i className="iconfont icon-nav-message"/>邮箱认证</div>
          </div>
          { /*<h3 className="company-title">区块链公司</h3>*/ }
          { /*<Carousel*/ }
          { /*dots={ false }*/ }
          { /*infinite={ false }*/ }
          { /*slidesToShow={ 2 }*/ }
          { /*slidesToScroll={ 1 }*/ }
          { /*arrows={ true }*/ }
          { /*>*/ }
          { /*{ [*/ }
          { /*{*/ }
          { /*companyName: 'google',*/ }
          { /*blockChainNumber: 1,*/ }
          { /*introduce: ' “ONE”#一宿设计#的团队主要来自上海。我们认同这座城市所赋予的精神及社会价值,公平、活力、创造、包容。虽然可能在不同地区的人们对这座城市有不同的解读,但我们希望您通过这样一个浓缩的空间,亲身体验一下这座城市的魅力,而不是别人口中的上海。上海不是一座围城,她是海,纳百川。这座城市的生命力从浦西一直延伸到浦东但我们希望您通过这样一个浓缩的空间,亲身体验一下这座城市的魅力,而不是别人口中的上海。上海不是一座围城,她是海,纳百川。这座城市的生命力从浦西一直延伸到浦东',*/ }
          { /*},*/ }
          { /*{*/ }
          { /*companyName: 'google',*/ }
          { /*number: 1,*/ }
          { /*introduce: 'Google有限公司（英语：Google LLC；中文：谷歌[3][注 1]），是美国Alphabet Inc.的子公司，业务范围涵盖互联网广告、互联网搜索、云计算等领域，开发并提供大量基于互联网的产品与服务[5]，其主要利润来自于AdWords等广告服务[6][7]。Google由在斯坦福大学攻读理工博士的拉里·佩奇和谢尔盖·布林共同创建，因此两人也被称为“Google Guys”[8][9][10]。1998年9月4日，Google以私营公司的形式创立，目的是设计并管理互联网搜索引擎“Google搜索”。2004年8月19日，Google公司在纳斯达克上市，后来被称为“三驾马车”的公司两位共同创始人与出任首席执行官的埃里克·施密特在此时承诺：共同在Google工作至少二十年，即至2024年止[11]。Google的宗旨是“整合全球信息，供大众使用，使人人受益”（To organize the world\'s information and make it universally accessible and useful）[12]；而非正式的口号则为“不作恶”（Don\'t be evil），由工程师阿米特·帕特尔（Amit Patel）所创[13]，并得到了保罗·布赫海特的支持[14][15]。Google公司的总部称为“Googleplex”，位于美国加州圣克拉拉县的芒廷维尤。2011年4月，佩奇接替施密特担任首席执行官[16]。在2015年8月，Google宣布进行资产重组。重组后，Google划归新成立的Alphabet底下。同时，此举把Google旗下的核心搜索和广告业务与Google无人车等新兴业务分离开来[17]。',*/ }
          { /*},*/ }
          { /*{*/ }
          { /*companyName: 'google',*/ }
          { /*number: 1,*/ }
          { /*introduce: 'Google有限公司（英语：Google LLC；中文：谷歌[3][注 1]），是美国Alphabet Inc.的子公司，业务范围涵盖互联网广告、互联网搜索、云计算等领域，开发并提供大量基于互联网的产品与服务[5]，其主要利润来自于AdWords等广告服务[6][7]。Google由在斯坦福大学攻读理工博士的拉里·佩奇和谢尔盖·布林共同创建，因此两人也被称为“Google Guys”[8][9][10]。1998年9月4日，Google以私营公司的形式创立，目的是设计并管理互联网搜索引擎“Google搜索”。2004年8月19日，Google公司在纳斯达克上市，后来被称为“三驾马车”的公司两位共同创始人与出任首席执行官的埃里克·施密特在此时承诺：共同在Google工作至少二十年，即至2024年止[11]。Google的宗旨是“整合全球信息，供大众使用，使人人受益”（To organize the world\'s information and make it universally accessible and useful）[12]；而非正式的口号则为“不作恶”（Don\'t be evil），由工程师阿米特·帕特尔（Amit Patel）所创[13]，并得到了保罗·布赫海特的支持[14][15]。Google公司的总部称为“Googleplex”，位于美国加州圣克拉拉县的芒廷维尤。2011年4月，佩奇接替施密特担任首席执行官[16]。在2015年8月，Google宣布进行资产重组。重组后，Google划归新成立的Alphabet底下。同时，此举把Google旗下的核心搜索和广告业务与Google无人车等新兴业务分离开来[17]。',*/ }
          { /*},*/ }
          { /*{*/ }
          { /*companyName: 'google',*/ }
          { /*number: 1,*/ }
          { /*introduce: 'Google有限公司（英语：Google LLC；中文：谷歌[3][注 1]），是美国Alphabet Inc.的子公司，业务范围涵盖互联网广告、互联网搜索、云计算等领域，开发并提供大量基于互联网的产品与服务[5]，其主要利润来自于AdWords等广告服务[6][7]。Google由在斯坦福大学攻读理工博士的拉里·佩奇和谢尔盖·布林共同创建，因此两人也被称为“Google Guys”[8][9][10]。1998年9月4日，Google以私营公司的形式创立，目的是设计并管理互联网搜索引擎“Google搜索”。2004年8月19日，Google公司在纳斯达克上市，后来被称为“三驾马车”的公司两位共同创始人与出任首席执行官的埃里克·施密特在此时承诺：共同在Google工作至少二十年，即至2024年止[11]。Google的宗旨是“整合全球信息，供大众使用，使人人受益”（To organize the world\'s information and make it universally accessible and useful）[12]；而非正式的口号则为“不作恶”（Don\'t be evil），由工程师阿米特·帕特尔（Amit Patel）所创[13]，并得到了保罗·布赫海特的支持[14][15]。Google公司的总部称为“Googleplex”，位于美国加州圣克拉拉县的芒廷维尤。2011年4月，佩奇接替施密特担任首席执行官[16]。在2015年8月，Google宣布进行资产重组。重组后，Google划归新成立的Alphabet底下。同时，此举把Google旗下的核心搜索和广告业务与Google无人车等新兴业务分离开来[17]。',*/ }
          { /*},*/ }
          { /*].map(({ companyName, number, introduce }) => <CompanyItem*/ }
          { /*companyName={ companyName }*/ }
          { /*number={ number }*/ }
          { /*introduce={ introduce }*/ }
          { /*/>) }*/ }
          { /*</Carousel>*/ }
          <h3 className="skill-title">技能（）</h3>
          <Carousel
            dots={ false }
            infinite={ false }
            slidesToShow={ 4 }
            slidesToScroll={ 1 }
            arrows={ true }
          >
            {
              [
                {
                  logoSrc: '',
                  title: '保洁',
                },
                {
                  logoSrc: '',
                  title: '健康',
                },
                {
                  logoSrc: '',
                  title: '健康',
                },
                {
                  logoSrc: '',
                  title: '健康',
                },
                {
                  logoSrc: '',
                  title: '健康',
                },
                {
                  logoSrc: '',
                  title: '健康',
                },
                {
                  logoSrc: '',
                  title: '健康',
                },
              ].map(({ logoSrc, title }, index) => <SkillItem
                logoSrc={ logoSrc }
                title={ title }
                index={ index }
                key={ title }
              />)
            }
          </Carousel>
          {
            isPartyB && <div>
              <h3 className="location">营业时间与地点</h3>
              <div className="time-location-container">
                <DatePicker
                  open={ true }
                />
                <div id="mapContainer"/>
              </div>
            </div>
          }

        </main>
        <footer><Button type="primary">编辑</Button></footer>
      </div>
    )
  }

  componentDidMount () {
    /* eslint-disable no-undef */
    const map = new AMap.Map('mapContainer')
    this.getUserById()
  }
}

export { Profile as page }