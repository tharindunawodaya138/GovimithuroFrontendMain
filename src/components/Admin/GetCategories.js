import React from 'react';  
import {Button, Table} from 'react-bootstrap';
import axios from 'axios';
import {Link} from "react-router-dom";

  
const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/Categories/';
  
class GetCategories extends React.Component{  
    constructor(props){  
        super(props);  
        this.state = {  
           error:null,  
           categories:[],  
           response: {}  
              
        }  
    }  

    componentDidMount(){  
       axios.get(apiUrl ).then(response => response.data).then(  
            (result)=>{  
                this.setState({  
                    categories:result  
                });  
            },  
            (error)=>{  
                this.setState({error});  
            }  
        )  
    }


    deleteRow(productID, e){
        axios.delete(`https://govimithuroapi.azurewebsites.net/api/Categories/${productID}`)
            .then(res => {
                alert("You have deleted successfully")
                console.log(res);
                console.log(res.data);
                console.log('delete complete');
                const carts = this.state.carts.filter(item => item.productID !== productID);
                this.setState({ carts });
            })
        window.location.reload(false);

    }
   
 
      
    render(){         
        const{error,categories}=this.state;  
        if(error){  
            return(  
                <div className="center"><h4>Error : {error.message}!!!</h4></div>  
            )  
        }  
        else  
        {  
            return(  
         <div >
             <div >
                 <Link to={{pathname:'/NewCategory'}}>
                     <Button style={{ backgroundColor: 'Red', margin: '5px 5px',padding:'5px 40px'}}>New Item</Button>
                 </Link>
             </div>
           
                <div style={{ backgroundColor: 'LightGrey', margin: '5px 5px'}} >

                  <Table striped bordered hover variant="dark">  
                    <thead className="btn-primary">  
                      <tr>  
                        <th>Category ID</th> 
                        <th>Category Name</th>  
                        <th>Quantity</th>
                          <th>Price</th>
                          <th>Option</th>
                        
                      </tr>  
                    </thead>  
                    <tbody>  
                      {categories.map(category => (  
                        <tr key={category.categoryID}>  
                          <td>{category.categoryID}</td>   
                          <td>{category.categoryName}</td>  
                          <td>{category.quantity}</td>
                            <td>{category.price}</td>
                            <td>
                                <Link to={{pathname:'./EditCategory', state:{categoryid:category.categoryID,categoryname:category.categoryName,quantity:category.quantity,price:category.price} }}>
                                <Button style={{ backgroundColor: 'Green',border: '2px solid DimGrey',borderRadius: '5px',margin:'0px 15px'}}>
                                    Edit
                                </Button>
                                </Link>

                                <Button style={{ backgroundColor: 'Brown',border: '2px solid DimGrey',borderRadius: '5px'}} onClick={(e) => this.deleteRow(category.categoryID, e)}>
                                    Delete
                                </Button>
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
  
export default GetCategories