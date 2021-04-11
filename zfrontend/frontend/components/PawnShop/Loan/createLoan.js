import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, TextField } from "@material-ui/core";
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

const CreateLoan = ({ classes }) => {
  const [open, setOpen] =useState(false)
  const [loanNo, setloanNo] =useState("")
  const [loanAmt, setloanAmt] =useState("")
  //const [qty, setqty] =useState("")
  const [itemList, setitemList] =useState("")
  const [status, setstatus] =useState(true)
  const [miscCharges, setmiscCharges] =useState("")
  const [grossWt, setgrossWt] =useState("")
  const [netWt, setnetWt] =useState("")
  const [username, setusername] =useState("")
  const [totalDue, settotalDue] =useState("")

  const handleUpdateCache = (cache, {data:{createLoans}}) =>{
    const data=cache.readQuery({query:GET_LoanList})
    const allLoans= data.allLoans.concat(createLoans.loans)
    cache.writeQuery({query:GET_LoanList, data:{allLoans}})
  }

  const handleSubmit = (event, createLoan)=>{
    event.preventDefault();
    createLoan({variables:{loanNo,loanAmt, itemList, status, miscCharges, grossWt, netWt, username,totalDue }});
  }

  return (
    <> 
    {/* Create Loan Button */}
    <Button onClick={()=>setOpen(true)} variant="contained" className={classes.fab} color="secondary">
      {open ? <Clear />:<Add />}
    </Button>

    {/* Create Loan Dialog */}
    <Mutation 
      mutation={CREATE_LOAN_MUTATION}
      onCompleted={ data => {
        console.log({data});
        setOpen(false)
      }}
      update={handleUpdateCache}
      // refetchQueries={()=>[{query: GET_LoanList}]}
    >
      {(createLoan, {loading, error})=>{
        if (error) return <Error error={error}/>
        if (loading) return <Loading />

        return(       
          <Dialog open={open} className={classes.dialog}>
            <form onSubmit={event=>handleSubmit(event, createLoan)}>
              <DialogTitle>Add Loan</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
                  Add  a new loan
                </DialogContentText> */}
                <FormControl fullWidth>
                  <TextField 
                    label="loanNo"
                    onChange={event => setloanNo(event.target.value)}
                    placeholder="Add Loan"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="loanAmt"
                    onChange={event => setloanAmt(event.target.value)}
                    placeholder="Add Loan Amount"
                    className={classes.floatField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="totalDue"
                    onChange={event => settotalDue(event.target.value)}
                    placeholder="Add Total Due"
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
                    label="itemList"
                    onChange={event => setitemList(event.target.value)}
                    placeholder="Add Items"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="miscCharges"
                    onChange={event => setmiscCharges(event.target.value)}
                    placeholder="Add Miscellaneous"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="grossWt"
                    onChange={event => setgrossWt(event.target.value)}
                    placeholder="Add Gross Weight"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="netWt"
                    onChange={event => setnetWt(event.target.value)}
                    placeholder="Add Net Weight"
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField 
                    label="username"
                    onChange={event => setusername(event.target.value)}
                    placeholder="Add Customer Name"
                    className={classes.textField}
                  />
                </FormControl>
                {/* <FormControl fullWidth>
                  <TextField 
                    label="totalDue"
                    onChange={event => settotalDue(event.target.value)}
                    placeholder="Add Total Due"
                    className={classes.textField}
                  />
                </FormControl> */}
              </DialogContent>
              <DialogActions>
                <Button 
                  onClick={()=>setOpen(false)}
                  className={classes.cancel}
                >
                  Cancel
                </Button>
                <Button 
                  disabled = {!loanNo.trim() || !loanAmt.trim() }
                  type="submit"
                  className={classes.save}
                >
                  Add Loan
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

const CREATE_LOAN_MUTATION=gql`
mutation($grossWt: Float, $itemList: String, $loanAmt: Float, $loanNo: String!, $miscCharges: Float, $netWt: Float, $totalDue: Float, $username: String!){
  createLoans(grossWt: $grossWt, itemList: $itemList, loanAmt: $loanAmt, loanNo: $loanNo, miscCharges: $miscCharges, mode:"C" , netWt: $netWt, status: true, totalDue: $totalDue, username: $username){
    loans{
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
      user{
        id
        username
      }
      releaseloanSet{
        sNo
        amtCollected
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

export default withStyles(styles)(CreateLoan);