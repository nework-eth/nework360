import { Carousel } from 'antd'
import React, { Component } from 'react'
import { view as CardItem } from '../../components/CardItem'
import './static/style/home.less'

class Home extends Component {

  render () {
    const settings = {
      dots: false,
      speed: 500,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
    }

    const h2Style = {
      marginTop: '50px',
      marginBottom: '20px',
      cursor: 'pointer',
    }

    const { handleFirstServiceChange, nearServiceList, serviceImageList } = this.props
    return (
      <div className="home-container">
        { /*{ <h2 style={ h2Style }>附近的服务</h2> }*/ }
        { /*{ <Carousel { ...settings }> }*/ }
        { /*{ this.state.serviceList.map(({ imgSrc, title, count }, index) => <CardItem*/ }
        { /*imgSrc={ imgSrc }*/ }
        { /*title={ title }*/ }
        { /*count={ count }*/ }
        { /*key={ index }*/ }
        { /*/>) }*/ }
        { /*</Carousel>*/ }
        <h2 style={ h2Style }>附近的服务</h2>
        <Carousel { ...settings }>
          {
            nearServiceList.map(({ serviceTypeName }) => <CardItem
              imgSrc={ serviceImageList.find(serviceImage => serviceImage.includes(serviceTypeName)) }
              title={ serviceTypeName }
              count={ 10 }
              key={ serviceTypeName }
            />)
          }
        </Carousel>
        {
          this.props.firstServiceList.map((service, index) => (
            <div key={ service }>
              <h2
                style={ h2Style }
                onClick={ () => handleFirstServiceChange(service) }
              >
                { service }
              </h2>
              <Carousel { ...settings }>
                { this.props.serviceTree[ index ].child.map(({ serviceTypeName }, index) => <CardItem
                  imgSrc={ this.props.serviceImageList.find(serviceImage => serviceImage.includes(serviceTypeName)) }
                  title={ serviceTypeName }
                  count={ 10 }
                  key={ index }
                />) }
              </Carousel>
            </div>
          ))
        }
      </div>
    )
  }
}

export { Home as view }
