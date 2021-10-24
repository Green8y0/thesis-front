import { Checkbox } from 'antd-mobile'
import { EllipsisOutlined } from '@ant-design/icons'

import styles from './style.module.less'
import classNames from '@/libs/classNames'
import { ITodo } from '@/models/types'

interface Props {
  todo: ITodo
  onToggle: () => void
  onMenuClick: () => void
}

export default function TodoItem({ todo, onToggle, onMenuClick }: Props) {
  return (
    <div className={styles.wrap}>
      <Checkbox checked={todo.finished} onChange={onToggle} />
      <div
        className={classNames(styles.content, {
          [styles.marked]: todo.marked,
          [styles.finished]: todo.finished
        })}
      >
        {todo.content}
      </div>
      <EllipsisOutlined className={styles.menu} onClick={onMenuClick} />
    </div>
  )
}
