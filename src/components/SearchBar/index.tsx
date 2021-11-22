// 封装搜索框
import {
  Search,
  ConfigProvider
} from 'react-vant'
import classNames from '@/libs/classNames'
import styles from './style.module.less'

interface Props {
  value: string
  setValue: (val: string) => void
  onClear: (val: string) => void
  placeholder?: string
  className?: string
}

const themeVars = {
  '--rv-search-content-background-color': '#fff'
}

export default function SearchBar({
  placeholder,
  className,
  value,
  setValue,
  onClear
}: Props) {
  return (
    <ConfigProvider themeVars={themeVars}>
      <Search
        value={value}
        onSearch={val => setValue(val)}
        onClear={() => onClear('')}
        clearable={true}
        placeholder={placeholder}
        background='#f7f8fa'
        className={classNames(styles.search, className)}
      />
    </ConfigProvider>
  )
}
