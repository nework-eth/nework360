import { Menu, Table } from 'antd'
import React, { Component } from 'react'
import './static/style/index.less'

const MenuItem = Menu.Item

function Content ({ selectedItem, data }) {
  if (selectedItem === 'balance') {
    return (
      <div>
        <h2>账户余额</h2>
        <div className="balance-container">
          <div className="balance-item">
            <p className="item-title">法定货币</p>
            <div className="balance-item-card balance-item-card-1">
              <img
                src="./images/balance-rmb.png"
                alt="rmb"
                width="40"
                height="40"
              />
              <p className="title">
                12,800.00
              </p>
              <p className="balance-type">人民币（CNY）</p>
              <a href="/">提现</a>
            </div>
          </div>
          <div className="balance-item">
            <p className="item-title">数字货币</p>
            <div className="balance-item-card balance-item-card-2">
              <img
                src="./images/balance-nkc.png"
                alt="nkc"
                width="40"
                height="40"
              />
              <p className="title">
                9,800
              </p>
              <p className="balance-type">NKC</p>
              <a href="/">提现</a>
            </div>
          </div>
          <div className="balance-item">
            <p className="item-title">卡包</p>
            <div className="balance-item-card balance-item-card-3">
              <img
                src="./images/balance-clue.png"
                alt="clue"
                width="40"
                height="40"
              />
              <p className="title">
                98
              </p>
              <p className="balance-type">线索卡（张）</p>
              <a href="/">购买</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (selectedItem === 'records') {
    const columns = [
      {
        title: '流水号',
        dataIndex: 'id',
        key: 'id',
        width: 120,
      },
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        width: 130,
      },
      {
        title: '交易类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
      },
      {
        title: '账户',
        dataIndex: 'account',
        key: 'account',
        width: 100,
      },
      {
        title: '交易状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
      },
      {
        title: '交易时间',
        dataIndex: 'date',
        key: 'date',
        width: 130,
      },
    ]

    const data = [
      {
        id: 'RE413413134',
        amount: '2000',
        type: 'pay',
        account: 'ren',
        status: 'success',
        date: '2018-06-20',
      },
      {
        id: 'RE413413135',
        amount: '2000',
        type: 'pay',
        account: 'ren',
        status: 'success',
        date: '2018-06-20',
      },
      {
        id: 'RE413413136',
        amount: '2000',
        type: 'pay',
        account: 'ren',
        status: 'success',
        date: '2018-06-20',
      },
      {
        id: 'RE413413137',
        amount: '2000',
        type: 'pay',
        account: 'ren',
        status: 'success',
        date: '2018-06-20',
      },
      {
        id: 'RE413413138',
        amount: '2000',
        type: 'pay',
        account: 'ren',
        status: 'success',
        date: '2018-06-20',
      },
      {
        id: 'RE413413139',
        amount: '2000',
        type: 'pay',
        account: 'ren',
        status: 'success',
        date: '2018-06-20',
      },
      {
        id: 'RE413413140',
        amount: '2000',
        type: 'pay',
        account: 'ren',
        status: 'success',
        date: '2018-06-20',
      },
    ]
    return (
      <div>
        <h2>交易记录</h2>
        <Table
          rowKey="id"
          columns={ columns }
          dataSource={ data }
          bordered={ false }
          rowClassName="table-row"
        />
      </div>
    )
  }
}

class Wallet extends Component {
  state = {
    selectedItem: 'balance',
  }
  handleClick = ({ key }) => {
    this.setState({
      selectedItem: key,
    })
  }

  render () {
    const { selectedItem } = this.state
    return (
      <div className="wallet-container">
        <Menu
          onClick={ this.handleClick }
          style={ { width: 188, height: 800 } }
          defaultSelectedKeys={ [ 'balance' ] }
          mode="inline"
        >
          <MenuItem key="balance">账户余额</MenuItem>
          <MenuItem key="records">交易记录</MenuItem>
        </Menu>
        <div className="content">
          <Content selectedItem={ selectedItem }/>
        </div>
      </div>
    )
  }
}

export { Wallet as page }


