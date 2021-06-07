import React, { useState, useEffect } from 'react'
import './Product.css';  

const defaultImageSrc = '/img/image_placeholder.png'

const initialFieldValues = {
    productId: 0,
    productName: '',  
    quantity: 1, 
    availableQuantity:'', 
    email:'',
    reorderLevel:0,
    categoryName: '',  
    addresse: '',
    productDescription:null,
    unitPrice: 0,
    unitWeight: 0 , 
    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile: null
}

export default function Product(props) {

    const { addOrEdit, recordForEdit } = props

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        if (recordForEdit != null)
            setValues(recordForEdit);
    }, [recordForEdit])

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }

    const validate = () => {
        let temp = {}
        temp.productName = values.productName === "" ? false : true;
        temp.addresse = values.addresse === "" ? false : true;
        temp.categoryName = values.categoryName === "" ? false : true;
        temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x === true)
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
        setErrors({})
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('productId', values.productId)
            formData.append('productName', values.productName)
            formData.append('email', localStorage.getItem('userEmail'))
            formData.append('reorderLevel', values.reorderLevel)
            formData.append('quantity', values.quantity)
            formData.append('availableQuantity', values.availableQuantity)
            formData.append('categoryName', values.categoryName)
            formData.append('addresse', values.addresse)
            formData.append('productDescription', values.productDescription)
            formData.append('unitPrice', values.unitPrice)
            formData.append('unitWeight', values.unitWeight)
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)
            addOrEdit(formData, resetForm)
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid-field' : '')

    return (
        <>
            
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="productcard">
                    <img src={values.imageSrc} className="card-img-top" alt ="product" />
                    <div className="card-body">
                        <div className="form-group">
                            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc')}
                                onChange={showPreview} id="image-uploader" />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('productName')} placeholder="Product Name" name="productName"
                                value={values.productName}
                                onChange={handleInputChange} />
                        </div>
                        
                        <div className="form-group">
                            <input className={"form-control" +applyErrorClass('categoryName')} placeholder="Category Name" name="categoryName"
                                value={values.categoryName}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control"+applyErrorClass('addresse')} placeholder="Address" name="addresse"
                                value={values.addresse}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Available Quantity" name="availableQuantity"
                                value={values.availableQuantity}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Product Description" name="productDescription"
                                value={values.productDescription}
                                onChange={handleInputChange} />
                        </div>
                        
                        <div className="form-group">
                        <label>Unit Price(LKR)</label>
                            <input className="form-control" placeholder="Unit Price" name="unitPrice"
                                value={values.unitPrice}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Unit Weight(kg/l)</label>
                            <input className="form-control" placeholder="Unit Weight" name="unitWeight"
                                value={values.unitWeight}
                                onChange={handleInputChange} ></input>
                        </div>
                        
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-light">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}