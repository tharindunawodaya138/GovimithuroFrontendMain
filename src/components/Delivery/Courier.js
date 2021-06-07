import React from 'react';
import { Button, Card} from 'react-bootstrap';

import axios from 'axios';
import {CardBody, CardText, CardTitle, Form, FormFeedback, FormGroup, Input} from "reactstrap";
import {Link} from "react-router-dom";


const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/DeliveryInfo/';

class Courier extends React.Component{
    constructor(props){

        super(props);
        this.state = {
            error:null,
            deliveries:[],
            dispute:{
                notReceived:'',
                disputeMessage:''
            },
            deliveryState:{
              accepted: '',
              transit: '',
              delivered: '',
              expectedDelivery: ''
            },
            response: {}
        }
    }

    componentDidMount(){
        //////////////////////////////////////////////////////////////////////////////////////////
       // localStorage.setItem("DeliveryItem",2); //<============================== to check only
/////////////////////////////////////////////////////////////////////////////////////////////////////
        axios.get(apiUrl ).then(response => response.data).then(
            (result)=>{

                this.setState({
                    deliveries:result,
                })

                console.log(result);
            },
            (error)=>{
                this.setState({error});
            }
        )
    }


    // DeleteDeliveryInfo(deliveryID) {
    //     const { deliveries } = this.state;
    //     axios.delete(apiUrl   + deliveryID).then(result=>{
    //         alert('Delivery Data deleted successfully!!!');
    //         this.setState({
    //             response:result,
    //             deliveries:deliveries.filter(delivery=>delivery.deliveryID !== deliveryID)
    //         });
    //     });
    // }

    handleChange = (e) => {
        this.setState({
            deliveryState: {
                ...this.state.deliveryState,
                [e.target.name]: e.target.value
            }
        });
    }



    saveChange(delivery) {

        const data = {
            deliveryId: delivery.deliveryId,
            orderId: delivery.orderId,
            boughtDate: delivery.boughtDate,
            productName: delivery.productName,
            quantity: delivery.quantity,
            farmerName: delivery.farmerName,
            farmerEmail: delivery.farmerEmail,
            farmerAddress: delivery.farmerAddress,
            farmerPhone: delivery.farmerPhone,
            customerName: delivery.customerName,
            customerEmail: delivery.customerEmail,
            customerPhone: delivery.customerPhone,
            customerAddress: delivery.customerAddress,
            accepted: this.state.deliveryState.accepted,
            transit: this.state.deliveryState.transit,
            delivered: this.state.deliveryState.delivered,
            expectedDelivery:this.state.deliveryState.expectedDelivery,
            notReceived: delivery.notReceived,
            disputeMessage:  delivery.disputeMessage
        }

        axios.put(apiUrl + delivery.deliveryId, data )
            .then(res=>{
                if(res.status === 204){
                    alert("save changed successful");
                }

            })
            .catch(error => {
                console.log(error);
                alert("not successful")
            })
    }



    render(){
        const{error,deliveries}=this.state;
        const orderID = localStorage.getItem("DeliveryItem");

        if(error){
            return(
                <div className="center"><h4>Error : {error.message}!!!</h4></div>
            )
        }
        else
        {
            // const delivery = deliveries.filter(e => e.orderId === 2)
            // console.log("filtered data");
            // console.log(delivery);
            return(
                <div className="container">
                    <Card style={{width:'30rem'}}>
                        {deliveries.filter((delivery)=> (delivery.orderId === parseInt(orderID))).map(delivery => (
                            <CardBody key = {delivery.id} >

                                <CardTitle> Govimithuro Delivery</CardTitle>
                                <CardText >
                                    Delivery Id : {delivery.deliveryId}
                                </CardText>
                                <CardText >
                                    Order Id : {delivery.orderId}
                                </CardText>
                                <CardText >
                                    Product Name : {delivery.productName}
                                </CardText>
                                <CardText >
                                    Quantity : {delivery.quantity}
                                </CardText>
                                <CardText >
                                    Bought Date : {delivery.boughtDate}
                                </CardText>
                                <CardText >
                                    Seller Name : {delivery.farmerName}
                                </CardText>
                                <CardText >
                                    Seller Address : {delivery.farmerAddress}
                                </CardText>
                                <CardText >
                                    Seller phone no : {delivery.farmerPhone}
                                </CardText>
                                <CardText >
                                    Seller Email : {delivery.farmerEmail}
                                </CardText>
                                <CardText >
                                    Customer Name : {delivery.customerName}
                                </CardText>
                                <CardText >
                                    Customer Address : {delivery.customerAddress}
                                </CardText>
                                <CardText >
                                    Customer phone no : {delivery.customerPhone}
                                </CardText>
                                <CardText >
                                    Customer Email : {delivery.customerEmail}
                                </CardText>
                                <CardText >
                                    Estimated Delivery :
                                    <Input Value={delivery.expectedDelivery} name="expectedDelivery" onChange={this.handleChange}/>
                                </CardText>
                                <CardText >
                                    Accepted by Courier :
                                    <Input Value={delivery.accepted} name="accepted" onChange={this.handleChange}/>
                                </CardText>
                                <CardText >
                                    Transit :
                                    <Input Value={delivery.transit} name="transit" onChange={this.handleChange}/>
                                </CardText>
                                <CardText >
                                    Delivered :
                                    <Input Value={delivery.delivered} name="delivered" onChange={this.handleChange}/>
                                </CardText>
                                <CardText>
                                    <b> Wait for estimated time before submit dispute !</b> <br/>
                                    Not Received :{delivery.notReceived}
                                </CardText>
                                <CardText>
                                    Dispute Message :{delivery.disputeMessage}
                                </CardText>
                                <Link to={'/Admin/AdminPanel'}> Go back</Link>
                                <Button variant="primary" onClick={()=> this.saveChange(delivery)}> Save change </Button>

                            </CardBody>
                        ))}

                    </Card>
                </div>
            )
        }
    }



}



export default Courier