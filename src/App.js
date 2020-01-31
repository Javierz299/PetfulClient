import React from 'react';
import './App.css';
import landing from './landing.js';
import adopt from './adopt.js';
import { Route } from 'react-router-dom';

class App extends React.Component {
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Petful Adoptions</h1>
        <Route path='/' component={landing} />
        <Route path='/adopt' component={adopt} />
      </header>
    </div>
  );
}}

export default App;
