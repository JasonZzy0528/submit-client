import PropTypes from 'prop-types'
import React from 'react'
import routes from '@/routes'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { hot } from 'react-hot-loader/root'
import '@/shared/styles/index.scss'

const Root = props => {
  const { history } = props
  if (!props) {
    return null
  }

  return (
    <ConnectedRouter history={history}>
      {
        routes
      }
    </ConnectedRouter>
  )
}

Root.propTypes = {
  history: PropTypes.object.isRequired
}

export default hot(Root)
