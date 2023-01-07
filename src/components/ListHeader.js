import './ListHeader.less'

import { Button, Input } from 'antd'
import React, { useState } from 'react'

const ListHeader = ({
  fetchTable,
  search: defaultSearch,
  placeholder = '请输入查询条件',
  showAdd,
  addCallback,
  deleteCallback,
  downloadCallback,
  isBatchPublish,
  handleBatchPublish,
}) => {
  const [search, setSearch] = useState(defaultSearch?.keyword ?? '')

  const handleSearch = () => {
    fetchTable({ keyword: search })
  }

  const clearSearch = () => {
    setSearch('')
    fetchTable({ keyword: '' })
  }

  const handleAdd = () => {
    addCallback && addCallback()
  }

  const handleDelete = () => {
    deleteCallback && deleteCallback()
  }

  const handleDownload = () => {
    downloadCallback && downloadCallback()
  }

  return (
    <div className="list-header">
      <div>
        {showAdd && (
          <Button type="primary" onClick={handleAdd}>
            新增
          </Button>
        )}
        {isBatchPublish && (
          <Button
            onClick={() => handleBatchPublish(true)}
            style={{
              marginLeft: 10,
            }}
          >
            批量发布
          </Button>
        )}
        {isBatchPublish && (
          <Button
            onClick={() => handleBatchPublish(false)}
            style={{
              visibility: isBatchPublish ? 'visible' : 'hidden',
              marginLeft: 10,
            }}
          >
            批量取消发布
          </Button>
        )}
        {deleteCallback && (
          <Button
            onClick={handleDelete}
            style={{
              visibility: deleteCallback ? 'visible' : 'hidden',
              marginLeft: 10,
            }}
          >
            批量删除
          </Button>
        )}
        {downloadCallback && (
          <Button
            onClick={handleDownload}
            style={{
              visibility: downloadCallback ? 'visible' : 'hidden',
              marginLeft: 10,
            }}
          >
            批量下载
          </Button>
        )}
      </div>
      <div className="list-header-right">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={handleSearch}
          placeholder={placeholder}
          style={{ width: 220 }}
        />
        <Button className="mr-10" onClick={handleSearch}>
          搜索
        </Button>
        <Button onClick={clearSearch}>清空</Button>
      </div>
    </div>
  )
}

export default ListHeader
