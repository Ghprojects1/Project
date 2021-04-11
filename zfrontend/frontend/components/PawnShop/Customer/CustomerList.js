import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Accordion , AccordionActions, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ExpandMore } from "@material-ui/icons";
import PDFViewer from '../../shared/PDFViewer'
import Link from 'next/link'
import CreateReleaseLoan from '../createReleaseLoan'
import UploadScreen from './UploadScreen'


const CustomerList = ({ classes , customers}) => {
  return(
          
    <List>
      {customers.map(customer =>(
        <Accordion  key={customer.id}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <ListItem className={classes.root}>
              <ListItemText 
                primaryTypographyProps={{
                  variant: "h6",
                  color: 'primary'
                }}
                primary={customer.firstName}
                secondary={
                  <>
                  <Link className={classes.link} href="/Profile/${customer.id}" className={classes.grow}>
                  <a>{customer.username}</a>
                  </Link>
                  {customer.lastName}
                  </>
                }
              />
              <PDFViewer/>
            </ListItem>
          </AccordionSummary>
          {customer.city}
          <AccordionDetails className={classes.details}>
            <Typography variant="body1">
                {customer.loanSet.loanNo}
            </Typography>
          </AccordionDetails>
          <AccordionActions>
            <UploadScreen/>
            {/* <DeleteLoan  customer={customer}/> */}
            {/* <CreateReleaseLoan loan={loan}/> */}
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



export default withStyles(styles)(CustomerList);

