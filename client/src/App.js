import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

// components
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Register from "./components/auth/registration";
import Login from "./components/auth/login";

// redux
import { Provider } from "react-redux";
import store from "./store";

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
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
