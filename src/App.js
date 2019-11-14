import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { withAuthenticator } from 'aws-amplify-react';

function App() {
  return (
    <div>
      App
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
