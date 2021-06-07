import React from 'react'
import './css/Fontstyle.css'
import {Link} from "react-router-dom";

import notLoggedin from './../img/not_logged_in.jpg'





const NotLoggedIn = () => {
    return (
        <div className="card" style={{textAlign:'center', padding:'20px',backgroundImage:`url(${notLoggedin})`}}>

                        <div className="form-group" style={{backgroundColor:'yellow'}} >
                            <Link> <h3 style={{color:'blue'}} onClick={()=>window.location.replace('/')}> back to home page</h3></Link>
                            <Link > <p style={{ textAlign:'center'}} onClick={()=>window.location.replace('/Login')}> Login As different user</p></Link>
                        </div>

        </div>
    )
}

export default NotLoggedIn
