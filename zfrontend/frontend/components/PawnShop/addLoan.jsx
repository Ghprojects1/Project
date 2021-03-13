import next from "next";
import React from 'react'
import Head from 'next/head'
import axios from 'axios';
import { Button } from 'reactstrap';

class LoanForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {s_no: null,loan_no: null,amt_collected: null,interest: null};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async write(){
      const releaseloans ={
        's_no':this.state.s_no,
        'loan_no':this.state.loan_no,
        'amt_collected':this.state.amt_collected,
        'interest':this.state.interest
      }
      
      const res = await axios.post('https://project-pawn.el.r.appspot.com/api/releaseloans',releaseloans )
      .then(res => {
          console.log('res', res.data);
      })
      .catch(err => {
          console.log('error in request', err);
      });
    }
  
    handleChange(event) {
      //this.setState({s_no: event.target.s_no,loan_no: event.target.loan_no,amt_collected: event.target.amt_collected,interest: event.target.interest});
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }
  
   handleSubmit(event) {
    event.preventDefault();
    const releaseloans ={
      's_no':this.state.s_no,
      'loan_no':this.state.loan_no,
      'amt_collected':this.state.amt_collected,
      'interest':this.state.interest
    }
      alert(releaseloans.loan_no)
      this.write();
      
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <div>
          <label>
            SNo:
            <input type="text" name="s_no" onChange={this.handleChange} />
          </label>
          </div>
          <div>
          <label>
            loanNumber:
            <input type="text" name="loan_no" onChange={this.handleChange} />
          </label>
          </div>
          <div>
          <label>
            amountCollected:
            <input type="text" name="amt_collected" onChange={this.handleChange} />
          </label>
          </div>
          <div>
          <label>
            Interest:
            <input type="text" name="interest" onChange={this.handleChange} />
          </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  export default LoanForm

