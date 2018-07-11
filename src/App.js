import React, { Component } from 'react';
import './App.css';
//import { connect } from "react-redux";

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Start from './Components/Start/start';
import Board from './Components/Board/board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Noughts and Crosses</h1>
        <BrowserRouter>
            <div className="App">
                <Switch >
                    <Route exact path='/' component={Start} />
                    <Route path='/board/:boardId' component={Board} />
                    <Route component={Start} />
                </Switch>
                
            </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
