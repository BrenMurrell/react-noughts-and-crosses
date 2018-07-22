import React, { Component } from 'react';
import './App.css';
//import { connect } from "react-redux";

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchUser } from "./actions/authActions";

import Start from './Components/Start/start';
import Board from './Components/Board/board';
import UserBar from './Components/User/userbar';

class Empty extends Component {
  render() {
    return(
      <p>This path is wrong</p>
    )
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = ({
      auth: null
    })
  }
  
  componentWillMount() {
    this.props.fetchUser(); //don't use auth - use user actions
  }

  
  render() {
    return (
      <div className="App">
        <h1>Noughts and Crosses</h1>
          <BrowserRouter>
                  <Switch >
                      <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}`} component={Start} />
                      <Route path={`${process.env.REACT_APP_PUBLIC_URL}board/:boardId`} component={Board} />
                      <Route component={Empty} />
                  </Switch>
                  
          </BrowserRouter>
          <div className="user">
            <UserBar />
          </div>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
      auth
  };
};

export default connect(mapStateToProps, {fetchUser })(App)

//export default connect(null, { fetchUser })(App);