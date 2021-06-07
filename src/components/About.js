import React from 'react'
import './css/Fontstyle.css'
import { Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import about_background from './../img/about_background.jpg'

const About = () => {
  return (
    <div>
      <div className="container" >
        <h4 className="title">ABOUT</h4>
        <div id="Registerbox">
             <div className="box" style={{ backgroundImage: `url(${about_background})`,backgroundSize: 'cover'}}>
      <Row>
        <p class = "para">This project is aimed at how the farmers can improve the efficiency of 
          transaction between buyers so that the quality and the freshness of the product will be 
          saved until it reaches to the consumers. Not only for whole sellers, it also facilitate ordinary people to 
          buy from farmer directly as convenience.  </p>

          <p class = "para">The outcome consists of web application and mobile app. Each transaction is done 
            through the website so that 1% of commission will be charged per transaction.  </p>
          
            <p class = "para">Buyer should pay 10% of the order bill through online.Balance can be paid to the farmer 
              directly when buying the.</p>
              
              <p class = "para">Farmers can collect other 9%  from the agricultural center in their area directly. </p>
              </Row>
              </div>
              </div>
              <Link to="./Feedback">
                    <Button variant="danger" type="button">GIVE US YOUR Feedbacks/Complaints</Button>
                  </Link>
      </div>
    </div>
  )
}

export default About
