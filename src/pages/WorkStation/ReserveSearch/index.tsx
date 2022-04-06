import { Form, Field, Button, Icon, Cell } from 'react-vant'
import { CellProps } from 'react-vant/es/cell'

export default function ReserveSearch(props: CellProps) {
  const onFinish = (values: any) => {
    console.log('form submit', values)
  }

  return (
    <Form
      onFinish={onFinish}
      footer={
        <div style={{ margin: '16px 16px 0' }}>
          <Button round nativeType="submit" type="primary" block>
            搜索
          </Button>
        </div>
      }
    >
      <Form.List name="users" initialValue={[{ name: 'react-vant', age: '1' }]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, idx) => (
              <div className="form-list-item" key={field.key}>
                <div className="form-list-item__control">
                  <Form.Item
                    label="姓名"
                    name={[field.name, 'name']}
                    rules={[
                      { type: 'string', min: 2, max: 6, message: '姓名最少两个字，最多6个字' }
                    ]}
                  >
                    <Field placeholder="请输入用户姓名" />
                  </Form.Item>
                  <Form.Item
                    label="年龄"
                    name={[field.name, 'age']}
                    rules={[{ type: 'number', message: '请输入数字', transform: (v) => Number(v) }]}
                  >
                    <Field
                      placeholder="请输入用户年龄"
                      rightIcon={<Icon name="delete" onClick={() => remove(idx)} />}
                    />
                  </Form.Item>
                </div>
              </div>
            ))}
            {/* <Cell.Group inset
              key={item.key}
            >
              <Cell
                size='large'
                icon={item.icon}
                title=''
                value={item.value}
                onClick={item.onClick}
                className={styles.line}
                valueClass={styles.title}
              />
            </Cell.Group> */}
          </>
        )}
      </Form.List>
    </Form>
  )
}
