
import IMAGES from "../constants/images";

import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import { useHistory } from "react-router-dom";
import SearchBarForProducts from './SearchBarForProducts'



function Navbar2() {
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
    
    return (
        
        <header>
            <Navbar  expand="lg" collapseOnSelect className='nvbar' style={{
                backgroundColor:'#F89F2199',
                color:'white',
                
            }}>
                    <Container style={
                        {
                            maxWidth:'75vw'
                        }
                    }>
                        <LinkContainer to="/">
                            <Navbar.Brand> <img src={IMAGES.sup_buy_icon} style={{
                                borderRadius:'20px'
                            }}/></Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <div style={{
                                    width:'50vw'
                                }}>
                                    
                                </div>
                                
    
                                
    
                              
    
                            
    
            
                                <div className="geo" style={{
                                    fontSize:'20px'
                                }}>
                                    <img src={IMAGES.geo_position} />
                                    Алматы
                                </div>
                                
    
                            </Nav>
    
                            {/* login-logout condition here */}
    
                            {userInfo ?
                                <div>
                                    <NavDropdown className="navbar-nav text-capitalize"  style={{
                                            
                                    }} title={userInfo.username} id='username'>
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



        </header>)
    

}
export default Navbar2;