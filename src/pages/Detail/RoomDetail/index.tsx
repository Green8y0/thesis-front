import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Cell, Icon, ActionSheet, Dialog, Toast } from 'react-vant'
import { CellProps } from 'react-vant/es/cell'
import { ActionSheetProps } from 'react-vant/es/action-sheet'
import { ActionSheetAction } from 'react-vant/es/action-sheet/PropsType'

import { IRoom } from '@/models/types'
import { DataStatus } from '@/models/enums'
import { roomsService } from '@/services'
import styles from './style.module.less'

interface Props {
  room: IRoom
}
enum MenuName {
  delete = '删除会议室',
  edit = '编辑会议室'
}

const actions: ActionSheetAction[] = [
  { name: MenuName.delete, color: '#ee0a24' },
  { name: MenuName.edit }
]

const RoomEdit = ({
  visible, actions, onCancel, onSelect
}: ActionSheetProps) => {
  return (
    <ActionSheet
      cancelText='取消'
      closeOnClickAction
      visible={visible}
      onCancel={onCancel}
      actions={actions}
      onSelect={onSelect}
    />
  )
}

export default function RoomDetail({ room }: Props) {
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const cellList: CellProps[] = [
    {
      icon: 'comment-o',
      title: '会议室',
      value: room.name,
      rightIcon: <Icon name='setting-o' size='0.2rem' />,
      isLink: true,
      center: true,
      valueClass: styles.value,
      onClick: () => setVisible(true)
    },
    {
      icon: 'location-o',
      title: '地点',
      value: room.location
    },
    {
      icon: 'friends-o',
      title: '人数',
      value: room.capacity
    },
    {
      icon: 'tv-o',
      title: '显示屏',
      value: room.hasScreen ? '有显示屏' : '无显示屏'
    }
  ]

  const { run: deleteRoom } = useRequest(roomsService.deleteRoom, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        Toast.success('删除会议室成功')
        history.replace('/')
      } else {
        Toast.fail(data.msg)
      }
    }
  })

  const onDelete = (id: string, status: DataStatus) => {
    Dialog.confirm({
      title: '是否确定删除',
      message: '删除后数据不可恢复!!!',
      confirmButtonColor: '#f42529',
      onConfirm: () => { deleteRoom(id, status) },
      onCancel: () => { setVisible(false) }
    })
  }

  return (
    <>
      <Cell.Group style={{ marginBottom: '0.1rem' }}>
        {cellList.map((item, index) => (
          <Cell
            key={index}
            {...item}
          />
        ))}
      </Cell.Group>
      <RoomEdit
        visible={visible}
        actions={actions}
        onCancel={() => setVisible(false)}
        onSelect={actions => {
          if (actions.name === MenuName.delete) {
            onDelete(room._id, DataStatus.deleted)
          } else if (actions.name === MenuName.edit) {
            history.push(`/update/${room._id}`, room)
          }
        }}
      />
    </>
  )
}
