import React from 'react';  
import { Table,Button } from 'react-bootstrap';  
import axios from 'axios';  
import { Link } from 'react-router-dom'
  
const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/Product/';  
  
class ProductList extends React.Component{  
    constructor(props){  
        super(props);  
        this.state = {  
           error:null,  
           products:[],  
           response: {}  
              
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
         <div >  
           <h4 className="title">My Products</h4>
           <Link to="./AddProduct">
           <Button  style={{ backgroundColor: 'FireBrick' ,margin: '0px 30px' }} >+Add Product</Button>
           </Link>
                <div style={{ backgroundColor: 'LightGrey', margin: '10px 30px'}} >  
                
                  <Table>  
                    <thead className="btn-primary">  
                      <tr>  
                        <th>Product Name</th>  
                        <th>Quantity</th>  
                         
                        <th>Category Name</th>  
                        <th>Address</th>  
                        <th>Unit Price</th>  
                        <th>Unit Weight</th> 
                        
                      </tr>  
                    </thead>  
                    <tbody>  
                      {products.map(product => (  
                        <tr key={product.productId}>  
                          <td>{product.productName}</td>  
                          <td>{product.quantity}</td>  
                          <td>{product.categoryName}</td>  
                          <td>{product.addresse}</td>  
                          <td>{product.unitPrice}</td>  
                          <td>{product.unitWeight}</td>  
                              
                          <td><Button style={{ backgroundColor: 'SteelBlue'}} onClick={() => this.DeleteProduct(product.productId)}>Delete</Button>  
                          
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
  
export default ProductList;  