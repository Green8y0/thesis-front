import ReactDOM from 'react-dom'
import 'antd-mobile/es/global'
import './assets/styles/global.less'
import App from './pages/App'

function initFontSize() {
  const doc = document.documentElement
  const width = doc.clientWidth
  const ratio = width / 375
  let fontSize = 75 * ratio
  if (fontSize > 150) fontSize = 150
  doc.style.fontSize = fontSize + 'px'
}
initFontSize()

ReactDOM.render(<App />, document.getElementById('root'))
