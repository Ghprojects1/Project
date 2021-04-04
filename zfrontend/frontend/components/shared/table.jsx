//import { Container, Table } from 'reactstrap';
import React from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css';

export default class TableDisplay extends React.Component {

    constructor(props){
        super(props);      
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
     }
                
    getHeader(){
        var keys = Object.keys(this.props.data[0]);
        return keys.map((key, index)=>{
            return React.createElement("th",key.toUpperCase(),key.toUpperCase());
        })
    }
    
    getRowsData(){
        var items = this.props.data;
        var keys = Object.keys(this.props.data[0]);
        var tr;//https://gist.github.com/foxish/9d5fc87455180d03af42527211654a05
        return items.map((row, index)=>{
            return React.createElement("tr",index,React.createElement(RenderRow,{key:index, data:row, keys:keys}));
            
            //return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }
        
    render() {
        return (
            <Container>
            <div>
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        {this.getHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.getRowsData()}
                </tbody>
            </Table>
            </div>
            </Container>
        
        );
    }   

}

const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
      //  <td key={props.data[key]}>{props.data[key]}</td>
        return React.createElement("td",props.data[key],props.data[key]);

    })
   }
   