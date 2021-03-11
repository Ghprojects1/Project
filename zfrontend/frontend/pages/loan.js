import next from "next";
import React from 'react'
import Head from 'next/head'
import axios from 'axios';

function loan({ users }) {
    return (
      <ul>
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    )
  }
  
  // This function gets called at build time on server-side.
  // It may be called again, on a serverless function, if
  // revalidation is enabled and a new request comes in
  export async function getStaticProps() {
    const res = await fetch('https://project-pawn.el.r.appspot.com/api/users')
    const users = await res.json()
  
    return {
      props: {
        users,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 1, // In seconds
    }
  }
  
  export default loan