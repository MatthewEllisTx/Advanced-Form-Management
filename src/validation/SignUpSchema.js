import * as yup from 'yup';

const signUpSchema = yup.object().shape({
  username: yup.string()
    .trim()
    .required('${path},Username is required')
    .max(20, '${path},Username max length = 20')
    .min(3, '${path},Username min length = 3'),
  email: yup.string()
    .email('${path},Please enter a valid email')
    .required('${path},Email is required'),
  password: yup.string()
    .required('${path},Password is required')
    .min(8, '${path},Password min length = 8')
    .matches(/^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$/, '${path},Please use excactly one special character'),
  passwordConf: yup.string()
    // .when('$password', (password) => {
    //   console.log(password);
    // })
    .test('match', '${path},The entered passwords do not match', function(passwordConf) {
      //console.log(this)
      //console.log(this.parent.password, passwordConf)
      if( this.parent !== undefined){
        return passwordConf === this.parent.password;
      }
    }),
  TOS: yup.boolean()
    .oneOf([true], '${path},You must agree to the Terms of Service')
});

export default signUpSchema;