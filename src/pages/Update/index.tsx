import { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Button, Field, Form, Radio, Toast } from 'react-vant'
import { FormItemProps } from 'react-vant/es/form'

import Layout from '@/components/Layout'
import { IRoom } from '@/models/types'
import { roomsService } from '@/services'
import styles from './style.module.less'

export default function Update() {
  const [form] = Form.useForm()
  const history = useHistory()
  const location = useLocation<IRoom>()
  const [room, setRoom] = useState<IRoom>(location.state)
  const formList: FormItemProps[] = [
    {
      name: 'name',
      label: '名称',
      rules: [
        { min: 2 }
      ],
      children: <Field placeholder={room.name} />
    },
    {
      name: 'capacity',
      label: '人员容纳量',
      rules: [
        { type: 'number' }
      ],
      children: (
        <Field
          placeholder={room.capacity.toString()}
          type='number'
        />
      )
    },
    {
      name: 'hasScreen',
      label: '是否有显示屏',
      children: (
        <Radio.Group
          direction='horizontal'
          defaultValue={Number(room.hasScreen)}
          checkedColor='#ee0a24'
        >
          <Radio name={1}>有</Radio>
          <Radio name={0}>无</Radio>
        </Radio.Group>
      )
    },
    {
      name: 'location',
      label: '地址',
      children: (
        <Field
          placeholder={room.location}
          type='textarea'
          maxlength={15}
          showWordLimit
        />
      )
    }
  ]

  useRequest(() => roomsService.list({ roomsIds: [room._id] }), {
    ready: !location.state,
    onSuccess: data => {
      if (data.stat === 'OK' && data.data.rows.length > 0) {
        setRoom(data.data.rows[0])
      }
    }
  })
  const { run: updateRoom } = useRequest(roomsService.update, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        Toast.success('修改成功')
        history.push('/')
      }
    }
  })

  const onFinish = async (val: Partial<IRoom>) => {
    if (val.hasScreen !== undefined) val.hasScreen = Boolean(val.hasScreen)
    if (val.capacity !== undefined) val.capacity = Number(val.capacity)
    await updateRoom({
      roomId: room._id,
      ...val
    })
  }

  return (
    <Layout
      showNav={true}
      showTab={false}
      navText='编辑会议室'
    >
      <Form
        form={form}
        onFinish={onFinish}
        footer={
          <div className={styles.submit}>
            <Button
              type='warning'
              nativeType='submit'
              block
              round
            >提交</Button>
          </div>
        }
      >
        {formList.map(item => (
          <Form.Item
            key={item.name as string}
            name={item.name}
            label={item.label}
          >{item.children}</Form.Item>
        ))}
      </Form>
    </Layout>
  )
}
