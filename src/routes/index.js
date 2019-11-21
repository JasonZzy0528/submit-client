import React, { lazy, Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router'
import Loading from '@/shared/components/loading'

const Home = (
  lazy(() => import('@/components/home'))
)

const routes = (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route path="/home" component={Home} />
      <Route exact strict path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  </Suspense>
)

export default routes