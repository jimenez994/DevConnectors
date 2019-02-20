import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {setCurrentUser, logoutUser} from './actions/authActions'
import setAuthToken from "./utils/setAuthToken";
import jwtDecode from 'jwt-decode';

// views
import Landing from 'views/layout/Landing';
import Footer from 'views/layout/Footer';
import Navbar from 'views/layout/Navbar';
import Register from "views/auth/registration";
import Login from "views/auth/login";
import PrivateRoute from 'views/common/PrivateRoute';
import Dashboard from 'views/dashboard/Dashboard';
import ProfileForm from "views/Profile/profileForm";
import DevelopersFeed from "views/developers/Feed";
import Profile from "views/Profile/profile"
// redux
import { Provider } from "react-redux";
import store from "./store";

// Check for token
// localStorage.removeItem('jwtToken');
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Set user and isAuthenticated 
  store.dispatch(setCurrentUser(localStorage.jwtToken));
  // jwt decoded user info
  const decoded = jwtDecode(localStorage.jwtToken);
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to home
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/Developers" component={DevelopersFeed}/>
            <Route exact path="/profile/:username" component={Profile}/>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/profileForm" component={ProfileForm}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
