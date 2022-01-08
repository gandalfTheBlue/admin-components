import { Button, Drawer, Form, message, Modal } from 'antd'
import moment from 'moment'
import React, { useCallback, useEffect } from 'react'
import useActiveRoute from 'src/hooks/useActiveRoute'
import usePageForm from 'src/hooks/usePageForm'
import api from 'src/utils/api'
import { deepClone } from 'src/utils/common'
import { formLayout } from 'src/utils/const'

import FormCascader from './FormCascader'
import FormDate from './FormDate'
import FormEditor from './FormEditor'
import FormEnableRadio from './FormEnableRadio'
import FormFile from './FormFile'
import FormImage from './FormImage'
import FormInput from './FormInput'
import FormInputNum from './FormInputNum'
import FormPublishRadio from './FormPublishRadio'
import FormRadio from './FormRadio'
import FormSelect from './FormSelect'

const { confirm } = Modal

const PageFormDrawer = ({
  formItems = [],
  defaultValues,
  onClose,
  callback,
  drawerWidth,
  initValues,
  beforeFinish,
}) => {
  const entity = deepClone(defaultValues)
  const { path, title, apiPath = path } = useActiveRoute()
  const [form] = Form.useForm()
  const [entityId, isEdit, status] = usePageForm(entity)

  const columns = formItems
    .filter((column) => column.form)
    .filter((column) => !(isEdit && column.form.hide === 'isEdit'))
    .map((column) => {
      return {
        label: column.title,
        name: column.dataIndex,
        ...column.form,
      }
    })

  const tagItems = formItems
    .filter((item) => item.form?.mode?.startsWith('tag'))
    .map((item) => {
      const separators = {
        tagInput: '@_@',
        tagSelect: ',',
      }
      item.separator = separators[`${item.form.mode}`]
      return item
    })

  const dateItems = formItems.filter((item) => item.form?.comp === 'FormDate')

  const resetFields = useCallback(() => {
    const fields = form.getFieldsValue()
    form.setFields(
      Object.keys(fields).map((name) => ({
        name,
        value: fields[name],
        touched: false,
      }))
    )
  }, [form])

  useEffect(() => {
    if (entity) {
      initValues && initValues(form, entity)
      tagItems.forEach((item) => {
        const { dataIndex: itemName, separator } = item
        const itemValue = entity[itemName]
        entity[itemName] = itemValue ? String(itemValue).split(separator) : []
      })

      dateItems.forEach((item) => {
        const { dataIndex: itemName } = item
        entity[itemName] = moment(entity[itemName])
      })
      form.setFieldsValue(entity)
      resetFields()
    }
  }, [dateItems, entity, form, initValues, resetFields, tagItems])

  const handleClose = () => {
    resetFields()
    onClose()
  }

  const onValuesChange = (values) => {
    columns.forEach((column) => {
      const { name, secondary } = column
      if (values[name] && secondary) {
        form.setFieldsValue({
          [name]: values[name],
        })
      }
    })
  }

  const onFinish = async (values) => {
    beforeFinish && beforeFinish(values)
    if (!!entityId) {
      values.id = entityId
    }
    tagItems.forEach((item) => {
      const { dataIndex: itemName, separator } = item
      values[itemName] = values[itemName]?.join(separator)
    })
    dateItems.forEach((item) => {
      const { dataIndex: itemName, format } = item
      if (values[itemName]) {
        values[itemName] = moment(values[itemName]).format(
          format ?? 'YYYY-MM-DD HH:mm:ss'
        )
      }
    })
    await api.post(getFormPath(apiPath), values)
    message.success(`${status}${title}成功`)
    handleClose()
    callback && callback()
  }

  const confirmClose = () => {
    const fields = columns.map((column) => column.name)
    const touched = form.isFieldsTouched(fields)
    if (!touched) {
      handleClose()
      return
    }

    confirm({
      title: `有未保存的内容，请问确认离开吗`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        handleClose()
      },
      onCancel() {},
    })
  }

  return (
    <Drawer
      title={`${status}${title}`}
      placement="right"
      closable={true}
      onClose={confirmClose}
      visible={true}
      key="right"
      width={drawerWidth}
    >
      <Form
        {...formLayout}
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        {columns.map((item, index) => {
          const { comp, disabled, hide, ...rest } = item
          rest.key = index
          rest.form = form
          rest.disabled = disabled
          if (disabled === 'isEdit') {
            rest.disabled = isEdit
          }
          if (comp === 'FormImage') {
            rest.imageUrl = entity ? entity[item.name] : ''
          }
          if (comp === 'FormEditor') {
            rest.initialValue = entity ? entity[item.name] : ''
          }
          if (hide === true || (hide === 'isEdit' && isEdit)) {
            rest.hide = true
          }
          return React.createElement(compMap[comp], rest)
        })}
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
            确定
          </Button>
          <Button onClick={confirmClose}>取消</Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default PageFormDrawer

const compMap = {
  FormInput,
  FormInputNum,
  FormEnableRadio,
  FormImage,
  FormSelect,
  FormDate,
  FormRadio,
  FormCascader,
  FormEditor,
  FormPublishRadio,
  FormFile,
}

const getFormPath = (apiPath, customApiPath) => {
  return customApiPath ?? `${apiPath}/edit`
}

const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
}
