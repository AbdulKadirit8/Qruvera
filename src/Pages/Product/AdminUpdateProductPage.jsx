import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState, useRef } from 'react'

import AdminSlider from '../../Components/Admin/AdminSlider'
import TextValidater from '../../FormValidaters/TextValidater'
import PicValidater from '../../FormValidaters/PicValidater'

import { useDispatch, useSelector } from 'react-redux'
import { getProduct, updateProduct } from '../../Redux/ActionCreaters/ProductActionCreaters'
import { getMaincategory } from '../../Redux/ActionCreaters/MaincategoryActionCreaters'
import { getSubcategory } from '../../Redux/ActionCreaters/SubcategoryActionCreaters'
import { getBrand } from '../../Redux/ActionCreaters/BrandActionCreaters'

// Color Array
const colors = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Pink", "Purple", "Orange", "Grey", "Brown", "Navy", "Sky Blue", "Maroon", "Olive", "Beige", "Teal", "Lavender", "Mustard", "Coral", "N/A"];

var rteDescription

export default function AdminUpdateProductPage() {
    const [sizeInput, setSizeInput] = useState("");
    let { id } = useParams()

    var refdivDescription = useRef(null)
    let [data, setData] = useState({
        name: '',
        maincategory: '',
        subcategory: '',
        brand: '',
        basePrice: '',
        discount: '',
        finalPrice: '',
        stock: true,
        stockQuantity: '',
        color: [],
        size: [],
        pic: [],
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: '',
        color: '',
        size: '',
        basePrice: '',
        discount: '',
        stockQuantity: '',
        pic: ''
    })
    let [showError, setShowError] = useState(false)
    let [falge, setFlage] = useState(false)

    let navigate = useNavigate()

    let productStateData = useSelector(state => state.productStateData)
    let maincategoryStateData = useSelector(state => state.maincategoryStateData)
    let subcategoryStateData = useSelector(state => state.subcategoryStateData)
    let brandStateData = useSelector(state => state.brandStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let name = e.target.name

        let value = name === "pic" ? data.pic.concat(Array.from(e.target.files).map(x => "product/" + x.name)) : e.target.value
        // Rael Backend
        // let value = name === "pic" ? e.target.files.name : e.target.value

        setData({ ...data, [name]: name === "status" || name === "stock" ? (value === "1" ? true : false) : value })
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? PicValidater(e) : TextValidater(e) })
    }

    function getinputCheckbox(key, value) {
        let arr = [...(data[key] || [])]

        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)

        setData({ ...data, [key]: arr })

        setErrorMessage({
            ...errorMessage,
            [key]: arr.length === 0
                ? `Please select atleast one ${key}`
                : ''
        })
    }

    function postData(e) {
        e.preventDefault()

        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShowError(true)
        else if (data.pic.length === 0) {
            setShowError(true)
            setErrorMessage({ ...errorMessage, pic: "Please upload atleast one image" })
        }
        else {
            let bs = parseInt(data.basePrice)
            let d = parseInt(data.discount)
            let fp = parseInt(bs - bs * d / 100)
            let description = rteDescription.getHTMLCode()
            let sq = parseInt(data.stockQuantity)

            //Domy Backend
            dispatch(updateProduct({
                ...data,
                maincategory: data.maincategory || maincategoryStateData[0].name,
                subcategory: data.subcategory || subcategoryStateData[0].name,
                brand: data.brand || brandStateData[0].name,
                basePrice: bs,
                discount: d,
                finalPrice: fp,
                stockQuantity: sq,
                description: description,
            }))

            //Real backend
            // let formData = new FormData()
            // formData.append("id",data.id)
            // formData.append("name",data.name)
            // formData.append("maincategory", data.maincategory || maincategoryStateData[0].id)
            // formData.append("subcategory", data.subcategory || subcategoryStateData[0].id)
            // formData.append("brand", data.brand || brandStateData[0].id)
            // data.color.forEach(x=>formData.append("color",x))
            // data.size.forEach(x=>formData.append("size",x))
            // Array.from(data.pic).forEach(x=>formData.append("pic",x))
            // formData.append("basePrice", bp)
            // formData.append("discount", d)
            // formData.append("finalPrice", fp)
            // formData.append("stockQuantity", sc)
            // formData.append("description", description)
            // formData.append("status",data.status)
            // dispatch(updateProduct(formData))

            navigate("/admin/product")
        }

    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            rteDescription = new window.RichTextEditor(refdivDescription.current);
            if (productStateData.length) {
                let item = productStateData.find(x => x.id == id)
                if (item) {
                    setData({ ...data, ...item })
                    setSizeInput(item.size.join(","))
                    rteDescription.setHTMLCode(item.description);
                }
                else {
                    navigate('/admin/product')
                }
            }
        })()
    }, [productStateData.length])

    useEffect(() => {
        (() => dispatch(getMaincategory()))()
    }, [maincategoryStateData.length])

    useEffect(() => {
        (() => dispatch(getSubcategory()))()
    }, [subcategoryStateData.length])

    useEffect(() => {
        (() => dispatch(getBrand()))()
    }, [brandStateData.length])

    return (
        <>
            <section id="hero" className="hero section pb-0">
                <div className="container my-3 admin">
                    <div className="row ">
                        <div className="col-lg-3">
                            <div data-aos="fade-right" data-aos-delay="100">
                                <AdminSlider />
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div data-aos="fade-left" data-aos-delay="100">
                                <h4 className='bg-primary text-light text-center p-2 rounded'>Update Product <Link to='/admin/product' title='Back'><i className='bi bi-arrow-left text-light float-end'></i></Link></h4>

                                <form onSubmit={postData}>
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <label className='ps-2'>Name<span className='text-danger'>*</span></label>
                                            <input type="text" name="name" value={data.name} onChange={getInputData} className={`form-control border-2 ${showError && errorMessage.name ? 'border-danger' : 'border-primary'}`} placeholder='Product Name' />
                                            {showError && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                        </div>

                                        <div className="col-lg-3 mb-3">
                                            <label className='ps-2'>Maincategory<span className='text-danger'>*</span></label>
                                            <select name='maincategory' value={data.maincategory} onChange={getInputData} className='form-select border-primary'>
                                                {maincategoryStateData.filter(x => x.status).map(item => {
                                                    return <option key={item.id}>{item.name}</option>

                                                    // Real backend
                                                    // return <option key={item.id} value={item.id}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>

                                        <div className="col-lg-3 mb-3">
                                            <label className='ps-2'>Subcategory<span className='text-danger'>*</span></label>
                                            <select name='subcategory' value={data.subcategory} onChange={getInputData} className='form-select border-primary'>
                                                {subcategoryStateData.filter(x => x.status).map(item => {
                                                    return <option key={item.id}>{item.name}</option>

                                                    // Real backend
                                                    // return <option key={item.id} value={item.id}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>

                                        <div className="col-lg-3 mb-3">
                                            <label className='ps-2'>Brand<span className='text-danger'>*</span></label>
                                            <select name='brand' value={data.brand} onChange={getInputData} className='form-select border-primary'>
                                                {brandStateData.filter(x => x.status).map(item => {
                                                    return <option key={item.id}>{item.name}</option>

                                                    // Real backend
                                                    // return <option key={item.id} value={item.id}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>

                                        <div className="col-lg-3 mb-3">
                                            <label className='ps-2'>Stock<span className='text-danger'>*</span></label>
                                            <select name="stock" value={data.stock ? "1" : "0"} onChange={getInputData} className='form-select border-primary'>
                                                <option value="1">In Stock</option>
                                                <option value="0">Out Of Stock</option>
                                            </select>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <label className='ps-2'>Base Price<span className='text-danger'>*</span></label>
                                            <input type="number" name="basePrice" value={data.basePrice} onChange={getInputData} className={`form-control border-2 ${showError && errorMessage.basePrice ? 'border-danger' : 'border-primary'}`} placeholder='Product Base Price' />
                                            {showError && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <label className='ps-2'>Discount<span className='text-danger'>*</span></label>
                                            <input type="number" name="discount" value={data.discount} onChange={getInputData} className={`form-control border-2 ${showError && errorMessage.discount ? 'border-danger' : 'border-primary'}`} placeholder='Product Base Price' />
                                            {showError && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : null}
                                        </div>

                                        <div className="col-12 mb-3">
                                            <label className='ps-2'>Colors<span className='text-danger'>*</span></label>
                                            <div className="border border-primary rounded">
                                                <div className="row p-2">
                                                    {colors.map((item, index) => {
                                                        return <div className='col-xl-2 col-lg-3 col-4' key={index}>
                                                            <input type="checkbox" checked={data.color.includes(item)} onChange={() => getinputCheckbox("color", item)} id={item} />
                                                            <label className='ps-2' htmlFor={item}>{item}</label>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                            {showError && errorMessage.color ? <p className='text-danger'>{errorMessage.color}</p> : null}
                                        </div>

                                        <div className="col-12 mb-3">
                                            <label className='ps-2'>Size<span className='text-danger'>*</span></label>
                                            <div className="border border-primary rounded">
                                                <div className="row p-2">
                                                    <div className="col-12 mb-3">
                                                        <label className='ps-2'>Measurement<span className='text-danger'>*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control border-primary"
                                                            value={sizeInput}
                                                            placeholder="S,M,L,XL OR 20ml,50ml OR 2kg,5kg"
                                                            onChange={(e) => {
                                                                setSizeInput(e.target.value);
                                                                let arr = e.target.value
                                                                    .split(",")
                                                                    .map(item => item.trim())
                                                                    .filter(item => item)

                                                                setData({
                                                                    ...data,
                                                                    size: arr
                                                                })

                                                                setErrorMessage({
                                                                    ...errorMessage,
                                                                    size: arr.length ? "" : "Size field is Mendatory"
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {showError && errorMessage.size ? <p className='text-danger'>{errorMessage.size}</p> : null}
                                        </div>

                                        <div className="col-12">
                                            <label className='ps-2'>Description<span className='text-danger'>*</span></label>
                                            <div ref={refdivDescription} className='border border-primary rounder mb-3'></div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <label className='ps-2'>Pic<span className='text-danger'>*</span></label>
                                            <input type="file" name="pic" multiple onChange={getInputData} className={`form-control ${showError && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                            {showError && errorMessage.pic ? errorMessage.pic?.split("|").map((item, index) => {
                                                return <p className='text-danger' key={index}>{item}</p>
                                            }) : null}
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <label className='ps-2'>Old Pic(Click on pic to remove)<span className='text-danger'>*</span></label>
                                            <div className="d-flex flex-wrap align-items-end border border-primary">
                                                {data.pic.map((item, index) => {
                                                    return <img key={index} onClick={() => {
                                                        data.pic.splice(index, 1)
                                                        setFlage(!falge)
                                                    }} multiple src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} className='m-1 border' alt="Old product image" width={80} />
                                                })}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <label className='ps-2'>Stock Quantity<span className='text-danger'>*</span></label>
                                            <input type="number" name="stockQuantity" value={data.stockQuantity} onChange={getInputData} className={`form-control border-2 ${showError && errorMessage.stockQuantity ? 'border-danger' : 'border-primary'}`} placeholder='Product Base Price' />
                                            {showError && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : null}
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <label className='ps-2'>Status<span className='text-danger'>*</span></label>
                                            <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select'>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </select>
                                        </div>

                                        <div className="col-12 mb-3">
                                            <button type='submit' className='btn btn-primary w-100'>Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
