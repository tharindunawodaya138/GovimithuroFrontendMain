import React, { Component } from 'react'
import axios from 'axios'
import { Form, Label,Input,FormGroup, FormFeedback, Button } from 'reactstrap';

var courier = 300;
class Checkout extends Component  {
  

    constructor(props) {
      super(props);
     
       
      this.state = this.getInitialState();
  }

  getInitialState = () => ({
        data:{      
        'cardName': '',
        'cardNo': '',
        'expMonth': '',
        'expYear':'',
        'billDate':'',
        'email':'',
        'cvv': '',
        'totalPrice':JSON.parse(localStorage.getItem('tt'))+courier,
        },

      errors: {}
  });
  handleChange = (e) => {
    this.setState({
        
      data: {
        ...this.state.data,
        [e.target.name]:e.target.value
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

  if (data.cardName === '') errors.cardName = 'Card holder can not be blank.';
  if (data.cardNo === '') errors.cardNo = 'Card no can not be blank.';
  if (data.expMonth === '') errors.expMonth = 'Expire month can not be blank.';
  if (data.expYear === '') errors.expYear = 'Expire year can not be blank.';
  if (data.billDate === '') errors.billDate = 'Bill date can not be blank.';
  if (data.cvv === '') errors.cvv = 'CVV can not be blank.';
  
  return errors;
}

handleSubmit = (e) => {
  e.preventDefault();

  const { data} = this.state;

  const errors = this.validate();

  if (Object.keys(errors).length === 0) {
      console.log(data);
      //Call an api here
      axios.post('https://govimithuroapi.azurewebsites.net/api/BillingInfo/',
      {
        email:this.state.data.email,cardName:this.state.data.cardName,cardNo:this.state.data.cardNo,expMonth:parseFloat(this.state.data.expMonth),expYear:parseFloat(this.state.data.expYear),billDate:this.state.data.billDate,cvv:this.state.data.cvv,totalPrice:parseFloat(this.state.data.totalPrice)
      })
      .then (res => {
        if(res.data ==="Success")
        {
          alert("Payment is successful!")
          this.props.history.push(
            {
              pathname:'/Receipt',
              state:{billingId:data.billingId,cardName:data.cardName,cardNo:data.cardNo,billDate:data.billDate,email:data.email} 
            });
        }
    })
    
    this.setState(this.getInitialState());

  } else {
      this.setState({ errors });
  }
}

  render(){  
    const { data, errors } = this.state; 
        return(
          <div className="Container">
          <h4 className="center">CREDIT CARD CHECKOUT</h4>
              <div id="Registerbox">
               <div className="box">
            <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label for="email">Email Address</Label>
                <Input value={data.email} invalid={errors.email? true : false} name="email" onChange={this.handleChange} placeholder="A Confirmation email will be sent to this email address" />
                <FormFeedback>{errors.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="billDate">Bill Date</Label>
                <Input value={data.billDate} invalid={errors.billDate? true : false} name="billDate" onChange={this.handleChange} />
                <FormFeedback>{errors.billDate}</FormFeedback>
            </FormGroup>
  
            <div><h5>Payment Details</h5></div>
  
            <FormGroup>
                <Label for="cardName">Card Holder's Name</Label>
                <Input value={data.cardName} invalid={errors.cardName? true : false} name="cardName" onChange={this.handleChange} />
                <FormFeedback>{errors.cardName}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="cardNo">Card Number</Label>
                <Input value={data.cardNo} invalid={errors.cardNo? true : false} name="cardNo" onChange={this.handleChange} placeholder='0000 0000 0000 0000'
                        pattern='[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}' maxLength='19'/>
                <FormFeedback>{errors.cardNo}</FormFeedback>
            </FormGroup>
            <div className="row">
            <div className="col">
            <FormGroup>
                <Label for="expMonth">Expiration Date</Label>
                <Input  value={data.expMonth} invalid={errors.expMonth? true : false} name="expMonth" onChange={this.handleChange} placeholder="Month" />
                <FormFeedback>{errors.expMonth}</FormFeedback>
            </FormGroup>
            </div>
            <div className="col">
            <FormGroup>
                <Label for="expYear">&ensp;</Label>
                <Input  value={data.expYear} invalid={errors.expYear? true : false} name="expYear" onChange={this.handleChange} placeholder="Year" />
                <FormFeedback>{errors.expYear}</FormFeedback>
            </FormGroup>
            </div>
            </div>
            <FormGroup>
                <Label for="cvv">CVV</Label>
                <Input value={data.cvv} invalid={errors.cvv? true : false} name="cvv" onChange={this.handleChange} maxLength='3'/>
                <FormFeedback>{errors.cvv}</FormFeedback>
            </FormGroup>   
  
            <FormGroup>
                <Label for="totalPrice">Total Price(LKR)</Label>
                <Input value={data.totalPrice} invalid={errors.totalPrice? true : false} name="totalPrice" onChange={this.handleChange}/>
                <FormFeedback>{errors.totalPrice}</FormFeedback>
            </FormGroup>       
  
            <Button color="primary" >PAY</Button>          
        </Form>
  
        </div>
        </div>
        </div>
        )
       
        }

      }
       

export default Checkout

