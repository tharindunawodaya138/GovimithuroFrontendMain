import React, { Component } from 'react'
import axios from 'axios'
import { Form, Input, Label, FormGroup, FormFeedback, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Feedback extends Component  {
  

    constructor(props) {
      super(props);

      this.state = this.getInitialState();
  }

  getInitialState = () => ({
      data: {
        
        
            
            "feedback": '',
            
            "email": ''  
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

  if (data.feedback === '') errors.feedback = 'Feedback can not be blank.';

  if (data.email === '') errors.email = 'Email can not be blank.';

  
  return errors;
}

handleSubmit = (e) => {
  e.preventDefault();

  const { data } = this.state;

  const errors = this.validate();

  if (Object.keys(errors).length === 0) {
      console.log(data);
      //Call an api here
      axios.post('https://govimithuroapi.azurewebsites.net/api/OrderDetails',data)
      //Resetting the form
      this.setState(this.getInitialState());
  } else {
      this.setState({ errors });
  }
}



  render(){  
    const { data, errors } = this.state; 
        return(
            <div className="Container">
        <h4 className="center">Feedback/Complains</h4>
            <div id="Registerbox">
             <div className="box">
          <Form onSubmit={this.handleSubmit}>
          

          <FormGroup>
              <Label for="email">Email</Label>
              <Input  value={data.email} invalid={errors.email? true : false} name="email" onChange={this.handleChange} />
              <FormFeedback>{errors.email}</FormFeedback>
          </FormGroup>
          
          <FormGroup>
              <Label for="feedback">Feedback</Label>
              <Input  value={data.feedback} invalid={errors.feedback? true : false} name="feedback" onChange={this.handleChange} />
              <FormFeedback>{errors.feedback}</FormFeedback>
          </FormGroup>

                
          <Button color="primary" >Submit</Button>
      </Form>
      </div>
      </div>
      </div>

        )
       
        }
      }
        export default Feedback