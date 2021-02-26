import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as yup from 'yup';

import signUpSchema from '../validation/SignUpSchema';

const LabelStyled = styled.label`
  display: flex;
  justify-content: space-between;
`

const DivTOSStyled = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const DivRightStyled = styled.div`
  display: flex;
  margin: 8px 0 8px 0;
  justify-content: flex-end;
`

const SpanStyled = styled.span`
  color: #d90e00;
`


const initialValues = {
  username: '',
  email: '',
  password: '',
  passwordConf: '',
  TOS: false,
}
const initialErrors = {
  username: '',
  email: '',
  password: '',
  passwordConf: '',
  TOS: '',
}

export default function SignUpForm(props){
  const [ values, setValues ] = useState(initialValues);
  const [ errors, setErrors ] = useState(initialErrors);
  const [ disabled, setDisabled ] = useState(true);

  //console.log(errors)

  // const { submit } = props;

  // this way better because it works, but clunky
  function altValidateParam(path, value){
    function getErrorFor(param, listErr){
      for(let i = 0; i <= listErr.length; i++){
        //console.log(message, path, message.indexOf(path));
        if(i === listErr.length){
          return '';
        }
        if(listErr[i].indexOf(`${param},`) === 0){
          //console.log(listErr[i], value);
          return listErr[i].substring( listErr[i].indexOf(',')+1, listErr[i].length);
        }
      }
    }

    signUpSchema.validate({...values, [path]: value}, {abortEarly: false})
      .then( () => {
        //console.log('passed');
        setErrors(initialErrors);
      })
      .catch( err =>{
        //console.log(err, err.errors);
        if(path === 'password'){
          setErrors({ ...errors, password: getErrorFor('password', err.errors), passwordConf: getErrorFor('passwordConf', err.errors)});
        } else {
          setErrors({ ...errors, [path]: getErrorFor(path, err.errors)});
        }

        // Doesnt' work: Displays *all* errors before user input
        // const newList = {...initialErrors};
        // Object.keys(newList).forEach( param => newList[param] = getErrorFor(param, err.errors))
        // setErrors(newList);

        // Dosen't work: Doesn't update 'Mismatched Passwords' error if you change password to match confirm password
        // for(let i = 0; i <= err.errors.length; i++){
        //   //console.log(message, path, message.indexOf(path));
        //   if(i === err.errors.length){
        //     setErrors({ ...errors, [path]: ''});
        //     break;
        //   }
        //   if(err.errors[i].indexOf(`${path},`) === 0){
        //     const newErr = err.errors[i].substring( err.errors[i].indexOf(',')+1, err.errors[i].length);
        //     setErrors({ ...errors, [path]: newErr});
        //     break;
        //   }
        // }
      })
  }

  // this way bad because it checks only one param, and when comparing two params makes it very hard
  // function validateParam(name, value){
  //   yup.reach(signUpSchema, name)
  //     .validate(value, {context: {password: 'a'}})
  //     .then( () => {
  //       setErrors({ ...errors, [name]: ''});
  //     })
  //     .catch(err => {
  //       setErrors({ ...errors, [name]: err.errors[0]});
  //     })
  // }
  
  function onSubmit(evt){
    evt.preventDefault();
    console.log(values);
    setValues(initialValues);
  }
  
  function onChange(evt){
    const { name, type } = evt.target;
    const value = type === 'checkbox' ? evt.target.checked : evt.target.value;
    //validateParam(name, value); //changes errors
    altValidateParam(name, value); // also changes errors state
    setValues({ ...values, [name]: value });
  }
  
  useEffect(() => {
    signUpSchema.isValid(values)
      .then( valid => {
        if(valid === disabled)
          setDisabled(!valid)
        })
      .catch( err => console.log(err));
  }, [values, disabled])

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <LabelStyled>
          Username <SpanStyled className='username'>{errors.username}</SpanStyled>
          <input
            name='username'
            type='text'
            value={values.name}
            onChange={onChange}
            placeholder='Username...'
          />
        </LabelStyled>

        <LabelStyled>
          Email <SpanStyled className='email'>{errors.email}</SpanStyled>
          <input
            name='email'
            type='email'
            value={values.email}
            onChange={onChange}
            placeholder='name@email.com'
          />
        </LabelStyled>

        <LabelStyled>
          Password <SpanStyled className='password'>{errors.password}</SpanStyled>
          <input
            name='password'
            type='password'
            value={values.password}
            onChange={onChange}
            placeholder='Password...'
          />
        </LabelStyled>
        
        <LabelStyled>
          Confirm Password <SpanStyled className='passwordConf'>{errors.passwordConf}</SpanStyled>
          <input
            name='passwordConf'
            type='password'
            value={values.passwordConf}
            onChange={onChange}
            placeholder='Confirm Password...'
          />
        </LabelStyled>
        <DivTOSStyled>
        <label>
          Agree to Terms of Service
          <input
            name='TOS'
            type='checkbox'
            checked={values.TOS}
            onChange={onChange}
          />
        </label>
          <SpanStyled className='TOS'>{errors.TOS}</SpanStyled>
        </DivTOSStyled>
        <DivRightStyled>
          <button type='submit' disabled={disabled}>
            Submit
          </button>
        </DivRightStyled>
      </form>
    </div>
  )
}