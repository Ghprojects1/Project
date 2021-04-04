import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import orange from "@material-ui/core/colors/orange";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { useState } from 'react'
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import {Query} from 'react-apollo'
import {gql} from 'apollo-boost'
import Auth from '../components/Auth'
import Header from '../components/shared/header'
import Loading from '../components/shared/loading'
import Error from '../components/shared/error'
import Head from 'next/head';

export const UserContext = React.createContext()

const IS_Logged_In_Query = gql`
query{
  isLoggedIn @client
}`;

const ME_QUERY= gql`
{
    me{
        id
        username
        email
    }
}`;

const client = new ApolloClient({
 // uri: 'http://127.0.0.1:8000/graphql/',
  uri: 'https://project-pawn.el.r.appspot.com/graphql/',
  fetchOptions:{
    credentials:"include"
  },
  request: operation =>{
    const token =localStorage.getItem('authToken') || ""
    operation.setContext({
      headers:{
        Authorization: `JWT ${token}`
      }
    })
  },
  clientState:{
    defaults:{      
      isLoggedIn: (typeof localStorage !== 'undefined')?!!localStorage.getItem('authToken'):false        
      }
     //!!global.window.localStorage.getItem('authToken')
    },
  });


// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[100],
      main: blue[300],
      dark: blue[500]
    },
    secondary: {
      light: orange[300],
      main: orange[500],
      dark: orange[700]
    }
  },
  typography: {
    useNextVariants: true
  }
});


function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser]=useState("");
  
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
      
  return (
    <React.Fragment>
      <Head>
        <title>PawnShop</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MuiThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          {/* https://material-ui.com/getting-started/usage/#cssbaseline */}
          <CssBaseline /> 

          <ApolloProvider client={client}>  
          <UserContext.Provider value={currentUser}>
          <Query query = {ME_QUERY} fetchPolicy='cache-and-network'>
            {({data, loading, error}) =>{
                if (loading) return <Loading />;
                if (error) return <></>;
                setCurrentUser(data.me);
                return (
                  <></>
                )
            }}          
          </Query>
          <Header currentUser={currentUser} />
          <Query query={IS_Logged_In_Query}>
            {({data})=> data.isLoggedIn?  <Component {...pageProps} />:<Auth /> }
          </Query>   
          </UserContext.Provider>
          </ApolloProvider>   
      </MuiThemeProvider>
    </React.Fragment>
  
  )
}

export default MyApp
