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
  loginBox:{
    margin: "auto",
  },
  container: {
    ...container,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    },
  },

  
})

export default styles