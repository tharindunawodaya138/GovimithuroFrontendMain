import React from 'react';  
import { Table,Button } from 'react-bootstrap';  
import axios from 'axios';  
//import './AdminPanel.css';  
  
const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/Order/';  
  
class Orders extends React.Component{  
    constructor(props){  
        super(props);  
        this.state = {  
           error:null,  
           products:[],  
           response: {},  
           
        }  
    }  

    componentDidMount(){  
       axios.get(apiUrl ).then(response => response.data).then(  
            (result)=>{  
                this.setState({  
                    products:result  
                });  
            },  
            (error)=>{  
                this.setState({error});  
            }  
        )  
    }  
  
      
    DeleteProduct(productId) {  
      const { products } = this.state;     
     axios.delete(apiUrl   + productId).then(result=>{  
       alert('Product deleted successfully!!!');   
        this.setState({  
          response:result,  
          products:products.filter(product=>product.productId !== productId)  
        });  
      });  
    }  
   
 

      
    render(){         
        const{error,products}=this.state;  
        if(error){  
            return(  
                <div className="center"><h4>Error : {error.message}!!!</h4></div>  
            )  
        }  
        else  
        {  
            return(  
         <div className="container ">  
              <h4 className="title">ORDERS</h4><br/>
              <div></div>
                <div style={{ backgroundColor: 'white', margin: '5px 5px'}} >  
                
                  <Table striped bordered hover variant="dark">  
                    <thead className="btn-primary">  
                      <tr>  
                        <th>Order Id</th> 
                        <th>Product Name</th>  
                        <th>Quantity</th>     
                        <th>Unit Price</th> 
                        <th>Customer Name</th>  
                        <th>Customer Email</th> 
                        
                        
                      </tr>  
                    </thead>  
                    <tbody >  
                      {products.filter((product)=>(product.email===localStorage.getItem('userEmail'))).map(product => (  
                        <tr key={product.orderId} style={{   border: '2px solid DimGrey'}}>  

                          <td>{product.orderId}</td>  
                          <td>{product.productName}</td>  
                          <td>{product.quantity}</td>  
                          <td>{product.unitPrice}</td> 
                          <td>{product.customerName}</td>
                          <td>{product.customerEmail}</td> 
                              
                           
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
  
export default Orders;  