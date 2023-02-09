import React, { useState } from 'react'
import { useFormik } from 'formik'

import {
  IDefaultPageProps,
  ILoginPageProps,
  IReducerState,
  ILoginState,
} from '@Utils/interface'

import { URLS } from '@Utils/constants'
import { IS_USER_AUTHENTICATED, getToken } from '@Utils/storage'
import schema from '@Utils/schema/loginValidation'
import TextBox from '@Components/TextBox/TextBox'
import Button from '@Components/Button/Button'
import { userLogin } from '@Reducers/loginReducer'

import { LoginBanner } from '@Assets/images'

const LoginComponent: React.FC<IDefaultPageProps & ILoginPageProps> = props => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const onLogin = (loginValues: ILoginState) => {
    const loginPayload =
      loginValues.token.length > 0
        ? { token: loginValues.token }
        : { user: loginValues.user, password: loginValues.password }
    IS_USER_AUTHENTICATED(true)
    props.navigate(URLS.DEFAULT)
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
      <div className="col-6 position-relative">
        <img className="login-banner w-100" src={LoginBanner} alt="" />
        <div className="banner-text">
          <h3 className="logo-text">RAA</h3>
          <p className="logo-desc">Remote Access Application</p>
        </div>
      </div>
      <div className="col-6">
        <div className="login-form-container">
          <h1>RAA</h1>
          <p className="zd-login-desc">
            {props.t('login.title', {
              title:
                'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
            })}
          </p>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextBox
              type="text"
              name="user"
              value={values.user}
              labelName="Username"
              placeHolder="Username"
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
              labelName="Password"
              placeHolder="Password"
              handleInputChange={handleChange}
              icon={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}
              handleIconClick={onShowPassword}
            />
            {touched.password && errors.password ? (
              <p className="form-error">
                <i className="fa fa-info-circle"></i>
                <span className="error-msg-txt">{errors.password}</span>
              </p>
            ) : null}

            <h3 className="token-login">OR</h3>

            <TextBox
              type="text"
              name="token"
              className="token-login-field"
              value={values.token}
              labelName="Token"
              placeHolder="Token"
              handleInputChange={handleChange}
            />

            <Button className="login-btn">LOGIN</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
