// 封装筛选工具栏
import { DropdownMenu } from 'react-vant'
import { screenFilter, memberFilter } from '@/models/enums'

interface Props {
  value: Record<string, string | number>
  setValue: (v: Record<string, string | number>) => void
}

const screenOps = [
  { text: '不限', value: screenFilter.unlimit },
  { text: '有显示屏', value: screenFilter.true },
  { text: '无显示屏', value: screenFilter.false }
]
const memberOps = [
  { text: '不限', value: memberFilter.unlimit },
  { text: '0-20人', value: memberFilter.twenty },
  { text: '21-99人', value: memberFilter.ninetyNine },
  { text: '100-499人', value: memberFilter.max }
]

export default function FiltrateBar({
  value,
  setValue
}: Props) {
  return (
    <DropdownMenu value={value} onChange={setValue}>
      <DropdownMenu.Item
        name='hasScreen'
        placeholder='显示屏'
        options={screenOps}
        />
      <DropdownMenu.Item
        name='capacity'
        placeholder='人数'
        options={memberOps}
      />
    </DropdownMenu>
  )
}
