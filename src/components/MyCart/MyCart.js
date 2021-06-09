import React, { useState, useEffect } from 'react'
import './../MyProducts/Product.css';  
import { Table,Button } from 'react-bootstrap'; 
import {Link} from 'react-router-dom'
import ReactExport from 'react-data-export'; 
import axios from "axios";

export default function MyCart() {
   
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [values, setValues] = useState([])
    const removeProduct = id => {
        if(window.confirm("Do you want to remove this product?")){
            cart.forEach((item, index) => {
                if(item.productId === id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
        }
    } 


 
    const reduction = id => {
        cart.forEach(item =>{
            if(item.productId === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
            }
        })
        setCart([...cart])
    }
    const increase = id => {
        cart.forEach(item =>{
            if(item.productId === id){
                item.quantity += 1 ;
            }
        })
        setCart([...cart])
        
    }
    
    useEffect(() =>{
        const getTotal = () => {
            const res = cart.reduce((prev, item) => {
                return prev + (item.unitPrice * item.quantity)
            },0)
            setTotal(res)
        }
        getTotal()
    },[cart])


    useEffect(() =>{
        localStorage.setItem('tt', total);
    },[total])
    


    useEffect(() =>{
       const dataCart =  JSON.parse(localStorage.getItem('dataCart'))
       if(dataCart) setCart(dataCart)
    },[])

    useEffect(() =>{
        localStorage.setItem('dataCart', JSON.stringify(cart))
    },[cart])



    if(cart.length === 0)
    return <h3 style={{textAlign: "center", fontSize: "4rem"}}>Cart is Empty!!!</h3>



    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    
    const DataSet = [
        {
  
          xSteps: 1, // Will start putting cell with 1 empty cell on left most
          ySteps: 2, //will put space of 2 rows,
  
            columns: [
                {title: "Product Id", style: {font: {sz: "15", bold: true}}, width: {wpx: 100}}, // width in pixels
                {title: "Product Name", style: {font: {sz: "15", bold: true}}, width: {wch: 20}}, // width in characters
                {title: "Unit Price", style: {font: {sz: "15", bold: true}}, width: {wpx: 100}}, // width in pixels
                {title: "Unit Weight(kg/l)", style: {font: {sz: "15", bold: true}}, width: {wpx: 125}}, // width in pixels
                {title: "Quantity", style: {font: {sz: "15", bold: true}}, width: {wpx: 110}}, // width in pixels
                {title: "Address", style: {font: {sz: "15", bold: true}}, width: {wch: 20}}, // width in characters
                {title: "Email", style: {font: {sz: "15", bold: true}}, width: {wch: 20}}, // width in characters
              
                
            ],
            data: cart.map((data) => [
                {value: data.productId, style: {font: {sz: "14"}, fill: {patternType: "solid", fgColor: {rgb: "3461eb"}}}},
                {value: data.productName, style: {font: {sz: "14"}, fill: {patternType: "solid", fgColor: {rgb: "ed14f5"}}}},
                {value: data.unitPrice, style: {font: {sz: "14"}, fill: {patternType: "solid", fgColor: {rgb: "3461eb"}}}},
                {value: data.unitWeight, style: {font: {sz: "14"}, fill: {patternType: "solid", fgColor: {rgb: "ed14f5"}}}},
                {value: data.quantity, style: {font: {sz: "14"}, fill: {patternType: "solid", fgColor: {rgb: "3461eb"}}}},
                {value: data.addresse, style: {font: {sz: "14"}, fill: {patternType: "solid", fgColor: {rgb: "ed14f5"}}}}, 
                {value: data.email, style: {font: {sz: "14"}, fill: {patternType: "solid", fgColor: {rgb: "3461eb"}}}},],)
        },     
    ]
    const Addproduct=(product)=>{  
        axios.post('https://govimithuroapi.azurewebsites.net/api/Order',{productName:product.productName,email:product.email ,quantity:product.quantity,unitPrice:product.unitPrice ,customerEmail:localStorage.getItem('userEmail'),customerName:localStorage.getItem('userFirstName'),date: values.date})
      .then(json => {  
        alert("Product is selected successfully");  
      })  
      } 


      const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }


    return (
    <div className="row">

                    

        <div className="container">
            <div className="col-md-12">
                
                    <div className="container text-center">
                        <h4 className="title" >MY CART</h4>
                    </div>
                </div> 
            
            <div className="col-md-12" style={{  margin: '0px 30px' }}>
            <Table striped bordered hover variant="dark"  >  
                    <thead className="btn-primary">  
                      <tr >  
                        <th className="text-center">Product</th> 
                        <th className="text-center">Product Name</th>  
                        <th className="text-center">Unit Price</th>  
                        <th className="text-center">Unit Weight(kg/l)</th> 
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Date</th>  
                        <th className="text-center">Remove</th>
                        <th className="text-center">Buy</th>
                          <th className="text-center">Review</th>
                      </tr>  
                    </thead>  
                    <tbody >  
                      {cart.map(product => (  
                        <tr key={product.productId} style={{   border: '2px solid DimGrey' }} >  
                          <td ><img src ={product.imageSrc} className="imgcard "/></td>     
                          <td className="text-center">{product.productName}</td>    
                          <td className="text-center">Rs.{product.unitPrice}</td>  
                          <td className="text-center">{product.unitWeight}</td>
                              
                          <td className="text-center"><button className="count" onClick={() => reduction(product.productId)}> - </button>
                               <span> {product.quantity} </span>
                               <button className="count" onClick={() => increase(product.productId)}> + </button>  
                            </td>
                            <td className="text-center"><div className="form-group">
                            <input className="form-control" placeholder="Fill the Date" name="date"
                                value={values.date}
                                onChange={handleInputChange} />
                        </div></td>  
                          <td className="text-center"><Button style={{ backgroundColor: 'DarkOliveGreen'}} onClick={() => removeProduct(product.productId)}>
                          <i className="far fa-trash-alt"></i></Button></td> 
                          
                          <td className="text-center "><Button style={{ backgroundColor: 'DarkSlateGray'}} onClick={() => Addproduct(
                          {productName:product.productName,email:product.email ,quantity:product.quantity,unitPrice:product.unitPrice,date: values.date})}>Buy</Button></td>
                            <td className="text-center">
                                <Link to={{pathname:'./ShowReview', state:{email:product.email,product:product.productName}}}>
                                    <Button>Review</Button>
                                </Link>
                            </td>
                        </tr>  
                      ))}  
                    </tbody>  
                  </Table> 
                  
                  <div style={{  margin: '0px 240px' }}>
                  <div className="searchcard col-md-3 right" >
           <ExcelFile 
                         filename="Govimuturo CartList" 
                         element={<Link to='./../Checkout' ><h6>Payment</h6></Link>}>
                             <ExcelSheet dataSet={DataSet} name="My CartList"/>
                             
                         </ExcelFile>         
           </div>
                  <div className="searchcard col-md-4 "  >               
               <h6>Total : Rs.{total}</h6>
           </div>
           <div><p></p></div>
           <div className="searchcard col-md-4 "  >               
               <h6>Courier Service : Rs.100</h6>
           </div>
           </div>      
            </div>
            <h5  >(It will charged Rs.100 from customers Within 10km ranges.For additinal distace, Rs.25 per 1km will be charged by Courier Service.)</h5>
               
        </div>
     
           </div >
    )
}

