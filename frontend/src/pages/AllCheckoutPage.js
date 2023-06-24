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
import Navbar from '../components/Navbar'



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
    const b1 = JSON.parse(localStorage.getItem('basket'))
    const [basket,setBasket] = useState(b1)

    
    
    let array = (Object.values(basket?Object.values(basket):[]))
    let res =() => {
        let res = 0;
        let count = 0;
        
        for (let index = 0; index < array.length; index++) {
            res+=array[index].count * array[index].price
            count+=array[index].count
            
            
        }
        
        return {
            sum:res,
            count:count
        }
    }
    let result = res()

    
    
    return (
        <div>
            <Navbar/>
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
                    <div style={{
                        height:'20px'
                    }}></div>
                    <Row style={{
                        
                        

                    }}>
                        <Col xs={8}>
                            <Row>
                                <Col md={8} style={{
                                    fontSize:'25px'
                                }}> Корзина: {array.length}</Col>
                                <Col md={3}> <button style={{
                                    color:"#3A3A44",
                                    opacity:"40%",
                                    border:"none",
                                    background:'white',

                                }} onClick={(e)=>{
                                    e.preventDefault()
                                    setBasket({})
                                    localStorage.removeItem('basket')
                                }}>  Очистить корзину </button></Col>
                                
                                </Row>
                            <div style={{
                                height:'50px'
                            }}></div>
                            

                                        {array.map((value,index)=>{
                                            const pr_id = Object.keys(basket)[index]
                                            let total_price = basket[pr_id].count * value.price

                                            return (
                                                <div key={index}>
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
                                        total_price = basket[pr_id].count * value.price
                                        
                                        
                                        
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
                                        total_price = basket[pr_id].count * value.price
                                        
                                    
                                        
                                        
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

                                <div style={{
                                    height:'25px'
                                }}></div>
                                </div>
                                   
                                
                                
                                )

                            })}
                            
                            
                            

                            
                            <UserAddressComponent handleAddressId={handleAddressId} />
                        </Col>


                        <Col xs={4}>
                            
                                
                                <div className='orders'>
                                <div style={{
                                    fontFamily: "Quicksand",
                                    fontSize: "30px",
                                    fontWeight: "700",
                                    lineHeight: "24px",
                                    letterSpacing:" 0.0075em",
                                    textAlign: "center",
                                    
                                }}>Ваш заказ</div>
                                <div style={{
                                    height:'40px'
                                }}></div>
                                {array.map((value,index)=>{
                                        let total_price = value.count * value.price
                                        return (
                                        <Row style={{
                                            justifyContent:''
                                        }} key={index}>
                                            <Col md={7}>{value.name}</Col>
                                            <Col md={5}><b>{total_price}</b> тг</Col>

                                        </Row>)
                                    })}

                                <hr></hr>
                                <Row>
                                    <Col style={{
                                        fontFamily: "Quicksand",
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        
                                        letterSpacing: "0.0075em",
                                        textAlign: "center",
                                        
                                    }} md={8}>Итоговая сумма</Col>
                                    <Col md={4}> {result.sum} тг</Col>
                                </Row>
                                <div style={{
                                    height:'20px'
                                }}></div>
                                <Row style={{
                                    justifyContent:'center'
                                }}>
                                    <Col md={8}>
                                    <Link to='/agreement/'>
                                    <button style={{
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        fontStyle:'Bold',
                                        borderRadius:'10px',
                                        textAlign: "center",
                                        border: "1px solid #F89F21",
                                        background: "linear-gradient(0deg, #F5B252, #F5B252), linear-gradient(0deg, #F89F21, #F89F21)",
                                        color:'white',


                                        

                                    }}>Перейти к оформленю</button>
                                    </Link>
                                    
                                    </Col>
                                    
                                    
                                </Row>
                                    
                                </div>
                                    
                                
                                
                            
                        </Col>
                    </Row>
                </Container>
            }
        </div>
        </div>
    )
}

export default AllCheckoutPage;