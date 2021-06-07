import React, {Component} from 'react';
//import {Table, Button, Card} from 'react-bootstrap';
import axios from 'axios';
import { Link ,Redirect} from 'react-router-dom'
import {FormFeedback, FormGroup, Input, Label,Form,Button} from "reactstrap";

const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/Categories';

class EditCategory extends Component{


    constructor(props){
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        data:{
            "categoryID": this.props.location.state.categoryid,
            "categoryName":this.props.location.state.categoryname,
            "quantity":this.props.location.state.quantity,
            "price":this.props.location.state.price
        },
        errors:{},
        id:this.props.location.state.categoryid
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

        if (data.categoryName === '') errors.categoryName = 'productName can not be blank.';

        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;

        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            //console.log(data);
            //Call an api here
            axios.put(`${apiUrl}/${this.props.location.state.categoryid}`, data)
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });
            //Resetting the form
            console.log('complete');
            console.log(data);


            //this.setState(this.getInitialState());
        } else {
            this.setState({ errors });
        }

        //this.props.history.push('/Cart');
    }


    render() {

        const {data,errors} = this.state;

        return(
            <div className="Container">

                <div id="Registerbox">
                    <div className="box">
                        <Form onSubmit={this.handleSubmit}>

                            <FormGroup>
                                <Label for="categoryName">Product Name</Label>
                                <Input  value={data.categoryName} invalid={errors.categoryName ? true : false} name="categoryName" onChange={this.handleChange}/>
                                <FormFeedback>{errors.categoryName}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="quantity">Quantity</Label>
                                <Input  value={data.quantity} invalid={errors.quantity ? true : false} name="quantity" onChange={this.handleChange}/>
                                <FormFeedback>{errors.quantity}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="price">Price</Label>
                                <Input  value={data.price} invalid={errors.price ? true : false} name="price" onChange={this.handleChange}/>
                                <FormFeedback>{errors.price}</FormFeedback>
                            </FormGroup>

                            <Button color="primary" >Save Changes</Button>

                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditCategory;