import { useHistory } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Field, Radio, Form, Toast } from 'react-vant'
import { FormItemProps } from 'react-vant/es/form'

import Layout from '@/components/Layout'
import RoomEditForm from '@/components/RoomEditForm'
import { roomsService } from '@/services'
import { IRoom } from '@/models/types'

export default function AddRoom() {
  const history = useHistory()
  const [form] = Form.useForm()
  const formList: FormItemProps[] = [
    {
      name: 'name',
      label: '名称',
      rules: [
        { min: 2 }
      ],
      children: <Field placeholder='请输入会议室名称' />
    },
    {
      name: 'capacity',
      label: '人员容纳量',
      rules: [
        { type: 'number' }
      ],
      children: (
        <Field
          placeholder='请输入人员容纳量'
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
          placeholder='请输入会议室地址'
          type='textarea'
          maxlength={15}
          showWordLimit
        />
      )
    }
  ]
  const { run: addRoom } = useRequest(roomsService.add, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        Toast.success('添加会议室成功')
      } else {
        Toast.fail(data.msg)
      }
      history.replace('/meetings')
    }
  })

  const onFinish = async (val: IRoom) => {
    addRoom(val)
  }

  return (
    <Layout
      showNav={true}
      showTab={false}
      navText='新增会议室'
    >
      <RoomEditForm
        formProps={{ form, onFinish }}
        formList={formList}
      />
    </Layout>
  )
}
