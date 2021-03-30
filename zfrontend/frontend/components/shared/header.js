import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Link from 'next/link'
import { Face, Radio } from "@material-ui/icons";
import Signout from '../Auth/Signout'
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import RadioIcon from "@material-ui/icons/RadioTwoTone";
// import FaceIcon from "@material-ui/icons/FaceTwoTone";
// import Typography from "@material-ui/core/Typography";

const Header = ({ classes, currentUser }) => {
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        {/*title Logo */}
        <Link  href="/" className={classes.grow}>
          <a>
            <div>
          <Radio className={classes.logo} color='secondary' />
          <Typography variant="overline" color='secondary' noWrap>
            PawnShop
          </Typography>
          </div>
          </a>
          </Link>

          {/* Auth User info */}
          {currentUser && 
            <Link href="/Profile" className={classes.grow}>
              <a>
              <Face className={classes.faceIcon} />
              <Typography variant="h3" className={classes.username} noWrap>
                {currentUser.username}
              </Typography>
              </a>
            </Link>
          }

          {/* Signout */}
          <Signout />


      </Toolbar>
    </AppBar>
  )
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  logo: {
    marginRight: theme.spacing(),
    fontSize: 45
  },
  faceIcon: {
    marginRight: theme.spacing(),
    fontSize: 30,
    color: "white"
  },
  username: {
    color: "white",
    fontSize: 30
  }
});

export default withStyles(styles)(Header);