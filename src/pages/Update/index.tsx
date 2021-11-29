import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Field, Form } from 'react-vant'
import { FormItemProps } from 'react-vant/es/form'

import Layout from '@/components/Layout'
import { IRoom } from '@/models/types'
import { roomsService } from '@/services'

export default function Update() {
  const [form] = Form.useForm()
  const location = useLocation<IRoom>()
  const [room, setRoom] = useState<IRoom>(location.state)
  const [name, setName] = useState(location.state.name)
  const formList: FormItemProps[] = [
    {
      name: '名称',
      label: '名称',
      children: <Field colon placeholder={name}/>
    }
  ]

  useRequest(() => roomsService.list({ roomsIds: [room._id] }), {
    ready: !location.state,
    onSuccess: data => {
      if (data.stat === 'OK' && data.data.rows.length > 0) {
        setRoom(data.data.rows[0])
        setName(data.data.rows[0].name)
      }
    }
  })

  return (
    <Layout
      showNav={true}
      showTab={false}
      navText='编辑会议室'
    >
      <Form
        form={form}
      >
        {formList.map((item, index) => (
          <Form.Item
            key={index}
            name={item.name}
            label={item.label}
          >{item.children}</Form.Item>
        ))}
      </Form>
    </Layout>
  )
}
