import { Button, Form } from 'antd'
import React from 'react'
import { emptyLayout } from 'src/utils/const'

const FormBottom = ({ cancel }) => {
  return (
    <Form.Item {...emptyLayout} className="form-bottom">
      <Button onClick={cancel}>取消</Button>
      <Button type="primary" htmlType="submit">
        确定
      </Button>
    </Form.Item>
  )
}

export default FormBottom
