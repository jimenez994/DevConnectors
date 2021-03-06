const styles = theme => ({
  backImg:{
    height: '100vh',
    minHeight: '330px',
    background: `url(${require('assets/img/arms.jpg')})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative', 
  },
  darkOverlay:{
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
  },
  registrationBox:{
    // padding: "15px"
    backgroundColor: "white",
    borderRadius: "3px",
    maxWidth: "900px"
  },
  registrationForm:{
    padding: "15px"
  },
  registrationInfo:{
    padding: "15px"
  }

})

export default styles;