import React,{Component} from "react";
import {Form,Button} from "react-bootstrap";
import {FormFeedback, Input} from "reactstrap";
import {Link} from "react-router-dom"

import axios from 'axios';

class NewReview extends Component{

    constructor(props){
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        data:{
            "farmerEmail": this.props.location.state.farmermail,
            "customerName": localStorage.getItem('userFirstName'),
            "reviews": '',
            "product":this.props.location.state.product,
            "rank":5,
            "date": ''
        },
        errors:{},
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

        if (data.reviews === '') errors.reviews = 'First Name can not be blank.';
        if (data.rank === '') errors.rank = 'Count can not be empty';
        if (data.date === '') errors.date = 'Date can not be blank.';

        return errors;
    }



    Savedata =()=>{
        console.log("enter start");
        const { data } = this.state;
        const errors = this.validate();
        if (Object.keys(errors).length === 0) {
            console.log(data);
            //Call an api here
            axios.post('https://localhost:44374/api/Reviews', {farmerEmail:data.farmerEmail,customerName:data.customerName,reviews:data.reviews,product:data.product,rank:data.rank,date:data.date})
                //Resetting the form
                .then(response => {
                    if(response.status === 201) {
                        alert("You have Send Your review Successfully")
                        //this.setState(this.getInitialState());  // clean the form

                    }
                    else {
                        alert(" Error occured! please try again");
                        console.log(response);
                    }
                })
            console.log("ok");

        } else {
            this.setState({ errors });
        }
        console.log("enter finish");
    }


    render() {

        const {errors,data} = this.state;

        return(
            <div className="tab">
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>{data.product}</th>
                        </tr>
                        <tr>
                            <th>Feedback Send as:</th>
                            <th>{data.customerName}</th>
                        </tr>
                        <tr>
                            <th>Farmer Email:</th>
                            <th>{data.farmerEmail}</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div>
                    <Form>
                        <Form.Group>
                            <Form.Label>Enter your feedback about this product</Form.Label>
                            <Input value={data.reviews} invalid={errors.reviews ? true : false} name="reviews" onChange={this.handleChange}/>
                            <FormFeedback>{errors.reviews}</FormFeedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Give a rating to the product(Enter number between 10 - 0, 10-Very Good, 0-Very Bad)</Form.Label>
                            <Input value={data.rank} invalid={errors.rank ? true : false} name="rank" onChange={this.handleChange}/>
                            <FormFeedback>{errors.rank}</FormFeedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Input value={data.date} invalid={errors.date ? true : false} name="date" onChange={this.handleChange}/>
                            <FormFeedback>{errors.date}</FormFeedback>
                        </Form.Group>
                        <Button variant="primary" onClick={() => this.Savedata()}>Send</Button>

                    </Form>
                </div>

            </div>
        )
    }
}

export default NewReview;