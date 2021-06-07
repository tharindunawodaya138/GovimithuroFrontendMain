import React, { Fragment } from 'react';
import {Link} from "react-router-dom";

function Footer(props) {
    return (
        <Fragment>
            
           <div id="Footerbox">
             <div className="fbox">
            <p  className ="color2">&copy; Govimithuro {""}
            <span> ................................. {""}</span>
            <span> E-mail : Govimithuro@gmail.com {""}</span>
                <span> ................................. {""}</span>
                <Link to={'/ClientQuery'}> <span> Message Us{""}</span></Link>
            <span> ................................. {""}</span>
            {""}Contact : +034 2249401 </p>
            </div>
            </div> 
            
            
        </Fragment>   
    );
}

export default Footer;
