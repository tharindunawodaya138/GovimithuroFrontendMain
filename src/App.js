import React, { Component } from 'react';
import Navbar from './components/Navbar'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './components/Home'
import Register from './components/Register/Register'
import CustomerRForm from './components/Register/CustomerRForm'
import FarmerRForm from './components/Register/FarmerRForm'
import NotLoggedIn from "./components/NotLoggedIn";
import Search from './components/Search/Search'
import ProductList from './components/MyProducts/ProductList'
import Orders from './components/MyProducts/Orders'
import About from './components/About'
import Feedback from './components/Feedback'
import Footer from './components/Footer'






import Description from "./components/Description";
import DeliveryInformation from "./components/Delivery/DeliveryInformation";
import Courier from "./components/Delivery/Courier";

import Fruitvegitables from './components/Categories/Fruitvegitables'
import Fruits from './components/Categories/Fruits'
import Vegitables from './components/Categories/Vegitables'
import Foodgrains from './components/Categories/Foodgrains'
import DairyProducts from './components/Categories/DairyProducts'
import Others from './components/Categories/Others'

//import LoginForm from "./components/LoginForm";
//import AddProduct from './components/AddProduct'
//import MyProduct from './components/MyProduct'
//import SearchResult from './components/SearchResult';
//import Checkout from './components/Checkout';
//import Receipt from './components/Receipt';


import AdminPanel from './components/Admin/AdminPanel'
import GetCustomers from './components/Admin/GetCustomers'
import GetFarmers from './components/Admin/GetFarmers'
import GetProducts from './components/Admin/GetProducts'
import ProductCheck from './components/Admin/ProductCheck'
import GetOrders from './components/Admin/GetOrders'
import GetCarts from './components/Admin/GetCarts'
import GetOrderDetails from './components/Admin/GetOrderDetails'
import GetCategories from './components/Admin/GetCategories'
import GetClientQuery from './components/Admin/GetClientQuery'
import EditCategory from "./components/Admin/EditCategory";

import MyCart from './components/MyCart/MyCart'

import Login from './components/Login'
import Cart from './components/Cart'
import ClientQuery from './components/ClientQuery';



import LoginForm from "./components/LoginForm";
import SearchResult from './components/SearchResult';
import Checkout from './components/Checkout';
import Receipt from './components/Receipt';


import EditCart from "./components/EditCart";
//import Setting from "./components/Setting"

import axios from "axios";


import Setting from "./components/Setting"
import Price from "./components/Price"

import NewReview from "./components/Review/NewReview";
import ShowReview from "./components/MyCart/ShowReview";



class App extends Component {

  state = {
    isAuth:'Unauthorized'
  };

  componentDidMount=()=> {
    console.log(localStorage.getItem('token'));

    const config = {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    }
    axios.get('https://govimithuroapi.azurewebsites.net/api/Accounts/User' ,config).then(
        res=> {
          console.log(res);
          this.setState({
            isAuth: res.data
          })
        },
        err => {
          console.log(err);
          this.setState({
            isAuth: 'Unauthorized'
          })
        }
    )

  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar isAuth={this.state.isAuth}/>
          <Route exact path='/' render ={(props) => <Home{...props} isAuth={this.state.isAuth} />}/>
          <Route path='/Register/Register' component={Register} />
          <Route path='/Register/CustomerRForm' component={CustomerRForm} /> 
          <Route path='/Register/FarmerRForm' component={FarmerRForm} />   
          <Route path='/Search/Search' component={Search} />
          <Route path='/MyProducts/ProductList' component={ProductList} /> 
          <Route path='/MyProducts/Orders' component={Orders} /> 
          <Route path='/About' component={About} />
          <Route path='/Feedback' component={Feedback} />
          <Route path='/MyCart/MyCart' component={MyCart} /> 

          <Route path='/Categories/Fruitvegitables' component={Fruitvegitables} />
          <Route path='/Categories/Fruits' component={Fruits} /> 
          <Route path='/Categories/Vegitables' component={Vegitables} /> 
          <Route path='/Categories/Foodgrains' component={Foodgrains} /> 
          <Route path='/Categories/DairyProducts' component={DairyProducts} /> 
          <Route path='/Categories/Others' component={Others} />   

          <Route path='/Admin/AdminPanel' component={AdminPanel} /> 
          <Route path='/Admin/GetCustomers' component={GetCustomers} /> 
          <Route path='/Admin/GetFarmers' component={GetFarmers} /> 
          <Route path='/Admin/GetProducts' component={GetProducts} />
          <Route path='/Admin/ProductCheck' component={ProductCheck} />  
          <Route path='/Admin/GetOrders' component={GetOrders} /> 
          <Route path='/Admin/GetCarts' component={GetCarts} /> 
          <Route path='/Admin/GetOrderDetails' component={GetOrderDetails} /> 
          <Route path='/Admin/GetCategories' component={GetCategories} />
          <Route path='/Admin/EditCategory' component={EditCategory}/>
          <Route path='/Admin/GetClientQuery' component={GetClientQuery}/>

          <Route path='/NotLoggedIn' component={NotLoggedIn}/>
          <Route path='/Login' component={Login} />  
          <Route path='/Cart' component={Cart} />

          <Route path='/LoginForm' component={LoginForm}/>
          
          <Route path='/SearchResult' component={SearchResult} />
          <Route path='/EditCart' component={EditCart}/>
          <Route path='/ClientQuery' component={ClientQuery}/>

          <Route path='/DeliveryInfo' component={DeliveryInformation}/>
          <Route path='/Courier' component={Courier}/>

          <Route path='/Checkout' component={Checkout}/>
          <Route path='/Receipt' component={Receipt}/>

          <Route path='/Description' component={Description} />
          <Route path='/Setting' component={Setting}/>
          <Route path='/NewReview' component={NewReview}/>
          <Route path='/MyCart/ShowReview' component={ShowReview}/>
          <Route path='/Price' component={Price}/>

          <Footer />
        </div>
       
      </BrowserRouter>
    );
  }
}

export default App;

