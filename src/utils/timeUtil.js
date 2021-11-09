import moment from 'moment'

export const dateFormat = 'YYYY-MM-DD'
export const timeFormat = 'YYYY-MM-DD HH:mm:ss'

/**
 * @param {*} value long值型的时间值
 * @format {*} format 时间格式
 */
export const formatTime = (value, format = dateFormat) => {
  if (['string', 'number'].includes(typeof value)) {
    return moment(value).format(format)
  }

  if (Array.isArray(value)) {
    return value.map((item) => moment(item).format(format))
  }

  return []
}
