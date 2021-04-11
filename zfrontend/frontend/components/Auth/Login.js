import React, {useState} from 'react'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, InputLabel, Paper, Slide, Typography } from '@material-ui/core'
import FormControl from "@material-ui/core/FormControl";
import withStyles from "@material-ui/core/styles/withStyles";
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import { Lock, VerifiedUserTwoTone } from '@material-ui/icons';
import Error from "../shared/error"

const  Login = ({ classes, setNewUser }) => {
  const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");
  const [open, setOpen] = useState(false)
  
  const handleSubmit = async (event, tokenAuth, client)=>{
    event.preventDefault();
    const res= await tokenAuth();
    localStorage.setItem("authToken", res.data.tokenAuth.token);
    client.writeData({data:{isLoggedIn: true}})
  }


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Lock />
        </Avatar>
        <Typography variant="h4">
          Login Credentials
        </Typography>
        <Mutation 
            mutation={LOGIN_Mutation}
            variables = {{ username,password} }
            
        >
          {(tokenAuth, {loading, error, called, client})=>{
            return(
              <form onSubmit={event=>handleSubmit(event, tokenAuth, client)} className={classes.form}>
                <div>
                <FormControl margin="normal" required fullwidth="true">
                  <InputLabel htmlFor="username">username</InputLabel>
                  <Input id="username" onChange={event => setUsername(event.target.value)}/>
                </FormControl>
                <FormControl margin="normal" required fullwidth="true">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input id="password" type="password" onChange={event => setPassword(event.target.value)}/>
                </FormControl>
                </div>
                <div>
                <Button 
                    type="submit"
                    fullwidth="true"
                    variant="contained"
                    color="primary"
                    disabled={loading || !username.trim() || !password.trim()}
                    className={classes.submit}>
                    {loading ? "Logging In": "Login"}
                </Button>
                </div>
                <div>
                <Button 
                    fullwidth="true"
                    variant="outlined"
                    onClick={()=> setNewUser(true)}
                    color="secondary">Register</Button>
                </div>
                    {/* Error Handling */}
                    {error && <Error error={error} />}
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
    margin: theme.spacing(),
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

const LOGIN_Mutation = gql`
mutation($username: String!,  $password: String!){
  tokenAuth(username:$username, password:$password){
    token   
  }
}`

export default withStyles(styles)(Login);
