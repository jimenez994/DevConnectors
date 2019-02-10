const container = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  "@media (min-width: 768px)": {
    width: "750px"
  },
  "@media (min-width: 992px)": {
    width: "970px"
  },
  "@media (min-width: 1200px)": {
    width: "1170px"
  },
  "&:before,&:after": {
    display: "table",
    content: '" "'
  },
  "&:after": {
    clear: "both"
  }
};
const styles = theme => ({
  center:{
    margin: "auto",
  },
  container: {
    ...container,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    },
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


  
})



export default styles