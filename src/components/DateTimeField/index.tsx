import { Popup } from 'react-vant'
import { DateTimePickerProps } from 'react-vant/es/datetime-picker'
import { PopupProps } from 'react-vant/es/popup'
import DateTimePicker from '@/components/DateTimePicker'

interface DateTimeFieldProps {
  popupProps: PopupProps,
  dateTimePickerProps: DateTimePickerProps
}

export default function DateTimeField({ popupProps, dateTimePickerProps }: DateTimeFieldProps) {
  return (
    <Popup
      // visible={popupVisible}
      // onClose={() => setPopupVisible(false)}
      {...popupProps}
      round
      position='bottom'
    >
      <DateTimePicker {...dateTimePickerProps}/>
    </Popup>
  )
}
