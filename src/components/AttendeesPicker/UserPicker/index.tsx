import { List, Checkbox, Cell, Typography, Grid } from 'react-vant'
import { ListProps, ListInstance } from 'react-vant/es/list'
import { IUser } from '@/models/types'
import { unique } from '@/libs/utils'

export interface CheckboxProps {
  value: IUser[]
  setValue: (value: IUser[]) => void
}
interface Props {
  listProps: ListProps
  users?: IUser[]
  listRef?: React.Ref<ListInstance>
  checkboxProps: CheckboxProps
}

export default function UserPicker({
  users,
  listProps,
  listRef,
  checkboxProps
}: Props) {
  const toggle = (user: IUser) => {
    const { value, setValue } = checkboxProps
    const ids = value.map(val => val._id)
    const newVal = ids.includes(user._id)
      ? value.filter((val) => val._id !== user._id)
      : [...value, user]
    setValue(unique(newVal, '_id'))
  }
  return (
    <>
      <Grid columnNum={5}>
        {checkboxProps.value?.map(user => (
          <Grid.Item
            key={user._id}
            icon='user-o'
            text={<Typography.Text ellipsis={4}>{user.nickname}</Typography.Text>}
          />
        ))}
      </Grid>
      <List
        ref={listRef}
        errorText='请求失败，点击重新加载'
        {...listProps}
      >
        <Checkbox.Group value={checkboxProps.value.map(val => val._id)}>
          <Cell.Group>
            {users?.map(user => (
              <Cell
                key={user._id}
                clickable
                icon='user-o'
                label={user.nickname}
                title={user.phoneNum}
                onClick={() => toggle(user)}
                rightIcon={<Checkbox name={user._id} />}
              />
            ))}
          </Cell.Group>
        </Checkbox.Group>
      </List>
    </>
  )
}
