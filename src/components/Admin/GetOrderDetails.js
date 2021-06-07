import React from 'react';  
import { Table } from 'react-bootstrap';  
import axios from 'axios';  

  
const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/OrderDetails/';  
  
class GetOrderDetails extends React.Component{  
    constructor(props){  
        super(props);  
        this.state = {  
           error:null,  
           orderdetails:[],  
           response: {}  
              
        }  
    }  

    componentDidMount(){  
       axios.get(apiUrl ).then(response => response.data).then(  
            (result)=>{  
                this.setState({  
                    orderdetails:result  
                });  
            },  
            (error)=>{  
                this.setState({error});  
            }  
        )  
    }  
  
      
     
   
 
      
    render(){         
        const{error,orderdetails}=this.state;  
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
                        <th>Order Id</th> 
                        <th>Email</th>
                        <th>feedback</th>  
                            
                        
                       
                        
                      </tr>  
                    </thead>  
                    <tbody>  
                      {orderdetails.map(orderdetail => (  
                        <tr key={orderdetail.orderId}>  
                          <td>{orderdetail.orderId}</td>   
                          <td>{orderdetail.email}</td>  
                          <td>{orderdetail.feedback}</td>  
                         
                          
                              
                           
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
  
export default GetOrderDetails