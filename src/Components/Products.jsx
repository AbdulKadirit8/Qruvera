import { useDispatch, useSelector } from "react-redux"
import { getMaincategory } from "../Redux/ActionCreaters/MaincategoryActionCreaters"
import { getProduct } from "../Redux/ActionCreaters/ProductActionCreaters"
import { useEffect, useState } from "react"
import SingleProduct from "./SingleProduct"


export default function Products() {
    let [data, setData] = useState([])
    let [selected, setSelected] = useState('')

    let maincategoryStateData = useSelector(state => state.maincategoryStateData)
    let productStateData = useSelector(state => state.productStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            // console.log(productStateData);
            // console.log(Array.isArray(productStateData));
            setData(productStateData.filter(x => x.status))
        })()
    }, [productStateData.length])

    useEffect(() => {
        (() => dispatch(getMaincategory()))()
    }, [maincategoryStateData.length])
    return (
        <>
            <section id="services" className="services section">
                <div className="container" data-aos="fade-up" data-aos-delay="100">
                    <div className="mb-3">
                        <div className="m-auto">
                            <div className="btn-group w-100">
                                <button onClick={() => setSelected('')} className={`w-100 btn ${selected === '' ? 'btn-primary' : ''}`}>All</button>
                                {maincategoryStateData.filter(x => x.status && productStateData.filter(p => p.maincategory === x.name).length).map((item, index) => {
                                    return <button onClick={() => setSelected(item.name)} className={`w-100 btn ${selected === item.name ? 'btn-primary' : 'btn-light'}`} key={index}>{item.name}</button>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="row gy-4">
                        {data.filter(x => selected === '' || selected === x.maincategory).slice(0, 24).map((item => {
                            return <div key={item.id} className="col-lg-4 col-sm-6 col-12" data-aos="fade-up" data-aos-delay="200">
                                <SingleProduct item={item} />
                            </div>
                        }))}
                    </div>
                </div>

            </section>
        </>
    )
}
