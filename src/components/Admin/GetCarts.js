import React from 'react';  
import { Table} from 'react-bootstrap';  
import axios from 'axios';  

  
const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/BillingInfo/';  
  
class GetCarts extends React.Component{  
    constructor(props){  
        super(props);  
        this.state = {  
           error:null,  
           carts:[],  
           response: {}  
              
        }  
    }  

    componentDidMount(){  
       axios.get(apiUrl ).then(response => response.data).then(  
            (result)=>{  
                this.setState({  
                  carts:result  
                });  
            },  
            (error)=>{  
                this.setState({error});  
            }  
        )  
    }  
  
      
     
   
 
      
    render(){         
        const{error,carts}=this.state;  
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
                        <th>Billing Id</th> 
                        <th>Name</th>  
                        <th>Bill Date</th>
                        <th>Email</th>      
                          
                       
                        
                      </tr>  
                    </thead>  
                    <tbody>  
                      {carts.map(cart => (  
                        <tr key={cart.billingId}>  
                          <td>{cart.billingId}</td>
                          <td>{cart.cardName}</td> 
                          <td>{cart.billDate}</td>  
                          <td>{cart.email }</td>  
                          
                              
                           
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
  
export default GetCarts