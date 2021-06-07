import React from 'react';  
import { Table,Button } from 'react-bootstrap';  
import axios from 'axios';  

  
const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/User/';  
  
class GetFarmers extends React.Component{  
    constructor(props){  
        super(props);  
        this.state = {  
           error:null,  
           farmers:[],  
           response: {}  
              
        }  
    }  

    componentDidMount(){  
       axios.get(apiUrl ).then(response => response.data).then(  
            (result)=>{  
                this.setState({  
                    farmers:result  
                });  
            },  
            (error)=>{  
                this.setState({error});  
            }  
        )  
    }  
  
      
    DeleteFarmer(farmerID) {  
      const { farmers } = this.state;     
     axios.delete(apiUrl   + farmerID).then(result=>{  
       alert('Farmer deleted successfully!!!');   
        this.setState({  
          response:result,  
          farmers:farmers.filter(farmer=>farmer.farmerID !== farmerID)  
        });  
      });  
    }  
   
 
      
    render(){         
        const{error,farmers}=this.state;  
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
                        <th>ASCRNo</th>  
                        <th>AgriBranch</th> 
                        <th>NIC</th> 
                        <th>Phone</th> 
                        <th>Action</th> 
                      </tr>  
                    </thead>  
                    <tbody>  
                      {farmers.filter((product)=>(product.agriBranch != null)).map(farmer => (  
                        <tr key={farmer.id }>  
                           
                          <td>{farmer.firstName}</td>  
                          <td>{farmer.lastName}</td>  
                          <td>{farmer.email}</td>
                          <td>{farmer.address}</td>  
                          <td>{farmer.ascrNo}</td>  
                          <td>{farmer.agriBranch}</td> 
                          <td>{farmer.nic}</td> 
                          <td>{farmer.phone}</td>  
                          
                              
                          <td><Button style={{ backgroundColor: 'Gray'}} onClick={() => this.DeleteFarmer(farmer.id)}>Delete</Button>  
                          
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
  


export default GetFarmers