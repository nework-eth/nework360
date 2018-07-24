import { Menu, Table } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getUserAccount, getUserClueCardRecord, getUserTransactionRecord } from '../../service/wallet'
import './static/style/index.less'

const MenuItem = Menu.Item

function Content ({
                    nkc,
                    clue,
                    money,
                    isPartyB,
                    selectedItem,
                    clueCardRecordList,
                    transactionRecordList,
                  }) {
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
                { money / 100 }
              </p>
              <p className="balance-type">人民币（CNY）</p>
              <Link href="/withdraw">提现</Link>
            </div>
          </div>
          { isPartyB && <div className="balance-item">
            <p className="item-title">卡包</p>
            <div className="balance-item-card balance-item-card-3">
              <img
                src="./images/balance-clue.png"
                alt="clue"
                width="40"
                height="40"
              />
              <p className="title">
                { clue }
              </p>
              <p className="balance-type">线索卡（张）</p>
              <Link href="/clue-card">购买</Link>
            </div>
          </div> }
        </div>
      </div>
    )
  }
  if (selectedItem === 'records') {
    const columns = [
      {
        title: '流水号',
        dataIndex: 'recordOrderId',
        key: 'recordOrderId',
        width: 120,
      },
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        width: 130,
        render (value) {
          return parseInt(value, 10) / 100
        },
      },
      {
        title: '交易类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
        render (value) {
          switch (value) {
            case 'pay':
              return '支付'
            case 'receipt':
              return '收款'
            case 'CNY':
              return '提现'
            default:
              return ''
          }
        },
      },
      {
        title: '账户',
        dataIndex: 'userBName',
        key: 'userBName',
        width: 100,
      },
      {
        title: '交易状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render (value) {
          switch (value) {
            case 'pay_success':
              return '支付成功'
            case 'receipt_success':
              return '收款成功'
            case 'succ':
              return '提现成功'
            case 'fail':
              return '提现失败'
            case 'submit':
              return '提现申请'
            case 'wait':
              return '待打款'
            case 'reject':
              return '提现拒绝'
            default:
              return ''
          }
        },
      },
      {
        title: '交易时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 130,
      },
    ]

    return (
      <div>
        <h2>交易记录</h2>
        <Table
          rowKey="id"
          columns={ columns }
          dataSource={ transactionRecordList }
          bordered={ false }
          rowClassName="table-row"
        />
      </div>
    )
  }
  if (selectedItem === 'clueRecords') {
    const columns = [
      {
        title: '订单号',
        dataIndex: 'clueOrderId',
        key: 'clueOrderId',
        width: 240,
      },
      {
        title: '张数',
        dataIndex: 'count',
        key: 'count',
        width: 100,
        render (value, record) {
          switch (record.type) {
            case 'recharge':
              return `+ ${value} 张`
            case 'pay':
              return `- ${value} 张`
            case 'back':
              return `+ ${value} 张`
            default:
              return ''
          }

        },
      },
      {
        title: '交易类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
        render (value) {
          switch (value) {
            case 'recharge':
              return '购买'
            case 'pay':
              return '支付'
            case 'back':
              return '退回'
            default:
              return ''
          }
        },
      },
      {
        title: '账户',
        dataIndex: 'accountName',
        key: 'accountName',
        width: 100,
        render (value) {
          if (value === 'system') {
            return '平台账户'
          }
          return value
        },
      },
      {
        title: '交易状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render (value) {
          switch (value) {
            case 'succ':
              return '成功'
            case 'fail':
              return '失败'
            default:
              return ''
          }
        },
      },
      {
        title: '交易时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 160,
      },
    ]

    return (
      <div>
        <h2>线索卡记录</h2>
        <Table
          rowKey="id"
          columns={ columns }
          dataSource={ clueCardRecordList }
          bordered={ false }
          rowClassName="table-row"
        />
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user,
})

@connect(mapState)
class Wallet extends Component {
  state = {
    money: '',
    nkc: '',
    clue: '',
    selectedItem: 'balance',
    clueCardRecordList: [],
    transactionRecordList: [],
  }

  handleClick = ({key}) => {
    this.setState({
      selectedItem: key,
      clueCardRecordList: [],
      transactionRecordList: [],
    })
    this.getUserClueCardRecord()
    this.getUserTransactionRecord()
  }
  getUserAccount = async () => {
    const {data: {data, code}} = await getUserAccount({userId: this.props.user.userId})
    if (code === 200) {
      this.setState({
        money: data.money,
        nkc: data.nkc,
        clue: data.cule,
      })
    }
  }
  getUserTransactionRecord = async () => {
    const {data: {data, code}} = await getUserTransactionRecord({userId: this.props.user.userId, limit: -1})
    if (code === 200) {
      this.setState({
        transactionRecordList: data,
      })
    }
  }
  getUserClueCardRecord = async () => {
    const {data: {data, code}} = await getUserClueCardRecord({userId: this.props.user.userId, limit: -1})
    if (code === 200) {
      this.setState({
        clueCardRecordList: data,
      })
    }
  }

  render () {
    const {
      nkc,
      clue,
      money,
      selectedItem,
      clueCardRecordList,
      transactionRecordList,
    } = this.state
    return (
      <div className="wallet-container">
        <Menu
          onClick={ this.handleClick }
          style={ {width: 188, height: 800, position: 'fixed'} }
          defaultSelectedKeys={ ['balance'] }
          mode="inline"
        >
          <MenuItem key="balance">账户余额</MenuItem>
          <MenuItem key="records">交易记录</MenuItem>
          { this.props.user.isPartyB && <MenuItem key="clueRecords">线索卡记录</MenuItem> }
        </Menu>
        <div className="content">
          <Content
            nkc={ nkc }
            clue={ clue }
            money={ money }
            isPartyB={ this.props.user && this.props.user.isPartyB }
            selectedItem={ selectedItem }
            clueCardRecordList={ clueCardRecordList }
            transactionRecordList={ transactionRecordList }
          />
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.getUserAccount()
    this.getUserTransactionRecord()
    this.getUserClueCardRecord()
  }
}

export { Wallet as page }


