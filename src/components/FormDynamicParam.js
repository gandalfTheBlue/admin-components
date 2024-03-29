import './FormDynamicParam.less'

import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { deepClone } from 'src/utils/common'

const { TextArea } = Input

const FormDynamicParam = ({ form, name, type = 'input', initialValue }) => {
  const [params, setParams] = useState(initToParams(initialValue))
  const [maxNum, setMaxNum] = useState(params.length)
  const [duplicateIds, setDuplicateIds] = useState([])

  useEffect(() => {
    const obj = {}
    params.forEach((param) => {
      obj[param.key] = param.value
    })
    form.setFieldsValue({
      [name]: JSON.stringify(obj),
    })
  }, [form, name, params])

  const updateInput = (id, type, value) => {
    const copyedParams = deepClone(params)
    const param = copyedParams.find((param) => param.id === id)
    param[type] = value

    const set = new Set()
    const obj = {}
    copyedParams.forEach((param) => {
      if (!obj[param.key]) {
        obj[param.key] = param.id
      } else {
        set.add(obj[param.key])
        set.add(param.id)
      }
    })
    const ids = Array.from(set)
    setDuplicateIds(ids)
    setParams(copyedParams)
  }

  const addParam = (insertIndex) => {
    const param = {
      id: maxNum + 1,
    }
    const newParams = []
    params.forEach((item, index) => {
      newParams.push(item)
      if (insertIndex === index) {
        newParams.push(param)
      }
    })

    setMaxNum((pre) => pre + 1)
    setParams(newParams)
  }

  const deleteParam = (id) => {
    const newParams = params.filter((param) => param.id !== id)
    if (newParams.length === 0) {
      newParams.push({
        id: maxNum,
      })
    }
    setParams(newParams)
  }

  return (
    <>
      <Form.Item
        rules={[
          {
            validator: async () => {
              if (duplicateIds.length) {
                return Promise.reject(new Error('动态参数名必须唯一'))
              }
            },
          },
        ]}
        name={name}
        className="dynamic-params-item"
      ></Form.Item>
      {params.map((item, index) => {
        const isDuplicate = duplicateIds.indexOf(item.id) > -1
        return (
          <div key={item.id}>
            <Form.Item
              label={`动态参数${index + 1}`}
              className={`dynamic-params ${
                isDuplicate ? 'dynamic-params-duplicated' : ''
              }`}
            >
              <Input
                onChange={(e) => updateInput(item.id, 'key', e.target.value)}
                value={item.key}
                placeholder="请输入参数名"
              />
              {type === 'input' && (
                <Input
                  onChange={(e) =>
                    updateInput(item.id, 'value', e.target.value)
                  }
                  value={item.value}
                  placeholder="请输入参数值"
                />
              )}
              {type === 'textarea' && (
                <TextArea
                  rows={1}
                  onChange={(e) =>
                    updateInput(item.id, 'value', e.target.value)
                  }
                  value={item.value}
                  placeholder="请输入参数值"
                />
              )}
              <MinusCircleOutlined onClick={() => deleteParam(item.id)} />
              <PlusCircleOutlined onClick={() => addParam(index)} />
            </Form.Item>
            {isDuplicate && (
              <div className="dynamic-params-warning">
                <div></div>
                <div>参数必须唯一</div>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

export default FormDynamicParam

const initToParams = (init) => {
  const defaultParms = [
    {
      id: 0,
    },
  ]
  try {
    const obj = JSON.parse(init)
    const keys = Object.keys(obj)
    if (!keys.length) {
      return defaultParms
    }

    return Object.keys(obj).map((key, index) => ({
      id: index + 1,
      key,
      value: obj[key],
    }))
  } catch (e) {
    return defaultParms
  }
}
