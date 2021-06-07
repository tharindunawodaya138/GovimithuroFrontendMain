import React from 'react';
import {Button, Table} from 'react-bootstrap';
import axios from 'axios';


const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/OrderDetails/';

class GetFeedback extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error:null,
            feedbacks:[],
            response: {}

        }
    }

    componentDidMount(){
        axios.get(apiUrl ).then(response => response.data).then(
            (result)=>{
                this.setState({
                    feedbacks:result
                });
            },
            (error)=>{
                this.setState({error});
            }
        )
    }

    DeleteFeedback(feedId) {
        const { feedbacks } = this.state;
        axios.delete(apiUrl   + feedId).then(result=>{
            alert('Feedback deleted successfully!!!');
            this.setState({
                response:result,
                products:feedbacks.filter(feedback=>feedback.orderId !== feedId)
            });
        });
    }

    render(){
        const{error,feedbacks}=this.state;
        if(error){
            return(
                <div className="center"><h4>Error : {error.message}!!!</h4></div>
            )
        }
        else
        {
            return(
                <div >

                    <div style={{ backgroundColor: 'LightGrey', margin: '5px 5px'}} >

                        <Table striped bordered hover variant="dark">
                            <thead className="btn-primary">
                            <tr>
                                <th>Email Address</th>
                                <th>Feedback</th>
                                <th>Option</th>

                            </tr>
                            </thead>
                            <tbody>
                            {feedbacks.map(feedback => (
                                <tr key={feedback.orderId}>
                                    <td>{feedback.email}</td>
                                    <td>{feedback.feedback}</td>
                                    <td>
                                        <Button style={{ backgroundColor: 'Brown',border: '2px solid DimGrey',borderRadius: '5px'}}
                                                onClick={() => this.DeleteFeedback(feedback.orderId)}>
                                            Delete
                                        </Button>
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            )
        }
    }
}

export default GetFeedback