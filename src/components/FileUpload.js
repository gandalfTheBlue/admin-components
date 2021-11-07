import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { apiBaseFile } from 'src/config'

const FileUpload = ({ callback, accept, fileUrl }) => {
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    if (fileUrl) {
      setFileList([{ url: fileUrl, name: fileUrl, status: 'done' }])
    }
  }, [fileUrl])

  const props = {
    accept,
    name: 'file',
    maxCount: 1,
    action: apiBaseFile,
    onChange(info) {
      setFileList(info.fileList)
      if (info.file.status === 'done') {
        callback(info.file.response.data.url)
      }
    },
  }

  return (
    <Upload {...props} fileList={fileList}>
      <Button icon={<UploadOutlined />}>点击上传</Button>
    </Upload>
  )
}

export default FileUpload
