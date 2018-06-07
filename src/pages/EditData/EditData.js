import { Menu, Modal } from 'antd'
import { message } from 'antd/lib/index'
import React, { Component } from 'react'
import { changePwd, getMessageCode, getUserById, updateUser, verifyPhoneNumber } from '../../service/editData'
import { getCityTree } from '../../service/homepage'
import { view as EditDataForm } from './EditDataForm'
import { view as ModalForm } from './ModalForm'
import './static/style/index.less'

const MenuItem = Menu.Item

// const mapState = () => {}

// @connect(mapState)
class EditData extends Component {
  state = {
    selectedItem: 'avatar',
    selectedCountry: '中国',
    countryOptions: [],
    selectedProvince: '北京',
    provinceOptions: [],
    selectedCity: '北京',
    data: {},
    originData: {},
    menuItemList: [
      {
        key: 'basic',
        content: '基本资料',
      },
      {
        key: 'avatar',
        content: '照片',
      },
      {
        key: 'skill',
        content: '我的技能',
      },
      {
        key: 'auth',
        content: '信任',
      },
      {
        key: 'account',
        content: '账号安全',
      },
    ],
    pwd: '',
    newPwd: '',
    newPwdRepeat: '',
    modalType: '',
    messageCode: '',
    modalVisible: false,
    modalTitle: '',
  }

  handleClick = ({ key }) => {
    this.setState({
      selectedItem: key,
    })
  }
  getCityTree = async () => {
    try {
      const { data: { code, data } } = await getCityTree()
      if (code !== 200) {
        return message.error('请求服务器失败')
      }
      const tree = data
      window.tree = data
      const countryList = Object.keys(tree)
      const provinceList = Object.keys(tree[ '中国' ])
      const letterCityList = tree[ '中国' ][ '北京' ].map(item => item.chinese)
      this.setState({
        tree,
        countryOptions: countryList,
        provinceOptions: provinceList,
        cityOptions: letterCityList,
        // cityOptions: letterCityList,
        // selectedCity: letterCityList[0]
      })
    } catch (e) {
      message.error('请求服务器失败')
    }
  }
  getUserById = async () => {
    try {
      const { data: { data, code } } = await getUserById({ userId: 11 })
      console.log(data)
      this.setState({ data, originData: data })
      if (code !== 200) {
        return message.error('请求服务器错误')
      }
    } catch (e) {
      message.error('请求服务器失败')
    }
  }
  handleInput = type => e => this.setState({
    data: { [ type ]: e.target.value },
  })
  handlePwdChange = e => this.setState({
    pwd: e.target.value,
  })
  handleNewPwdChange = e => this.setState({
    newPwd: e.target.value,
  })
  handleNewPwdRepeatChange = e => this.setState({
    newPwdRepeat: e.target.value,
  })
  handleAvatarChange = avatar => this.setState({
    data: { avatar },
  })
  handleCountryChange = (value) => {
    console.log(this.state.tree[ value ])
    const provinceOptions = Object.keys(this.state.tree[ value ])
    const selectedProvince = provinceOptions[ 0 ]
    const cityData = this.state.tree[ value ][ selectedProvince ]
    const cityOptions = cityData.map(item => item.chinese)
    const selectedCity = cityOptions[ 0 ]
    this.setState({
      selectedCountry: value,
      provinceOptions,
      selectedProvince: Object.keys(this.state.tree[ value ])[ 0 ],
      cityData,
      cityOptions,
      selectedCity,
      cityId: this.getCityIdByName(selectedCity),
    })
  }
  handleProvinceChange = (value) => {
    console.log(this.state.tree[ this.state.selectedCountry ][ value ])
    const cityData = this.state.tree[ this.state.selectedCountry ][ value ]
    const cityOptions = cityData.map(item => item.chinese)
    this.setState({
      selectedProvince: value,
      cityData,
      cityOptions,
      selectedCity: cityOptions[ 0 ],
      cityId: this.getCityIdByName(value) || '',
    })

  }
  handleCityChange = (value) => {
    this.setState({
      selectedCity: value,
      cityId: this.getCityIdByName(value) || '',
    })
  }
  handleChangePwdSubmit = async () => {
    try {
      const { data: { code, desc } } = await changePwd({
        pwd: this.state.pwd,
        newPwd: this.state.newPwd,
      })
      if (code !== 200) {
        message.error(desc)
        return
      }
      message.success('修改密码成功')
    } catch (e) {
      message.error('请求服务器失败')
    }

  }
  handleSave = (type) => async () => {
    try {
      const { data: { code } } = await updateUser({
        userId: 11,
        [ type ]: this.state.data[ type ],
      })
      if (code !== 200) {
        message.error('请求服务器失败')
        return
      }
      message.success('更新资料成功')
    } catch (e) {
      message.error('请求服务器失败')
    }
  }
  handleShowModal = (modalType, modalTitle) => () => {
    this.setState({
      modalType,
      modalTitle,
      modalVisible: true,
    })
  }
  handleModalCancel = () => this.setState({
    modalType: '',
    modalTitle: '',
    modalVisible: false,
  })
  getMessageCode = async () => {
    try {
      const { data: { code, desc } } = await getMessageCode({ phoneNumber: this.state.data.phoneNumber })
      if (code !== 200) {
        message.error(desc)
        return
      }
      message.success('已发送验证码')
    } catch (e) {
      message.error('请求服务器失败')
    }
  }
  handleMessageCodeChange = e => this.setState({ messageCode: e.target.value })
  verifyPhoneNumber = async () => {
    try {
      const { data: { code, desc } } = await verifyPhoneNumber({
        phoneNumber: this.state.data.phoneNumber,
        code: this.state.messageCode,
      })
      if (code !== 200) {
        message.error(desc)
        return
      } else {
        const { data: { code, desc } } = await updateUser({
          userId: this.state.data.userId,
          phoneNumber: this.state.data.phoneNumber,
        })
        if (code !== 200) {
          message.error(desc)
          return
        }
      }
      message.success('验证手机号成功')
      this.handleModalCancel()
    } catch (e) {
      message.error('请求服务器失败')
    }
  }

  render () {
    const {
      selectedItem,
      data,
      selectedCity,
      selectedCountry,
      menuItemList,
      pwd,
      newPwd,
      newPwdRepeat,
      modalVisible,
      modalTitle,
      modalType,
      messageCode,
    } = this.state
    return (
      <div className="edit-data-container">
        <Menu
          onClick={ this.handleClick }
          style={ { width: 188, minHeight: 800, height: '100%' } }
          defaultSelectedKeys={ [ 'balance' ] }
          mode="inline"
        >
          { menuItemList.map(({ key, content }) => <MenuItem key={ key }>{ content }</MenuItem>) }
        </Menu>
        <div className="content">
          <EditDataForm
            selectedItem={ selectedItem }
            data={ data }
            handleInput={ this.handleInput }
            pwd={ pwd }
            handlePwdChange={ this.handlePwdChange }
            newPwd={ newPwd }
            handleNewPwdChange={ this.handleNewPwdChange }
            newPwdRepeat={ newPwdRepeat }
            handleNewPwdRepeatChange={ this.handleNewPwdRepeatChange }
            handleChangePwdSubmit={ this.handleChangePwdSubmit }
            handleAvatarChange={ this.handleAvatarChange }
            handleSave={ this.handleSave }
            handleShowModal={ this.handleShowModal }
          />
        </div>
        <Modal
          title={ <h2>{ modalTitle }</h2> }
          visible={ modalVisible }
          style={ { top: 'calc(50% - 205px)' } }
          maskStyle={ {
            backgroundColor: '#edf1f4',
            opacity: 0.9,
          } }
          bodyStyle={ {
            width: '520px',
            boxShadow: '0 0 10px 0 rgba(9,34,53,0.10)',
            borderRadius: '4px',
          } }
          footer={ null }
          onCancel={ this.handleModalCancel }
        >
          <ModalForm
            modalType={ modalType }
            data={ data }
            messageCode={ messageCode }
            handleModalCancel={ this.handleModalCancel }
            getMessageCode={ this.getMessageCode }
            handleInput={ this.handleInput }
            handleMessageCodeChange={ this.handleMessageCodeChange }
            verifyPhoneNumber={ this.verifyPhoneNumber }
            handleSave={ this.handleSave }
          />
        </Modal>
      </div>
    )
  }

  componentDidMount () {
    // this.getCityTree()
    this.getUserById()
  }

}

export { EditData as page }
