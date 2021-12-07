import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Field, Form, Popup, Radio } from 'react-vant'
import { FormItemProps } from 'react-vant/es/form'

import Layout from '@/components/Layout'
import EditForm from '@/components/EditForm'
import { IRoom, IMeeting } from '@/models/types'

interface IAddMeeting extends
Pick<IRoom, 'hasScreen' | 'capacity'>,
Pick<IMeeting, 'topic' | 'startTime' | 'endTime'> {}

interface ILocation {
  dateText: string
}

export default function Reserve() {
  const location = useLocation<ILocation>()
  const [form] = Form.useForm()
  const [dateText, setDateText] = useState(location.state?.dateText)
  const [startVisible, setStartVisible] = useState(false)
  const formList: FormItemProps[] = [
    {
      name: 'topic',
      label: '会议主题',
      rules: [
        { required: true }
      ],
      children: <Field placeholder='请输入会议主题'/>
    },
    {
      name: 'capacity',
      label: '与会人数',
      rules: [
        { type: 'number' }
      ],
      children: (
        <Field
          placeholder='请输入与会人数'
          type='number'
        />
      )
    },
    {
      name: 'dateText',
      label: '会议日期',
      children: <Field readonly placeholder={dateText} />
    },
    {
      name: 'startTime',
      label: '开始时间',
      children: (
        <Field
          placeholder='请选择会议开始时间'
          children={
            <Popup
              visible={startVisible}
              round
              position='bottom'
            >

            </Popup>
          }
        />
      )
    },
    {
      name: 'hasScreen',
      label: '是否有显示屏',
      children: (
        <Radio.Group
          direction='horizontal'
          checkedColor='#ee0a24'
        >
          <Radio name={1}>有</Radio>
          <Radio name={0}>无</Radio>
        </Radio.Group>
      )
    }
  ]

  const onFinish = async (val: IAddMeeting) => {
    console.log(val)
  }
  return (
    <Layout
      showNav={true}
      showTab={false}
      navText='预订会议室'
    >
      <EditForm
        formProps={{ form, onFinish }}
        formList={formList}
      />
    </Layout>
  )
}
