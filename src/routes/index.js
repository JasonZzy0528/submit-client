import LoadingComponent from '@/shared/components/loading'
import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router'

const AsyncHome = (
  lazy(() => import('@/components/home'))
)

const routes = (
  <Switch>
    <Suspense fallback={<LoadingComponent />}>
      <Route path="/home" component={AsyncHome} />
    </Suspense>
  </Switch>
)

export default routes