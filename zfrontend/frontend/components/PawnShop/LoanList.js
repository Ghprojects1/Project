import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import Typography from "@material-ui/core/Typography";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


import TableDisplay from '../shared/table'
import { ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import PDFViewer from '../shared/PDFViewer'
import UpdateLoan from './UpdateLoan'
import DeleteLoan from './DeleteLoan'
import Link from 'next/link'

const LoanList = ({ classes, loans }) => {
  return(
    <List>
      {loans.map(loan =>(
        <ExpansionPanel key={loan.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <ListItem className={classes.root}>
              <ListItemText 
                primaryTypographyProps={{
                  variant: "h6",
                  color: 'primary'
                }}
                primary={loan.loanNo}
                secondary={
                  <Link className={classes.link} href="/Profile/${loan.user.id}" className={classes.grow}>
                  <a>{loan.user.username}</a>
                  </Link>
                }
              />
              <PDFViewer/>
            </ListItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Typography variant="body1">
                {loan.releaseloanSet.amtCollected}
            </Typography>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <UpdateLoan />
            <DeleteLoan />
          </ExpansionPanelActions>
        </ExpansionPanel>
      ))}
    </List>
  )
}

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  details: {
    alignItems: "center"
  },
  link: {
    color: "#424242",
    textDecoration: "none",
    "&:hover": {
      color: "black"
    }
  }
};

export default withStyles(styles)(LoanList);

