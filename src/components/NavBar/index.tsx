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
