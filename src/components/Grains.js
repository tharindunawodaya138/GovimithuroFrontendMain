import React from "react";
import {Link} from 'react-router-dom'

import './css/imgbox.css'
import rice from'./../grains/rice.jpg'
import greengram from './../grains/greengrams.jpg'
import cowpea from './../grains/cowpea.jpg'
import grams from './../grains/grams.jpg'
import wheat from './../grains/wheat.jpg'
import dal from './../grains/dal.jpg'

const Grain = () => {
    return(
        <div>
        <h4 className="title">FOODGRAINS</h4>
        <div id="imagebox">
            {
                <div className="minicard">
                    <img src={rice} alt=""/>
                    <Link to="./About">
                        <button type="button">Rice</button>
                    </Link>
                </div>
            }
            {
                <div className="minicard">
                    <img src={greengram} alt=""/>
                    <Link to="./About">
                        <button type="button">Green Grams</button>
                    </Link>
                </div>
            }
            {
                <div className="minicard">
                    <img src={cowpea} alt=""/>
                    <Link to="./About">
                        <button type="button">Cowpea</button>
                    </Link>
                </div>
            }
            {
                <div className="minicard">
                    <img src={grams} alt=""/>
                    <Link to="./About">
                        <button type="button">Grams</button>
                    </Link>
                </div>
            }
            {
                <div className="minicard">
                    <img src={wheat} alt=""/>
                    <Link to="./About">
                        <button type="button">Wheat</button>
                    </Link>
                </div>
            }
            {
                <div className="minicard">
                    <img src={dal} alt=""/>
                    <Link to="./About">
                        <button type="button">Dal</button>
                    </Link>
                </div>
            }
        </div>
    </div>
    )
}

export default Grain