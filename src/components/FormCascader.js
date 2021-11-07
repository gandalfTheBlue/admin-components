import { Cascader, Form } from 'antd'
import React from 'react'

const FormCascader = ({ label, name, required, initialValue, options }) => {
  const message = `请选择${label}`

  return (
    <Form.Item
      rules={[{ required: required ?? true, message }]}
      label={label}
      name={name}
      initialValue={initialValue}
    >
      <Cascader options={options} placeholder={message} />
    </Form.Item>
  )
}

export default FormCascader
