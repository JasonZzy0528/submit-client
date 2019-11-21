import React, { lazy, Suspense } from 'react'
import { hot } from 'react-hot-loader/root'
import '@/shared/styles/index.scss'
import Loading from '@/shared/components/loading'

const Login = (
  lazy(() => import('@/components/login'))
)

const Root = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Login />
    </Suspense>
  )
}

export default hot(Root)
