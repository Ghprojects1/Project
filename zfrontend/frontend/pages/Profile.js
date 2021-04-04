import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ThumbUp from "@material-ui/icons/ThumbUpTwoTone";
import Audiotrack from "@material-ui/icons/AudiotrackTwoTone";
import Divider from "@material-ui/core/Divider";
import {Query} from 'react-apollo'
import {gql} from 'apollo-boost'
import Loading from '../components/shared/loading'
import Error from '../components/shared/error'
import format from 'date-fns/format'


const Profile = ({ classes, match }) => {
  const username = match.params.username
  return (
    <Query query={PROFILE_QUERY} variables={{username}}>
      {({data, loading, error}) =>{
          if (loading) return <Loading />;
          if (error) return <Error error={error}/>;
          
          return (
            <div>
              {/* User Info Card */}
              <Card className={classes.card}>
                <CardHeader 
                  avatar={<Avatar>{data.searchUser.username[0]}</Avatar>}
                  title={data.searchUser.username}
                  subheader={`Joined ${format(data.searchUser.dateJoined,'MMM Do YYYY')}`}
                />

              {/* Created Loans */}
              <Paper elevation={1} className={classes.paper}>
                <Typography variant="title" className={classes.title}>
                  {/* Icons */}
                  Loans Pledged
                </Typography>
                {data.searchUser.loanSet.map(loan=>(
                  <div key={loan.loanNo}>
                    <Typography >
                      {loan.loanDate} . {loan.netWt}
                    </Typography>
                    <Divider className={classes.Divider} />
                  </div>
                ))}
              </Paper>
              </Card>
            </div>
          )
      }}          
    </Query>
  )
};

const PROFILE_QUERY = gql`
query($username:String!){
  searchUser(username:$username){
    id
    username
    email
    isSuperuser
    isStaff
    isActive
    dateJoined
    address1
    address2
    city
    state
    pincode
    birthDate
    fathersName
    occupation
    remarks
    reference
    avatar
    loanSet {
      loanNo
      status
      loanDate
      miscCharges
      grossWt
      netWt
    }
  }
}
`

const styles = theme => ({
  paper: {
    width: "auto",
    display: "block",
    padding: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      width: 650,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  card: {
    display: "flex",
    justifyContent: "center"
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2)
  },
  audioIcon: {
    color: "purple",
    fontSize: 30,
    marginRight: theme.spacing()
  },
  thumbIcon: {
    color: "green",
    marginRight: theme.spacing()
  },
  divider: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing()
  }
});

export default withStyles(styles)(Profile);