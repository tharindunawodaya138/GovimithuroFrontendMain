import React from 'react'
import './css/Fontstyle.css'
import './css/splitScreen.css'
import './css/Button.css'
import axios from 'axios';
import {Card, Input} from "reactstrap";
import {Button} from "react-bootstrap";

import mango from './../fruit/mango.jpg'

const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/Cart/';

class Description extends React.Component{


    constructor(props){
        super(props);
        this.state = this.getInitialSate();
    }
    getInitialSate =() =>({
        data:{
            // grab the product which coming from Search result component
            "productName"  : this.props.location.state.productName,
            "quantity"    : this.props.location.state.quantity,
            "categoryName" : this.props.location.state.categoryName,
            "address"     : this.props.location.state.address,
            "pictureID"    : this.props.location.state.picture,
            "description"  : this.props.location.state.description,
            "unitPrice"    : this.props.location.state.unitPrice,
            "unitWeight"   : this.props.location.state.unitWeight,
        },
        error:{},
        product:[],
        response: {},
        //show: 1,

        //this is for data in the cart
        numOfProducts:1,
        totalPrice:220


    })

    componentDidMount(){

    }


    handleChange= (e)=> {
        this.setState({[e.target.name]:e.target.value});
    }


    AddToCart(Product) {

        console.log( this.state.numOfProducts);

        // post to  cart
        axios.post(apiUrl,
            {numOfProducts: parseInt(this.state.numOfProducts),totalPrice : parseInt(this.state.numOfProducts )* Product.unitPrice}
        )
            .then(response=> {
                //console.log(response.status)
                // console.log(response)
                if(response.status === 201){
                    alert("Data Save Successfully");
                }
            })
            .catch(error => {
                console.log(error);
            })

    }



    render(){
        const {data} = this.state;
            if(data != null){
                return(

                    <div >
                        <div  >
                            <h4 style={{textAlign:'center', backgroundColor:'green',color:'white' }} >  {data.productName}</h4>
                        </div>


                        <div >
                            <div className="split left">

                                <Card >
                                    <div className="card">
                                        <img src={mango} alt=""  />
                                    </div>
                                </Card>

                            </div>
                            <div className="split right1" >

                                <Card>
                                    <td className="container">
                                        <tr ><p><b><i>Product Name     :</i></b> {data.productName}</p> </tr>
                                        <tr><p><b><i>Category          :</i></b> {data.categoryName}</p></tr>
                                        <tr><p><b><i>Description       :</i></b> {data.description}</p> </tr>
                                        <tr><p><b><i>Available Quantity:</i></b> {data.quantity}</p></tr>
                                        <tr><p><b><i>Seller Address    :</i></b> {data.address}</p></tr>
                                        <tr><p><b><i>Unit Weight        </i></b> (kg) : {data.unitWeight}</p>  </tr>

                                        <tr><p><b><i>Unit Weight        </i></b> (Rs) : {data.unitPrice} </p></tr>
                                        <tr><p><b><i> Add quantity      </i></b></p></tr>
                                        <tr>

                                            <Input
                                                type="number"
                                                required
                                                name="numOfProducts" onChange={this.handleChange}
                                                value={this.state.numOfProducts} placeholder="Enter Quantity"/>

                                            <td className='cartdata'>{ data.unitPrice * this.state.numOfProducts }</td>
                                        </tr>

                                        <tr><Button style={{backgroundColor: '0000CD', margin: '0px 30px'}}
                                                    onClick={() => this.AddToCart(data)}>Add to cart</Button>
                                        </tr>
                                    </td>
                                </Card>

                            </div>
                        </div>




                    </div>

                )
            }
            else {
                return (
                    <div>
                    <h2> Error occured !</h2>
                    </div>
                )
            }

    }
}

export default Description
