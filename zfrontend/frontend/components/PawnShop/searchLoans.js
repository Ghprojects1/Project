import React, {useState, useRef} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Clear from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import {ApolloConsumer} from 'react-apollo'
import {gql} from 'apollo-boost'
import InputBase from '@material-ui/core/InputBase';

const SearchLoans = ({ classes, setSearchResults }) => {
  const [username, setusername]=useState("")
  const inputEl= useRef()

  const clearSearchInput = ()=> {
    setSearchResults([]);
    setusername("");  
    inputEl.current.focus();
  }
 
  const handleSubmit = async (event, client)=>{
    event.preventDefault();
    const res = await client.query({
      query: SEARCH_LOAN_QUERY,
      variables: {username},
    })
    //console.log({res});
    setSearchResults(res.data.searchLoanUser);
  }

  return (
    <ApolloConsumer>
      {client =>(
        <form onSubmit={event => handleSubmit(event,client)}>
          <Paper className={classes.root} elevation={1}>
            <IconButton
              onClick={clearSearchInput}
            >
              <Clear/>
            </IconButton>
            <InputBase
              fullWidth
              className={classes.input}
              placeholder="Search All Loans"
              onChange={event => setusername(event.target.value)}
              inputProps={{ 'aria-label': 'search All Loans' }}
              value={username}
              inputRef={inputEl}
            />
            
            <IconButton type="submit">
              <Search />
            </IconButton>
          </Paper>
        </form>
      )}
    
    </ApolloConsumer>
  )
};

const SEARCH_LOAN_QUERY = gql`
query ($username: String!){
  searchLoanUser(username:$username){
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
`

const styles = theme => ({
  root: {
    padding: "2px 4px",
    margin: theme.spacing(),
    display: "flex",
    alignItems: "center"
  }
});

export default withStyles(styles)(SearchLoans);