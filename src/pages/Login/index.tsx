import { useState } from 'react'
import { useRequest } from 'ahooks'
import { Link, useHistory } from 'react-router-dom'
import {
  Button,
  Toast,
  Field,
  Form,
  ConfigProvider
} from 'react-vant'

import classNames from '@/libs/classNames'
import LoginIconFont from '@/components/Icon/LoginIconFont'
import { userService } from '@/services'
import styles from './style.module.less'

const themeVars = {
  '--rv-cell-group-background-color': 'transparent'
}

export default function Login() {
  const history = useHistory()
  const [form] = Form.useForm()
  const [phoneNum, setPhoneNum] = useState('')
  const [code, setCode] = useState(0)

  const { run: login, loading: loginLoading } = useRequest(userService.login, {
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

  const { run: sendSms, loading: smsLoading } = useRequest(userService.sms, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        Toast.success('短信验证码发送成功')
      } else {
        Toast.fail(data.msg)
      }
    }
  })

  return (
    <div className={classNames(styles.wrap)}>
      <div className={styles.header}>
        <LoginIconFont/>
      </div>
      <ConfigProvider themeVars={themeVars}>
        <Form form={form}
          className={styles.form}
          footer={
            <Button block
              round
              color='#a0d911'
              loading={loginLoading}
              size='large'
              className={styles.btn}
              onClick={() => login(form.getFieldValue('phoneNum'), form.getFieldValue('code'))}
            >
              登录
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
            rules={[{ pattern: /\d{6}/, message: '请输入6位数字' }]}
          >
            <Field
              value={code ? code.toString() : ''}
              center
              clearable
              placeholder="请输入短信验证码"
              type='digit'
              onChange={(val) => setCode(parseInt(val))}
              button={
                <Button size="small" color='#40a9ff'
                  className={styles['btn-code']}
                  loading={smsLoading}
                  onClick={() => sendSms(form.getFieldValue('phoneNum'))}
                >
                  发送
                </Button>
              }
            />
          </Form.Item>
        </Form>
        <div className={styles.link}>
          <Link to="/register">
            <span>没有账号？前往</span>
            <span style={{ color: '#40a9ff' }}>注册</span>
          </Link>
        </div>
      </ConfigProvider>
    </div>
  )
}
