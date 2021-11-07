import './ChangePassword.less'

import { Form, Icon, Input, message, Modal } from 'antd'
import React from 'react'
import useActiveRoute from 'src/hooks/useActiveRoute'
import api from 'src/utils/api'
import { formLayout } from 'src/utils/const'

const ChangePassword = ({ setVisible, user }) => {
  const { apiPath } = useActiveRoute()
  const [form] = Form.useForm()

  const handleOk = async () => {
    const { password } = await form.validateFields(['password'])
    await api.post(`${apiPath}/changePsw?id=${user.id}&psw=${password}`)
    message.success('密码修改成功。')
    setVisible(false)
  }

  return (
    <Modal
      wrapClassName="change-password"
      visible={true}
      onOk={handleOk}
      onCancel={() => setVisible(false)}
      cancelText="取消"
      okText="确定"
    >
      <Form {...formLayout} className="change-password-form" form={form}>
        <Form.Item label="用户名称">
          <span>{user.username}</span>
        </Form.Item>
        <Form.Item
          name="password"
          label="新密码"
          rules={[{ required: true, min: 6 }]}
          hasFeedback
        >
          <Input.Password
            prefix={<Icon type="lock" />}
            placeholder="请输入新密码"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ChangePassword
