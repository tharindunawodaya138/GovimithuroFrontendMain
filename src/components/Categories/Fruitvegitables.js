import React, { useState, useEffect } from 'react'
import axios from "axios";
import './../MyProducts/Product.css';  
import Cartsvg from './../../img/shoppingcart.svg'
import {Link} from 'react-router-dom'

export default function Fruitvegitables() {
    const [product, setProductList] = useState([])
    const [cart, setCart] = useState([])
    const [visible, setVisible] = useState(6)
  
   const addCart = (id) =>{
        const check = cart.every(item =>{
            return item.productId !== id
        })
        if(check && localStorage.getItem('role')=== 'Buyer' && localStorage.getItem('token')!== 'null'){
            const data = product.filter(product =>{
                return product.productId=== id
            })
            setCart([...cart, ...data])
            
        }else{
            alert("This product has been already added to cart.")
            
        }
    } 
    
    useEffect(() =>{
       const dataCart =  JSON.parse(localStorage.getItem('dataCart'))
       if(dataCart) setCart(dataCart)
    },[])

    useEffect(() =>{
        localStorage.setItem('dataCart', JSON.stringify(cart))
    },[cart])

    useEffect(() => {
        refreshProductList();
    })

    const productAPI = (url = 'https://govimithuroapi.azurewebsites.net/api/Product/') => {
        return {
            fetchAll: () => axios.get(url),
         
        }
    }

    function refreshProductList() {
        productAPI().fetchAll()
            .then(res => {
                setProductList(res.data)
            })
            .catch(err => console.log(err))
    }


    const imageCard = data => (
        <div className="productminicard" style={{ backgroundColor: 'white'  }} >
            <img src={data.imageSrc} style={{  margin: '0px 30px' }} className="productcard-img-top thumbnail" alt ="Add_produt_image" />
            <div  >
                <b><h6> {data.productName}</h6></b>
                <span> Rs.{data.unitPrice}</span> <br />
                <span>Weight(kg)-{data.unitWeight}</span> <br />
                <span>Address - {data.addresse}</span> <br />
                <span>Quantity - {data.availableQuantity}</span> <br />
                <span>Description - {data.productDescription}</span> <br /> 
                <button className="btn btn-light delete-button" onClick={() => addCart(data.productId)}>
                <i class="fas fa-cart-arrow-down"></i>
                </button>
            </div>
        </div>
    )

    const showmoreProducts =()=>{
        setVisible ((prevValue)=>prevValue + 6)}


    return (
             
            <div className="row">
            <div className="col-md-11">
                <div >
                    <div className="container ">
                        <h4 className="title" >FRUITVEGITABLES</h4>
                    </div>
                </div>
            </div>
            <div className="col-md-1">
                <div >
                    <div className="container cartcard  right">
                    <Link to='./../MyCart/MyCart'>
                    <div   className="cart-icon ">      
                    <img src={Cartsvg} alt="" width="40" /> 
                     <span >{cart.length}</span>   
                     </div></Link>
                    </div>
                </div>
            </div>   
            
            <div className="col-md-12" style={{  margin: '0px 30px' }}>
                <table >
                    <tbody >
                        {
                           
                            
                            product.filter((productList)=>((productList.categoryName.toLowerCase()==='fruitvegitables')||(productList.categoryName.toLowerCase()==='fruitvegitable')))
                            .slice(0,visible).map((productList) =>
                                <tc>
                                    <td >{imageCard(productList)}</td>   
                                </tc>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <button className="container btnloadmore hover" onClick={showmoreProducts}><b>Load more. . . . . .</b></button>
        </div>
    )
}
