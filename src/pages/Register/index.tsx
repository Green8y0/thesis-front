import { useState } from 'react'
import { useRequest } from 'ahooks'
import { Link, useHistory } from 'react-router-dom'
import { UserAddOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons'
import { Button, Toast } from 'antd-mobile'

import styles from '../Login/style.module.less'
import classNames from '@/libs/classNames'
import { userService } from '@/services'

export default function Register() {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cfmPassword, setCfmPassword] = useState('')

  // 判断是否已经登录
  useRequest(userService.info, {
    onSuccess: data => {
      if (data.stat === 'OK') {
        history.replace('/')
      }
    }
  })

  const { run: register, loading } = useRequest(userService.register, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        Toast.show('注册成功')
        history.push('/login')
      } else {
        Toast.show(data.msg)
      }
    }
  })

  const disabled = () => {
    if (!username || !password || !cfmPassword) return true
    return loading
  }

  const submit = () => {
    if (password.length < 6) {
      return Toast.show('密码不能小于6位')
    }
    if (password !== cfmPassword) {
      return Toast.show('两次密码不一致')
    }
    register(username, password)
  }

  return (
    <div className={classNames('page', styles.wrap)}>
      <div className="header">
        <UserAddOutlined /> <span className="title">注册</span>
      </div>
      <div className={styles.form}>
        {/* <InputItem
          placeholder="请输入用户名"
          value={username}
          onChange={value => setUsername(value)}
          icon={<UserOutlined />}
        />
        <InputItem
          placeholder="请输入密码"
          value={password}
          type="password"
          onChange={value => setPassword(value)}
          icon={<KeyOutlined />}
        />
        <InputItem
          placeholder="请确认密码"
          value={cfmPassword}
          type="password"
          onChange={value => setCfmPassword(value)}
          icon={<KeyOutlined />}
        /> */}
        <Button block size="large" disabled={disabled()} onClick={submit}>
          注册
        </Button>
        <div className={styles.link}>
          <Link to="/login">已有账号？前往登录</Link>
        </div>
      </div>
    </div>
  )
}
