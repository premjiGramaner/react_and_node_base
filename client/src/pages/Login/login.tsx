import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import moment from 'moment'

import { IDefaultPageProps, IReducerState, ILoginState } from '@Utils/interface'

import { URLS } from '@Utils/constants'
import { IS_USER_AUTHENTICATED } from '@Utils/storage'
import schema from '@Utils/schema/loginValidation'
import TextBox from '@Components/TextBox/TextBox'
import Button from '@Components/Button/Button'
import { userLogin } from '@Reducers/loginReducer'
import { fetchUserEvents } from '@Reducers/userLogEventReducer';

import packageJson from '../../../package.json';

import { LoginBg } from '@Assets/svg'
import { Logo } from '@Assets/svg/svg'

const LoginComponent: React.FC<IDefaultPageProps> = props => {
  const { statusCode, pending } = useSelector(
    (state: IReducerState) => state.loginReducer
  )
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)

  useEffect(() => {
    if (statusCode === 200) {
      props.dispatch(
        fetchUserEvents({
          severity: 'INFO',
          name: moment().format('LLL'),
          description: `User ${sessionStorage.getItem(
            'userName'
          )} - Logged in `,
        })
      )
      IS_USER_AUTHENTICATED(true)
      props.navigate(URLS.DASHBOARD)
    } else if (statusCode === 401 || statusCode === 400) {
      setShowError(true)
    }
  }, [statusCode])

  const onLogin = (loginValues: ILoginState) => {
    const loginPayload =
      loginValues.token.length > 0
        ? { token: loginValues.token, accessWithToken: true }
        : { username: loginValues.user, password: loginValues.password }
    props.dispatch(userLogin(loginPayload))
  }

  const onShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: { user: '', password: '', token: '' },
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values: ILoginState) => {
      onLogin(values)
    },
  })

  return (
    <div className="login-page-main-container w-100 d-flex">
      <div className="col-7 position-relative">
        <img className="login-banner w-100" src={LoginBg as any} alt="" />
      </div>
      <div className="col-5">
        <div className="login-form-container">
          <Logo />
          <p className="zd-login-desc">{props.t('login.title')}</p>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextBox
              type="text"
              name="user"
              value={values.user}
              labelName={props.t('login.userName')}
              placeHolder={props.t('login.userName')}
              handleInputChange={handleChange}
            />

            {touched.user && errors.user ? (
              <p className="form-error">
                <i className="fa fa-info-circle"></i>
                <span className="error-msg-txt">{errors.user}</span>
              </p>
            ) : null}
            <TextBox
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={values.password}
              labelName={props.t('login.password')}
              placeHolder={props.t('login.password')}
              handleInputChange={handleChange}
              icon={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}
              handleIconClick={onShowPassword}
            />
            {touched.password && errors.password ? (
              <p className="form-error">
                <i className="fa fa-info-circle"></i>
                <span className="error-msg-txt">{errors.password}</span>
              </p>
            ) : null}

            <h3 className="token-login">{props.t('login.or')}</h3>

            <TextBox
              type="text"
              name="token"
              className="token-login-field"
              value={values.token}
              labelName={props.t('login.token')}
              placeHolder={props.t('login.token')}
              handleInputChange={handleChange}
            />
            {showError && (
              <p className="error-msg">{props.t('login.errorMessage')}</p>
            )}
            <Button className="login-btn">
              {pending ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                props.t('login.login')
              )}
            </Button>
          </form>
        </div>
      </div>
      <div className='application-version'>Version - {packageJson.version}</div>
    </div>
  )
}

export default LoginComponent
