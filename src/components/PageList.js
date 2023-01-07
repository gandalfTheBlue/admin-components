import { Divider, message, Modal } from 'antd'
import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import useActiveRoute from 'src/hooks/useActiveRoute'
import api from 'src/utils/api'

import { tableOrder } from '../utils/tableUtil'
import ChangePassword from './ChangePassword'
import CustomTable from './CustomTable'
import ListHeader from './ListHeader'
import PageFormDrawer from './PageFormDrawer'
import { formatTime, timeFormat } from '../utils/timeUtil'

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
    isBatchPublish,
    isInIndex,
    isEnable,
    isPassword,
    isHeaderItem,
    headerItem = '新闻',
    isMultipleHeaderItem,
    isCopy,
    actionWidth,
    isCompany,
    isNoOrder,
    isResume,
    isHot,
    isSetTop,
    isReadonly,
    isBatchDownload,
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

  const handleBatchDownload = () => {
    const { selectedRowKeys } = tableList.rowSelection
    if (!selectedRowKeys.length) {
      message.warn(`请先选择要下载的${title}`)
      return
    }
    const data = tableList.dataSource
      .filter((item) => selectedRowKeys.includes(item.id))
      .map((item) => {
        const newItem = {}
        columns.forEach((column) => {
          if (item[column.dataIndex]) {
            newItem[column.title] = item[column.dataIndex]
            if (column.isTime) {
              newItem[column.title] = formatTime(
                item[column.dataIndex],
                timeFormat
              )
            }
          }
        })
        return newItem
      })
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, 'DataSheet.xlsx')
  }

  const handleBatchPublish = (isPublish) => {
    const status = isPublish ? '发布' : '取消发布'
    const { selectedRowKeys } = tableList.rowSelection
    if (!selectedRowKeys.length) {
      message.warn(`请先选择要操作的${title}`)
      return
    }

    confirm({
      title: `请问您确认要${status}选中的${title}吗?`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await api.post(
          `${apiPath}/batch-publish?isPublish=${isPublish}&ids=${selectedRowKeys.join(
            ','
          )}`
        )
        message.success(`批量${status}${title}成功`)
        tableList.fetchTable()
      },
      onCancel() {},
    })
  }

  const setHeaderItem = (record) => {
    confirm({
      title: `请问您确认要设置该${headerItem}为头部${headerItem}吗?`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await api.post(
          `${apiPath}/headerItem?id=${record.id}&isHeaderItem=true`
        )
        message.success(`设置头部${headerItem}成功`)
        tableList.fetchTable()
      },
      onCancel() {},
    })
  }

  const setMultipleHeaderItem = (record) => {
    const { isHeaderItem } = record
    const status = isHeaderItem ? '取消' : '设置'
    confirm({
      title: `请问您确认要${status}该${headerItem}为头部${headerItem}吗?`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await api.post(
          `${apiPath}/headerItem?isHeaderItem=${!isHeaderItem}&id=${record.id}`
        )
        message.success(`${status}头部${headerItem}成功`)
        tableList.fetchTable()
      },
      onCancel() {},
    })
  }

  const setHot = (record) => {
    const { isHot } = record
    const status = isHot ? '取消' : '设置为'
    confirm({
      title: `请问您确认要${status}最热吗?`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await api.post(`${apiPath}/hot?hot=${!isHot}&id=${record.id}`)
        message.success(`${status}最热成功`)
        tableList.fetchTable()
      },
      onCancel() {},
    })
  }

  const setTopItem = (record) => {
    confirm({
      title: `请问您确认要置顶该${title}吗?`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await api.post(`${apiPath}/setAsTopItem?id=${record.id}`)
        message.success(`置顶${title}成功`)
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
        {!isResume && (
          <>
            <span className="table-action" onClick={() => handleEdit(record)}>
              编辑
            </span>
            <Divider type="vertical" />
          </>
        )}
        {!isCompany && (
          <span className="table-action" onClick={() => deleteEntity(record)}>
            删除
          </span>
        )}
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
              设为头部{headerItem}
            </span>
          </>
        )}
        {isSetTop && (
          <>
            <Divider type="vertical" />
            <span className="table-action" onClick={() => setTopItem(record)}>
              置顶
            </span>
          </>
        )}
        {isMultipleHeaderItem && (
          <>
            <Divider type="vertical" />
            <span
              className="table-action"
              onClick={() => setMultipleHeaderItem(record)}
            >
              {record.isHeaderItem
                ? `取消头部${headerItem}`
                : `设为头部${headerItem}`}
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
        {isResume && (
          <>
            <Divider type="vertical" />
            <span
              className="table-action"
              onClick={() => window.open(record.resumeUrl, '_blank')}
            >
              下载
            </span>
          </>
        )}
        {isHot && (
          <>
            <Divider type="vertical" />
            <span className="table-action" onClick={() => setHot(record)}>
              {record.isHot ? '取消最热' : '设为最热'}
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

  const finalColumns = [...listColumns]
  if (!isReadonly) {
    finalColumns.push(actionRow)
  }
  if (!isNoOrder) {
    finalColumns.unshift(tableOrder)
  }

  return (
    <div className={`page page-list`}>
      <div className="page-list-title">{title}列表</div>
      <ListHeader
        {...tableList}
        showAdd={
          (!isResume && !isCompany && !isReadonly) ||
          (isCompany && !tableList.dataSource.length)
        }
        placeholder="请输入查询条件"
        addCallback={handleAdd}
        deleteCallback={showRowSelection ? handleBatchDelete : null}
        downloadCallback={isBatchDownload ? handleBatchDownload : null}
        isBatchPublish={isBatchPublish}
        handleBatchPublish={handleBatchPublish}
      />
      <CustomTable
        {...tableList}
        columns={finalColumns}
        rowKey="id"
        size="middle"
        showRowSelection={showRowSelection || isBatchDownload}
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
