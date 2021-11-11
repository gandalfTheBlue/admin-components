import './TreeTable.less'

import { DownOutlined } from '@ant-design/icons'
import { EditableProTable } from '@ant-design/pro-table'
import { PageCustom, PageFormDrawer } from '@gandalftheblue/admin-components'
import { Button, Dropdown, Menu, message, Modal } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import useActiveRoute from 'src/hooks/useActiveRoute'
import api from 'src/utils/api'

const { confirm } = Modal

const TreeTable = ({ columns, maxLevel = 2 }) => {
  const { title, apiPath } = useActiveRoute()
  const [items, setItems] = useState([])
  const [treeItems, setTreeItems] = useState([])
  const [formVisible, setFormVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState()

  const fetchItems = useCallback(async () => {
    const result = await api.get(`${apiPath}/page?rows=10000`)
    setItems(result.data)
    setTreeItems(listToTree(result.data))
  }, [apiPath])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const handleAction = (e) => {
    const { type = '', id } = e.target
    const item = items.find((item) => item.id === Number(id)) || { pid: 1 }
    if (type.startsWith('add')) {
      if (type === 'add-current') {
        setSelectedItem({ parent: item.parent, pid: item.pid })
      }
      if (type === 'add-next') {
        setSelectedItem({ parent: item.name, pid: item.id })
      }
      setFormVisible(true)
    }

    if (type === 'edit') {
      setSelectedItem(item)
      setFormVisible(true)
    }

    if (type === 'delete') {
      deleteCategory(item)
    }
  }

  const deleteCategory = (record) => {
    confirm({
      title: `请问您确认要删除该${title}吗?`,
      content: `${title}: ${record.name}`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await api.post(`${apiPath}/del?id=${record.id}`)
        message.success(`删除${title}成功`)
        fetchItems()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const getColumns = (maxLevel) => [
    {
      dataIndex: 'pid',
      hideInList: true,
      form: {
        comp: 'FormInput',
        hide: true,
      },
    },
    {
      title: '父级',
      dataIndex: 'parent',
      hideInList: true,
      form: {
        comp: 'FormInput',
        disabled: true,
        required: false,
      },
    },
    ...columns,
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_, record) => [
        <Dropdown key="add" overlay={getMenu(record, maxLevel)}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            添加 <DownOutlined />
          </a>
        </Dropdown>,
        <a key="edit" type="edit" id={record.id}>
          编辑
        </a>,
        <a key="delete" type="delete" id={record.id}>
          删除
        </a>,
      ],
    },
  ]

  const getMenu = (record, maxLevel) => {
    return (
      <Menu>
        <Menu.Item key="1">
          <a type="add-current" id={record.id}>
            同级{title}
          </a>
        </Menu.Item>
        {record.level < maxLevel && (
          <Menu.Item key="2">
            <a type="add-next" id={record.id}>
              下级{title}
            </a>
          </Menu.Item>
        )}
      </Menu>
    )
  }

  return (
    <PageCustom title={title} customClass="pro-table">
      <div className="list-header tree-table-header" onClick={handleAction}>
        <Button type="primary">
          <a type="add-current">添加第一级</a>
        </Button>
      </div>
      <div onClick={handleAction}>
        <EditableProTable
          rowKey="id"
          recordCreatorProps={false}
          columns={getColumns(maxLevel).filter((column) => !column.hideInList)}
          value={treeItems}
        />
        {formVisible && (
          <PageFormDrawer
            formItems={getColumns(maxLevel)}
            onClose={() => setFormVisible(false)}
            defaultValues={selectedItem}
            callback={fetchItems}
            drawerWidth={600}
          />
        )}
      </div>
    </PageCustom>
  )
}

export default TreeTable

const listToTree = (list) => {
  const rootId = 1
  let map = {},
    node,
    roots = [],
    i

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i]
    node.level = node.hid.split(':').length - 2
    node.value = node.id
    node.label = node.name
    if (node.pid !== rootId) {
      if (!list[map[node.pid]].children) {
        list[map[node.pid]].children = []
      }
      node.parent = list[map[node.pid]].name
      list[map[node.pid]].children.push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}
