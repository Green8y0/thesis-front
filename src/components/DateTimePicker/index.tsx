import { DatetimePicker } from 'react-vant'
import { DateTimePickerProps } from 'react-vant/es/datetime-picker'

export default function DateTimePicker(props: DateTimePickerProps) {
  return (
    <DatetimePicker
      // title='请选择开始时间'
      // type='time'
      // minHour={10}
      // maxHour={21}
      {...props}
      filter={(type, options) => {
        if (type === 'minute') {
          return options.filter((option) => Number(option) % 15 === 0)
        }
        return options
      }}
      // value={startTime}
      // onCancel={() => setPopupVisible(false)}
      // onConfirm={(value: string) => {
      //   setPopupVisible(false)
      //   changeStartTime(value)
      // }}
    />
  )
}
