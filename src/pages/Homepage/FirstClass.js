import React, { Component } from 'react'
import { view as CardItem } from '../../components/CardItem'
import './static/style/first-class.less'

class FirstClass extends Component {
  constructor (props) {
    super(props)
  }

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
          { secondServiceList.map(({ serviceTypeName }) =>
            <CardItem
              key = {serviceTypeName}
              imgSrc={ serviceImageList.find(item => item.includes(serviceTypeName)) }
              title={ serviceTypeName }
              count={ 10 }
            />,
          ) }
        </div>
      </div>
    )
  }
}

export { FirstClass as view }

