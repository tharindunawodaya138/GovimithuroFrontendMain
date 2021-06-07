import React, { useState, useEffect } from 'react'
import Product from './Product'
import axios from "axios";
import './Product.css';  
import {Link} from 'react-router-dom'

export default function ProductList() {
    const [productList, setProductList] = useState([])
    const [checkList, setCheckList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(() => {
        refreshProductList();
        refreshCheckList();
    },
    {})

    const productAPI = (url = 'https://govimithuroapi.azurewebsites.net/api/Product/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post('https://govimithuroapi.azurewebsites.net/api/ProductChecks/', newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id),
            checkAll: () => axios.get('https://govimithuroapi.azurewebsites.net/api/ProductChecks/'),
            deleteCheck: id => axios.delete('https://govimithuroapi.azurewebsites.net/api/ProductChecks/' + id)
        }
    }

    function refreshProductList() {
        productAPI().fetchAll()
            .then(res => {
                setProductList(res.data)
            })
            .catch(err => console.log(err))
    }
    function refreshCheckList() {
        productAPI().checkAll()
            .then(res => {
                setCheckList(res.data)
            })
            .catch(err => console.log(err))
    }

    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('productId') === "0" && localStorage.getItem('role')=== 'Seller' && localStorage.getItem('token')!== 'null')
        productAPI().create(formData)
                .then(res => {
                    onSuccess();
                    refreshProductList();
                    refreshCheckList();
                })
                .catch(err => console.log(err))
        else
        productAPI().update(formData.get('productId'), formData)
                .then(res => {
                    onSuccess();
                    refreshProductList();
                    refreshCheckList();
                })
                .catch(err => console.log(err))

    }

    const showRecordDetails = data => {
        setRecordForEdit(data)
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this product?'))
        productAPI().delete(id)
                .then(res => refreshProductList())
                .catch(err => console.log(err))
    }

    const onDeleteCheck = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this product?'))
        productAPI().deleteCheck(id)
                .then(res => refreshCheckList())
                .catch(err => console.log(err))
    }
    const imageCard = data => (
        <div className="productminicard" style={{ backgroundColor: 'white'  }} onClick={() => { showRecordDetails(data) }}>
            <img src={data.imageSrc} style={{  margin: '0px 30px' }} className="productcard-img-top thumbnail" alt ="Add_produt_image" />
            <div  >
                <strong><h6>Product - {data.productName}</h6></strong>
                <span>Category - {data.categoryName}</span> <br />
                <span>Addresse - {data.addresse}</span> <br />
                <span>Quantity - {data.availableQuantity}</span> <br />
                <span>Description - {data.productDescription}</span> <br />
                <span>Price(LKR) - {data.unitPrice}</span> <br />
                <span>Weight(kg/l) - {data.unitWeight}</span> <br />
                <button className="btn btn-light delete-button" onClick={e => onDelete(e, parseInt(data.productId))}>
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )
    const imageCardCheck = data => (
        <div className="productminicard" style={{ backgroundColor: 'white'  }} onClick={() => { showRecordDetails(data) }}>
            <img src={data.imageSrc} style={{  margin: '0px 30px' }} className="productcard-img-top thumbnail" alt ="Add_produt_image" />
            <div  >
                <strong><h6>Product - {data.productName}</h6></strong>
                <span>Category - {data.categoryName}</span> <br />
                <span>Addresse - {data.addresse}</span> <br />
                <span>Quantity - {data.availableQuantity}</span> <br />
                <span>Description - {data.productDescription}</span> <br />
                <span>Price(LKR) - {data.unitPrice}</span> <br />
                <span>Weight(kg/l) - {data.unitWeight}</span> <br />
                <button className="btn btn-light delete-button" onClick={e => onDeleteCheck(e, parseInt(data.productId))}>
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )

    return (
        <div className="row">
            <div className="col-md-11">
                <div >
                    <div className="container ">
                        <h4 className="title" >ADD PRODUCTS</h4>
                    </div>
                </div>
            </div>
            <div className="col-md-1">
                <div >
                    <div className="container ordercard">
                    <Link to='./Orders'>
                    Orders</Link>
                    </div>
                </div>
            </div>
            
            <div className="col-md-3">
                <Product
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}
                />
            </div>
            <div className="col-md-9">
                <table>
                    <tbody>
                        {
                            //tr > 3 td
                            productList.filter((product)=>(product.email===localStorage.getItem('userEmail')))
                            .map((product) =>
                                <tc>
                                    <td >{imageCard(product)}</td>   
                                </tc>
                            )
                        }
                    </tbody>
                </table>
                <h4 className="title" >Within 24 hours, Admin wiil check newly added products. After the approval, they will be added to the market. Otherwise they will be removed.</h4>
                <table>
                    <tbody>
                        {
                            
                            //tr > 3 td
                            checkList.filter((product)=>(product.email===localStorage.getItem('userEmail')))
                            .map((product) =>
                                <tc>
                                    <td >{imageCardCheck(product)}</td>   
                                </tc>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

