import './CustomTable.less'

import { Table } from 'antd'
import update from 'immutability-helper'
import React, { useCallback, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useTableFetch from 'src/hooks/useTableFetch'
import api from 'src/utils/api'

import { dragBodyRowComponents } from '../utils/dragBodyRow'

const CustomTable = ({
  pagination,
  fetchTable,
  showPagination = true,
  showRowSelection = false,
  rowSelection,
  defaultPageSize,
  pageSizeOptions,
  refreshInterval,
  dataSource: originDataSourced,
  ...tableProps
}) => {
  const { isSort, apiPath } = useActiveRoute()
  const [dataSource, setDataSource] = useState()

  useEffect(() => {
    setDataSource(originDataSourced)
  }, [originDataSourced])

  const reorder = useCallback(
    (dataSource) => {
      const reorderItems = async (items) => {
        const payload = items.map((item, index) => ({
          id: item.id,
          sortOrder: index + 1,
        }))
        await api.post(`${apiPath}/changeSortOrder`, payload)
      }
      reorderItems(dataSource)
    },
    [apiPath]
  )

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = dataSource[dragIndex]
      const newDataSource = update(dataSource, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      })
      setDataSource(newDataSource)
      reorder(newDataSource)
    },
    [dataSource, reorder]
  )

  rowSelection = showRowSelection ? rowSelection : null
  let finalPagination
  if (pagination) {
    finalPagination = {
      ...pagination,
      showTotal: (totalNum) => showTotal(totalNum, rowSelection),
    }
    if (pageSizeOptions) {
      finalPagination.pageSizeOptions = pageSizeOptions
    }
  }

  React.useEffect(() => {
    if (defaultPageSize) {
      fetchTable({ __updateDefaultPageSize__: defaultPageSize })
    }
  }, [defaultPageSize, fetchTable])

  React.useEffect(() => {
    if (!showPagination) {
      fetchTable({ __updateHasPagination__: false })
    }
  }, [showPagination, fetchTable])

  React.useEffect(() => {
    if (refreshInterval) {
      fetchTable({ __updateRefreshInterval__: refreshInterval })
    }
  }, [refreshInterval, fetchTable])

  if (isSort) {
    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          {...tableProps}
          dataSource={dataSource}
          loading={false}
          bordered={true}
          rowSelection={rowSelection}
          pagination={pagination && finalPagination}
          onChange={(paginator, filters) =>
            fetchTable({ __tableChange__: { paginator, filters } })
          }
          components={dragBodyRowComponents}
          onRow={(_, index) => ({
            index,
            moveRow,
          })}
        />
      </DndProvider>
    )
  }

  return (
    <Table
      {...tableProps}
      dataSource={dataSource}
      loading={false}
      bordered={true}
      rowSelection={rowSelection}
      pagination={pagination && finalPagination}
      onChange={(paginator, filters) =>
        fetchTable({ __tableChange__: { paginator, filters } })
      }
    />
  )
}

CustomTable.useTableFetch = useTableFetch

export default CustomTable

const showTotal = (total, rowSelection) => {
  return (
    <div className="ant-pagation-total">
      {rowSelection ? (
        <div className="ant-pagation-total-selected">
          已选择
          <span>
            {` ${
              (rowSelection.selectedRowKeys &&
                rowSelection.selectedRowKeys.length) ||
              0
            }/${total} `}
          </span>
          项 <a onClick={() => rowSelection.onChange([], [])}>清空</a>
        </div>
      ) : null}
      <div>{`共${total}条`}</div>
    </div>
  )
}
