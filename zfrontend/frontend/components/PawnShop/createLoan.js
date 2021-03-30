import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, TextField } from "@material-ui/core";
import { Add, Clear } from "@material-ui/icons";
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

  return (
    <> 
    {/* Create Loan Button */}
    <Button onClick={()=>setOpen(true)} variant="fab" className={classes.fab} color="secondary">
      {open ? <Clear />:<Add />}
    </Button>

    {/* Create Loan Dialog */}
    <Dialog open={open} className={classes.dialog}>
      <form>
        <DialogTitle>Add Loan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add  a new loan
          </DialogContentText>
          <FormControl fullWidth>
            <TextField 
              label="loanNo"
              placeholder="Add Loan"
              className={classes.textField}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
              label="loanAmt"
              placeholder="Add Loan"
              className={classes.floatField}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
              label="totalDue"
              placeholder="Add Loan"
              className={classes.textField}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
              label="qty"
              placeholder="Add Loan"
              className={classes.textField}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
              label="itemList"
              placeholder="Add Loan"
              className={classes.textField}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
              label="status"
              placeholder="Add Loan"
              className={classes.textField}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
              label="loanDate"
              placeholder="Add Loan"
              className={classes.textField}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
              label="miscCharges"
              placeholder="Add Loan"
              className={classes.textField}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
              label="grossWt"
              placeholder="Add Loan"
              className={classes.textField}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
              label="netWt"
              placeholder="Add Loan"
              className={classes.textField}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
              label="username"
              placeholder="Add Loan"
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
            type="submit"
            className={classes.save}
          >
            Add Loan
          </Button>
        </DialogActions>
      </form>

    </Dialog>

    </>
  )
};

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