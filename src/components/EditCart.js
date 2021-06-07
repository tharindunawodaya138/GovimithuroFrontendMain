import React, {Component} from 'react';
//import {Table, Button, Card} from 'react-bootstrap';
import axios from 'axios';
import { Link ,Redirect} from 'react-router-dom'
import {FormFeedback, FormGroup, Input, Label,Form,Button} from "reactstrap";

const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/Cart';

class EditCart extends Component{

    price=this.props.location.state.total/this.props.location.state.quantity;

    constructor(props){
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        data:{
            "productID": this.props.location.state.cartid,
            "productName":this.props.location.state.productname,
            "numOfProducts":this.props.location.state.quantity,
            "totalPrice":this.props.location.state.total
        },
        errors:{},
        id:this.props.location.state.cartid
    });

    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });
    }

    validate = () => {
        const { data } = this.state;
        let errors = {};

        if (data.productName === '') errors.productName = 'productName can not be blank.';

        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;

        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            //console.log(data);
            //Call an api here
            data.numOfProducts = parseInt(data.numOfProducts);
            data.totalPrice = data.numOfProducts*this.price;
            axios.put(`${apiUrl}/${this.props.location.state.cartid}`, data)
                .then((data) => {
                console.log(data);
            })
                .catch((error) => {
                    console.log(error);
                });
            //Resetting the form
            console.log('complete');
            console.log(data);
            console.log(this.price);
            console.log(this.props.location.state.cartid);

            //this.setState(this.getInitialState());
        } else {
            this.setState({ errors });
        }

        this.props.history.push('/Cart');
    }


    render() {

        const {data,errors} = this.state;

        return(
            <div className="Container">

                <div id="Registerbox">
                    <div className="box">
                        <Form onSubmit={this.handleSubmit}>

                            <FormGroup>
                                <Label for="productName">Product Name</Label>
                                <Input  value={data.productName} invalid={errors.productName ? true : false} name="productName" onChange={this.handleChange}/>
                                <FormFeedback>{errors.productName}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="numOfProducts">Number Of Product</Label>
                                <Input  value={data.numOfProducts} invalid={errors.numOfProducts ? true : false} name="numOfProducts" onChange={this.handleChange}/>
                                <FormFeedback>{errors.numOfProducts}</FormFeedback>
                            </FormGroup>

                                <Button color="primary" >Save Changes</Button>

                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditCart;