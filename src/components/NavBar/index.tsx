import { useHistory } from 'react-router-dom'
import { NavBar, ConfigProvider } from 'react-vant'

interface Props {
  from?: string
  title?: string
}

const themeVars = {
  '--rv-nav-bar-icon-color': '#000'
}

// 封装顶部导航栏
export default function PackNavBar({
  title = '社区'
}: Props) {
  const history = useHistory()

  const onBack = () => {
    // const query = new URLSearchParams(window.location.search)
    // const code = query.get('code')
    // if (code) {
    //   // 从首页进详情页，登录返回详情，导航栏goBack
    //   history.replace({
    //     pathname: '/',
    //     state: { site: 'wps' }
    //   })
    // } else {
    //   history.goBack()
    // }
    history.goBack()
  }

  return (
    <ConfigProvider themeVars={themeVars}>
      <NavBar
        safeAreaInsetTop
        onClickLeft={onBack}
        leftArrow
        title={title}
      />
    </ConfigProvider>
  )
}
