import { Form, Select } from 'antd'
import React from 'react'

const { Option } = Select

const FormSelect = ({
  options = [],
  label,
  name,
  message,
  required,
  initialValue,
  valueKey = 'id',
  titleKey = 'name',
  mode = null,
}) => {
  if (!message) {
    message = mode === 'tags' ? `请输入${label}标签` : `请选择${label}`
  }

  return (
    <Form.Item
      rules={[{ required: required ?? true, message }]}
      label={label}
      name={name}
      initialValue={initialValue}
    >
      <Select placeholder={message} mode={mode}>
        {options.map((item) => (
          <Option key={item[valueKey]} value={String(item[valueKey])}>
            {item[titleKey]}
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
}

export default FormSelect
