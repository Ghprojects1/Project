import React, {useContext} from "react";
import IconButton from "@material-ui/core/IconButton";
import Trash from "@material-ui/icons/DeleteForeverOutlined";
import {UserContext} from '../../../pages/_app'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import {GET_LoanList} from '../index'

const DeleteLoan = ({loan}) => {
  const currentUser= useContext(UserContext);
  const isCurrentUser = currentUser.username===loan.user.username

  const handleUpdateCache = (cache, {data:{deleteLoans}}) =>{
    const data=cache.readQuery({query:GET_LoanList})
    console.log(data)
    console.log(deleteLoans)
    const index= data.allLoans.findIndex(loans=>loans.loanNo===deleteLoans.loanNo)
    // data.allLoans.splice(index,1)
    const allLoans=[...data.allLoans.slice(0,index),...data.allLoans.slice(index+1)]
    cache.writeQuery({query:GET_LoanList, data:{allLoans}})
  }

  return isCurrentUser && (

    <Mutation 
      mutation={DELETE_LOAN_MUTATION}
      variables={{
        loanNo: loan.loanNo,
      }}  
      onCompleted={data =>{
        console.log({data})
      }}
      update={handleUpdateCache}
      //refetchQueries={()=>[{query: GET_LoanList}]}
    >
      {deleteLoan => (
        <IconButton onClick={deleteLoan}>
          <Trash />
        </IconButton>
      )}
    </Mutation>
  )
};

export default DeleteLoan;




const DELETE_LOAN_MUTATION=gql`
mutation($loanNo: String!){
  deleteLoans( loanNo: $loanNo){
    loanNo
}}`