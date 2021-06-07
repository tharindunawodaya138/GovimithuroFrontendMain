import React, {Component} from "react";
import {Link} from 'react-router-dom'


import './css/imgbox.css'

import banana from'./../fruit/banana.jpg'
import mango from './../fruit/mango.jpg'
import pineapple from'./../fruit/pineapple.jpg'
import avacado from './../fruit/avocados.jpg'
import blue_grapes from'./../fruit/blue grapes.jpg'
import guawa from './../fruit/guava.jpg'
import papaya from'./../fruit/papaya.jpg'
import orange from './../fruit/orange.jpg'
import dragon_fruit from './../fruit/dragon_fruit.jpg'
import Katu_anoda from './../fruit/Katu_Anoda.jpg'
import Rambutan from './../fruit/rambutan.jpg'
import Uguressa from './../fruit/uguressa.jpg'
import strawberry from './../fruit/strawberry.jfif'

class Fruit extends Component{
render() {

    return(
        <div>
            <h4 className="title">FRUITS</h4>
            <div id="imagebox">
                {
                    <div className="minicard" >
                        <img src={banana} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'Banana'}  }} >
                            <button type="button">Banana</button>

                        </Link>

                    </div>

                }


                {
                    <div className="minicard">
                        <img src={mango} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'mango'}  }} >
                            <button type="button">Mango</button>
                        </Link>
                    </div>
                }

                {
                    <div className="minicard">
                        <img src={pineapple} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'Pineapples'}  }} >
                            <button type="button">Pineapple</button>
                        </Link>
                    </div>
                }

                {
                    <div className="minicard">
                        <img src={blue_grapes} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'Grapes'}  }} >
                            <button type="button">Grapes</button>
                        </Link>
                    </div>
                }
                {
                    <div className="minicard">
                        <img src={guawa} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'Guawa'}  }} >
                            <button type="button">Guawa</button>
                        </Link>
                    </div>
                }
                {
                    <div className="minicard">
                        <img src={avacado} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'Avacado'}  }} >
                            <button type="button">Avacado</button>
                        </Link>
                    </div>
                }
                {
                    <div className="minicard">
                        <img src={dragon_fruit} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'Dragon Fruit'}  }} >
                            <button type="button">Dragon fruit</button>
                        </Link>
                    </div>
                }

                {
                    <div className="minicard">
                        <img src={strawberry} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'Strawberry'}  }} >
                            <button type="button">Strawberry</button>
                        </Link>
                    </div>
                }

                {
                    <div className="minicard">
                        <img src={Katu_anoda} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'Katu anoda'}  }} >
                            <button type="button">Katu anoda</button>
                        </Link>
                    </div>
                }
                {
                    <div className="minicard">
                        <img src={orange} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'Orange'}  }} >
                            <button type="button">Orange</button>
                        </Link>
                    </div>
                }
                {
                    <div className="minicard">
                        <img src={pineapple} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'Pineapple'}  }} >
                            <button type="button">Pineapple</button>
                        </Link>
                    </div>
                }
                {
                    <div className="minicard">
                        <img src={Uguressa} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'Uguressa'}  }} >
                            <button type="button">Uguressa</button>
                        </Link>
                    </div>
                }
                {
                    <div className="minicard">
                        <img src={Rambutan} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'Rambutan'}  }} >
                            <button type="button">Rambutan</button>
                        </Link>
                    </div>
                }
                {
                    <div className="minicard">
                        <img src={papaya} alt=""/>
                        <Link to={{pathname:'./SearchResult', state:{name:'Papaya'}  }} >
                            <button type="button">Papaya</button>
                        </Link>
                    </div>
                }


            </div>

        </div>
    )
}


}


export default Fruit

