import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { login } from '../actions/userActions'
import Message from '../components/Message';
import Navbar2 from '../components/Navbar2'


function LoginPage({ history }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    // reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { error, userInfo } = userLoginReducer

    useEffect(() => {
        if (userInfo) {
            history.push('/products') // homepage
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
        <div>
            <Navbar2/>
        <div className='login-container'>
            <Row className='justify-content-md-center '>
                <Col xs={12} md={3} >                    
                    <h3>Supbuy.kz - Вход</h3>                    
                    {error && <Message variant='danger'>{error}</Message>}
                    <Form onSubmit={submitHandler} className='login-form'>
                        <Form.Group controlId='username'>
                         
                            <Form.Control
                                type="text"
                                placeholder="Ваше логин"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='field-login'
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                          
                            <Form.Control
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='field-login'
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button style={{
                            
                        }} type="submit" variant='primary'>Вход</Button>
                    </Form>

                    <Row className="py-3">
                        <Col>
                        Еще не регистрировались?
                    <Link
                                to={`/register`}
                            > Регистрирация</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
        </div>

    )
}

export default LoginPage