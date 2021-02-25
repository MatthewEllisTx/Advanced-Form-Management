import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

import signUpSchema from '../validation/SignUpSchema';

const initialValues = {
  username: '',
  email: '',
  password: '',
  TOS: false,
}
const initialErrors = {
  username: '',
  email: '',
  password: '',
  TOS: '',
}

export default function SignUpForm(props){
  const [ values, setValues ] = useState(initialValues);
  const [ errors, setErrors ] = useState(initialErrors);
  const [ disabled, setDisabled ] = useState(true);

  // const { submit } = props;
  function validateParam(name, value){
    yup.reach(signUpSchema, name)
      .validate(value)
      .then( () => {
        setErrors({ ...errors, [name]: ''});
      })
      .catch(err => {
        setErrors({ ...errors, [name]: err.errors[0]});
      })
  }
  
  function onSubmit(evt){
    evt.preventDefault();
  }
  
  function onChange(evt){
    const { name, type } = evt.target;
    const value = type === 'checkbox' ? evt.target.checked : evt.target.value;
    validateParam(name, value); //changes errors
    setValues({ ...values, [name]: value });
  }
  
  useEffect(() => {
    signUpSchema.isValid(values).then(valid => setDisabled(!valid));
  }, [values])

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <label>
          Username
          <input
            name='username'
            type='text'
            value={values.name}
            onChange={onChange}
            placeholder='Username...'
          />
        </label>

        <label>
          Email
          <input
            name='email'
            type='email'
            value={values.email}
            onChange={onChange}
            placeholder='name@email.com'
          />
        </label>

        <label>
          Password
          <input
            name='password'
            type='password'
            value={values.password}
            onChange={onChange}
            placeholder='Password...'
          />
        </label>
        
        <label>
          Agree to Terms of Service
          <input
            name='TOS'
            type='checkbox'
            checked={values.TOS}
            onChange={onChange}
          />
        </label>

        <label>
          <button name='name' type='submit' disabled={disabled}>
            Submit
          </button>
        </label>
      </form>
    </div>
  )
}