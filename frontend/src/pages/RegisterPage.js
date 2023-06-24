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
        
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(register(username, email, password,e.target.typeUser.value,e.target.licenze.files[0]))
        }
    }

    return (
        <div>
            <Row className='justify-content-md-center' style={{
                marginTop:'100px'
            }}>
                <Col xs={12} md={5}>
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

                        <Form.Group controlId='IIN_BIN' className='register-field' >
                            
                            <Form.Control
                                required
                                type="text"
                                placeholder="ИИН/БИН"
                                
                                onChange={(e) => {}}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='full_name' className='register-field' >
                            
                            <Form.Control
                                required
                                type="text"
                                placeholder="Полное имя"
                                
                                onChange={(e) => {}}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='mobile_phone' className='register-field' >
                            
                            <Form.Control
                                required
                                type="text"
                                
                                placeholder="Мобильный телефон"
                                
                                onChange={(e) => {}}
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

                        <Form.Group controlId='address' className='register-field' >
                            
                            <Form.Control
                                required
                                type="text"
                                
                                placeholder="Юридический адрес "
                                
                                onChange={(e) => {}}
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
                        <Form.Group controlId="licenze" className="register-field" >
                        <Form.Label htmlFor='file-field' style={{
                             width: '460.69px',
                             height: '50.98px',
                             color:'gray',
                             padding:'15px 15px',
                            
                             background: '#E8E8E8',
                             borderRadius: '20px'
                        }}> Подтверждающий документ/лицензия </Form.Label>
                        <Form.Control type="file" size="lg" id='file-field' style={{
                           
                            
                        }} placeholder='d'/>
                        </Form.Group>

                        <Button type="submit" variant='primary' className='btn-custom' style={{
                            width:'335px',
                            height:'50px',
                            fontSize:'23px',
                            padding:'5px',
                            background:'#F5B252',
                            borderRadius:'20px'
                        }}>Зарегистрироваться</Button>
                    </Form>

                    <Row className="py-3">
                        <Col>
                           Уже есть аккаунт?
                    <Link to={`/login`} > <span style={{color:'#F5B252',textDecoration:'none'}}>Логин</span></Link>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={4}>
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