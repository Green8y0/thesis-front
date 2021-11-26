import { useState } from 'react'
import dayjs from 'dayjs'
import {
  Flex,
  Cell,
  List,
  Sticky,
  Icon,
  ActionSheet
} from 'react-vant'
import { IMeeting } from '@/models/types'
import styles from './style.module.less'
import { MtimeOrder } from '@/models/enums'

interface Props {
  total: number
  meetings: IMeeting[]
  hasMore: boolean
  loadMore: () => Promise<void>
  sort: MtimeOrder
  setSort: (order: MtimeOrder) => void
}

const actions = [
  { name: '最新' },
  { name: '最旧' }
]

/**
 * 排序菜单
 * @param visible 菜单的显示
 * @param setVisible 修改菜单的显示
 * @param onSelect 点击选项的触发事件
 * @returns 排序方式的菜单
 */
const SortMenu = ({
  visible, setVisible, onSelect
}: {
  visible: boolean
  setVisible: (val: boolean) => void
  onSelect: (order: MtimeOrder) => void
}) => {
  return (
    <ActionSheet
      visible={visible}
      onCancel={() => setVisible(false)}
      actions={actions}
      description={<span className={styles.desc}>排序方式</span>}
      cancelText='取消'
      closeOnClickAction
      onSelect={(actions) => {
        if (actions.name === '最新') onSelect(MtimeOrder.desc)
        if (actions.name === '最旧') onSelect(MtimeOrder.asc)
      }}
    />
  )
}

/**
 * 筛选工具栏
 * @param total 总数
 * @param sort 筛选控制变量
 * @param rightIconOnClick 右侧图标点击事件
 * @returns 筛选工具栏
 */
const FilterBar = ({
  total, sort, rightIconOnClick
}: {
  total: number
  sort: MtimeOrder
  rightIconOnClick?: (val: boolean) => void
}) => {
  return (
    <Cell.Group>
      <Cell
        title={`共${total}场会议`}
        titleClass={styles.filter}
        value={sort === MtimeOrder.desc ? '最新' : '最旧'}
        isLink
        center
        rightIcon={
          <Icon
            name='filter-o'
            size='0.2rem'
            onClick={() => rightIconOnClick && rightIconOnClick(true)}
          />
        }
      />
    </Cell.Group>
  )
}

export default function MeetingRecord({
  total, meetings, hasMore, sort,
  loadMore, setSort
}: Props) {
  const [visible, setVisible] = useState(false)
  return (
    <Flex direction='column'>
      <Sticky>
        <FilterBar
          total={total}
          sort={sort}
          rightIconOnClick={val => setVisible(val)}
        />
      </Sticky>
      <List finished={!hasMore} onLoad={loadMore}>
        {meetings.map(item => (
          <Cell.Group key={item._id} className={styles.cell}>
            <Cell
              icon='label-o'
              title={item.topic}
              rightIcon={<Icon name='ellipsis' />}
              isLink
              center
            />
            <Cell
              title={item.creator.nickname}
              icon='manager-o'
            />
            <Cell
              icon='clock-o'
              title={dayjs(item.startTime).format('YYYY-MM-DD')}
              label={`${dayjs(item.startTime).format('HH:mm')}~${dayjs(item.endTime).format('HH:mm')}`}
            />
          </Cell.Group>
        ))}
      </List>
      <SortMenu
        visible={visible}
        setVisible={val => setVisible(val)}
        onSelect={setSort}
      />
    </Flex>
  )
}
