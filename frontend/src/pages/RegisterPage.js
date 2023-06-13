import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { register } from '../actions/userActions'
import Message from '../components/Message'

function RegisterPage({ history, variant }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [typeUser,setTypeUser] = useState('')
    const [licenze,setLicenze] = useState('')

    const dispatch = useDispatch()

    // reducer
    const userRegisterReducer = useSelector(state => state.userRegisterReducer)
    const { error, userInfo } = userRegisterReducer

    useEffect(() => {
        if (userInfo) {
            history.push('/') // homepage
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(e.target.typeUser.value)
        console.log(e.target.licenze.value)
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(register(username, email, password,e.target.typeUser.value,e.target.licenze.files[0]))
        }
    }

    return (
        <div>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    <h1>Регистрация </h1>
                    <p>Создайте свою учетную запись, чтобы получить все функции</p>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name' className='register-field' >
                            
                            <Form.Control
                                required
                                type="text"
                                placeholder="Название организации"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email' className='register-field'>
                            
                            <Form.Control
                                required
                                type="email"
                                placeholder="Электронная  почта"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password' className='register-field'>
                           
                            <Form.Control
                                required
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='passwordConfirm' className='register-field'>
                            
                            <Form.Control
                                required
                                type="password"
                                placeholder="Повторите пароль"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='typeUser' className='register-field'>
                        <Form.Check
                            inline
                            label="Supplier"
                            name="typeUser"
                            type='radio'
                            value='Supplier'
                            id={`inline-radio-1`}
                        />
                        <Form.Check
                            inline
                            label="Buyer"
                            
                            name="typeUser"
                            type='radio'
                            value='Buyer'
                            id={`inline-radio-2`}
                        />
                       
                        </Form.Group>
                        <Form.Group controlId="licenze" className="mb-3">
                        <Form.Label>Лицензия</Form.Label>
                        <Form.Control type="file" size="lg" />
                        </Form.Group>

                        <Button type="submit" variant='primary' className='btn-custom'>Зарегистрироваться</Button>
                    </Form>

                    <Row className="py-3">
                        <Col>
                           Уже есть аккаунт?
                    <Link
                                to={`/login`}
                            > Логин</Link>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6}>
                <div className='content-register'>
                        <div>
                            <h3>Заполнение данных</h3>
                            <p>Для регистрации вам нужно заполнить все  необходимые данные.</p>
                        </div>
                        <div>
                            <h3>Придумайте пароль</h3>
                            <p>Пароль должен содержать не менее 8 символов, состоящих из не менее одной буквы в верхнем регистре, одной буквы в нижнем регистре и цифры</p>
                        </div>
                        <div>
                            <h3>Лицензия</h3>
                            <p>Для успешной регистрации вам нужно загрузить PDF вариант лицензии,подтверждающий о наличии ИП ТОО</p>
                        </div>
                    </div>


                </Col>
            </Row>
        </div>

    )
}

export default RegisterPage