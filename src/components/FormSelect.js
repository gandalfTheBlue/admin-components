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
    if (mode === 'tagInput') {
      message = `请输入${label}标签`
    }
    if (mode === 'tagSelect') {
      message = `请选择${label}`
    }
  }

  if (['tagInput', 'tagSelect'].includes(mode)) {
    mode = 'tags'
  }

  return (
    <Form.Item
      rules={[{ required: required ?? true, message }]}
      label={label}
      name={name}
      initialValue={initialValue}
    >
      <Select placeholder={message} mode={mode}>
        {options.map((item) => {
          const value = item[valueKey]
          const finalValue = mode === 'tags' ? String(value) : value
          return (
            <Option key={value} value={finalValue}>
              {item[titleKey]}
            </Option>
          )
        })}
      </Select>
    </Form.Item>
  )
}

export default FormSelect
