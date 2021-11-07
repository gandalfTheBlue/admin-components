import { Form, Radio } from 'antd'
import React from 'react'

const FormGender = ({ initialValue = 1, label = '性别', name = 'gender' }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: true }]}
      initialValue={initialValue}
    >
      <Radio.Group>
        <Radio value={1}>男</Radio>
        <Radio value={0}>女</Radio>
      </Radio.Group>
    </Form.Item>
  )
}

export default FormGender
