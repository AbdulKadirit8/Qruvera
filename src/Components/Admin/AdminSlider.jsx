import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function AdminSlider() {

    return (
        <>
            {/* <div className="row">
                <div className='d-block d-lg-none'><h4 className='bg-primary text-light text-center p-2 rounded'>Menu</h4></div>
            </div> */}
            <div className="d-flex d-lg-none overflow-auto gap-2 pb-2 mobile-scroll pt-2">
                <NavLink to="/" className={({ isActive }) =>
                    `list-group-item text-center border-0 rounded-4 px-2 py-2
                    ${isActive ? 'mobile-active' : 'mobile-menu'}`
                } aria-current="true">
                    <i className='fs-5 bi bi-house-door '></i>
                    <div className='fs-10'> Home</div>
                </NavLink>
                <NavLink to="/admin/maincategory" className={({ isActive }) =>
                    `list-group-item text-center border-0 rounded-4 px-2 py-2
                    ${isActive ? 'mobile-active' : 'mobile-menu'}`
                } aria-current="true">
                    <i className='fs-5 bi bi-grid '></i>
                    <div className='fs-10'>
                        Categories
                    </div>
                </NavLink>
                <NavLink to="/admin/subcategory" className={({ isActive }) =>
                    `list-group-item text-center border-0 rounded-4 px-2 py-2
                    ${isActive ? 'mobile-active' : 'mobile-menu'}`
                } aria-current="true">
                    <i className='fs-5 bi bi-diagram-3 '></i>
                    <div className='fs-10'>
                        SubCats
                    </div>
                </NavLink>
                <NavLink to="/admin/brand" className={({ isActive }) =>
                    `list-group-item text-center border-0 rounded-4 px-2 py-2
                    ${isActive ? 'mobile-active' : 'mobile-menu'}`
                } aria-current="true">
                    <i className='fs-5 bi bi-award '></i>
                    <div className='fs-10'>
                        Brand
                    </div>
                </NavLink>
                <NavLink to="/admin/product" className={({ isActive }) =>
                    `list-group-item text-center border-0 rounded-4 px-2 py-2
                    ${isActive ? 'mobile-active' : 'mobile-menu'}`
                } aria-current="true">
                    <i className='fs-5 bi bi-bag-check '></i>
                    <div className='fs-10'>
                        Product
                    </div>
                </NavLink>
                <NavLink to="/admin/feature" className={({ isActive }) =>
                    `list-group-item text-center border-0 rounded-4 px-2 py-2
                    ${isActive ? 'mobile-active' : 'mobile-menu'}`
                } aria-current="true">
                    <i className='fs-5 bi bi-stars '></i>
                    <div className='fs-10'>
                        Feature
                    </div>
                </NavLink>
                <NavLink to="/admin/faq" className={({ isActive }) =>
                    `list-group-item text-center border-0 rounded-4 px-2 py-2
                    ${isActive ? 'mobile-active' : 'mobile-menu'}`
                } aria-current="true">
                    <i className='fs-5 bi bi-question-circle '></i>
                    <div className='fs-10'>
                        FAQ
                    </div>
                </NavLink>
                <NavLink to="/admin/newslatter" className={({ isActive }) =>
                    `list-group-item text-center border-0 rounded-4 px-2 py-2
                    ${isActive ? 'mobile-active' : 'mobile-menu'}`
                } aria-current="true">
                    <i className='fs-5 bi bi-envelope '></i>
                    <div className='fs-10'>
                        Newslatter
                    </div>
                </NavLink>
                <NavLink to="/admin/checkout" className={({ isActive }) =>
                    `list-group-item text-center border-0 rounded-4 px-2 py-2
                    ${isActive ? 'mobile-active' : 'mobile-menu'}`
                } aria-current="true">
                    <i className='fs-5 bi bi-bag-check '></i>
                    <div className='fs-10'>
                        Checkout
                    </div>
                </NavLink>
                <NavLink to="/admin/contactus" className={({ isActive }) =>
                    `list-group-item text-center border-0 rounded-4 px-2 py-2
                    ${isActive ? 'mobile-active' : 'mobile-menu'}`
                } aria-current="true">
                    <i className='fs-5 bi bi-telephone '></i>
                    <div className='fs-10'>
                        Contact us
                    </div>
                </NavLink>
                <NavLink to="/admin/user" className={({ isActive }) =>
                    `list-group-item text-center border-0 rounded-4 px-2 py-2
                    ${isActive ? 'mobile-active' : 'mobile-menu'}`
                } aria-current="true">
                    <i className='fs-5 bi bi-person  '></i>
                    <div className='fs-10'>
                        User
                    </div>
                </NavLink>
                <NavLink to="/admin/setting" className={({ isActive }) =>
                    `list-group-item text-center border-0 rounded-4 px-2 py-2
                    ${isActive ? 'mobile-active' : 'mobile-menu'}`
                } aria-current="true">
                    <i className='fs-5 bi bi-gear '></i>
                    <div className='fs-10'>
                        Setting
                    </div>
                </NavLink>
            </div>
            <div className="dropdown d-none d-lg-block">
                <div className="list-group">
                    <Link to="/" className="list-group-item list-group-item-action active mb-1" aria-current="true">
                        <i className='fs-5 bi bi-house-door pe-3'></i>
                        Home
                    </Link>
                    <Link to="/admin/maincategory" className="list-group-item list-group-item-action active mb-1" aria-current="true">
                        <i className='fs-5 bi bi-grid pe-3'></i>
                        Categories
                    </Link>
                    <Link to="/admin/subcategory" className="list-group-item list-group-item-action active mb-1" aria-current="true">
                        <i className='fs-5 bi bi-diagram-3 pe-3'></i>
                        SubCats
                    </Link>
                    <Link to="/admin/brand" className="list-group-item list-group-item-action active mb-1" aria-current="true">
                        <i className='fs-5 bi bi-award pe-3'></i>
                        Brand
                    </Link>
                    <Link to="/admin/product" className="list-group-item list-group-item-action active mb-1" aria-current="true">
                        <i className='fs-5 bi bi-bag-check pe-3'></i>
                        Product
                    </Link>
                    <Link to="/admin/feature" className="list-group-item list-group-item-action active mb-1" aria-current="true">
                        <i className='fs-5 bi bi-stars pe-3'></i>
                        Feature
                    </Link>
                    <Link to="/admin/faq" className="list-group-item list-group-item-action active mb-1" aria-current="true">
                        <i className='fs-5 bi bi-question-circle pe-3'></i>
                        FAQ
                    </Link>
                    <Link to="/admin/newslatter" className="list-group-item list-group-item-action active mb-1" aria-current="true">
                        <i className='fs-5 bi bi-envelope pe-3'></i>
                        Newslatter
                    </Link>
                    <Link to="/admin/checkout" className="list-group-item list-group-item-action active mb-1" aria-current="true">
                        <i className='fs-5 bi bi-bag-check pe-3'></i>
                        Checkout
                    </Link>
                    <Link to="/admin/contactus" className="list-group-item list-group-item-action active mb-1" aria-current="true">
                        <i className='fs-5 bi bi-telephone pe-3'></i>
                        Contact us
                    </Link>
                    <Link to="/admin/user" className="list-group-item list-group-item-action active mb-1" aria-current="true">
                        <i className='fs-5 bi bi-person  pe-3'></i>
                        User
                    </Link>
                    <Link to="/admin/setting" className="list-group-item list-group-item-action active mb-1" aria-current="true">
                        <i className='fs-5 bi bi-gear pe-3'></i>
                        Setting
                    </Link>

                </div>
            </div>
        </>
    )
}
