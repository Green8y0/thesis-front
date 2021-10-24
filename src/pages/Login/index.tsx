import { useState } from 'react'
import { useRequest } from 'ahooks'
import { Link, useHistory } from 'react-router-dom'
import { Button, Toast } from 'antd-mobile'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'

import styles from './style.module.less'
import classNames from '@/libs/classNames'
import InputItem from '@/components/InputItem'
import { userService } from '@/services'

export default function Login() {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // 判断是否已经登录
  useRequest(userService.info, {
    onSuccess: data => {
      if (data.stat === 'OK') {
        history.replace('/')
      }
    }
  })

  const { run: login, loading } = useRequest(userService.login, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        Toast.show('登录成功')
        history.push('/')
      } else {
        Toast.show(data.msg)
      }
    }
  })

  const disabled = () => {
    if (!username || !password) return true
    return loading
  }

  return (
    <div className={classNames('page', styles.wrap)}>
      <div className="header">
        <UserOutlined /> <span className="title">登录</span>
      </div>
      <div className={styles.form}>
        <InputItem
          placeholder="请输入用户名"
          value={username}
          onChange={value => setUsername(value)}
          icon={<UserOutlined />}
        />
        <InputItem
          placeholder="请输入密码"
          type="password"
          value={password}
          onChange={value => setPassword(value)}
          icon={<KeyOutlined />}
        />
        <Button
          block
          size="large"
          disabled={disabled()}
          onClick={() => login(username, password)}
        >
          登录
        </Button>
        {loading && (
          <Button block size="large" onClick={() => userService.loginCancel()}>
            取消登录
          </Button>
        )}
        <div className={styles.link}>
          <Link to="/register">没有账号？前往注册</Link>
        </div>
      </div>
    </div>
  )
}
