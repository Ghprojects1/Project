import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ReleaseLoan from './releaseloan'
import SearchLoans from './searchLoans'
import LoanList from './LoanList'
import CreateLoan from './createLoan'
import {Query} from 'react-apollo'
import {gql} from 'apollo-boost'
import Loading from  '../shared/loading'
import Error from  '../shared/error'

const GET_LoanList= gql`
query getLoans{
  allLoans{
    loanNo
    loanAmt
    totalDue
    qty
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
}`;


const PawnShop = ({ classes }) => {
  return (
    <div className={classes.container}>
      <SearchLoans />
      <CreateLoan />
      <Query query = {GET_LoanList}>
      {({data, loading, error}) =>{
        if (loading) return <Loading />;
        if (error) return <Error error={error}/>;
        return <LoanList loans={data.allLoans}/>
      }
      }
    </Query>
      
    </div>
  )
};

const styles = theme => ({
  container: {
    margin: "0 auto",
    maxWidth: 960,
    padding: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(PawnShop);