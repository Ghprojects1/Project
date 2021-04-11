import React, {useContext, useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, TextField } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import Error from '../../shared/error'
import Loading from '../../shared/loading'
import {GET_LoanList} from '../index'
import {UserContext} from '../../../pages/_app'

const UpdateLoan = ({ classes, loan }) => {
  const currentUser= useContext(UserContext);
    const [open, setOpen] =useState(false)
    const [loanNo, setloanNo] =useState(loan.loanNo)
    const [loanAmt, setloanAmt] =useState(loan.loanAmt)
    //const [qty, setqty] =useState(loan.qty)
    const [itemList, setitemList] =useState(loan.itemList)
    const [status, setstatus] =useState(true)
    const [miscCharges, setmiscCharges] =useState(loan.miscCharges)
    const [grossWt, setgrossWt] =useState(loan.grossWt)
    const [netWt, setnetWt] =useState(loan.netWt)
    const [username, setusername] =useState(loan.user.username)
    const [totalDue, settotalDue] =useState(loan.totalDue)
    
    const isCurrentUser = currentUser.username===loan.user.username
    
    const handleSubmit = (event, updateLoan)=>{
      event.preventDefault();
      updateLoan({variables:{loanNo,loanAmt,  itemList, status, miscCharges, grossWt, netWt, username,totalDue }});
    }
  
    return isCurrentUser && (
      <> 
      {/* Update Loan Button */}
      <IconButton onClick={()=>setOpen(true)}>
        <Edit />
      </IconButton>
  
      {/* Update Loan Dialog */}
      <Mutation 
        mutation={UPDATE_LOAN_MUTATION}
        onCompleted={ data => {
          console.log({data});
          setOpen(false)
        }}
        //refetchQueries={()=>[{query: GET_LoanList}]}
      >
        {(updateLoan, {loading, error})=>{
          if (error) return <Error error={error}/>
          if (loading) return <Loading />
  
          return(       
            <Dialog open={open} className={classes.dialog}>
              <form onSubmit={event=>handleSubmit(event, updateLoan)}>
                <DialogTitle>Update Loan</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Update  a new loan
                  </DialogContentText>
                  <FormControl fullWidth>
                    <TextField 
                      label="loanNo"
                      onChange={event => setloanNo(event.target.value)}
                      placeholder="Add Loan"
                      value={loanNo}
                      className={classes.textField}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField 
                      label="loanAmt"
                      value={loanAmt}
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
                      value={totalDue}
                    />
                  </FormControl>
                  {/* <FormControl fullWidth>
                    <TextField 
                      label="qty"
                      value={qty}
                      onChange={event => setqty(event.target.value)}
                      placeholder="Add Quantity"
                      className={classes.textField}
                    />
                  </FormControl> */}
                  <FormControl fullWidth>
                    <TextField 
                      label="itemList"
                      value={itemList}
                      onChange={event => setitemList(event.target.value)}
                      placeholder="Add Items"
                      className={classes.textField}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField 
                      label="miscCharges"
                      value={miscCharges}
                      onChange={event => setmiscCharges(event.target.value)}
                      placeholder="Add Miscellaneous"
                      className={classes.textField}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField 
                      label="grossWt"
                      value={grossWt}
                      onChange={event => setgrossWt(event.target.value)}
                      placeholder="Add Gross Weight"
                      className={classes.textField}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField 
                      label="netWt"
                      value={netWt}
                      onChange={event => setnetWt(event.target.value)}
                      placeholder="Add Net Weight"
                      className={classes.textField}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField 
                      label="username"
                      value={username}
                      onChange={event => setusername(event.target.value)}
                      placeholder="Add Customer Name"
                      className={classes.textField}
                    />
                  </FormControl>
                  {/* <FormControl fullWidth>
                    <TextField 
                      label="totalDue"
                      value={totalDue}
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
                    disabled = {!loanNo.trim()  }
                    type="submit"
                    className={classes.save}
                  >
                    Update Loan
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

const UPDATE_LOAN_MUTATION=gql`
mutation($grossWt: Float, $itemList: String, $loanAmt: Float, $loanNo: String!, $miscCharges: Float, $netWt: Float, $totalDue: Float, $username: String!){
  createLoans(grossWt: $grossWt, itemList: $itemList, loanAmt: $loanAmt, loanNo: $loanNo, miscCharges: $miscCharges, mode:"U" , netWt: $netWt, status: true, totalDue: $totalDue, username: $username){
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
  }
});

export default withStyles(styles)(UpdateLoan);