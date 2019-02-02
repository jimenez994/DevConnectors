import React, { Component } from 'react';import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Registration from '../modal/registration';

const styles = {
  root: {
    flexGrow: 1
  },
  backStyle: {
    background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  },
  grow:{
    flexGrow:1
  },
  darkerText:{
    color: 'white',
    fontWeight: '900'
  }
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: false
    }
  }
  openModalHandler = () => {
    this.setState({
        isShowing: true
    });
  }
  closeModalHandler = () => {
    this.setState({
        isShowing: false
    });
  }
  render () {
    const {classes} = this.props;
    let modalContent;
    if(this.state.isShowing){
      modalContent  = (
        <Registration  show={this.state.isShowing} close={this.closeModalHandler}/>
      )
    }
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.backStyle}>
          <Toolbar>
              <Button className={classes.darkerText} ><span>Dev</span>Connectors</Button>
              <Button color="inherit">Developers</Button>
              <div className={classes.grow}/>
              {modalContent}
              <Button color="inherit" onClick={this.openModalHandler} >Sign Up</Button>
              <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);