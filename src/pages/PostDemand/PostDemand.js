import { message, Progress } from 'antd'
import React, { Component } from 'react'
import { createDemand, getTemplate } from '../../service/demand'
import { view as Footer } from './Footer'
import './static/style/index.less'
import { view as Template } from './Template'

const filterData = (pageData) => {
  const textArray = pageData.filter((item, index) => index % 2 === 0)
  console.log('textArray', textArray)
  const formItemArray = pageData.filter((item, index) => index % 2 !== 0)
  console.log('formItemArray', formItemArray)
  return formItemArray.map(({
                              id,
                              pageNum,
                              content,
                              isNessary,
                              isMultChoice,
                              templateItemType,
                            }, index) => {
    if (templateItemType === 'select') {
      return {
        id,
        pageNum,
        index: index * 2 + 1,
        options: content,
        type: templateItemType,
        isNecessary: isNessary,
        isMultiChoice: isMultChoice,
        title: textArray[ index ].content,
      }
    } else {
      return {
        id,
        pageNum,
        index: index * 2 + 1,
        type: templateItemType,
        isNecessary: isNessary,
        isMultiChoice: isMultChoice,
        title: textArray[ index ].content,
      }
    }
  })
}

const generateResult = (pages) => pages.map(page => page.map(item => ({
  ...item,
  resultValue: generateInitValue(item.templateItemType),
})))

const generateInitValue = (type) => {
  switch (type) {
    case 'select':
      return []
    case 'time':
      return null
    default:
      return ''
  }
}

class PostDemand extends Component {

  state = {
    data: [ [] ],
    pages: [],
    pageIndex: 0,
    originData: [],
    templateId: '',
    progressStep: 0,
    progressPercent: 0,
    locationOptions: [],
  }

  getTemplate = async () => {
    // const { data: { data, code, desc } } = await getTemplate({ serviceId: 22 })
    // if (code !== 200) {
    //   message.error(desc)
    //   return
    // }
    const data = await getTemplate({ serviceId: 22 })
    if (data) {
      // console.log('data', data)
      this.setState({
        data: generateResult(data.pages),
        pages: data.pages.map(page => filterData(page)),
        templateId: data.templateId,
        progressStep: 100 / data.pages.length,
      })
    }
  }

  goLastPage = () => {
    this.setState(({ pageIndex, progressPercent, progressStep }) => ({
      pageIndex: pageIndex - 1,
      progressPercent: progressPercent - progressStep,
    }))
  }

  goNextPage = () => {
    this.setState(({ pageIndex, progressPercent, progressStep }) => ({
      pageIndex: pageIndex + 1,
      progressPercent: progressPercent + progressStep,
    }))
  }

  mapInit = () => {
    this.mapApi = new Promise((resolve, reject) => {
      try {
        /* eslint-disable no-undef */
        AMap.plugin('AMap.Autocomplete', () => {
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  getLocationOptions = keyword => {
    this.mapApi.then(() => {
      /* eslint-disable no-undef */
      this.placeSearch = new AMap.Autocomplete({
        // todo: 去掉假数据
        city: (this.props.user && this.props.user.city) || '北京',
        cityLimit: true,
      })
      keyword && this.placeSearch.search(keyword, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          console.log(result.tips)
          this.setState({
            locationOptions: result.tips.slice(0, 5),
          })
        }
      })
    })
  }

  createDemand = async () => {
    // try {
    const success = await createDemand(
      {
        pages: this.state.data,
      },
      {
        // todo: 换成真实数据
        districtId: 110,
        serviceId: 22,
        templateId: this.state.templateId,
      },
    )
    if (success) {
      message.success('发布需求成功')
    }
    // if (code !== 200) {
    //   message.error(desc)
    //   return
    // }
    // } catch (e) {
    //   message.error('网络连接失败，请检查网络后重试')
    // }
  }
  handleGoNextButtonClick = () => {
    if (this.state.pageIndex < this.state.data.length - 1) {
      this.goNextPage()
      return
    }
    this.createDemand()
  }

  handleChange = ({ pageNum, index }) => (value) => {
    // console.log(value)
    this.setState(({ data }) => {
      const temp = JSON.parse(JSON.stringify(data))
      temp[ pageNum ][ index ].resultValue = value
      return { data: temp }
    })
  }
  handleLocationChange = ({ pageNum, index }) => (value) => {
    // console.log(value)
    // console.log(pageNum, index)
    this.getLocationOptions(value)
    this.setState(({ data }) => {
      const temp = JSON.parse(JSON.stringify(data))
      temp[ pageNum ][ index ].resultValue = value
      return { data: temp }
    })
  }

  handleSpecAddressChange = ({ pageNum, index }) => (value) => {
    // console.log(value)
    this.setState(({ data }) => {
      const temp = JSON.parse(JSON.stringify(data))
      temp[ pageNum ][ index ].resultValue = [ temp[ pageNum ][ index ].resultValue.split(',')[ 0 ], value ].join(',')
      return { data: temp }
    })
  }

  render () {
    const {
      data,
      pages,
      pageIndex,
      locationOptions,
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
            pages[ pageIndex ] && pages[ pageIndex ].map(item =>
              <Template
                { ...item }
                key={ item.id }
                value={ data[ pageIndex ][ item.index ].resultValue }
                handleChange={ this.handleChange({ pageNum: pageIndex, index: item.index }) }
                locationOptions={ locationOptions }
                handleLocationChange={ this.handleLocationChange({ pageNum: pageIndex, index: item.index }) }
                handleSpecAddressChange={ this.handleSpecAddressChange({ pageNum: pageIndex, index: item.index }) }
              />)
          }
        </div>
      </main>
      <Footer
        pageData={ data[ pageIndex ] }
        pageIndex={ pageIndex }
        goLastPage={ this.goLastPage }
        handleGoNextButtonClick={ this.handleGoNextButtonClick }
      />
    </div>)
  }

  componentDidMount () {
    this.getTemplate()
    this.mapInit()
  }

}

export { PostDemand as page }