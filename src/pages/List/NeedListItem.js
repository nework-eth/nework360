import React from 'react'

function NeedListItem ({
                         date,
                         title,
                         imgList,
                       }) {
  return (
    <div className="need-list-item-wrapper">
      <div className="need-list-item-title-wrapper"><span className="need-list-item-title">{ title }</span><span
        className="need-list-item-date">{ date }</span>
      </div>
      <div className="need-list-item-content-wrapper">
        <div className="need-list-item-content">
          { /*{ imgList.length ? imgList.map(item => <img key={ item } src={ item } alt="头像"/>) : '服务人员估算服务费用中，请耐心等待...' }*/ }
        </div>
        <div className="need-list-item-operate">修改需求</div>
      </div>
    </div>
  )
}

export { NeedListItem as view }