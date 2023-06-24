import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useHistory,Link } from "react-router-dom";
import { CREATE_PRODUCT_RESET ,CATEGORIES} from '../constants'
import Button from 'react-bootstrap/Button';
import CardBasket from '../components/Basket'
import IMAGES from '../constants/images'
import NavBar from '../components/Navbar'



function ProductsListPage() {

    let history = useHistory()
    let searchTerm = history.location.search
    const dispatch = useDispatch()
    const [categoryTerm,setCategoryTerm] = useState('')
    const [basket,setBasket] = useState({})
    
    // products list reducer
    const productsListReducer = useSelector(state => state.productsListReducer)
    const { loading, error, products } = productsListReducer

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    

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
    const type_user = userInfo?userInfo.type_user:''
    

    return (
        <div className='canvas'>
            <NavBar/>
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
                    
                    <h3><img src={IMAGES.categories} width={14} height={14}></img> Все категории</h3>
                
                </div>
                <div className='categories'>
                {CATEGORIES.map((value,index)=>{
                    return <p key={index}><a href='' onClick={(e)=>{
                        e.preventDefault()
                        setCategoryTerm(value)
                    }}><img src={IMAGES.category2} width={6} height={11}></img> {value}</a></p>
                })}
                </div>
                
                
                </Col>
            
                <Col  md ={8} lg={8} style={{
                    boxShadow: "0px 2px 4px 0px #5A5B6A3D",
                    boxShadow: "0px 1px 2px 0px #3A3A443D",
                    borderRadius: "8px",
                    
                }}>
                
                <Row>
                    
                    {/* If length of the filter result is equal to 0 then show 'nothing found' message
                        with help of showNothingMessage function else show the filtered result on the
                        webpage and then run the map function */}
                   
                    {(products.filter((item) =>
                        item.name.toLowerCase().includes(searchTerm !== "" ? searchTerm.split("=")[1] : "")
                        && (item.category.toLowerCase() === categoryTerm.toLowerCase() || categoryTerm =='')
                    )).length === 0 ? showNothingMessage() : (products.filter((item) =>
                    item.name.toLowerCase().includes(searchTerm !== "" ? searchTerm.split("=")[1] : "")
                    && (item.category.toLowerCase() === categoryTerm.toLowerCase() || categoryTerm =='') && (item.type_product[0] != type_user[0] || type_user=='Admin')
                    )).map((product, idx) => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <div className="mx-2"> 
                                <Product product={product} basket = {basket} setBasket = {setBasket}/>
                            </div>
                        </Col>
                    )
                    )}
                </Row>
                
                </Col>
                <Col lg={2}>
                <Link to="/new-product/">
                    <button className='btn-custom' style={{
                        fontSize:'20px',
                        borderRadius:'20px',
                        fontWeight:'700'
                    }}>{type_user=='Buyer'?"Оставит заявку":"Добавить свой товар"}</button>
                </Link>
                <div className='basket'>
                    <h3>Корзина</h3>
                    <CardBasket basket = {basket} setBasket={setBasket} />

                    


                </div>
                </Col>
        </Row>
        </div>
    )
}

export default ProductsListPage
