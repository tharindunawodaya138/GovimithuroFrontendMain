
import React, {Component} from "react";
import {Tab,Tabs,Button,Nav,Row,Col,Form} from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Button.css';
import axios from 'axios';
import {FormFeedback, Input, Table} from "reactstrap";
import {Link} from "react-router-dom";

const userUrl = 'https://govimithuroapi.azurewebsites.net/api/User/';
const orderUrl = 'https://govimithuroapi.azurewebsites.net/api/Order';


class Setting extends Component {

    num = 1;

    constructor(props) {
        super(props);
        this.state = {
            error:null,
            users:[],
            orders:[],
            data: {
                "firstName": localStorage.getItem('userFirstName'),
                "lastName": localStorage.getItem('userLastName'),
                "email": localStorage.getItem('userEmail'),
                "address": localStorage.getItem('userAddress'),
                "phone": localStorage.getItem('userPhone'),
                "password":localStorage.getItem('password')
            },
            pass:{
                "old":'',
                "new":''
            },
            role:'',
            isDisabled:false,
            errors: {}
        }
    }

    componentDidMount(){

        const {id} = 1;

        const role = localStorage.getItem('role');
        const usermail = localStorage.getItem('userEmail');
        console.log("customer");
        console.log(role);
        console.log(usermail);

        if(role == "Buyer") {
            axios.get(orderUrl).then(response => response.data).then(
                (result) => {
                    this.setState({
                        orders: result.filter((result) => result.customerEmail.toLowerCase() === usermail)
                    });
                    //console.log(result.customerID);
                    console.log("in");
                    console.log(this.state.orders);
                },
                (error) => {
                    this.setState({error});
                }
            )
            this.setState({isDisabled:false});
        }
        if(role == "Seller") {
            axios.get(orderUrl).then(response => response.data).then(
                (result) => {
                    this.setState({
                        orders: result.filter((result) => result.email.toLowerCase() === usermail)
                    });
                    //console.log(result.customerID);
                    console.log("in");
                    console.log(this.state.orders);
                },
                (error) => {
                    this.setState({error});
                }
            )
            this.setState({isDisabled:true});
        }
        axios.get(userUrl).then(response => response.data).then(
            (result)=>{
                this.setState({
                    users:result.filter((result)=> result.userName.toLowerCase() === usermail)
                });
                //console.log(result.customerID);
                console.log(this.state.users);
            },
            (error)=>{
                this.setState({error});
            }
        )
        console.log("yes");
        console.log(this.state.users);
        console.log("ok");

    }

    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            pass: {
                ...this.state.pass,
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
        if (data.email === '') errors.email = 'Email can not be blank.';
        if (data.address === '') errors.address = 'Address can not be blank.';
        if (data.phone === '') errors.phone = 'phone can not be blank.';


        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;

        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            console.log(data);
            //Call an api here
            /*axios.post('https://localhost:44374/api/Accounts/Customer',data)
                //Resetting the form
                .then(response => {
                    if(response.status === 201) {
                        alert("You have registered successfully")
                        this.setState(this.getInitialState());  // clean the form

                    }
                    else {
                        alert(" Error occured! please try again ");
                        console.log(response);
                    }
                })*/

        } else {
            this.setState({ errors });
        }
    }

    deleteRow(orderID,e){
        axios.delete(`https://govimithuroapi.azurewebsites.net/api/Order/${orderID}`)
            .then(res => {
                console.log(res);
                console.log(res.data);

                const orders = this.state.orders.filter(item => item.orderId !== orderID);
                this.setState({ orders });
            })
        window.location.reload(false);
    }

    DeleteCustomer(userID) {
        const { users } = this.state;
        axios.delete(userUrl   + userID).then(result=>{
            alert('Account deleted successfully!!!');
            this.setState({
                response:result,
                users:users.filter(user=>user.userID !== userID)
            });
        });
        localStorage.setItem('token', null);
        localStorage.setItem('userFirstName', "not logged in");
        localStorage.setItem('userLastName', "not logged in");
        localStorage.setItem('userAddress', "not logged in");
        localStorage.setItem('userEmail', "not logged in");
        this.props.history.push('/NotLoggedIn');
    }

    EditDetail(){
        console.log(this.state.data);
        const { data } = this.state;

        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            //console.log(data);
            //Call an api here
            axios.post(
                'https://govimithuroapi.azurewebsites.net/api/Accounts/UpdateUser',
                {Email: data.email, FirstName: data.firstName, LastName: data.lastName, Password: data.password, ConfirmPassword: data.password, Phone: data.phone, Address: data.address}
            )
                //Resetting the form
                .then(response => {
                    // if(response.status === 201) {
                    alert("Your profile updated successfully")
                    //this.setState(this.getInitialState());  // clean the form

                    //}
                    //else {
                    // alert(" Error occured! please try again ");
                    //console.log(response);
                    console.log(data);
                    localStorage.setItem('userFirstName', data.firstName);
                    localStorage.setItem('userLastName', data.lastName);
                    localStorage.setItem('userAddress', data.address);
                    localStorage.setItem('userPhone', data.phone);
                    //}
                })

        } else {
            this.setState({ errors });
        }
    }

    EditPass(){
        const { pass,data } = this.state;
        console.log(localStorage.getItem('password'));
        if(pass.old == data.password ){
            data.password = pass.new;
            axios.post(
                'https://govimithuroapi.azurewebsites.net/api/Accounts/UpdateUser',
                {Email: data.email, FirstName: data.firstName, LastName: data.lastName, Password: data.password, ConfirmPassword: data.password, Phone: data.phone, Address: data.address}
            )
                .then(response => {
                    alert("Password Change Successfully")
                })
            localStorage.setItem('password', data.password);

        }
        console.log("new");
        console.log(localStorage.getItem('password'));
        console.log("over");

    }

    render() {

        const{errors,data,orders,users,pass}=this.state;

        //data.firstName = localStorage.getItem('userFirstName');
        //data.lastName = localStorage.getItem('userLastName');
        //data.email = localStorage.getItem('userEmail');
        //data.address = localStorage.getItem('userAddress');
        //data.phone = localStorage.getItem('userPhone');

        const isAuth = this.props.isAuth;
        const useRole = localStorage.getItem('role');


        return(
            <div className="tab">
                <h4 className="title">Profile Settings</h4>
                <div>
                    <Table>
                        <thead>

                        <tr className='carthead'>
                            <th>Role  :</th>
                            <th>{useRole}</th>
                            <th>Name  :</th>
                            <th>{data.firstName}</th>
                        </tr>

                        </thead>
                    </Table>
                </div>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">General</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Security</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Delete Account</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="four">Order Details</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div>

                                        <Form >
                                            <Form.Group>
                                                <Form.Label>First Name</Form.Label>
                                                <Input value={data.firstName} invalid={errors.firstName ? true : false} name="firstName" onChange={this.handleChange}/>
                                                <FormFeedback>{errors.firstName}</FormFeedback>
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Last Name</Form.Label>
                                                <Input value={data.lastName} invalid={errors.lastName ? true : false} name="lastName" onChange={this.handleChange}/>
                                                <FormFeedback>{errors.lastName}</FormFeedback>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicAddress">
                                                <Form.Label>Address</Form.Label>
                                                <Input value={data.address} invalid={errors.address ? true : false} name="address" onChange={this.handleChange}/>
                                                <FormFeedback>{errors.address}</FormFeedback>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Telephone Number</Form.Label>
                                                <Input value={data.phone} invalid={errors.phone ? true : false} name="phone" onChange={this.handleChange}/>
                                                <FormFeedback>{errors.phone}</FormFeedback>
                                            </Form.Group>

                                            <Button variant="primary" onClick={() => this.EditDetail()}>
                                                Save Changes
                                            </Button>
                                        </Form>

                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <div>
                                        <h3>Reset Password</h3>
                                        <Form>
                                            <Form.Group controlId="formBasicPassword2">
                                                <Form.Label>Current Password</Form.Label>
                                                <Input value={pass.old} type="password" name="old" placeholder="Current Password" onChange={this.handleChange}/>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword3">
                                                <Form.Label>New Password</Form.Label>
                                                <Input value={pass.new} type="password" name="new" placeholder="New Password" onChange={this.handleChange}/>
                                            </Form.Group>
                                            <Button variant="primary" onClick={() => this.EditPass()}>
                                                Save Changes
                                            </Button>
                                        </Form>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <div className="tabdelete">

                                        <h3>Delete The Account</h3>
                                        <p>Are you sure you want to delete this account from Govimithuro Community ??</p>
                                        <p>After you delete your account it will permanetly delete and can not be recovered.</p>
                                        {users.map(user => (
                                            <Button variant="danger"  onClick={() => this.DeleteCustomer(user.id)}>
                                                Delete Account
                                            </Button>
                                        ))}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="four">
                                    <div>

                                        <h3>Order details</h3>
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Unit Price</th>
                                                <th>Option</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {orders.map(order => (
                                                <tr key={order.orderId}>
                                                    <td>{order.date}</td>
                                                    <td>{order.productName}</td>
                                                    <td>{order.quantity}</td>
                                                    <td>{order.unitPrice}</td>
                                                    <td>
                                                        <Link to={{pathname:'./DeliveryInfo',state:{orderId:order.orderId }}}>
                                                            <button className='trackingbutton' >Tracking</button>
                                                        </Link>
                                                        <Link to={{pathname:'./NewReview',state:{product:order.productName,farmermail:order.email}}}>
                                                            <button disabled={this.state.isDisabled} className='feedbackbutton'>Review</button>
                                                        </Link>
                                                        <button className='cartdeletebutton' onClick={(e) => this.deleteRow(order.orderId, e)}>Delete</button>

                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }

}

export default Setting


