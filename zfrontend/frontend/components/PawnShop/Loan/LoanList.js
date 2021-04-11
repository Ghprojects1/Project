import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import Typography from "@material-ui/core/Typography";
// import Accordion  from "@material-ui/core/Accordion ";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionActions from "@material-ui/core/AccordionActions";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


// import TableDisplay from '../shared/table'
import { Accordion , AccordionActions, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import PDFViewer from '../../shared/PDFViewer'
import UpdateLoan from './UpdateLoan'
import DeleteLoan from './DeleteLoan'
import Link from 'next/link'
import CreateReleaseLoan from '../createReleaseLoan'

const LoanList = ({ classes, loans }) => {
  return(
    <List>
      {loans.map(loan =>(
        <Accordion  key={loan.id}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <ListItem className={classes.root}>
              <ListItemText 
                primaryTypographyProps={{
                  variant: "h6",
                  color: 'primary'
                }}
                primary={loan.loanNo}
                secondary={
                  <>
                  <Link className={classes.link} href="/Profile/${loan.user.id}" className={classes.grow}>
                  <a>{loan.user.username}</a>
                  </Link>
                  {loan.totalDue}
                  </>
                }
              />
              <PDFViewer/>
            </ListItem>
          </AccordionSummary>
          {loan.releaseloanSet.amtCollected}
          <AccordionDetails className={classes.details}>
            <Typography variant="body1">
                {loan.totalDue}
            </Typography>
          </AccordionDetails>
          <AccordionActions>
            <UpdateLoan loan={loan}/>
            <DeleteLoan loan={loan}/>
            <CreateReleaseLoan loan={loan}/>
          </AccordionActions>
        </Accordion >
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

