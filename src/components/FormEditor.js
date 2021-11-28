import './FormEditor.less'
import 'braft-editor/dist/index.css'

import { LoadingOutlined } from '@ant-design/icons'
import { Form, message, Upload } from 'antd'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import React, { useState } from 'react'
import { apiBaseImg } from 'src/config'

const FormEditor = ({
  form,
  label,
  name,
  initialValue,
  maxSize = 100,
  mode,
}) => {
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

  const handleSetFaceUrl = (url) => {
    form.setFieldsValue({
      faceUrl: url,
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

  const imageControls = [
    'float-left', // 设置图片左浮动
    'float-right', // 设置图片右浮动
    'align-left', // 设置图片居左
    'align-center', // 设置图片居中
    'align-right', // 设置图片居右
    'link', // 设置图片超链接
    'size', // 设置图片尺寸
    {
      text: '封面',
      onClick: (_, info) => {
        handleSetFaceUrl(info.url)
        message.success('设置封面图成功, 保存后生效')
      },
    },
    'remove', // 删除图片
  ]

  if (mode === 'list') {
    return (
      <div className="form-editor form-editor-list">
        <span>{label}: </span>
        <BraftEditor
          value={editorState}
          onChange={handleEditorChange}
          controls={['list-ul', 'list-ol']}
          imageControls={imageControls}
        />
        <Form.Item
          label={label}
          name={name}
          style={{ visibility: 'hidden', width: 0 }}
        ></Form.Item>
      </div>
    )
  }

  return (
    <div className="form-editor">
      <span>{label}: </span>
      <BraftEditor
        value={editorState}
        onChange={handleEditorChange}
        extendControls={extendControls}
        excludeControls={['media']}
        imageControls={imageControls}
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
