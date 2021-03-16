import '../styles/globals.css';

import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import orange from "@material-ui/core/colors/orange";
import CssBaseline from "@material-ui/core/CssBaseline";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[500],
      main: indigo[700],
      dark: indigo[900]
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

const client = new ApolloClient({
  uri: 'https://project-pawn.el.r.appspot.com/graphql/'
});

function MyApp({ Component, pageProps }) {
  return (
    <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/* https://material-ui.com/getting-started/usage/#cssbaseline */}
        <CssBaseline />
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
    </MuiThemeProvider>
  )
}

export default MyApp
