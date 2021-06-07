import React from "react";
import axios from "axios";
import { Form, Input, Label, FormGroup, FormFeedback, Button } from 'reactstrap'

class NewCategory extends React.Component{

    constructor(props) {

        super(props);

        this.state = this.getInitialState();
    }

    getInitialState = () => ({

        data: {

            "categoryName": '',
            "quantity": '',
            "price": '',

        },
        errors: {}
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

        if (data.categoryName === '') errors.categoryName = 'Category Name can not be blank.';
        if (data.quantity === '') errors.quantity = 'Quantity can not be blank.';
        if (data.price === '') errors.price = 'Price can not be blank.';

        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;

        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            console.log(data);
            //Call an api here
            axios.post('https://govimithuroapi.azurewebsites.net/api/Categories',data)
                //Resetting the form
                .then(response => {
                    if(response.status === 201) {
                        alert("New Category add successfully")
                        this.setState(this.getInitialState());  // clean the form

                    }
                    else {
                        alert(" Error occured! please try again later");
                        console.log(response);
                    }
                })

        } else {
            this.setState({ errors });
        }
    }

    render() {

        const { data, errors } = this.state;

        return(
            <div className="Container">
                <h5 className="title">Add New Item</h5>
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

export default NewCategory;