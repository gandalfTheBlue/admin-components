import { Form } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import FileUpload from './FileUpload'

const FormFile = ({
  form,
  label,
  name,
  message,
  fileUrl,
  required = true,
  accept = '*',
}) => {
  const [url, setUrl] = useState()

  useEffect(() => {
    setUrl(fileUrl)
  }, [fileUrl])

  const handleFileChange = (fileUrl) => {
    form.setFieldsValue({
      [name]: fileUrl,
    })
  }

  return (
    <Form.Item
      rules={[{ required, message }]}
      label={label}
      name={name}
      shouldUpdate={() => {
        setUrl(form.getFieldValue(name))
      }}
    >
      <FileUpload callback={handleFileChange} fileUrl={url} accept={accept} />
    </Form.Item>
  )
}

export default FormFile
