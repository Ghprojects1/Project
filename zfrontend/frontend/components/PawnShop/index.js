import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ReleaseLoan from './releaseloan'
import SearchLoans from './Loan/searchLoans'
import LoanList from './Loan/LoanList'
import CreateLoan from './Loan/createLoan'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Loading from  '../shared/loading'
import Error from  '../shared/error'
import CustomerList from './Customer/CustomerList'
import CreateCustomer from './Customer/CreateCustomer'

export const GET_LoanList= gql`
query getLoans{
  allLoans{
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
}`;

const GET_CUSTOMER_LIST=gql`
query CustomerList {
    customers{
      id
     username
     firstName
     lastName
      isActive
     dateJoined
     birthDate
      fathersName
     occupation
      address1
      address2
      city
      state
      pincode
     email
      remarks
      reference
      avatar
      loanSet{
        id
        loanNo
        loanAmt
        totalDue
        releaseloanSet{
          id
          amtCollected
          interest
          
        }      
      }    
    }
  }`

const PawnShop = ({ classes }) => {
  const [searchResults, setSearchResults]=useState([]);

  return (
    <div className={classes.container}>
      {/* <SearchLoans setSearchResults={setSearchResults} />
      <CreateLoan />
      <Query query = {GET_LoanList}>
      {({data, loading, error}) =>{
        if (loading) return <Loading />;
        if (error) return <Error error={error}/>;
        const loans = searchResults.length>0? searchResults: data.allLoans;
        return <LoanList loans={loans}/>
      }
      }
    </Query> */}
    <CreateCustomer /> 

    <Query query = {GET_CUSTOMER_LIST}>
      {({data, loading, error}) =>{
        if (loading) return <Loading />;
        if (error) return <Error error={error}/>;
        const customers =  data.customers;
        return <CustomerList customers={customers}/>
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