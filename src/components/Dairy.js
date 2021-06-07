import React from "react";
import {Link} from 'react-router-dom'

import curd from'./../dairy/curd.jpg'
import yogurt from'./../dairy/yogurt.jpg'
import freshmilk from'./../dairy/freshmilk.jpg'
import icecream from'./../dairy/icecream.jpg'
import butter from'./../dairy/butter.jpg'
import cheese from'./../dairy/cheese.jpg'

const Dairy = () =>{
    return(
        <div>
            <h4 className="title">DAIRY PRODUCTS</h4>
            <div id="imagebox">
                {
                    <div className="minicard">
                        <img src={curd} alt=""/>
                        <Link to="./About">
                            <button type="button">Curd</button>
                        </Link>
                    </div>
                }
                {
                    <div className="minicard">
                        <img src={yogurt} alt=""/>
                        <Link to="./About">
                            <button type="button">Yourgurt</button>
                        </Link>
                    </div>
                }
                {
                    <div className="minicard">
                        <img src={freshmilk} alt=""/>
                        <Link to="./About">
                            <button type="button">Fresh Milk</button>
                        </Link>
                    </div>
                }
                {
                    <div className="minicard">
                        <img src={icecream} alt=""/>
                        <Link to="./About">
                            <button type="button">Ice Cream</button>
                        </Link>
                    </div>
                }
                {
                    <div className="minicard">
                        <img src={butter} alt=""/>
                        <Link to="./About">
                            <button type="button">Butter</button>
                        </Link>
                    </div>
                }
                {
                    <div className="minicard">
                        <img src={cheese} alt=""/>
                        <Link to="./About">
                            <button type="button">Cheese</button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Dairy