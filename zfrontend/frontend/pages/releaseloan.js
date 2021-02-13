//import { gql, useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Head from 'next/head'

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: "http://localhost:8000/releaseloans/graphql",
        cache: new InMemoryCache()
      });
    
    /*export const ALL_PLAYERS_QUERY = gql`
    query{
      releaseloansQuery{
        amtCollected
      }
    }
    `;*/
    
    const { data } = await client.query({
        query: gql`
          query GetLaunches {
            releaseloansQuery {
                amtCollected
            }
        }`
    });
    
      return {
        props: {
          launches: data.releaseloansQuery
        }
      }
    }

    export default function Home({ launches }) {
        console.log('launches', launches);
        return (
            <div >
              <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>
              </div>
        )
    }
