import {
  Search,
  ConfigProvider
} from 'react-vant'
import classNames from '@/libs/classNames'
import styles from './style.module.less'

interface Props {
  placeholder?: string
  className?: string
}

const themeVars = {
  '--rv-search-content-background-color': '#fff'
}

export default function SearchBar({
  placeholder,
  className
}: Props) {
  return (
    <ConfigProvider themeVars={themeVars}>
      <Search
        clearable={true}
        placeholder={placeholder}
        background='#f7f8fa'
        className={classNames(styles.search, className)}
      />
    </ConfigProvider>
  )
}
