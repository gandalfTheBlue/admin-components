import './FormEditor.less'
import 'braft-editor/dist/index.css'

import { LoadingOutlined } from '@ant-design/icons'
import { Form, message, Upload } from 'antd'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import React, { useState } from 'react'
import { apiBaseImg } from 'src/config'

const FormEditor = ({ form, label, name, initialValue, maxSize = 100 }) => {
  const [isUploading, setIsUploading] = useState(false)

  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(initialValue)
  )

  const handleEditorChange = (editorState) => {
    setEditorState(editorState)
    form.setFieldsValue({
      [name]: editorState.toHTML(),
    })
  }

  const uploadHandler = ({ file }) => {
    setIsUploading(file.status === 'uploading')
    if (file.status === 'done') {
      let type = ''
      if (file.type.startsWith('image')) {
        type = 'IMAGE'
      }
      if (file.type.startsWith('video')) {
        type = 'VIDEO'
      }
      if (file.type.startsWith('audio')) {
        type = 'AUDIO'
      }

      setEditorState(
        ContentUtils.insertMedias(editorState, [
          {
            type,
            url: file.response.data.url,
          },
        ])
      )
    }
  }

  function beforeUpload(file) {
    if (file.size > maxSize * 1024 * 1024) {
      message.error(`媒体文件大小不能超过${maxSize}M`)
      return Promise.reject()
    }
    return true
  }

  const extendControls = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload
          accept="image/png,image/jpg,image/gif,image/jpeg, audio/*, video/*"
          showUploadList={false}
          action={apiBaseImg}
          onChange={uploadHandler}
          disabled={isUploading}
          beforeUpload={(file) => beforeUpload(file)}
        >
          <button type="button" className="control-item button upload-button">
            {!isUploading && <span>插入图片/音视频</span>}
            {isUploading && (
              <span>
                <LoadingOutlined />
                文件上传中
              </span>
            )}
          </button>
        </Upload>
      ),
    },
  ]

  return (
    <div className="form-editor">
      <span>{label}: </span>
      <BraftEditor
        value={editorState}
        onChange={handleEditorChange}
        extendControls={extendControls}
        excludeControls={['media']}
      />
      <Form.Item
        label={label}
        name={name}
        style={{ visibility: 'hidden', width: 0 }}
      ></Form.Item>
    </div>
  )
}

export default FormEditor
