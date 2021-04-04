//import { gql, useQuery } from "@apollo/client";
//import {ApolloProvider} from 'react-apollo'
/*import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Head from 'next/head'
import TableDisplay from '../components/shared/table'

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: "https://pawntestapp.azurewebsites.net/graphql/",
        cache: new InMemoryCache({addTypename: false})
      });
    
    const { data } = await client.query({
        query: gql`
        query test{
          allreleaseloans{
            
            sNo
            interest            
            amtCollected
          }
        }`
    });
    
      return {
        props: {
          launches: data.allreleaseloans
        }
      }
    }

    export default function Home({ launches }) {
   //   const omitTypename = (key, value) => (key === '__typename' ? undefined : value)
   //   launches = JSON.parse(JSON.stringify(launches), omitTypename)
        return (
            <div >
              <Head>
                <title>Release Loans</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>
              
              <TableDisplay data={launches}/>
            </div>
        )
    }*/

    import React from 'react'
    import {Query} from 'react-apollo'
    import {gql} from 'apollo-boost'
    import TableDisplay from '../components/shared/table'
    
    const GET_Release_Loans= gql`
    query test{
      allreleaseloans{
        
        sNo
        interest            
        amtCollected
      }
    }`;
    
    export default function Home() {
      return (
        <Query query = {GET_Release_Loans}>
          {({data, loading, error}) =>{
            if (loading) return <div>Loading </div>;
            if (error) return <div>Error </div>;
            console.log(data);
            return <TableDisplay data={data.allreleaseloans}/>
            //return <div>{JSON.stringify(data)}</div>;
          }
          }
        </Query>
      )
    }
