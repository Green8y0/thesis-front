import { useState } from 'react'
import { ActionSheet, Cell, DatetimePicker, Popup } from 'react-vant'
import { FormItemProps } from 'react-vant/es/form'
import dayjs from 'dayjs'
import { getCurrentWeek } from '@/libs/utils'

interface FormListProps {
  isPeriodic: boolean
  formList: FormItemProps[]
}

export function usePeriodicFormList({
  isPeriodic, formList
}: FormListProps): FormItemProps[] {
  const actions = [
    { name: '每天' },
    { name: `每周(${getCurrentWeek(new Date())})` },
    { name: `每月(${new Date().getDate()}日)` }
  ]
  const [visible, setVisible] = useState(false)
  const [visibleDate, setVisibleDate] = useState(false)
  const [frequency, setFrequency] = useState('')
  const [endPeriodic, setEndPeriodic] = useState('')
  if (!isPeriodic) return formList
  return [
    ...formList,
    {
      name: 'frequency',
      children: (
        <>
          <Cell
            title='重复频率'
            value={frequency}
            isLink center
            onClick={() => setVisible(true)}
          />
          <ActionSheet
            visible={visible}
            onCancel={() => setVisible(false)}
            actions={actions}
            onSelect={(action, index) => {
              // console.log(action, index)
              action.name && setFrequency(action.name)
              setVisible(false)
            }}
          />
        </>
      )
    },
    {
      name: 'endPeriodic',
      children: (
        <>
          <Cell
            title='结束重复'
            value={endPeriodic}
            isLink center
            onClick={() => setVisibleDate(true)}
          />
          <Popup
            title="请选择日期"
            closeable
            visible={visibleDate}
            round
            position="bottom"
            onClose={() => setVisibleDate(false)}
          >
            <DatetimePicker
              type='month-day'
              minDate={new Date()}
              maxDate={new Date(2025, 10, 1)}
              value={new Date()}
              cancelButtonText='清除'
              formatter={(type: string, val: string) => {
                if (type === 'month') {
                  return `${val}月`
                }
                if (type === 'day') {
                  return `${val}日`
                }
                return val
              }}
              onConfirm={(value: Date) => {
                console.log(value)
                setEndPeriodic(dayjs(value).format('YYYY-MM-DD'))
                setVisibleDate(false)
              }}
              onCancel={() => {
                setEndPeriodic('')
                setVisibleDate(false)
              }}
            />
          </Popup>
        </>
      )
    }
  ]
}
