import React, { Component } from 'react'
import axios from 'axios'
import { Form, Input, Label, FormGroup, FormFeedback, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ClientQuery extends Component  {


    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        data: {
            "email": '',
            "title": '',
            "description": ''
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

        if (data.title === '') errors.title = 'title can not be blank.';

        if (data.email === '') errors.email = 'Email can not be blank.';

        if (data.description === '') errors.description = 'description can not be blank.';

        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;

        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            console.log("inside client query" + data);
            //Call an api here
            axios.post('https://govimithuroapi.azurewebsites.net/api/ClientQuery',data)
            //Resetting the form
                .then(response => {
                    if(response.status === 200) {
                        window.alert("Your Response saved successfully");
                        this.setState(this.getInitialState());  // clean the form
                        window.location.replace('/');
                    }
                })

        } else {
            this.setState({ errors });
            alert("Error Occurred! ..Please try again");
        }
    }



    render(){
        const { data, errors } = this.state;
        return(
            <div className="Container">
                <h4 className="center" style={{padding:'25px'}}>Please Let us Know your difficulties</h4>
                <div id="Registerbox" >
                    <div className="box" style={{width:'500px', backgroundColor:'whitesmoke'}}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input value={data.email} invalid={!!errors.email} name="email" onChange={this.handleChange} />
                                <FormFeedback>{errors.email}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input value={data.title} invalid={!!errors.title} name="title" onChange={this.handleChange} />
                                <FormFeedback>{errors.title}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="description">Description</Label>
                                <input value={data.description} invalid={!!errors.description} name="description" onChange={this.handleChange}  style={{height:'150px'}}/>
                                <FormFeedback>{errors.description}</FormFeedback>
                            </FormGroup>


                            <Button color="primary" >Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>

        )

    }
}
export default ClientQuery