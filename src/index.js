import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Routes'
import registerServiceWorker from './registerServiceWorker'
import './static/style/index.less'

ReactDOM.render(<Routes/>, document.getElementById('root'))
registerServiceWorker()
