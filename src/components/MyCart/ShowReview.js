import React,{Component} from "react";
import {Form,Button,Table} from "react-bootstrap";
import axios from "axios";

const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/Reviews/';

class ShowReview extends Component{

    constructor(props){
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        data:{
            "email": this.props.location.state.email,
            "product": this.props.location.state.product
        },
        reviews:[],
        errors:{},
    });

    componentDidMount(){
        axios.get(apiUrl ).then(response => response.data).then(
            (result)=>{
                this.setState({
                    reviews:result.filter((result) => result.farmerEmail.toLowerCase() === this.state.data.email)
                });
            },
            (error)=>{
                this.setState({error});
            }
        )
    }

    render() {
        const {data,errors,reviews} = this.state;
        return(
            <div className="container">
                <div className="col-md-12">

                    <div className="container text-center">
                        <h4 className="title" >REVIEWS</h4>
                        <h3 className="title">Here show the result for relevant Farmer</h3>
                    </div>
                </div>
                <div className="col-md-12" style={{  margin: '0px 30px' }}>
                <Table striped bordered hover variant="light">
                    <thead className="btn-primary">
                    <tr >
                        <th className="text-center">Date</th>
                        <th className="text-center">From</th>
                        <th className="text-center">Product</th>
                        <th className="text-center">Review</th>
                        <th className="text-center">Rank</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reviews.map(review => (
                        <tr key={review.reviewID} style={{   border: '2px solid DimGrey' }} >
                            <td className="text-center">{review.date}</td>
                            <td className="text-center">{review.customerName}</td>
                            <td className="text-center">{review.product}</td>
                            <td className="text-center">{review.reviews}</td>
                            <td className="text-center">{review.rank}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            </div>
        )
    }

}

export default ShowReview;