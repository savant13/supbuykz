import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useHistory,Link } from "react-router-dom";
import { CREATE_PRODUCT_RESET ,CATEGORIES} from '../constants'
import Button from 'react-bootstrap/Button';



function ProductsListPage() {

    let history = useHistory()
    let searchTerm = history.location.search
    const dispatch = useDispatch()
    const [categoryTerm,setCategoryTerm] = useState('')
    
    // products list reducer
    const productsListReducer = useSelector(state => state.productsListReducer)
    const { loading, error, products } = productsListReducer

    useEffect(() => {
        dispatch(getProductsList())
        dispatch({
            type: CREATE_PRODUCT_RESET
        })
        //dispatch(checkTokenValidation())
    }, [dispatch])

    const showNothingMessage = () => {
        return (
            <div>
                {!loading ? <Message variant='info'>Nothing to show</Message> : ""}                
            </div>
        )
    }

    return (
        <Row>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <span style={{ display: "flex" }}>
                <h5>Getting Products</h5>
                <span className="ml-2">
                    <Spinner animation="border" />
                </span>
            </span>}
            
                <Col md ={2}  lg={2}>

                <div id='all-category' onClick={()=>{
                    setCategoryTerm('')
                }}>
                    <h3>Все категории</h3>
                
                </div>
                <div className='categories'>
                {CATEGORIES.map((value,index)=>{
                    return <p key={index}><a href='' onClick={(e)=>{
                        e.preventDefault()
                        setCategoryTerm(value)
                    }}>&darr; {value}</a></p>
                })}
                </div>
                
                
                </Col>
            
                <Col  md ={8} lg={8}>
                
                <Row>
                    
                    {/* If length of the filter result is equal to 0 then show 'nothing found' message
                        with help of showNothingMessage function else show the filtered result on the
                        webpage and then run the map function */}

                    {(products.filter((item) =>
                        item.name.toLowerCase().includes(searchTerm !== "" ? searchTerm.split("=")[1] : "")
                        && (item.category.toLowerCase() === categoryTerm.toLowerCase() || categoryTerm =='')
                    )).length === 0 ? showNothingMessage() : (products.filter((item) =>
                    item.name.toLowerCase().includes(searchTerm !== "" ? searchTerm.split("=")[1] : "")
                    && (item.category.toLowerCase() === categoryTerm.toLowerCase() || categoryTerm =='')
                    )).map((product, idx) => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <div className="mx-2"> 
                                <Product product={product} />
                            </div>
                        </Col>
                    )
                    )}
                </Row>
                
                </Col>
                <Col lg={2}>
                <Link to="/new-product/">
                    <button className='btn-custom' >Добавить свой товар</button>
                </Link>
                </Col>
        </Row>
    )
}

export default ProductsListPage
