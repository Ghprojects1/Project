import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, TextField } from "@material-ui/core";
import { Add, Clear } from "@material-ui/icons";
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import Error from '../shared/error'
import Loading from '../shared/loading'
import {GET_LoanList} from './index'
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

const CreateReleaseLoan = ({ classes,loan }) => {
  const [open, setOpen] =useState(false)
  const [sNo, setsNo] =useState("")
  const [loanNo, setloanNo] =useState(loan.loanNo)
  const [interest, setinterest] =useState("")
  //const [qty, setqty] =useState("")
  const [amtCollected, setamtCollected] =useState("")


const handleUpdateCache = (cache, {data:{createReleaseLoans}}) =>{
/*const data=cache.readQuery({query:CREATE_RELEASELOAN_MUTATION})
    const allLoans= data.allLoans.concat(createReleaseLoans.loans)
    cache.writeQuery({query:CREATE_RELEASELOAN_MUTATION, data:{allLoans}})*/
  }

  const handleSubmit = (event, createReleaseLoan)=>{
    event.preventDefault();
    createReleaseLoan({variables:{sNo,loanNo, interest, amtCollected }});
  }

  return (
    <> 
    {/* Create Loan Button */}
    <Button onClick={()=>setOpen(true)}>
        <Add />
      </Button>
  
    {/* Create Loan Dialog */}
    <Mutation 
      mutation={CREATE_RELEASELOAN_MUTATION}
      onCompleted={ data => {
        console.log({data});
        setOpen(false)
      }}
      update={handleUpdateCache}
      // refetchQueries={()=>[{query: GET_LoanList}]}
    >
      {(createReleaseLoan, {loading, error})=>{
        if (error) return <Error error={error}/>
        if (loading) return <Loading />

        return(       
          <Dialog open={open} className={classes.dialog}>
            <form onSubmit={event=>handleSubmit(event, createReleaseLoan)}>
              <DialogTitle>Add Release Loan</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Add  a release loan
                </DialogContentText>
                <FormControl fullWidth>
                  <TextField 
                    label="sNo"
                    onChange={event => setsNo(event.target.value)}
                    placeholder="Add Serial number"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="loanNo"
                    //onChange={event => setloanNo(event.target.value)}
                    placeholder="Add Loan Number"
                    value={loanNo}
                    className={classes.floatField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="interest"
                    onChange={event => setinterest(event.target.value)}
                    placeholder="Add Interest"
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
                    label="amtCollected"
                    onChange={event => setamtCollected(event.target.value)}
                    placeholder="Add amount collected"
                    className={classes.textField}
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
                  disabled = {!sNo.trim() || !amtCollected.trim() }
                  type="submit"
                  className={classes.save}
                >
                  Add release loan
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

const CREATE_RELEASELOAN_MUTATION=gql`
mutation($sNo: Int,  $amtCollected: Float, $loanNo: String!, $interest: Float){
    createReleaseloans(sNo: $sNo, loanNo: $loanNo, amtCollected: $amtCollected, interest: $interest){
      releaseLoans{
        sNo
        amtCollected
              interest
        loan{
          loanNo
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

export default withStyles(styles)(CreateReleaseLoan);