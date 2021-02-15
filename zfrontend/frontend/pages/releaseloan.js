//import { gql, useQuery } from "@apollo/client";
//import {ApolloProvider} from 'react-apollo'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Head from 'next/head'

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: "http://127.0.0.1:8000/graphql/",
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
        query test{
          allreleaseloans{
            loanNo{
              loanNo
              loanAmt
            }
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
        console.log('launches', launches);
        return (
            <div >
              <Head>
                <title>Release Loans</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>
            {launches.map(launch => 
            <div>
              {launch.sNo}  {launch.interest}   {launch.amtCollected} {launch.loanNo.loanNo}  {launch.loanNo.loanAmt}
            </div>)}
            
            </div>
        )
    }
