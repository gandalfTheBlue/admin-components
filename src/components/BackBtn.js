import './BackBtn.less'

import { Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'

const BackBtn = ({ back }) => {
  const history = useHistory()

  return (
    <Button
      className="back-btn"
      type="primary"
      onClick={() => history.push(back)}
    >
      返回
    </Button>
  )
}

export default BackBtn
