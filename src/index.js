import moment from 'moment'
import 'moment/locale/zh-cn'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import Routes from './Routes'
import './static/style/index.less'

moment.locale('zh_CN')

ReactDOM.render(<Routes/>, document.getElementById('root'))
registerServiceWorker()
