import React from 'react'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'
import {
  Button,
  Divider,
  Form,
  Input,
  Icon
} from 'antd'
import { hot } from 'react-hot-loader/root'
import { epic$ } from '@/redux/epics'
import authEpics from '@/redux/epics/auth'
import { reducerRegistry$ } from '@/redux/reducers'
import { connect } from 'react-redux'
import asyncAuthReducer from '@/redux/reducers/auth'
import '@/shared/styles/index.scss'
import styles from './index.module.scss'

reducerRegistry$.next({ AuthReducer: asyncAuthReducer })
epic$.next(authEpics.authenticateEpic)

const Login = props => {
  const { getFieldDecorator } = props.form
  const handleLogin = e => {
    e.preventDefault()
    props.form.validateFields((err) => {
      if (!err) {
        window.location = '/home'
      }
    })
  }
  return (
    <QueueAnim type={'left'} delay={100} ease={'easeInSine'} className={styles['login-container']}>
      <QueueAnim type={'top'} delay={350} ease={'easeInSine'} className={styles['login-left-panel']} key='login-left-panel'>
        <div
          className={styles['login-logo']}
          key='login-logo'
        />
      </QueueAnim>
      <QueueAnim
        type={'right'}
        delay={900}
        ease={'easeInSine'}
        className={styles['login-right-panel']}
      >
        <div
          className={styles['login-form']}
          key='login-form'
        >
          <h2> Sign in to Submit</h2>
          <Divider />
          <Form
            onSubmit={handleLogin}
          >
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Username'
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type='password'
                  placeholder='Password'
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </QueueAnim>
    </QueueAnim>
  )
}

const mapStateToProps = state => ({
  error: state.getIn(['AuthReducer', 'error']),
  isAuthenticated: state.getIn(['AuthReducer', 'isAuthenticated']),
  isVerifying: state.getIn(['AuthReducer', 'isVerifying'])
})

Login.propTypes = {
  form: PropTypes.object.isRequired,
  error: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  isVerifying: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(hot(Form.create()(Login)))