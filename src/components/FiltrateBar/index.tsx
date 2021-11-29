// 封装筛选工具栏
import { DropdownMenu } from 'react-vant'
import { DropdownMenuItemProps } from 'react-vant/es/dropdown-menu/PropsType'

interface Props {
  value: Record<string, string | number>
  onChange: (v: Record<string, string | number>) => void
  menus: DropdownMenuItemProps[]
}

export default function FiltrateBar({
  value, menus,
  onChange
}: Props) {
  return (
    <DropdownMenu value={value} onChange={onChange}>
      {menus.map(item => (
        <DropdownMenu.Item
          key={item.name}
          name={item.name}
          placeholder={item.placeholder}
          options={item.options}
        />
      ))}
    </DropdownMenu>
  )
}
