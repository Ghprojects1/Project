import React, {useState} from "react";
import Dropzone from 'react-dropzone';
import { Add, Clear } from "@material-ui/icons";
import { Button, Dialog } from "@material-ui/core";
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import withStyles from "@material-ui/core/styles/withStyles";

const UploadScreen = () => {
  const [open, setOpen] =useState(false)
  
  return (
    <>
    <Button onClick={()=>setOpen(true)} variant="contained" color="secondary">
      {open ? <Clear />:<Add />}
    </Button>

    <Mutation mutation={UPLOAD_FILE}>
      {(singleUpload, { data, loading }) => {
          console.log(data)
          return (
            <Dialog open={open} >
            <form onSubmit={() => {console.log("Submitted")}} encType={'multipart/form-data'}>
              <input name={'document'} type={'file'} onChange={({target: { files }}) => {
                  const file = files[0]
                  file && singleUpload({ variables: {username:"admin", file: file } })
              }}/>{loading && <p>Loading.....</p>}
            </form>
            </Dialog>
          )}
      }
      </Mutation>
     
    </>
    )
}



const UPLOAD_FILE=gql`
mutation($username: String!,$file:Upload){
  UploadFile(username: $username,file: $file){
    success
  }
}
`

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  dialog: {
    margin: "0 auto",
    maxWidth: 550
  },
  textField: {
    margin: theme.spacing()
  },
  cancel: {
    color: "red"
  },
  save: {
    color: "green"
  },
  button: {
    margin: theme.spacing(2)
  },
  icon: {
    marginLeft: theme.spacing()
  },
  input: {
    display: "none"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: "200"
  }
});

{/* <div >
      <Dropzone onDrop={(files) => this.onDrop(files)}>
       {dropzoneProps => {
    //     return (
    //       <div>Try dropping some files here, or click to select files to upload.</div>
    //     );
    //   }}
    //   </Dropzone>
    // </div> */}

export default withStyles(styles)(UploadScreen); 