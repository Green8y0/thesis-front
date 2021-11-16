import ReactDOM from 'react-dom'
import 'antd-mobile/es/global'
import './assets/styles/global.less'
import App from './pages/App'

function initFontSize() {
  const doc = document.documentElement
  const width = doc.clientWidth
  const ratio = width / 375
  let fontSize = 10 * ratio
  if (fontSize > 20) fontSize = 20
  doc.style.fontSize = fontSize + 'px'
}
initFontSize()

ReactDOM.render(<App />, document.getElementById('root'))
