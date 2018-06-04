import { Menu } from 'antd'
import React, { Component } from 'react'
import { view as EditDataForm } from './EditDataForm'
import './static/style/index.less'

const MenuItem = Menu.Item

function Content ({ selectedItem, data }) {
  switch (selectedItem) {
    case 'basic':
      return
    default:
      return (<div/>)
  }
}

class EditData extends Component {
  state = {
    selectedItem: 'balance',
    menuItemList: [
      {
        key: 'basic',
        content: '基本资料',
      },
      {
        key: 'photo',
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
  }

  handleClick = ({ key }) => {
    this.setState({
      selectedItem: key,
    })
  }

  render () {
    const { selectedItem, menuItemList } = this.state
    return (
      <div className="wallet-container">
        <Menu
          onClick={ this.handleClick }
          style={ { width: 188, height: 800 } }
          defaultSelectedKeys={ [ 'balance' ] }
          mode="inline"
        >
          { menuItemList.map(({ key, content }) => <MenuItem key={ key }>{ content }</MenuItem>) }
        </Menu>
        <div className="content">
          <EditDataForm selectedItem={ selectedItem } data={ {} }/>
        </div>
      </div>
    )
  }
}

export { EditData as page }
