import React, { Component } from 'react'
import { Paper,  Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Registration from '../modal/registration';

const styles = {
  paperI: {
    height: '100vh',
    minHeight: '330px',
    background: `url(${require('./../../img/arms.jpg')})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative', 
  },
  darkOverlay:{
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  text:{
    color: 'white',
  },
  middle:{
    margin: 'auto',
  },

}
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state ={
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
    const {classes} = this.props

    let modalContent;
    if(this.state.isShowing){
      modalContent  = (
        <Registration  show={this.state.isShowing} close={this.closeModalHandler}/>
      )
    }
    
    return (
      <Paper className={classes.paperI} >
        <div  className={classes.darkOverlay}>
          <div className={classes.middle}>
          <Typography variant="h1" align='center'  className={classes.text}>
            Dev Connectors
          </Typography>
          <Typography variant="h5" align='center' className={classes.text} paragraph>
            Create a developer profile/portfolio, share posts and get help from other developers
          </Typography>
          <button onClick={this.openModalHandler}>Open Modal</button>
              {modalContent}
          </div>
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(Landing)