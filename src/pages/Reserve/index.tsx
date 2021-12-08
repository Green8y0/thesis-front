import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DatetimePicker, Form, Popup } from 'react-vant'
import { FormItemProps } from 'react-vant/es/form'

import Layout from '@/components/Layout'
import EditForm from '@/components/EditForm'
import { IRoom, IMeeting } from '@/models/types'
import { useFormList } from './hooks/useFormList'

interface IAddMeeting extends
Pick<IRoom, 'hasScreen' | 'capacity'>,
Pick<IMeeting, 'topic' | 'startTime' | 'endTime'> {}

interface ILocation {
  dateText: string
}

export default function Reserve() {
  const location = useLocation<ILocation>()
  const [form] = Form.useForm()
  const [dateText] = useState(location.state?.dateText)
  const [popupVisible, setPopupVisible] = useState(false)
  const [changeFeild, setChangeFeild] = useState('')
  const formList: FormItemProps[] = useFormList({
    startTimeFieldProps: {
      onClick: () => {
        setPopupVisible(true)
        setChangeFeild('startTime')
      }
    },
    endTimeFieldProps: {
      onClick: () => {
        setPopupVisible(true)
        setChangeFeild('endTime')
      }
    }
  })

  const onFinish = async (val: IAddMeeting) => {
    console.log(val)
  }
  const changeStartTime = (value: string) => {
    console.log(value)
    if (changeFeild) {
      form.setFields([{
        name: changeFeild,
        value: value
      }])
    }
  }
  return (
    <Layout
      showNav={true}
      showTab={false}
      navText='预订会议室'
    >
      <EditForm
        formProps={{
          form,
          initialValues: { dateText },
          onFinish
        }}
        formList={formList}
      />
      <Popup
        visible={popupVisible}
        round
        position='bottom'
        onClose={() => setPopupVisible(false)}
      >
        <DatetimePicker
          title='请选择开始时间'
          type='time'
          minHour={10}
          maxHour={21}
          filter={(type, options) => {
            if (type === 'minute') {
              return options.filter((option) => Number(option) % 5 === 0)
            }
            return options
          }}
          // value={startTime}
          onCancel={() => setPopupVisible(false)}
          onConfirm={(value: string) => {
            setPopupVisible(false)
            changeStartTime(value)
          }}
        />
      </Popup>
    </Layout>
  )
}
