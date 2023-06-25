import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import { useHistory } from "react-router-dom";
import SearchBarForProducts from './SearchBarForProducts'
import IMAGES from '../constants/images'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'



function NavBar() {

    let history = useHistory()
    const dispatch = useDispatch()

    // login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // logout
    const logoutHandler = () => {
        dispatch(logout()) // action
        history.push("/login")
        window.location.reload()
    }

   
    
    function NavBar1(){
        return (
            <header>
                <Navbar  expand="lg" collapseOnSelect className='nvbar'>
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand> <img src={IMAGES.sup_buy_icon}/></Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
    
                                {/* All Products */}
                                <LinkContainer to="/products">
                                    <Nav.Link >Все продукты</Nav.Link>
                                </LinkContainer>
    
                              
    
                            
    
                                    <span className="">
                                        <SearchBarForProducts />
                                    </span>
                                <div style={{
                                    width:'75px'
                                }}>

                                </div>
                                <div className="geo">
                                    <img src={IMAGES.geo_position} />
                                    Almaty
                                </div>
                                <div style={{
                                    width:'20px'
                                }}>

                                </div>
                                <div className="" style={{
                                    maxHeight:'40px'
                                    
                                }}>
                                    <Link to='/basket/'>
                                    <img src={IMAGES.basket2} style={{
                                        height:'34px',
                                        width:'34px',
                                        position:'relative',
                                        top:'-4px'
                                    }}/>


                                    </Link>
                                    
                                </div>
                                
    
                            </Nav>
    
                            {/* login-logout condition here */}
    
                            {userInfo ?
                                <div>
                                    <NavDropdown className="navbar-nav text-capitalize" title={userInfo.username} id='username'>
                                        <LinkContainer to="/account">
                                            <NavDropdown.Item>Профиль</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/all-addresses/">
                                            <NavDropdown.Item>Настройки адреса</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/stripe-card-details/">
                                            <NavDropdown.Item>Настройки карты</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/all-orders/">
                                            <NavDropdown.Item>Все заказы</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/contacts/">
                                            <NavDropdown.Item>Контакты клиентов</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                        Выйти
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                                :
    
                                <LinkContainer to="/login">
                                    <Nav.Link className='login-btn-mini'><i className="fas fa-user"></i> Login</Nav.Link>
                                </LinkContainer>
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        )
    
    }
    



    let path_name = window.location.pathname


    // switch (path_name) {
    //     case '/':
            
            return <NavBar1/>
            
    
        // default:
        //     return <NavBar2/>

            
    // }
    
    

    
}

export default NavBar
