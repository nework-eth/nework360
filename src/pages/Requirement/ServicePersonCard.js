import { Rate } from 'antd'
import React from 'react'
import { getRate, getRelativeTime } from '../../utils'
import './static/style/homepage.less'

// class ServicePersonCard extends Component {
//   render () {
//     return (
//       <div className="service-person-card">
//         <div>
//           <img src="" alt=""/>
//           <div className="operate">立即预约</div>
//         </div>
//         <div>
//           <div className="name">Rennaiqian</div>
//           <div className="rate-wrapper">
//             <Rate
//               allowHalf
//               disabled
//               defaultValue={ 4.5 }
//               character={ <i className="iconfont icon-rate-star-full"/> }
//             />
//             <p className="rate">{ 4.5 }</p>
//             <p className="evaluation">(12条评价)</p>
//           </div>
//         </div>
//         <div>
//           被雇佣次{hireTimes}
//         </div>
//         <div>已加入</div>
//         <div></div>
//         <div>
//           评论
//         </div>
//       </div>
//     )
//   }
// }

function ServicePersonCard ({
                              nickname,
                              evaluator,
                              hireTimes,
                              avatarUrl,
                              joinedTime,
                              evaluation,
                              appointment,
                              evaluateTime,
                              evaluateScore,
                              evaluateCount,
                              jumpToProfile,
                              jumpToPostDemand,
                            }) {
  return (
    <div className="service-person-card">
      <div className="service-person-card-top">
        <img
          src={avatarUrl}
          alt="头像"
          width="50"
          height="50"
          style={{cursor: 'pointer'}}
          onClick={jumpToProfile}
        />
        <div className="operate" onClick={appointment} style={{cursor: 'pointer', color: '#008bf7'}}>
          <div><i className="iconfont icon-message"></i></div>
          <div>立即预约</div>
        </div>
      </div>
      <div>
        <div className="name">{nickname}</div>
        <div className="rate-wrapper">
          <Rate
            allowHalf
            disabled
            defaultValue={getRate(evaluateScore)}
            character={<i className="iconfont icon-rate-star-full"/>}
          />
          <p className="rate">{evaluateScore}</p>
          <p className="evaluation">（{evaluateCount}条评价）</p>
        </div>
      </div>
      <div className="information-wrapper">
        <div className="row">
          <i className="iconfont icon-hire"/><span>被雇佣 {hireTimes} 次</span>
        </div>
        <div className="row">
          <i className="iconfont icon-joined-time"/><span>已加入{getRelativeTime(joinedTime)}</span>
        </div>
      </div>
      <div className="horizontal-line"/>
      <div className="virtual-title-wrapper">
        <p><span className="virtual-title">{evaluator}</span><span className="title-tip">的评论</span></p>
        {evaluateTime && <p className="title-tip">{getRelativeTime(evaluateTime)}前</p>}
      </div>
      <p>
        {evaluation}
      </p>
      <div onClick={jumpToProfile} className="profile-entry">查看更多</div>
    </div>
  )
}

export { ServicePersonCard as view }
