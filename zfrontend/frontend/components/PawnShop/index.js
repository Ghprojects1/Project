import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ReleaseLoan from './releaseloan'
import SearchLoans from './searchLoans'
import LoanList from './LoanList'
import CreateLoan from './createLoan'
import {Query} from 'react-apollo'
import {gql} from 'apollo-boost'
import Loading from  '../shared/loading'
import Error from  '../shared/error'

export const GET_LoanList= gql`
query getLoans{
  allLoans{
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
}`;


const PawnShop = ({ classes }) => {
  const [searchResults, setSearchResults]=useState([]);

  return (
    <div className={classes.container}>
      <SearchLoans setSearchResults={setSearchResults} />
      <CreateLoan />
      <Query query = {GET_LoanList}>
      {({data, loading, error}) =>{
        if (loading) return <Loading />;
        if (error) return <Error error={error}/>;
        const loans = searchResults.length>0? searchResults: data.allLoans;
        return <LoanList loans={loans}/>
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
    padding: theme.spacing(2)
  }
});

export default withStyles(styles)(PawnShop);