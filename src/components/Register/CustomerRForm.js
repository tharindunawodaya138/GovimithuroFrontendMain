import React, { Component } from 'react'
import axios from 'axios'
import { Form, Input, Label, FormGroup, FormFeedback, Button } from 'reactstrap'


import './../css/imgbox.css'
class CustomerRForm extends Component  {


    constructor(props) {

      super(props);

        this.state = this.getInitialState();
  }



  getInitialState = () => ({ 

      data: {
            
            "firstName": '',
            "lastName": '', 
            "email": '',
            "password": '',
            "confirmPassword": '',
            "address": '',
            "phone": ''
        
        
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

  if (data.firstName === '') errors.firstName = 'First Name can not be blank.';
  if (data.lastName === '') errors.lastName = 'Last Name can not be blank.';
  if (data.email === ''|| data.email ===axios.get('https://govimithuroapi.azurewebsites.net/api/User').email) errors.email = 'Email can not be blank.';
  if (data.address === '') errors.address = 'Address can not be blank.';
  if (data.phone === '') errors.phone = 'phone can not be blank.';
  
  if (data.password === '') errors.password = 'Password must be valid.';
  if (data.confirmPassword !== data.password) errors.confirmPassword = 'Passwords must match.';
  
  return errors;
}

handleSubmit = (e) => {
  e.preventDefault();

  const { data } = this.state;

  const errors = this.validate();

  if (Object.keys(errors).length === 0) {
      console.log(data);
      //Call an api here
      axios.post('https://govimithuroapi.azurewebsites.net/api/Accounts/Customer',data)
      //Resetting the form
          .then(response => {
              if(response.status === 201) {
                  alert("You have registered successfully")
                  this.setState(this.getInitialState());  // clean the form

              }
              else {
                  alert(" Error occured! please try again or use another email");
                  console.log(response);
              }
          })

  } else {
      this.setState({ errors });
  }
}



  render(){  
    const { data, errors } = this.state; 
        return(
            <div className="Container">
        <h4 className="title">CUSTOMER REGISTER</h4>
            <div id="Registerbox">
             <div className="box">
          <Form onSubmit={this.handleSubmit}>
          
          <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input  value={data.firstName} invalid={errors.firstName ? true : false} name="firstName" onChange={this.handleChange} />
              <FormFeedback>{errors.firstName}</FormFeedback>
          </FormGroup>

          <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input  value={data.lastName} invalid={errors.lastName? true : false} name="lastName" onChange={this.handleChange} />
              <FormFeedback>{errors.lastName}</FormFeedback>
          </FormGroup>
          <FormGroup>
              <Label for="address">Address</Label>
              <Input  value={data.address} invalid={errors.address? true : false} name="address" onChange={this.handleChange} />
              <FormFeedback>{errors.address}</FormFeedback>
          </FormGroup>
          <FormGroup>
              <Label for="email">Email</Label>
              <Input  value={data.email} invalid={errors.email? true : false} name="email" onChange={this.handleChange} />
              <FormFeedback>{errors.email}</FormFeedback>
          </FormGroup>
          
          <FormGroup>
              <Label for="phone">Phone</Label>
              <Input  value={data.phone} invalid={errors.phone? true : false} name="phone" onChange={this.handleChange} />
              <FormFeedback>{errors.phone}</FormFeedback>
          </FormGroup>

          <FormGroup>
              <Label for="password">Password</Label>
              <Input value={data.password} type="password" name="password" invalid={errors.password ? true : false} onChange={this.handleChange} />
              <FormFeedback>{errors.password}</FormFeedback>
          </FormGroup>

          <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input  value={data.confirmPassword} type="password" name="confirmPassword" invalid={errors.confirmPassword ? true : false} onChange={this.handleChange} />
                    <FormFeedback>{errors.confirmPassword}</FormFeedback>
                </FormGroup>
                
          <Button  color="success">Register</Button>
      </Form>
      </div>
      </div>
      </div>

        )
       
        }
      }
        export default CustomerRForm

        /* Customer Register form */