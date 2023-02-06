import * as yup from 'yup'

export default () =>
  yup.object().shape({
    user: yup.string().when('token', {
      is: (tokenValue: string) => tokenValue?.length > 0 == true,
      then: yup.string(),
      otherwise: yup
        .string()
        .min(4, 'Username must be 4 characters')
        .required('Username is required'),
    }),
    password: yup.string().when('token', {
      is: (tokenValue: string) => tokenValue?.length > 0 == true,
      then: yup.string(),
      otherwise: yup
        .string()
        .min(4, 'Password must be 4 characters')
        .required('Password is required'),
    }),
    token: yup.string(),
  })
