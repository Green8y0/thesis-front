import { Field, Radio, Switch } from 'react-vant'
import { FormItemProps } from 'react-vant/es/form'
import { SwitchProps } from 'react-vant/es/switch'

interface FormListProps {
  startTimeFieldProps?: FormItemProps
  endTimeFieldProps?: FormItemProps
  capacityFieldProps?: FormItemProps
  isPeriodicFieldProps: SwitchProps
}

export function useFormList({
  startTimeFieldProps,
  endTimeFieldProps,
  isPeriodicFieldProps
}: FormListProps): FormItemProps[] {
  return [
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
        { required: true }
      ],
      children: (
        <Field
          placeholder='请输入与会人数'
          type='digit'
          onChange={(val) => console.log(typeof val)}
        />
      )
    },
    {
      name: 'dateText',
      label: '会议日期',
      rules: [{ required: true }],
      children: <Field readonly />
    },
    {
      name: 'startTime',
      label: '开始时间',
      customField: true,
      rules: [
        { required: true }
      ],
      children: (
        <Field
          clickable
          readonly
          placeholder='请选择会议开始时间'
        />
      ),
      ...startTimeFieldProps
    },
    {
      name: 'endTime',
      label: '结束时间',
      customField: true,
      rules: [
        { required: true }
      ],
      children: (
        <Field
          clickable
          readonly
          placeholder='请选择会议结束时间'
        />
      ),
      ...endTimeFieldProps
    },
    {
      name: 'hasScreen',
      label: '是否有显示屏',
      rules: [
        { required: true }
      ],
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
      name: 'isPeriodic',
      label: '周期性会议',
      children: (
        <Switch
          size={24}
          defaultChecked={false}
          onChange={(checked: boolean) => {
            console.log(checked)
            if (isPeriodicFieldProps !== undefined && isPeriodicFieldProps.onChange) {
              isPeriodicFieldProps.onChange(checked)
            }
          }}
        />
      )
    }
  ]
}
