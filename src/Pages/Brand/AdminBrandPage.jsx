import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBrand, getBrand } from '../../Redux/ActionCreaters/BrandActionCreaters'
import React from 'react'
import AdminSlider from '../../Components/Admin/AdminSlider'

// Data table library
import DataTable from 'datatables.net-dt'

// Data Tables css 
import 'datatables.net-dt/css/dataTables.dataTables.min.css'



export default function AdminBrandPage() {
  
    let [data, setData] = useState([])
    let brandStateData = useSelector(state => state.brandStateData)
    let dispatch = useDispatch()

    // Delete function
    function deleteRecord(id) {
        if (window.confirm("Are you sure to Delete this record")) {
            //with redux
            dispatch(deleteBrand({ id: id }))
            setData(data.filter(x => x.id !== id))
        }
    }
   
    useEffect(() => {
        let time = (() => {
            
            dispatch(getBrand())
            if (brandStateData.length) {
                setData(brandStateData)
            }
            let time = setTimeout(() => {
                new DataTable('#myTable');
            }, 500)
            return time
        })()
        return () => clearTimeout(time)
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
                                <h4 className='bg-primary text-light text-center p-2 rounded'>Brand <Link to='/admin/brand/create' title='Create'><i className='bi bi-plus text-light float-end'></i></Link></h4>
                                <div className="table-responsive">
                                    <table className='table table-bordered' id='myTable'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>NAME</th>
                                                <th>PIC</th>
                                                <th>STATUS</th>
                                                <th>UPDATE</th>
                                                <th>DELETE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item) => {
                                                return <tr key={item.id}>
                                                    <td className="align-middle">{item.id}</td>
                                                    <td className="align-middle">{item.name}</td>
                                                    <td><Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} target='_blank'>
                                                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} width={80} alt="" />
                                                    </Link></td>
                                                    <td className="align-middle">{item.status ? "Active" : "Inactive"}</td>
                                                    <td className="text-center align-middle"><Link to={`/admin/brand/update/${item.id}`}><i className='bi bi-pencil btn btn-primary'></i></Link></td>
                                                    <td className="text-center align-middle"><button onClick={() => deleteRecord(item.id)} className='btn btn-danger'><i className='bi bi-trash'></i></button></td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
