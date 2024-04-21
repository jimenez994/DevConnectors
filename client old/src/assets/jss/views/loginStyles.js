const styles = theme => ({
  logInBtn:{
    marginTop: "10px",
    padding: "5px"
    // fontWeight: "",
    // fontSize: '20px'
  },
  darkOverlay:{
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
  },
  backImg:{
    height: '100vh',
    minHeight: '330px',
    background: `url(${require('assets/img/arms.jpg')})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative', 
  },
  header:{
    background:"#DB2166",
    margin: '0px 15px -30px 15px',
    // padding: '25px',
    textAlign: "center",
    borderRadius: '4px',
    fontWeight: "900",
    // margin: '-25px',
    position: "relative",
    // zIndex: "3 !important",
    title: {
      color: "white"
    }
  },
  card: {
    paddingTop: "15px"
  },
  title: {
    color: 'white'
  }

  
})



export default styles