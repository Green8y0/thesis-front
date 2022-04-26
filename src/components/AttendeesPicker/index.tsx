import { useRef } from 'react'
import { Popup, Sticky } from 'react-vant'
import { ListProps, ListInstance } from 'react-vant/es/list'
import { PopupProps } from 'react-vant/es/popup'
// import { SearchProps } from 'react-vant/es/search'
import SearchBar from '@/components/SearchBar'
import UserPicker, { CheckboxProps } from './UserPicker'
import { IUser } from '@/models/types'

import styles from './style.module.less'

interface SearchProps {
  value: string
  onSearch: (val: string) => void
  onClear: (val: string) => void
  placeholder?: string
  className?: string
}

interface AttendeesPickerProps {
  popupProps: PopupProps
  listProps: ListProps
  searchProps: SearchProps
  checkboxProps: CheckboxProps
  users: IUser[]
}

export default function AttendeesPicker({
  popupProps,
  listProps,
  searchProps,
  checkboxProps,
  users
}: AttendeesPickerProps) {
  const listRef = useRef<ListInstance>(null)
  return (
    <Popup
      {...popupProps}
      round
      position='bottom'
      className={styles.popup}
    >
      <Sticky>
        <SearchBar
          placeholder='请输入手机号'
          {...searchProps}
        />
      </Sticky>
      <UserPicker
        users={users}
        checkboxProps={checkboxProps}
        listProps={listProps}
        listRef={listRef}
      />
    </Popup>
  )
}
