import { useState } from 'react'
import { useRequest } from 'ahooks'
import { ActionSheet, Cell, Dialog, Icon, List } from 'react-vant'
import { ListProps, ListInstance } from 'react-vant/es/list'
import { ActionSheetAction } from 'react-vant/es/action-sheet/PropsType'

import { IUser } from '@/models/types'
import { RoleType, RoleTypeZhCN } from '@/models/enums'
import { rolesService } from '@/services'
import styles from './style.module.less'

interface Props {
  listProps: ListProps
  users?: IUser[]
  listRef?: React.Ref<ListInstance>
}

const CardHeader = ({ item, onClick }: {
  item: IUser
  onClick?: () => void
}) => {
  return (
    <Cell
      icon='user-o'
      value={item.nickname}
      isLink
      onClick={() => onClick && onClick()}
      rightIcon={<Icon name='setting-o' />}
    >
    </Cell>
  )
}
const CardContent = ({ item }: {
  item: IUser
}) => {
  const getRoleKey = (role: RoleType[]) => {
    if (role.includes(RoleType.console)) return '系统管理员'
    if (role.includes(RoleType.admin)) return '管理员'
    if (role.includes(RoleType.common)) return '普通用户'
  }
  return (
    <>
      <Cell
        icon='phone-o'
        value={item.phoneNum}
      >
      </Cell>
      <Cell
        icon='shield-o'
        value={getRoleKey(item.role as RoleType[])}
      ></Cell>
    </>
  )
}

export default function UserList({
  listRef,
  listProps,
  users
}: Props) {
  const [visible, setVisible] = useState(false)
  const [actions, setActions] = useState<ActionSheetAction[]>([
    { name: RoleTypeZhCN.common },
    { name: RoleTypeZhCN.admin },
    { name: RoleTypeZhCN.console }
  ])
  const [id, setId] = useState('')

  const { run: updateRoles } = useRequest(rolesService.update, {
    manual: true
  })

  const toggle = (user: IUser) => {
    const role = user.role[0] as RoleType
    if (role === RoleType.console) {
      setActions(actions => actions.filter(action => action.name !== RoleTypeZhCN.console))
    } else if (role === RoleType.admin) {
      setActions(actions => actions.filter(action => action.name !== RoleTypeZhCN.admin))
    } else if (role === RoleType.common) {
      setActions(actions => actions.filter(action => action.name !== RoleTypeZhCN.common))
    }
    setVisible(true)
    setId(user._id)
  }
  const onSelect = (action: ActionSheetAction) => {
    Dialog.confirm({
      title: '修改权限',
      message: '是否确定修改权限？'
    }).then(() => {
      // on confirm
      if (action.name === RoleTypeZhCN.console) {
        updateRoles(id, RoleType.console)
      } else if (action.name === RoleTypeZhCN.admin) {
        updateRoles(id, RoleType.admin)
      } else if (action.name === RoleTypeZhCN.common) {
        updateRoles(id, RoleType.common)
      }
    }).catch(() => {
      // on cancel
    })
    setVisible(false)
  }

  return (
    <>
      <List
        ref={listRef}
        errorText='请求失败，点击重新加载'
        {...listProps}
      >
        {users?.map(user => (
          <Cell.Group inset
            key={user._id}
            className={styles.card}
          >
            <CardHeader item={user} onClick={() => toggle(user)} />
            <CardContent item={user} />
          </Cell.Group>
        ))}
      </List>
      <ActionSheet
        description='权限修改'
        visible={visible}
        onCancel={() => {
          setId('')
          setVisible(false)
        }}
        cancelText='取消'
        actions={actions}
        onSelect={onSelect}
      />
    </>
  )
}
