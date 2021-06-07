import React from 'react';
import {Button, Table} from 'react-bootstrap';
import axios from 'axios';
import {Link} from "react-router-dom";
import './css/Fontstyle.css'

const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/Categories/';

class Price extends React.Component{
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
                    <div>
                        <h3 className="title">Today product Prices</h3>
                    </div>

                    <div style={{ backgroundColor: 'LightGrey', margin: '20px 70px'}} >

                        <Table striped bordered hover variant="dark">
                            <thead className="btn-primary">
                            <tr>
                                <th>Category ID</th>
                                <th>Category Name</th>
                                <th>Quantity</th>
                                <th>Max Price (Rs)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories.map(category => (
                                <tr key={category.categoryID}>
                                    <td>{category.categoryID}</td>
                                    <td>{category.categoryName}</td>
                                    <td>{category.quantity}</td>
                                    <td>{category.price}</td>

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

export default Price;