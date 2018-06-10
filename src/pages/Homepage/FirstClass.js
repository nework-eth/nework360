import React, { Component } from 'react'
import { view as CardItem } from '../../components/CardItem'

class FirstClass extends Component {
  render () {
    const {
      selectedFirstService,
      secondServiceList,
      serviceImageList,
    } = this.props
    return (
      <div>
        <h2 style={ { marginTop: '50px', marginBottom: '20px' } }>全部{ selectedFirstService }服务</h2>
        <div className="card-item-container">
          { secondServiceList.map(({ serviceTypeName, count }) =>
            <CardItem
              key={ serviceTypeName }
              imgSrc={ serviceImageList.find(item => item.includes(serviceTypeName)) }
              title={ serviceTypeName }
              count={ count }
            />,
          ) }
        </div>
      </div>
    )
  }
}

export { FirstClass as view }

