import React from 'react'
import {Query} from 'react-apollo'
import {gql} from 'apollo-boost'
import TableDisplay from '../shared/table'
import Loading from  '../shared/loading'
import Error from  '../shared/error'

const GET_Release_Loans= gql`
query test{
  allreleaseloans{
    
    sNo
    interest            
    amtCollected
  }
}`;

export default function ReleaseLoan() {
  return (
    <Query query = {GET_Release_Loans}>
      {({data, loading, error}) =>{
        if (loading) return <Loading />;
        if (error) return <Error error={error}/>;
        console.log(data);
        return <TableDisplay data={data.allreleaseloans}/>
        //return <div>{JSON.stringify(data)}</div>;
      }
      }
    </Query>
  )
}

