import { useRef, ReactNode } from 'react'
import { useKeyPress } from 'ahooks'

import styles from './style.module.less'
import classNames from '@/libs/classNames'

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'password'
  icon?: ReactNode
  onEnter?: () => void
  className?: string
}

export default function InputItem(props: Props) {
  const input = useRef<HTMLInputElement>(null)

  // 使用useKeyPress监听回车事件
  useKeyPress('enter', props.onEnter, {
    target: input
  })

  return (
    <div className={classNames(styles.wrap, props.className)}>
      {!!props.icon && <span className={styles.icon}>{props.icon}</span>}
      <input
        ref={input}
        type={props.type || 'text'}
        className={styles.input}
        value={props.value}
        placeholder={props.placeholder}
        onChange={e => props.onChange(e.target.value.trim())}
      />
    </div>
  )
}
