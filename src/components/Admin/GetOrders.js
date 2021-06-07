import React from 'react';  
import { Table,Button } from 'react-bootstrap';
import axios from 'axios';
//import './AdminPanel.css';  
  
const apiUrl1 = 'https://govimithuroapi.azurewebsites.net/api/Order/';
const apiUrl2 = 'https://govimithuroapi.azurewebsites.net/api/DeliveryInfo/';
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
        localStorage.setItem("DeliveryItem" , null);
       axios.get(apiUrl1 ).then(response => response.data).then(
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
     axios.delete(apiUrl1   + productId).then(result=>{
       alert('Product deleted successfully!!!');   
        this.setState({  
          response:result,  
          products:products.filter(product=>product.productId !== productId)  
        });  
      });  
    }


    CheckingDelivery(product) {
       const delData ={
           orderId : product.orderId,
           productName:product.productName,
           quantity: product.quantity,
           boughtDate:product.date,
           farmerEmail:product.email,
           customerEmail:product.customerEmail,
           accepted: '',
           transit: '',
           delivered: '',
           expectedDelivery: '',
           notReceived: '',
           disputeMessage:  '',

       }
      // console.log(delData);
       axios.post(apiUrl2, delData)
           .then(res=> {
               //console.log( "this is status " + res.status);
               if(res.data !== null){
                  // console.log("this is success data" + res.data);
                   localStorage.setItem("DeliveryItem" , delData.orderId); // this is used in courier.js
                   console.log("this is the deliver item order id" + delData.orderId);
                   alert("data sent to deliver");
                   window.location.replace('/courier')
               }

               else {
                   console.log("from getorder," + res.data);
               }
           })
           .catch(err=>{
               console.log( "this is status " + err);
               localStorage.setItem("DeliveryItem" , delData.orderId);
               console.log("this is the deliver item order id" + delData.orderId);
               alert("Data already sent to deliver !");
               window.location.replace('/courier');
           })
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
         <div >  
              
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
                        {/*<th>Delivered</th>*/}
                          <th>Send to Deliver</th>

                          <th>Action</th>

                      </tr>  
                    </thead>  
                    <tbody >  
                      {products.map(product => (  
                        <tr key={product.orderId} style={{   border: '2px solid DimGrey'}}>  

                          <td>{product.orderId}</td>  
                          <td>{product.productName}</td>  
                          <td>{product.quantity}</td>  
                          <td>{product.unitPrice}</td> 
                          <td>{product.customerName}</td>
                          <td>{product.customerEmail}</td>

                            <td><Button style={{ backgroundColor: 'blueviolet',border: '2px solid DimGrey',borderRadius: '5px'}}
                                        onClick={() => this.CheckingDelivery(product)}> Send </Button>
                            </td>

                                <td><Button style={{ backgroundColor: 'Brown',border: '2px solid DimGrey',borderRadius: '5px'}}
                           onClick={() => this.DeleteProduct(product.orderId)}>Delete</Button>  


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
  
export default Orders;  