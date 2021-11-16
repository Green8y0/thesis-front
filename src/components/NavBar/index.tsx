import { useHistory } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

interface Props {
  from?: string
  title?: string
}

// 封装顶部导航栏
export default function PackNavBar({
  title = '社区'
}: Props) {
  const history = useHistory()

  const onBack = () => {
    const query = new URLSearchParams(window.location.search)
    const code = query.get('code')
    if (code) {
      // 从首页进详情页，登录返回详情，导航栏goBack
      history.replace({
        pathname: '/',
        state: { site: 'wps' }
      })
    } else {
      history.goBack()
    }
  }

  return (
    <NavBar onBack={onBack} style={{ backgroundColor: '#eeeeed' }}>{title}</NavBar>
  )
}
