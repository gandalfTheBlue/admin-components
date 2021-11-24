import { DatePicker, Form } from 'antd'
import React from 'react'

const FormDate = ({ label, name, disabledDate, required }) => {
  return (
    <Form.Item label={label} name={name} rules={[{ required }]}>
      <DatePicker disabledDate={disabledDate} />
    </Form.Item>
  )
}

export default FormDate
