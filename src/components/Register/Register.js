import React from 'react'
import { Link } from 'react-router-dom'
import './../css/imgbox.css'
import './../css/Fontstyle.css'

import customericon from './../../img/customer-icon.jpg'
import farmericon from './../../img/farmer-icon.JPG'




const Register = () => {
  return (
    <div className="Container">
        <h4 className="title">REGISTER</h4>
    <div id="imagebox">
      {
      <div className="card">
      <img src={farmericon} alt="" />
      <div className="content">
      <span>Register as a farmer </span>
      <Link to="./FarmerRform">
     <button type="button">Register</button>
      </Link>
      </div>
      </div> 
      }
      {
      <div className="card">
      <img src={customericon} alt="" />
      <div className="content">
      <span>Register as a customer </span>
      <Link to="./CustomerRform">
     <button type="button">Register</button>
      </Link>
      </div>
      </div> 
      }
      
    </div>
    </div>
  )
  
}

export default Register