import { useState } from 'react'
import { Button, Toast } from 'antd-mobile'
import { SettingOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { useHistory } from 'react-router-dom'

import styles from './style.module.less'
import InputItem from '@/components/InputItem'
import { userService } from '@/services'

export default function Setting() {
  const history = useHistory()
  const [oldValue, setOldValue] = useState('')
  const [newValue, setNewValue] = useState('')
  const [cfmValue, setCfmValue] = useState('')
  const { run: passwd, loading } = useRequest(userService.passwd, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        Toast.show('密码修改成功')
        history.push('/login')
      } else {
        Toast.show(data.msg)
      }
    }
  })

  const disabled = () => {
    if (!oldValue || !newValue || !cfmValue) return true
    return loading
  }

  const submit = () => {
    if (oldValue === newValue) {
      return Toast.show('新旧密码不能相同')
    }
    if (cfmValue !== newValue) {
      return Toast.show('两次密码不一致')
    }
    passwd(oldValue, newValue)
  }

  return (
    <div className="page">
      <header className="header">
        <SettingOutlined /> <span className="title">设置</span>
      </header>
      <div className={styles.form}>
        <InputItem
          type="password"
          value={oldValue}
          onChange={value => setOldValue(value)}
          placeholder="原密码"
        />
        <InputItem
          type="password"
          value={newValue}
          onChange={value => setNewValue(value)}
          placeholder="新密码"
        />
        <InputItem
          type="password"
          value={cfmValue}
          onChange={value => setCfmValue(value)}
          placeholder="确认密码"
        />
        <Button size="large" block disabled={disabled()} onClick={submit}>
          修改密码
        </Button>
      </div>
    </div>
  )
}
