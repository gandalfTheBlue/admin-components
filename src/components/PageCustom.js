import React from 'react'
import './PageCustom.less'

const PageCustom = ({ children, title, customClass }) => {
  return (
    <div className={`page page-custom admin-form ${customClass}`}>
      <div className="admin-form-title">{title}</div>
      {children}
    </div>
  )
}

export default PageCustom
