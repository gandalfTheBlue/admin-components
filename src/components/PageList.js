import { Divider, message, Modal } from 'antd'
import React, { useState } from 'react'
import useActiveRoute from 'src/hooks/useActiveRoute'
import api from 'src/utils/api'
import { tableOrder } from 'src/utils/tableUtil'

import ChangePassword from './ChangePassword'
import CustomTable from './CustomTable'
import ListHeader from './ListHeader'
import PageFormDrawer from './PageFormDrawer'

const { confirm } = Modal

const { useTableFetch } = CustomTable

const PageList = ({
  columns,
  path,
  customForm,
  addCallback,
  showRowSelection,
  drawerWidth = 600,
  initValues,
  beforeFinish,
}) => {
  const {
    title,
    titleProp = 'name',
    apiPath,
    isPublish,
    isInIndex,
    isEnable,
    isPassword,
    isHeaderItem,
    isCopy,
    actionWidth,
  } = useActiveRoute()
  const fetchPath = path ?? `${apiPath}/page`
  const tableList = useTableFetch(fetchPath)
  const listColumns = columns.filter((column) => !column.hideInList)
  const [selectedEntity, setSelectedEntity] = useState()
  const [selectedEntityPwd, setSelectedEntityPwd] = useState()

  const confirmUpdate = ({ status, title, titleValue, path, callback }) => {
    confirm({
      title: `请问您确认要${status}该${title}吗?`,
      content: `${title}名: ${titleValue}`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await api.post(path)
        message.success(`${title}${status}成功`)
        callback && callback()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const deleteEntity = (entity) => {
    const payload = {
      status: '删除',
      title,
      titleValue: entity[titleProp],
      path: `${apiPath}/del?id=${entity.id}`,
      callback: () => {
        tableList.fetchTable()
      },
    }
    confirmUpdate(payload)
  }

  const publishEntity = (entity) => {
    const status = entity.isPublish ? '取消发布' : '发布'
    const payload = {
      status,
      title,
      titleValue: entity[titleProp],
      path: `${apiPath}/publish?id=${entity.id}&isPublish=${!entity.isPublish}`,
      callback: () => {
        tableList.fetchTable()
      },
    }
    confirmUpdate(payload)
  }

  const indexEntity = (entity) => {
    const status = entity.isInIndex ? '取消首页显示' : '设为首页显示'
    const payload = {
      status,
      title,
      titleValue: entity[titleProp],
      path: `${apiPath}/showInIndex?id=${entity.id}&show=${!entity.isInIndex}`,
      callback: () => {
        tableList.fetchTable()
      },
    }
    confirmUpdate(payload)
  }

  const enableEntity = (entity) => {
    const status = entity.isEnable ? '禁用' : '启用'
    const payload = {
      status,
      title,
      titleValue: entity[titleProp],
      path: `${apiPath}/enable?id=${entity.id}&isEnable=${!entity.isEnable}`,
      callback: () => {
        tableList.fetchTable()
      },
    }
    confirmUpdate(payload)
  }

  const handleEdit = (record) => {
    if (customForm) {
      customForm(record)
    } else {
      setSelectedEntity(record)
    }
  }

  const handleAdd = () => {
    if (addCallback) {
      addCallback()
      return
    }
    setSelectedEntity({})
  }

  const copyItem = (record) => {
    const newRecord = JSON.parse(JSON.stringify(record))
    delete newRecord.id
    setSelectedEntity(newRecord)
  }

  const handleBatchDelete = () => {
    const { selectedRowKeys } = tableList.rowSelection
    if (!selectedRowKeys.length) {
      message.warn(`请先选择要删除的${title}`)
      return
    }

    confirm({
      title: `请问您确认要删除选中的${title}吗?`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await api.post(`${apiPath}/dels?ids=${selectedRowKeys.join(',')}`)
        message.success(`批量删除${title}成功`)
        tableList.fetchTable()
      },
      onCancel() {},
    })
  }

  const setHeaderItem = (record) => {
    confirm({
      title: `请问您确认要设置该新闻为头部新闻吗?`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await api.post(`${apiPath}/headerItem?id=${record.id}`)
        message.success(`批量头部新闻成功`)
        tableList.fetchTable()
      },
      onCancel() {},
    })
  }

  const actionRow = {
    title: '操作',
    key: 'action',
    width: actionWidth,
    render: (_, record) => (
      <>
        <span className="table-action" onClick={() => handleEdit(record)}>
          编辑
        </span>
        <Divider type="vertical" />
        <span className="table-action" onClick={() => deleteEntity(record)}>
          删除
        </span>
        {isPublish && (
          <>
            <Divider type="vertical" />
            <span
              className="table-action"
              onClick={() => publishEntity(record)}
            >
              {record.isPublish ? '取消发布' : '发布'}
            </span>
          </>
        )}
        {isInIndex && (
          <>
            <Divider type="vertical" />
            <span className="table-action" onClick={() => indexEntity(record)}>
              {record.isInIndex ? '取消首页显示' : '设为首页显示'}
            </span>
          </>
        )}
        {isEnable && (
          <>
            <Divider type="vertical" />
            <span className="table-action" onClick={() => enableEntity(record)}>
              {record.isEnable ? '禁用' : '启用'}
            </span>
          </>
        )}
        {isPassword && (
          <>
            <Divider type="vertical" />
            <span
              className="table-action"
              onClick={() => setSelectedEntityPwd(record)}
            >
              修改密码
            </span>
          </>
        )}
        {isHeaderItem && !record.isHeaderItem && (
          <>
            <Divider type="vertical" />
            <span
              className="table-action"
              onClick={() => setHeaderItem(record)}
            >
              设为头部新闻
            </span>
          </>
        )}
        {isCopy && (
          <>
            <Divider type="vertical" />
            <span className="table-action" onClick={() => copyItem(record)}>
              复制
            </span>
          </>
        )}
      </>
    ),
  }

  const formCallback = () => {
    tableList.fetchTable()
    setSelectedEntity()
  }

  const handleClose = () => {
    setSelectedEntity()
  }

  return (
    <div className={`page page-list`}>
      <div className="page-list-title">{title}列表</div>
      <ListHeader
        {...tableList}
        showAdd={true}
        placeholder="请输入查询条件"
        addCallback={handleAdd}
        deleteCallback={showRowSelection ? handleBatchDelete : null}
      />
      <CustomTable
        {...tableList}
        columns={[tableOrder, ...listColumns, actionRow]}
        rowKey="id"
        size="middle"
        showRowSelection={showRowSelection}
      />
      {selectedEntity && (
        <PageFormDrawer
          formItems={columns}
          onClose={handleClose}
          defaultValues={selectedEntity}
          callback={formCallback}
          drawerWidth={drawerWidth}
          initValues={initValues}
          beforeFinish={beforeFinish}
        />
      )}
      {selectedEntityPwd && (
        <ChangePassword
          setVisible={setSelectedEntityPwd}
          user={selectedEntityPwd}
        />
      )}
    </div>
  )
}

export default PageList
