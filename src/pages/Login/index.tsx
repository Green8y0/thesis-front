import { useState } from 'react'
import { useRequest } from 'ahooks'
import { Link, useHistory } from 'react-router-dom'
import {
  Button,
  Toast,
  Field
} from 'react-vant'

import classNames from '@/libs/classNames'
import LoginIconFont from '@/components/Icon/LoginIconFont'
import { userService } from '@/services'
import styles from './style.module.less'

export default function Login() {
  const history = useHistory()
  const [phoneNum, setPhoneNum] = useState('')
  const [code, setCode] = useState(0)

  // 判断是否已经登录
  useRequest(userService.info, {
    manual: true,
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
        Toast.success('登录成功')
        history.push('/')
      } else {
        Toast.fail(data.msg)
      }
    }
  })

  const disabled = () => {
    if (!phoneNum || !code) return true
    return loading
  }

  return (
    <div className={classNames(styles.wrap)}>
      <div className={styles.header}>
        {/* <UserOutlined /> <span className="title">登录</span> */}
        <LoginIconFont/>
      </div>
      <div className={styles.form}>
        <Field
          placeholder='请输入手机号'
          className={styles.input}
          onChange={val => setPhoneNum(val)}
          style={{
            '--font-size': '1.5rem'
          }}
        />
        <div>
          <Field
            placeholder='请输入验证码'
            className={styles.input}
            onChange={val => setCode(Number(val))}
            style={{
              '--font-size': '1.5rem'
            }}
          />
          <Button
            className={styles['btn-code']}
          >
            发送验证码
          </Button>
        </div>
        <Button
          block
          size="large"
          color='warning'
          className={styles.btn}
          disabled={disabled()}
          onClick={() => login(phoneNum, code)}
        >
          登录
        </Button>
        <div className={styles.link}>
          <Link to="/register">没有账号？前往注册</Link>
        </div>
      </div>
    </div>
  )
}
