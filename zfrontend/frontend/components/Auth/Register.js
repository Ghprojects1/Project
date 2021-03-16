import React from 'react'
import { Avatar, Button, Input, InputLabel, Paper, Typography } from '@material-ui/core'
import FormControl from "@material-ui/core/FormControl";
import withStyles from "@material-ui/core/styles/withStyles";
import Gavel from "@material-ui/icons/Gavel";
import {Mutation} from 'react-apollo'
import {gql} from 'apollo-boost'

const  Register = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Gavel />
        </Avatar>
        <Typography variant="headline">
          Register
        </Typography>
        <Mutation >
          {()=>{
            return(
              <form className={classes.form}>
                <FormControl margin="normal" required fullwidth="true">
                  <InputLabel htmlFor="username">username</InputLabel>
                  <Input id="username" />
                </FormControl>
                <FormControl margin="normal" required fullwidth="true">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" type="email" />
                </FormControl>
                <FormControl margin="normal" required fullwidth="true">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input id="password" type="password" />
                </FormControl>
                <Button 
                    type="submit"
                    fullwidth="true"
                    variant="contained"
                    color="secondary"
                    className={classes.submit}>Register</Button>
                <Button 
                    fullwidth="true"
                    variant="outlined"
                    color="primary">Previous User? Log in here</Button>
                
              </form>
            )
          }}
        </Mutation>
      </Paper>
    </div>
  )
}

const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing()
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green"
  }
});

export default withStyles(styles)(Register);
/*

              
        */
