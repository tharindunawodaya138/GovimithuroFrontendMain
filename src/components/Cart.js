import React, {Component} from 'react'
import './css/Fontstyle.css'
import './css/Button.css'
import axios from 'axios';
import {Link} from 'react-router-dom'
//import Table from "react-bootstrap/Table";
import {Button,Table} from "reactstrap";

const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/Cart/';

var total = 0;

class GetCarts extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            error:null,
            carts:[],
            response: {},
            show: 1
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

    deleteRow(productID, e){
        axios.delete(`https://localhost:44374/api/Cart/${productID}`)
            .then(res => {
                console.log(res);
                console.log(res.data);

                const carts = this.state.carts.filter(item => item.productID !== productID);
                this.setState({ carts });
            })
        window.location.reload(false);

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

                    <div style={{ margin: '10px 50px'}} >

                        <Table className='carttable'>
                            <thead className="btn-primary">
                            <tr className='carthead'>
                                <th>Cart Id</th>
                                <th>Product Name</th>
                                <th>Num Of Products</th>
                                <th>Total Price</th>
                                <th></th>
                                <th>Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {carts.map(cart => (
                                <tr key={cart.productID}>
                                    <td>{cart.productID}</td>
                                    <td>{cart.productName}</td>
                                    <td>{cart.numOfProducts}</td>
                                    <td>{cart.totalPrice}</td>
                                    <td className='cartdata'>{total = total + cart.totalPrice}</td>
                                    <td>
                                        <Link to={{pathname:'./EditCart', state:{cartid:cart.productID,productname:cart.productName,quantity:cart.numOfProducts,total:cart.totalPrice} }}>
                                            <button className='carteditbutton'>Edit</button>
                                        </Link>
                                        <button className='cartdeletebutton' onClick={(e) => this.deleteRow(cart.productID, e)}>Delete</button>
                                    </td>
                                </tr>

                            ))}
                            <tr>
                                <td></td>
                                <td>Total</td>
                                <td></td>
                                <td>{total}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </Table>

                        <div className='center'>

                        <Link to= './Checkout'>
                            <button className='cartBuy'>Buy</button>
                         </Link>

                        <Link to='./Checkout'>
                            <button className='cartBuy'>Buy</button>
                         </Link>                           

                        </div>


                    </div>

                </div>

            )
        }
    }
}

export default GetCarts
