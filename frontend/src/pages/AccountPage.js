import React, { useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails, logout, checkTokenValidation } from '../actions/userActions'
//import { UPDATE_USER_ACCOUNT_RESET } from '../constants'
import Message from '../components/Message'
import { Spinner } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import NavBar from '../components/Navbar'
import IMAGES from '../constants/images'


function AccountPage() {


    let history = useHistory()
    const dispatch = useDispatch()

    // check token validation reducer
    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    // login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // user details reducer
    const userDetailsReducer = useSelector(state => state.userDetailsReducer)
    const { user: userAccDetails, loading } = userDetailsReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            try {
                dispatch(checkTokenValidation())
                dispatch(userDetails(userInfo.id))
            } catch (error) {
                history.push("/")
            }
        }
    }, [history, userInfo, dispatch])

    // logout
    const logoutHandler = () => {
        dispatch(logout()) // action
    }

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
      }

    const renderData = () => {
        try {

            return (
                <div>

                    <NavBar></NavBar>
                    <div style={{
                                    height:'50px'
                                }}>

                                </div>
                
                <div className='container profile-container'>
                    <Row>
                    <h3>Личный кабинет</h3>
                    </Row>
                    <Row>
                        
                        <Col>
                        <Card className="mb-2  avatar">
                            <Card.Body>
                                <Card.Img src={IMAGES.avatar}  height={120}></Card.Img>
                                <Card.Title>
                                Фото профиля
                                </Card.Title>
                                <Card.Subtitle>
                                {userInfo.type_user}
                                </Card.Subtitle>

                            </Card.Body>

                        </Card>
                       
                        
                        </Col>
                        <Col>
                        <Card>
                            <Card.Title>
                            <strong>  Контактная информация</strong>
                            </Card.Title>
                            <Card.Body>
                                <div>
                                <label htmlFor="name">Имя:</label>
                                <input id="name" type="text" placeholder={userInfo.username} disabled/>

                                </div>
                                <div>
                                <label htmlFor="email">Электронная почта:</label>
                                <input id="email" type="text" placeholder={userInfo.email} disabled/>

                                </div>
                                <div>
                                <label htmlFor="phone-number">Номер телефона:</label>
                                <input id="phone-number" type="text" placeholder='+7' disabled/>

                                </div>
                                <div>
                                <label htmlFor="phone-number">Тип:</label>
                                <input id="type_user" type="text" placeholder={userInfo.type_user} disabled/>

                                </div>
                                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Link to={`/account/update`}>Update Account details</Link>
                            <span className="ml-1 text-primary">| </span>
                                <span className="ml-1"></span>

                            <Link to={`/account/delete/`}>Delete Account</Link>
                     </span>                            
                            <div style={{
                                    height:'50px'
                                }}>

                                </div>
                            <Row>
                                <div style={{
                                    width:'200px'
                                }}>

                                </div>
                                <div style={{
                                    border:'1px solid #F89F21',
                                    borderRadius:'10px',
                                    padding:'5px 15px'
                                    
                                }}>
                                    <span style={{
                                        fontWeight:'bold',
                                        fontFamily:'Inter',
                                        fontSize:'20px'
                                    }}>Партнёр</span>
                                    <img src={IMAGES.sup_buy_icon} width={157} height={67} style={{
                                        borderRadius:'10px'
                                    }}></img>
                                </div>
                            </Row>
                            </Card.Body>


                        </Card>
                        
                        
                        
                        </Col>
                    </Row>

                </div>
                </div>
            )
        } catch (error) {
            return <Message variant='danger'>Something went wrong, go back to <Link
                onClick={logoutHandler} to={`/login`}
            > Login</Link> page.</Message>
        }
    }


    return renderData()

}

export default AccountPage
