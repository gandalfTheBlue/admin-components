import { Image, Tag } from 'antd'
import React from 'react'

import { formatTime, timeFormat } from './timeUtil'

export const tableOrder = {
  title: '序号',
  key: 'index',
  render: (text, record, index) => `${index + 1}`,
}

export const getImageRow = (title, dataIndex) => ({
  title,
  dataIndex,
  render: (_, record) => <Image width={45} src={record[dataIndex]} />,
})

export const getTagRow = (title, dataIndex, items) => ({
  title,
  dataIndex,
  render: (_, record) => {
    const itemIds = record[dataIndex].split(',') || []
    return (
      <>
        {itemIds.map((id) => {
          const item = items.find((item) => String(item.id) === id)
          if (!item) return null
          return <Tag key={item.id}>{item.name}</Tag>
        })}
      </>
    )
  },
})

export const getDateRow = (title, dataIndex) => ({
  title,
  dataIndex,
  render: (_, record) => <span>{formatTime(record[dataIndex])}</span>,
})

export const getTimeRow = (title, dataIndex) => ({
  title,
  dataIndex,
  render: (_, record) => (
    <span>{formatTime(record[dataIndex], timeFormat)}</span>
  ),
})

export const getRender = (callback) => (_, record) =>
  <span>{callback(record)}</span>
