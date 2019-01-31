import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Landing} />


          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
