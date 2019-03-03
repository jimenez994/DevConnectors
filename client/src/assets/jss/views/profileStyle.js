const styles = theme => ({
  avatarHeader: {
    [theme.breakpoints.down("sm")]: {
      width: "27%",
      height: "27%"
    },
    [theme.breakpoints.up("sm")]: {
      width: "17%",
      height: "17%"
    }
  },
  cardMediaHeader: {
    height: 0,
    [theme.breakpoints.down("sm")]: {
      paddingTop: "25.25%"
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: "20.25%"
    }
  },
  avatarContainerHeader: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "-27%",
      // marginBottom: ""
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "-10%",
      marginBottom: "-3%"
    }
  }
});

export default styles;
