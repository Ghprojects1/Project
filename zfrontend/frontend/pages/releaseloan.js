//import { gql, useQuery } from "@apollo/client";
//import {ApolloProvider} from 'react-apollo'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Head from 'next/head'
import TableDisplay from '../components/table'

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: "http://127.0.0.1:8000/graphql/",
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
    }
