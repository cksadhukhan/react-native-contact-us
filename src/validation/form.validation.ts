import * as Yup from 'yup'

export const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  mobile: Yup.string()
    .min(10, 'Phone number must be 10 digit')
    .max(10, 'Phone number must be 10 digit')
    .matches(/^[6-9][0-9]{9}$/, 'Please enter valid phone number')
    .required('Mobile number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  message: Yup.string().required('Message is required'),
})
