import { useState } from 'react'
import { useRequest } from 'ahooks'
import { Link, useHistory } from 'react-router-dom'
import {
  Button,
  Toast,
  ConfigProvider,
  Form,
  Field
} from 'react-vant'

import classNames from '@/libs/classNames'
import RegisterIconFont from '@/components/Icon/RegisterIconFont'
import { userService } from '@/services'
import styles from '../Login/style.module.less'

const themeVars = {
  '--rv-cell-group-background-color': 'transparent'
}

export default function Register() {
  const history = useHistory()
  const [form] = Form.useForm()
  const [phoneNum, setPhoneNum] = useState('')
  const [nickName, setNickName] = useState('')

  const { run: register, loading } = useRequest(userService.register, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        Toast.success('注册成功')
        history.push('/login')
      } else {
        Toast.fail(data.msg)
      }
    }
  })

  return (
    <div className={classNames(styles.wrap)}>
      <div className={styles.header}>
        <RegisterIconFont/>
      </div>
      <ConfigProvider themeVars={themeVars}>
        <Form form={form}
          className={styles.form}
          onFinish={() => register(phoneNum, nickName)}
          footer={
            <Button block
              round
              color='#a0d911'
              loading={loading}
              size='large'
              className={styles.btn}
            >
              注册
            </Button>
          }
        >
          <Form.Item name='phoneNum'
            className={styles.input}
            rules={[
              {
                validator: (_, value) => {
                  if (/1\d{10}/.test(value)) {
                    return Promise.resolve(true)
                  }
                  return Promise.reject(new Error('请输入正确的手机号码'))
                }
              }
            ]}
          >
            <Field
              value={phoneNum}
              placeholder="请输入手机号"
              type='tel'
              clearable
              onChange={val => setPhoneNum(val)}
            />
          </Form.Item>
          <Form.Item name='code'
            className={styles.input}
          >
            <Field
              value={nickName}
              center
              clearable
              placeholder="请输入昵称"
              onChange={(val) => setNickName(val)}
            />
          </Form.Item>
        </Form>
        <div className={styles.link}>
          <Link to="/login">
            <span>已有账号？前往</span>
            <span style={{ color: '#40a9ff' }}>登录</span>
          </Link>
        </div>
      </ConfigProvider>
    </div>
  )
}
