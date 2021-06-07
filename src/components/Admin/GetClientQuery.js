import React from 'react';
import {Button, Table} from 'react-bootstrap';
import axios from "axios";
import './AdminPanel.css'


const apiUrl = 'https://govimithuroapi.azurewebsites.net/api/ClientQuery/';

class GetClientQuery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error:null,
            queries:[],
            response: {}

        }
        console.log("run GEtclientquery constructor");
    }

    componentDidMount(){

        axios.get(apiUrl).then(response => response.data).then(
            (result)=>{
                this.setState({
                   queries: result
                });
            },
            (error)=>{
                this.setState({error});
                console.log("inside query error"+ error);
            }
        )
    }


    DeleteFeedback(queryId){
        const { queries } = this.state;
        axios.delete(apiUrl   + queryId).then(result=>{
            alert('Query deleted successfully!');
            this.setState({
                response:result,
                queries:queries.filter(query=>query.queryId !== queryId)
            });
        });
    }

    render(){
        const{error,queries}=this.state;
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
                                <th>Query Id</th>
                                <th>Email Address</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Option</th>

                            </tr>
                            </thead>
                            <tbody>
                            {queries.map(query => (
                                <tr key={query.queryId}>
                                    <td>{query.queryId}</td>
                                    <td>{query.email}</td>
                                    <td>{query.title}</td>
                                    <td>{query.description}</td>
                                    <td>
                                        <Button style={{ backgroundColor: 'Brown',border: '2px solid DimGrey',borderRadius: '5px'}}
                                                onClick={() => this.DeleteFeedback(query.queryId)}>
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

export default GetClientQuery