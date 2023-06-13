import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Container, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../actions/productActions'
import CreateCardComponent from '../components/CreateCardComponent'
import ChargeCardComponent from '../components/ChargeCardComponent'
import Message from '../components/Message'
import { Spinner } from 'react-bootstrap'
import { savedCardsList } from '../actions/cardActions'
import UserAddressComponent from '../components/UserAddressComponent'
import { checkTokenValidation, logout } from '../actions/userActions'
import {CHARGE_CARD_RESET} from '../constants/index'



function copyMap(element){
    let new_element = {};
    for (let key in element) {
        new_element[key] = element[key]
    }
    return new_element

   
}
const AllCheckoutPage = ({ match}) => {

    let history = useHistory()

    const dispatch = useDispatch()
    const [addressSelected, setAddressSelected] = useState(false)
    const [selectedAddressId, setSelectedAddressId] = useState(0)

    // set address id handler
    const handleAddressId = (id) => {
        if (id) {
            setAddressSelected(true)
        }
        setSelectedAddressId(id)
    }
      
    // check token validation reducer
    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    // product details reducer
    const productDetailsReducer = useSelector(state => state.productDetailsReducer)
    const { loading, error, product } = productDetailsReducer

    // create card reducer
    const createCardReducer = useSelector(state => state.createCardReducer)
    const { error: cardCreationError, success, loading: cardCreationLoading } = createCardReducer

    // login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // saved cards list reducer
    const savedCardsListReducer = useSelector(state => state.savedCardsListReducer)
    const { stripeCards } = savedCardsListReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            // dispatch(getProductDetails(match.params.id))
            dispatch(savedCardsList())
            dispatch({
                type: CHARGE_CARD_RESET
            })
        }
    }, [dispatch, history, success, userInfo])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
      }
    const [sum,setSum] = useState(0)
    const b1 = JSON.parse(localStorage.getItem('basket'))
    const [basket,setBasket] = useState(b1)
    const [countProduct,setCountProduct] = useState(Object.keys(basket).length)


    return (
        <div>
            {cardCreationError ? <Message variant='danger'>{cardCreationError}</Message> : ""}
            {loading
                &&
                <span style={{ display: "flex" }}>
                    <h5>Getting Checkout Info</h5>
                    <span className="ml-2">
                        <Spinner animation="border" />
                    </span>
                </span>}
            {!loading && cardCreationLoading ?
                <span style={{ display: "flex" }}>
                    <h5>Checking your card</h5>
                    <span className="ml-2">
                        <Spinner animation="border" />
                    </span>
                </span> : ""}
            {error ? <Message variant='danger'>{error}</Message> :
                <Container>
                    <Row style={{
                        
                        

                    }}>
                        <Col xs={9}>
                            <h3>Checkout Summary</h3>
                            

                                        {Object.values(basket).map((value,index)=>{
                                            const pr_id = Object.keys(basket)[index]
                                            let total_price = basket[pr_id].count * value.price

                                            return (
                                           
                                                <Row>
                                                    <Col >
                                                    <div className='image-prd'>
                                                        <img src={value.image} ></img>
                                                    </div>
                                                    </Col>
                                                    <Col style={{
                                                        alignItems:'center',
                                                        justifyContent:'center'

                                                    }}>
                                                    <Row><h4>{value.name}</h4></Row>
                                                    <Row><div className='canvas-plus-minus'>
                                    <button onClick={(e)=>{
                                        e.preventDefault()
                                        
                                        const new_basket = {};
                                        for (let key in basket) {
                                            new_basket[key] = basket[key]
                                        }
                                        new_basket[pr_id].count = new_basket[pr_id].count -1
                                        setBasket(new_basket)
                                        setCountProduct(countProduct-1)
                                        total_price = basket[pr_id].count * value.price
                                        setSum(sum + total_price)
                                        
                                        
                                        
                                    }}>
                                        <b>&#9473;</b>
                                    </button>
                                    <div id='count'>{basket[pr_id].count}</div>
                                    <button onClick={(e)=>{
                                        e.preventDefault()
                                        const new_basket = {};
                                        for (let key in basket) {
                                            new_basket[key] = basket[key]
                                        }
                                        new_basket[pr_id].count = new_basket[pr_id].count + 1
                                        setBasket(new_basket)
                                        setCountProduct(countProduct + 1)
                                        total_price = basket[pr_id].count * value.price
                                        setSum(sum + total_price)
                                        
                                    
                                        
                                        
                                    }}>
                                        <b>&#43;</b>
                                    </button>
                                </div></Row>
                                        
                                 </Col>
                                    <Col style={{
                                        justifyContent:'space-between',
                                        alignItems:'center',
                                        alignContent:'center',
                                        color:'#3A3A443D'
                                    }}>
                                        <div className='row' onClick={(e)=>{
                    
                                            let new_basket = copyMap(basket)
                                            delete new_basket[pr_id]
                                            setBasket(new_basket)
                                            setCountProduct(countProduct-1)
                                            
                                        }}>
                                                 X
                                        </div>
                                        <div className='row'>
                                            {value.price}тг/шт
                                        </div>
                                        <div className='row' style={{color:'black'}}>
                                            <h4>{value.price * value.count} тг</h4>
                                        </div>
                                       
                                    </Col>

                                    </Row>
                                   
                                
                                
                                )

                            })}
                            
                            {/* <Row>
                            <span style={{ display: "flex" }}>
                                <h3>Billing Address</h3>
                                <Link
                                    className="ml-2 mt-2"
                                    to="/all-addresses/"
                                >
                                    Edit/Add Address
                                </Link>
                            </span>

                            </Row> */}
                            

                            
                            <UserAddressComponent handleAddressId={handleAddressId} />
                        </Col>


                        <Col xs={3}>
                            <h3>
                                Payments Section
                            </h3>
                            {success ?
                                <ChargeCardComponent
                                    selectedAddressId={selectedAddressId}
                                    addressSelected={addressSelected}
                                    product={product}
                                />
                                :
                                <CreateCardComponent
                                    addressSelected={addressSelected}
                                    stripeCards={stripeCards} />}
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    )
}

export default AllCheckoutPage;