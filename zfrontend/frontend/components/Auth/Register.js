import React, {useState} from 'react'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, InputLabel, Paper, Slide, Typography } from '@material-ui/core'
import FormControl from "@material-ui/core/FormControl";
import withStyles from "@material-ui/core/styles/withStyles";
import Gavel from "@material-ui/icons/Gavel";
import {Mutation} from 'react-apollo'
import {gql} from 'apollo-boost'
import { VerifiedUserTwoTone } from '@material-ui/icons';
import Error from "../shared/error"

function Transition(props){
  return <div></div>
  //return <Slide direction="up" {...props} />
}

const  Register = ({ classes, setNewUser }) => {
  const [username, setUsername]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [open, setOpen] = useState(false)
  
  const handleSubmit = (event, createUser)=>{
    event.preventDefault();
    createUser();
  }


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Gavel />
        </Avatar>
        <Typography variant="h4">
          Register
        </Typography>
        <Mutation 
            mutation={CreateCustomer_Mutation}
            variables = {{ username,email,password} }
            onCompleted={ data => {
              console.log({data});
              setOpen(true)
            }}
        >
          {(createUser, {loading, error})=>{
            return(
              <form onSubmit={event=>handleSubmit(event, createUser)} className={classes.form}>
                <div>
                <FormControl margin="normal" required fullwidth="true">
                  <InputLabel htmlFor="username">username</InputLabel>
                  <Input id="username" onChange={event => setUsername(event.target.value)}/>
                </FormControl>
                <FormControl margin="normal" required fullwidth="true">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" type="email" onChange={event => setEmail(event.target.value)}/>
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
                    color="secondary"
                    disabled={loading || !username.trim() || !email.trim() || !password.trim()}
                    className={classes.submit}>
                    {loading ? "Registering": "Register"}
                </Button>
                </div>
                <div>
                <Button 
                    fullwidth="true"
                    variant="outlined"
                    onClick={()=> setNewUser(false)}
                    color="primary">Previous User? Log in here</Button>
                </div>
                    {/* Error Handling */}
                    {error && <Error error={error} />}
              </form>
            )
          }}
        </Mutation>  
      </Paper>

      {/*Success Dialog Area */}
      <Dialog
        open = {open}
        disableBackdropClick={true}
       /* TransitionComponent={Transition}*/
      >
        <DialogTitle>
          <VerifiedUserTwoTone className={classes.icon} />
          New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>User {username} successfully Registered</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={()=> setNewUser(false)}
          >Login</Button>
        </DialogActions>
      </Dialog>
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

const CreateCustomer_Mutation = gql`
mutation($username: String!, $email: String!, $password: String!){
  createUser(username:$username, password:$password, email:$email){
    user{
      username
    }
  }
}`

export default withStyles(styles)(Register);

