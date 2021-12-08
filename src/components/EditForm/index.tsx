import { Button, Form } from 'react-vant'
import { FormProps, FormItemProps } from 'react-vant/es/form'

import styles from './style.module.less'

interface IFormProps {
  /**
   * Form组件的props
   */
  formProps: FormProps
  formList: FormItemProps[]
}

export default function EditForm({ formProps, formList }: IFormProps) {
  return (
    <Form
      {...formProps}
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
          {...item}
        />
      ))}
    </Form>
  )
}
