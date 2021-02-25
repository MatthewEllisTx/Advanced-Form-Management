import * as yup from 'yup';

const signUpSchema = yup.object().shape({
  username: yup.string()
    .trim()
    .required('Username is required')
    .min(3, 'Username min length = 3'),
  email: yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password min length = 8'),
    //.matches(`/^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$`, 'Please use excactly one special charector'),
  TOS: yup.boolean()
    .oneOf([true], 'You must agree to the Terms of Service')
});

export default signUpSchema;