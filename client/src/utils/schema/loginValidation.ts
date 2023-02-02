import * as yup from 'yup'

export default () =>
  yup.object().shape({
    user: yup
      .string()
      .min(4, ' Username must be 4 characters')
      .required(' Username is required'),
    password: yup
      .string()
      .min(4, ' Password must be 4 characters')
      .required(' Password is required '),
  })
