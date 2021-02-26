import React from 'react';
import styled from 'styled-components';

import SignUpForm from './components/SignUpForm';

import logo from './logo.svg';
import './App.css';

const DivMainStyled = styled.div`
  margin: 0 auto;
  max-width: 800px;
  min-width: 375px;
  width: 60%;
`

function App() {
  return (

    <DivMainStyled>
      <SignUpForm />
    </DivMainStyled>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
