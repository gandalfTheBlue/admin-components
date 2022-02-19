import './FormEditor.less'
import 'braft-editor/dist/index.css'

import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Form, message, Modal, Upload } from 'antd'
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
  const [showModal, setShowModal] = useState(false)
  const [currentVedioLink, setCurrentVedioLink] = useState()
  const [mediaItems, setMediaItems] = useState(getMedias(initialValue))
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(initialValue)
  )

  const handleMediaItemChange = (url, type) => {
    const isExist = mediaItems.some((mediaItem) => mediaItem.url === url)
    if (!isExist) {
      const newItem = {
        id: mediaItems.length,
        type,
        url,
      }
      setMediaItems([...mediaItems, newItem])
    }
  }

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

      const { url } = file.response.data
      if (type === 'VIDEO') {
        setCurrentVedioLink(url)
        setShowModal(true)
      } else {
        handleMediaItemChange(url, type)
        setEditorState(
          ContentUtils.insertMedias(editorState, [
            {
              type,
              url,
            },
          ])
        )
      }
    }
  }

  const updateVedioHandler = (posterUrl) => {
    handleMediaItemChange(posterUrl, 'VIDEO')
    setEditorState(
      ContentUtils.insertMedias(currentVedioLink, [
        {
          type: 'VIDEO',
          url: currentVedioLink,
          meta: {
            poster: posterUrl,
          },
        },
      ])
    )
  }

  const handleCloseModal = (imageUrl) => {
    updateVedioHandler(imageUrl)
    setShowModal(false)
  }

  const beforeUpload = (file) => {
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
        media={{ items: mediaItems }}
        imageControls={imageControls}
      />
      <Form.Item
        label={label}
        name={name}
        style={{ visibility: 'hidden', width: 0 }}
      ></Form.Item>
      <VideoPosterUpload
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  )
}

export default FormEditor

const VideoPosterUpload = ({ showModal, handleCloseModal }) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  const uploadButton = (
    <div>
      {loading && (
        <Button icon={<LoadingOutlined />} disabled>
          上传中
        </Button>
      )}
      {!loading && <Button icon={<UploadOutlined />}>点击上传</Button>}
    </div>
  )

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setLoading(false)
      setImageUrl(info.file.response.data.url)
    }
  }

  const handleAction = () => {
    handleCloseModal(imageUrl)
    setImageUrl(null)
  }

  return (
    <>
      {showModal && (
        <Modal
          title="视频封面图"
          visible={true}
          footer={[
            <Button type="primary" key="confirm" onClick={handleAction}>
              确定
            </Button>,
            <Button key="skip" onClick={handleAction}>
              跳过
            </Button>,
          ]}
        >
          <Upload
            accept="image/png,image/jpg,image/gif,image/jpeg"
            showUploadList={false}
            action={apiBaseImg}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Modal>
      )}
    </>
  )
}

const getMedias = (html) => {
  const mediaItems = []
  let htmlObject = document.createElement('div')
  htmlObject.innerHTML = html
  const allImages = htmlObject.getElementsByTagName('img') || []
  const allVideos = htmlObject.getElementsByTagName('video') || []

  for (let item of allImages) {
    mediaItems.push({
      id: mediaItems.length,
      type: 'IMAGE',
      url: item.src,
    })
  }

  for (let item of allVideos) {
    mediaItems.push({
      id: mediaItems.length,
      type: 'VIDEO',
      url: item.src,
    })
  }

  return mediaItems
}
