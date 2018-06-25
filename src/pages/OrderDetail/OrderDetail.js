import React, { Component } from 'react'
import { view as Footer } from '../../components/Footer/index.js'
import './static/style/index.less'

class OrderDetail extends Component {
  state = {
    title: '',
  }

  render () {
    const { title } = this.state
    return (
      <div className="order-detail-container">
        <main>
          <h2>{ title }</h2>
        </main>
        <Footer/>
      </div>
    )
  }

  componentDidMount () {

  }
}

export { OrderDetail as page }
