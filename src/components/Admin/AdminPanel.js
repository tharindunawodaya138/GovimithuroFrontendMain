import React from 'react';  
import GetCustomers from './GetCustomers';  
import GetFarmers from './GetFarmers';  
import GetProducts from './GetProducts';
import ProductCheck from './ProductCheck';
import GetOrders from './GetOrders'; 
import GetCarts from './GetCarts';  
import GetOrderDetails from './GetOrderDetails';   
import GetCategories from './GetCategories';
import GetFeedback from "./GetFeedback";
import GetClientQuery from "./GetClientQuery";
import EditCategory from "./EditCategory";
import NewCategory from "./NewCategory";

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';  
import './AdminPanel.css';  

function AdminPanel() {  
  return (  
    <Router>  
      <div className="container">  
        <nav className="navbar  navheader" >  
          <div  >  
            <ul  >  
              <li className="nav-item" >  
                <Link to={'/GetCustomers'} className="nav-link">Customers</Link>  
              </li>  
              <li className="nav-item">  
                <Link to={'/GetFarmers'} className="nav-link">Farmers</Link>  
              </li> 
              <li className="nav-item">  
                <Link to={'/GetProducts'} className="nav-link">Products</Link>  
              </li> 
              <li className="nav-item">
                <Link to={'/ProductCheck'} className="nav-link">ProductCheck</Link>
              </li>
              <li className="nav-item">  
                <Link to={'/GetOrders'} className="nav-link">Orders</Link>  
              </li>  
              <li className="nav-item">  
                <Link to={'/GetCarts'} className="nav-link">Bill Details</Link>  
              </li> 
              
              <li className="nav-item">  
                <Link to={'/GetCategories'} className="nav-link">Prices</Link>  
              </li>
              <li className="nav-item">
                <Link to={'/GetFeedback'} className="nav-link">Feedbacks</Link>
              </li>
              <li className="nav-item">
                <Link to={'/GetClientQuery'} className="nav-link">Client Queries</Link>
              </li>
            </ul>  
          </div>  
        </nav> <br />  
        <Switch>  
          <Route exact path='/GetCustomers' component={GetCustomers} />  
          <Route path='/GetFarmers' component={GetFarmers} />  
          <Route path='/GetProducts' component={GetProducts} />  
          <Route path='/ProductCheck' component={ProductCheck} /> 
          <Route path='/GetOrders' component={GetOrders} />  
          <Route path='/GetCarts' component={GetCarts} /> 
          <Route path='/GetOrderDetails' component={GetOrderDetails} /> 
          <Route path='/GetCategories' component={GetCategories} />
          <Route path='/GetFeedback' component={GetFeedback} />
          <Route path='/GetClientQuery' component ={GetClientQuery}/>
          <Route path='/EditCategory' component={EditCategory}/>
          <Route path='/NewCategory' component={NewCategory}/>
        </Switch>  
      </div>  
    </Router>  
  );  
}  
  
export default AdminPanel;
       
    
