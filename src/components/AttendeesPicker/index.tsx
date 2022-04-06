import { useRef } from 'react'
import { Popup, Sticky } from 'react-vant'
import { ListProps, ListInstance } from 'react-vant/es/list'
import { PopupProps } from 'react-vant/es/popup'
// import { SearchProps } from 'react-vant/es/search'
import SearchBar from '@/components/SearchBar'
import UserPicker from './UserPicker'
import { IUser } from '@/models/types'

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
  users: IUser[]
}

export default function AttendeesPicker({
  popupProps,
  listProps,
  searchProps
}: AttendeesPickerProps) {
  const listRef = useRef<ListInstance>(null)
  return (
    <Popup
      {...popupProps}
      round
      position='bottom'
    >
      <Sticky>
        <SearchBar
          placeholder='请输入手机号'
          {...searchProps}
        />
      </Sticky>
      <UserPicker
        listProps={listProps}
        listRef={listRef}
      />
    </Popup>
  )
}
