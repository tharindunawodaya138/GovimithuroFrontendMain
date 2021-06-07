import React from 'react';  
import { Table,Button } from 'react-bootstrap';  
import axios from 'axios';  

  
const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/User/';  
  
class GetCustomers extends React.Component{  
    constructor(props){  
        super(props);  
        this.state = {  
           error:null,  
           customers:[],  
           response: {}  
              
        }  
    }  

    componentDidMount(){  
       axios.get(apiUrl ).then(response => response.data).then(  
            (result)=>{  
                this.setState({  
                    customers:result  
                });  
            },  
            (error)=>{  
                this.setState({error});  
            }  
        )  
    }  
  
      
    DeleteCustomer(customerID) {  
      const { customers } = this.state;     
     axios.delete(apiUrl   + customerID).then(result=>{  
       alert('Customer deleted successfully!!!');   
        this.setState({  
          response:result,  
          customers:customers.filter(customer=>customer.customerID !== customerID)  
        });  
      });  
    }  
   
 
      
    render(){         
        const{error,customers}=this.state;  
        if(error){  
            return(  
                <div className="center"><h4>Error : {error.message}!!!</h4></div>  
            )  
        }  
        else  
        {  
            return(  
         <div >  
           
                <div style={{ backgroundColor: 'LightGrey', margin: '5px 5px'}} >  
                
                  <Table striped bordered hover variant="dark">  
                    <thead className="btn-primary">  
                      <tr>  
                        
                        <th>First Name</th>  
                        <th>Last Name</th>    
                        <th>Email</th>  
                        <th>Address</th>  
                        <th>Phone</th>  
                        <th>Action</th> 
                        
                      </tr>  
                    </thead>  
                    <tbody>  
                      {customers.filter((product)=>(product.agriBranch === null)).map(customer => (  
                        <tr key={customer.id }>  
                            
                          <td>{customer.firstName}</td>  
                          <td>{customer.lastName}</td>  
                          <td>{customer.email}</td>  
                          <td>{customer.address}</td>  
                          <td>{customer.phone}</td>  
                          
                              
                          <td><Button style={{ backgroundColor: 'DarkSlateGray'}} onClick={() => this.DeleteCustomer(customer.id)}>Delete</Button>  
                          
                          </td>  
                        </tr>  
                      ))}  
                    </tbody>  
                  </Table> 
                  </div>   
                </div>  
              )  
        }  
    }  
}  
  


export default GetCustomers