import { message, Progress } from 'antd'
import React, { Component } from 'react'
import { getTemplate } from '../../service/demand'
import { view as Footer } from './Footer'
import './static/style/index.less'
import { view as Template } from './Template'

const filterIdiotData = (page) => {
  let result = []
  let temp = null
  for (let {
    id,
    content,
    isNessary,
    instruction,
    isMultChoice,
    templateItemType,
  } of page) {
    if (templateItemType === 'text') {
      temp = {
        title: content,
      }
    } else if (temp) {
      if (templateItemType === 'select') {
        result.push({
          id: id,
          type: templateItemType,
          ...temp,
          options: content,
          isNecessary: isNessary,
          isMultiChoice: isMultChoice,
        })
        temp = null
        continue
      }
      if (templateItemType === 'location') {
        result.push({
          id: id,
          type: templateItemType,
          ...temp,
          isNecessary: isNessary,
        })
      }

    } else {
      if (templateItemType === 'time') {
        result.push({
          id: id,
          type: templateItemType,
          title: content,
          isNecessary: isNessary,
        })
        continue
      }
      if (templateItemType === 'input') {
        result.push({
          id: id,
          type: templateItemType,
          title: instruction,
          isNecessary: isNessary,
        })
      }
    }
  }
  return result
}

class PostDemand extends Component {

  state = {
    pages: [],
    originData: [],
    pageIndex: 0,
    progressPercent: 0,
    progressStep: 0,
  }
  getTemplate = async () => {
    try {
      const { data: { data, code, desc } } = await getTemplate({ serviceId: 22 })
      if (code !== 200) {
        message.error(desc)
        return
      }
      this.setState({
        originData: data.pages,
        pages: data.pages.map(page => filterIdiotData(page)),
        progressStep: 100 / data.pages.length,
      })
      console.log((data.pages.map(page => filterIdiotData(page))[ 0 ]))
      // const res = await getTemplate({ serviceId: 22 })
      // console.log(res)
    } catch (e) {
      message.error('网络连接失败，请检查网络后重试')
    }
  }

  render () {
    const {
      pages,
      pageIndex,
      progressPercent,
    } = this.state
    return (<div className="post-demand-container">
      <main>
        <h2 style={ { margin: '50px 0' } }>
          <i
            className="iconfont icon-logo"
            style={ { fontSize: '30px', lineHeight: '40px' } }
          />
        </h2>
        <Progress
          percent={ progressPercent }
          showInfo={ false }
          style={ { height: '5px' } }
        />
        <div className="template-wrapper">
          {
            pages[ pageIndex ] && pages[ pageIndex ].map(item => <Template { ...item } key={ item.id }/>)
          }
        </div>
      </main>
      <Footer/>
    </div>)
  }

  componentDidMount () {
    this.getTemplate()
  }
}

export { PostDemand as page }