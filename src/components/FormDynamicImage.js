import './FormDynamicImage.less'

import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { deepClone } from 'src/utils/common'
import ImageUpload from './ImageUpload'

const FormDynamicImage = ({ form, name, initialValue, title = '图片' }) => {
  const [images, setImages] = useState(initToIamges(initialValue))
  const [maxNum, setMaxNum] = useState(images.length)

  useEffect(() => {
    form.setFieldsValue({
      [name]: images
        .filter((image) => !image.url)
        .map((image) => image.url)
        .join(','),
    })
  }, [form, name, images])

  const handleImageChange = (id) => (url) => {
    const copyedImages = deepClone(images)
    const image = copyedImages.find((param) => param.id === id)
    image.url = url
    setImages(copyedImages)
  }

  const addImage = (insertIndex) => {
    const iamge = {
      id: maxNum + 1,
    }
    const newImages = []
    images.forEach((item, index) => {
      newImages.push(item)
      if (insertIndex === index) {
        newImages.push(iamge)
      }
    })

    setMaxNum((pre) => pre + 1)
    setImages(newImages)
  }

  const deleteImage = (id) => {
    const newImages = images.filter((param) => param.id !== id)
    if (newImages.length === 0) {
      newImages.push({
        id: maxNum,
      })
    }
    setImages(newImages)
  }

  return (
    <>
      <Form.Item name={name} className="dynamic-image-item"></Form.Item>
      {images.map((item, index) => {
        return (
          <Form.Item
            className="dynamic-image"
            key={item.id}
            label={`${title}${index + 1}`}
          >
            <ImageUpload
              callback={handleImageChange(item.id)}
              imageUrl={item.url}
            />
            <MinusCircleOutlined onClick={() => deleteImage(item.id)} />
            <PlusCircleOutlined onClick={() => addImage(index)} />
          </Form.Item>
        )
      })}
    </>
  )
}

export default FormDynamicImage

const initToIamges = (imageUrls) => {
  const defaultImages = [
    {
      id: 0,
    },
  ]

  const urls = imageUrls?.split(',')
  if (!urls || !urls.length) {
    return defaultImages
  }

  return urls.map((url, index) => ({
    id: index + 1,
    url: url,
  }))
}
