import React from 'react'
import { Spin } from 'antd'
import style from './index.module.scss'

const Loading = () => {
  return (
    <div className={style.loading}>
      <Spin
        size="large"
        tip="Loading"
      />
    </div>
  )
}

export default Loading
