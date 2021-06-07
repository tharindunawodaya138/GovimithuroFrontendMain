import React, {useState} from "react";
import './css/login.css'
import {Link} from "react-router-dom";
import axios from 'axios';



const LoginForm = () => {

    const [loginData, setLoginData] =useState ({
        role:'',
        email: '',
        password:''
    });

    const {email,  password} = loginData;
    const onChange = e => setLoginData({...loginData,[e.target.name]:e.target.value})
    const onSubmit =async e=> {
        e.preventDefault();
        console.log("this is login data");
        console.log(loginData);

        axios.post(
            'https://govimithuroapi.azurewebsites.net/api/Accounts/Login',
            {Email: loginData.email, Password: loginData.password}
        )
            .then(response=> {
               // console.log("this is user details from login page");
                //console.log(response.data);
                if(response.status === 200){ // check if the response is success
                    console.log("inside redirect" + response.data.userRole);
                                                                      // Store the token and other details in a local storage
                    localStorage.setItem('role', response.data.userRole);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userFirstName', response.data.userFirstName);
                    localStorage.setItem('userLastName', response.data.userLastName);
                    localStorage.setItem('userEmail', response.data.userEmail);
                    localStorage.setItem('userAddress', response.data.userAddress);
                    localStorage.setItem('userPhone', response.data.userPhone);
                    localStorage.setItem('password',loginData.password);

                   // const token = response.data.token;
                                                           //send token to decode
                    //const payload =  parseJwt(token);
                                                           // send payload to find role
                    //const role = findRole(payload);
                    //localStorage.setItem('role', role);
                   // console.log(role);
                    const role= localStorage.getItem('role');
                    if( role ==="Buyer"){            alert("YOU ARE WELCOME TO GOVIMITHURO ! Customer login"); window.location.replace('/') }
                    if( role ==="Seller"){           alert("YOU ARE WELCOME TO GOVIMITHURO ! Seller login");   window.location.replace('/')  }
                    if( role ==="Administrator"){    alert("YOU ARE WELCOME TO GOVIMITHURO ! Admin login");    window.location.replace('/') }

                }
                else {
                    alert("Invalid Credentials!")
                }
            })
            .catch(error => {
                console.log(error);
                if(error === "Invalid Authentication" )
                {
                    alert("User name or password invalid ! try again");
                }
                else {
                    console.log(" this is loggin error :" + error );
                    alert("Invalid Credentials!");
                }
            })

    }

    // // this function decodes the JWT token
    // function parseJwt(token){
    //     const base64Url = token.split('.')[1];
    //     const base64    = base64Url.replace(/-/g,'+').replace(/_/g,'/');
    //     const jsonPayload =decodeURIComponent(atob(base64).split('').map(function (c){
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join(''));
    //     return JSON.parse(jsonPayload);
    // }
    //
    //
    // // this function finds the role from the JWT token
    // function findRole(payload){
    //     for(var propName in payload){
    //         if(payload.hasOwnProperty(propName)){
    //             var propValue = payload[propName];
    //             //console.log(propValue);
    //             if(propValue === "Buyer"){
    //                 return "Buyer"
    //             }
    //             if(propValue === "Administrator"){
    //                 return "Administrator"
    //             }
    //             if(propValue === "Seller"){
    //                 return "Seller"
    //             }
    //
    //         }
    //     }
    // }

    return(
        <div >
            <form onSubmit={e=> onSubmit(e)}>
                <h3 style={{textAlign:'center' ,height:'10px'}}>  USER LOGIN </h3>
                <div className="div_back">
                   <div >
                       <label className="datalabel"> USER NAME</label>
                       <input
                           className="datainput"
                           type="text"
                           placeholder="Enter email"
                           name="email"
                           required
                           value={email}
                           onChange={(e)=> onChange(e)}
                       />
                   </div>
                    <div >
                        <label className="datalabel"> PASSWORD </label>
                        <input

                            type="password"
                            placeholder="Enter password "
                            name="password"
                            required
                            value={password}
                            onChange={(e)=> onChange(e)}
                            minLength="5"
                        />
                    </div>
                    <button className="loginbutton" > Login</button>
                </div>
            </form>
               <div>
                   <p style={{backgroundColor: "lightgray", textAlign: "center"}}>
                       Don't have an account? <Link to="./Register">Sign Up</Link>
                   </p>
               </div>

        </div>

    )
}


export default LoginForm