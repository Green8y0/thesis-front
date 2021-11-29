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
import { ActionSheetAction } from 'react-vant/es/action-sheet/PropsType'
import { ActionSheetProps } from 'react-vant/es/action-sheet'

import { IMeeting } from '@/models/types'
import { MtimeOrder, MeetingFilter } from '@/models/enums'
import styles from './style.module.less'

interface Props {
  total: number
  meetings: IMeeting[]
  hasMore: boolean
  loadMore: () => Promise<void>
  sort: MtimeOrder
  setSort: (order: MtimeOrder) => void
}

const actions: ActionSheetAction[] = [
  { name: MeetingFilter.latest },
  { name: MeetingFilter.oldest }
]

/**
 * 排序菜单
 * @param visible 菜单的显示
 * @param onCancel 取消事件
 * @param onSelect 点击选项的触发事件
 * @returns 排序方式的菜单
 */
const SortMenu = ({
  visible, onCancel, onSelect
}: ActionSheetProps) => {
  return (
    <ActionSheet
      visible={visible}
      onCancel={onCancel}
      actions={actions}
      description={<span className={styles.desc}>排序方式</span>}
      cancelText='取消'
      closeOnClickAction
      onSelect={onSelect}
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
        value={sort === MtimeOrder.desc ? '最新' : '最早'}
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

/**
 * 渲染会议信息
 * @param hasMore 控制触底是否加载
 * @param meetings 会议信息数组
 * @param loadMore 加载函数
 * @returns 渲染会议信息
 */
const MeetingList = ({
  hasMore, meetings, loadMore
}: {
  meetings: IMeeting[]
  hasMore: boolean
  loadMore: () => Promise<void>
}) => {
  return (
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
      <MeetingList
        hasMore={hasMore}
        loadMore={loadMore}
        meetings={meetings}
      />
      <SortMenu
        visible={visible}
        onCancel={() => setVisible(false)}
        onSelect={(actions) => {
          if (actions.name === MeetingFilter.latest) setSort(MtimeOrder.desc)
          if (actions.name === MeetingFilter.oldest) setSort(MtimeOrder.asc)
        }}
      />
    </Flex>
  )
}
