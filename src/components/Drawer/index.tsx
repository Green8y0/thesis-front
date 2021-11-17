import { Button, Popup, Dialog, Toast } from 'antd-mobile'
import { MenuOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { useRequest } from 'ahooks'

import styles from './style.module.less'
import { IUser } from '@/models/types'
import { userService } from '@/services'

interface Props {
  user: IUser | undefined
  visible: boolean
  onClose: () => void
}

export default function Drawer({ user, visible, onClose }: Props) {
  const { run } = useRequest(userService.logout, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        Toast.show('已退出登录')
        window.location.href = '/login'
      } else {
        Toast.show(data.msg)
      }
    }
  })

  const logout = async () => {
    const result = await Dialog.confirm({
      content: '确认要注销登录吗'
    })
    if (result) run()
  }

  return (
    <Popup
      visible={visible}
      onMaskClick={onClose}
      position="left"
      bodyClassName={styles.drawer}
    >
      <div className={styles.menu}>
        <MenuOutlined onClick={onClose} />
      </div>
      <div className={styles.account}>
        {/* <img src={user?.avatar} className={styles.avatar} alt="" /> */}
        <span>{user?.nickname}</span>
      </div>
      <NavLink
        to="/"
        exact
        className={styles.row}
        activeClassName={styles.active}
        onClick={onClose}
      >
        <HomeOutlined />
        <span>任务</span>
      </NavLink>
      <NavLink
        to="/setting"
        exact
        className={styles.row}
        activeClassName={styles.active}
        onClick={onClose}
      >
        <SettingOutlined />
        <span>设置</span>
      </NavLink>
      <NavLink
        to="/useRef"
        exact
        className={styles.row}
        activeClassName={styles.active}
        onClick={onClose}
      >
        <SettingOutlined />
        <span>useRef</span>
      </NavLink>
      <NavLink
        to="/usecallback"
        exact
        className={styles.row}
        activeClassName={styles.active}
        onClick={onClose}
      >
        <SettingOutlined />
        <span>useCallback</span>
      </NavLink>
      <NavLink
        to="/useRequest"
        exact
        className={styles.row}
        activeClassName={styles.active}
        onClick={onClose}
      >
        <SettingOutlined />
        <span>useRequest</span>
      </NavLink>
      <NavLink
        to="/useDebounce"
        exact
        className={styles.row}
        activeClassName={styles.active}
        onClick={onClose}
      >
        <SettingOutlined />
        <span>useDebounce</span>
      </NavLink>
      <NavLink
        to="/useDebounceFn"
        exact
        className={styles.row}
        activeClassName={styles.active}
        onClick={onClose}
      >
        <SettingOutlined />
        <span>useDebounceFn</span>
      </NavLink>
      <NavLink
        to="/usedebounceeffect"
        exact
        className={styles.row}
        activeClassName={styles.active}
        onClick={onClose}
      >
        <SettingOutlined />
        <span>useDebounceEffect</span>
      </NavLink>
      <div className={styles.logout}>
        <Button color="danger" block onClick={logout}>
          注销
        </Button>
      </div>
    </Popup>
  )
}
