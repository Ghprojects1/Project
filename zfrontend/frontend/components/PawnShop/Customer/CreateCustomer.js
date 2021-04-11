import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, TextField } from "@material-ui/core";
import { Add, Clear } from "@material-ui/icons";
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import Error from '../../shared/error'
import Loading from '../../shared/loading'
import {GET_LoanList} from '../index'
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import FormControl from "@material-ui/core/FormControl";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import AddIcon from "@material-ui/icons/Add";
// import ClearIcon from "@material-ui/icons/Clear";
// import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

const CreateCustomer = ({ classes }) => {
  const [open, setOpen] =useState(false)
  const [username, setUsername] =useState("")
  const [email, setEmail] =useState("")
  //const [qty, setqty] =useState("")
  const [address1, setAddress1] =useState("")
  const [address2, setAddress2] =useState(true)
  const [city, setCity] =useState("")
  const [state, setState] =useState("")
  const [pincode, setPincode] =useState(0)
  const [birthDate, setBirthDate] =useState("")
  const [occupation, setOccupation] =useState("")
  const [fathersName, setFathersName] =useState("")
  const [reference, setReference] =useState("")
  const [remarks, setRemarks] =useState("")
  const [avatar, setAvatar] =useState()

  const handleUpdateCache = (cache, {data:{createCustomers}}) =>{
    console.log(data)
    const data=cache.readQuery({query:GET_LoanList})
    const allCustomers= data.allCustomers.concat(createCustomers.Customers)
    cache.writeQuery({query:GET_LoanList, data:{allCustomers}})
  }

  const handleSubmit = (event, createCustomers)=>{
    event.preventDefault();
    createCustomers({variables:{username,email,address1,address2,birthDate,city,occupation,fathersName,pincode,reference,remarks,state }});
  }

  return (
    <> 
    {/* Create customer Button */}
    <Button onClick={()=>setOpen(true)} variant="contained" className={classes.fab} color="secondary">
      {open ? <Clear />:<Add />}
    </Button>

    {/* Create customer Dialog */}
    <Mutation 
      mutation={CREATE_CUSTOMER_MUTATION}
      onCompleted={ data => {
        console.log({data});
        setOpen(false)
      }}
      update={handleUpdateCache}
      // refetchQueries={()=>[{query: GET_LoanList}]}
    >
      {(createCustomers, {loading, error})=>{
        if (error) return <Error error={error}/>
        if (loading) return <Loading />

        return(       
          <Dialog open={open} className={classes.dialog}>
            <form onSubmit={event=>handleSubmit(event, createCustomers)}>
              <DialogTitle>Add Customer</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
                  Add  a new loan
                </DialogContentText> */}
                <FormControl fullWidth>
                  <TextField 
                    label="username"
                    onChange={event => setUsername(event.target.value)}
                    placeholder="Add Username"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="email"
                    onChange={event => setEmail(event.target.value)}
                    placeholder="Add Email"
                    className={classes.floatField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="address1"
                    onChange={event => setAddress1(event.target.value)}
                    placeholder="Add Address1"
                    className={classes.textField}
                  />
                </FormControl>
                {/* <FormControl fullWidth>
                  <TextField 
                    label="qty"
                    onChange={event => setqty(event.target.value)}
                    placeholder="Add Quantity"
                    className={classes.textField}
                  />
                </FormControl> */}
                <FormControl fullWidth>
                  <TextField 
                    label="address2"
                    onChange={event => setAddress2(event.target.value)}
                    placeholder="Add Address2"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="city"
                    onChange={event => setCity(event.target.value)}
                    placeholder="Add City"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="state"
                    onChange={event => setState(event.target.value)}
                    placeholder="Add State"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="pincode"
                    onChange={event => setPincode(parseInt(event.target.value)) }
                    placeholder="Add Pincode"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="fathersName"
                    onChange={event => setFathersName(event.target.value)}
                    placeholder="Add FathersName"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="occupation"
                    onChange={event => setOccupation(event.target.value)}
                    placeholder="Add Occupation"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="reference"
                    onChange={event => setReference(event.target.value)}
                    placeholder="Add Reference"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="remarks"
                    onChange={event => setRemarks(event.target.value)}
                    placeholder="Add Remarks"
                    className={classes.textField}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField 
                    label="Birth Date"
                    onChange={event => setBirthDate(event.target.value)}
                    placeholder="Add Birth Data"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Input 
                    label="Avatar"
                    type="file"
                    onChange={(event) => {
                      
                      setAvatar(event.target.files)
                      console.log(avatar)
                    }}

                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button 
                  onClick={()=>setOpen(false)}
                  className={classes.cancel}
                >
                  Cancel
                </Button>
                <Button 
                  disabled = {!username.trim() || !address1.trim() }
                  type="submit"
                  className={classes.save}
                >
                  Add Customer
                </Button>
              </DialogActions>
            </form>

          </Dialog>
        )
      }}
    </Mutation>
    </>
  )
};

const CREATE_CUSTOMER_MUTATION=gql`
mutation($username: String!, $address1: String!, $address2: String,  $city: String!, $email: String, $fathersName: String!, $occupation: String, $pincode: Int!,$reference: String,$remarks: String, $state: String! ){
  createCustomer( 
    username: $username,
    email: $email, 
    address1:$address1,
    address2:$address2,
    
    city:$city,
    occupation:$occupation,
    fathersName:$fathersName,
  	pincode:$pincode,
    reference:$reference,
    remarks:$remarks,
    state:$state
  ){
    user{
     username
      id
      address1
      address2
      city
      state
      pincode
      occupation
      fathersName
      birthDate
      reference
      remarks
      email
      
      loanSet{
        id
        loanNo
      loanAmt
      totalDue
      
      itemList
      status
      loanDate
      miscCharges
      grossWt
      netWt
        releaseloanSet{
          id
        sNo
        amtCollected
      }
      }
      
    }
  }
}
`


const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  dialog: {
    margin: "0 auto",
    maxWidth: 550
  },
  textField: {
    margin: theme.spacing()
  },
  cancel: {
    color: "red"
  },
  save: {
    color: "green"
  },
  button: {
    margin: theme.spacing(2)
  },
  icon: {
    marginLeft: theme.spacing()
  },
  input: {
    display: "none"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: "200"
  }
});

export default withStyles(styles)(CreateCustomer);