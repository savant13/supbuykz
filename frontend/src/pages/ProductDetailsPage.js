import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col, Container, Card, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CREATE_PRODUCT_RESET, DELETE_PRODUCT_RESET, UPDATE_PRODUCT_RESET, CARD_CREATE_RESET } from '../constants'
import NavBar from '../components/Navbar'
import IMAGES from '../constants/images'


function ProductDetailsPage({ history, match }) {

    const dispatch = useDispatch()

    // modal state and functions
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // product details reducer
    const productDetailsReducer = useSelector(state => state.productDetailsReducer)
    const { loading, error, product } = productDetailsReducer

    // login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // product details reducer
    const deleteProductReducer = useSelector(state => state.deleteProductReducer)
    const { success: productDeletionSuccess } = deleteProductReducer

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
        dispatch({
            type: UPDATE_PRODUCT_RESET
        })
        dispatch({
            type: CREATE_PRODUCT_RESET
        })
        dispatch({
            type: CARD_CREATE_RESET
        })
    }, [dispatch, match])

    // product delete confirmation
    const confirmDelete = () => {
        dispatch(deleteProduct(match.params.id))
        handleClose()
    }

    // after product deletion
    if (productDeletionSuccess) {
        alert("Product successfully deleted.")
        history.push("/products")
        dispatch({
            type: DELETE_PRODUCT_RESET
        })
    }

    return (
        <div>
            <NavBar></NavBar>
            <div style={{
                height:'50px'
            }}></div>

            {/* Modal Start*/}
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <i style={{ color: "#e6e600" }} className="fas fa-exclamation-triangle"></i>
                            {" "}
                            Delete Confirmation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this product <em>"{product.name}"</em>?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => confirmDelete()}>
                            Confirm Delete
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            {/* Modal End */}

            {loading && <span style={{ display: "flex" }}>
                <h5>Getting Product Details</h5>
                <span className="ml-2">
                    <Spinner animation="border" />
                </span>
            </span>}
            {error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                    <Container>
                        <Row>
                            <div style={{
                                fontSize:'20px',
                                fontWeight:'bold'

                            }}>
                                {product.category}&#10148;

                            </div>
                            
                        </Row>
                        <div style={{
                            height:'25px'
                        }}></div>
                        <Row>
                            <h1>
                                {product.name}
                                
                            </h1>
                        </Row>
                        <div style={{
                            height:'25px'
                        }}></div>
                        
                        <Row>
                            <Col md={4}>
                                <div style={{
                                    textAlign:'center',
                                    boxShadow: "0px 2px 4px 0px #5A5B6A3D",
                                    boxShadow: "0px 1px 2px 0px #3A3A443D",
                                    borderRadius:'10px',


                                }}>
                                    <img src={product.image} height="231px" width="205px"/>
                                    
                                    
                                </div>
                                <div style={{
                            height:'25px'
                        }}></div>

                                {/* Product edit and delete conditions */}

                                {userInfo && userInfo.admin ?
                                    <span style={{ display: "flex" }}>
                                        < button
                                            className="btn mt-2 btn-danger btn-sm button-focus-css"
                                            style={{ width: "100%" }}
                                            onClick={() => handleShow()}
                                        >Delete Product
                                        </button>

                                        <button
                                            className="ml-2 mt-2 btn btn-primary btn-sm button-focus-css"
                                            onClick={() => history.push(`/product-update/${product.id}/`)}
                                            style={{ width: "100%" }}
                                        >Edit Product
                                        </button>
                                    </span>
                                    : ""}
                            </Col>

                            <Col >
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    border: "1px solid",
                                    borderRadius:"10px",
                                    color:"#F89F21",
                                    borderColor: "#F89F21",
                                    padding: "10px 15px",
                                    alignItems:'center'
                                }}>
                                    <div className="col" style={{
                                        fontWeight:'900',
                                        fontSize:'26px'

                                    }}>{product.price} тг</div>
                                    <div className='col'>
                                    
                                    <Link to={`/basket/`}>
                                        <button className="btn1" style={{
                                            width:'261px'
                                        }} onClick={
                                            (e)=>{
                                                
                                                let basket = {
                                                    'pr.id':{
                                                        name:product.name,
                                                        price:product.price,
                                                        count:1,
                                                        image:product.image
                                                    }
                                                }
                                                localStorage.setItem('basket',JSON.stringify(basket))
                                            }
                                        }>
                                            <img src={IMAGES.basket2} width={30} height={30} style={{
                                                borderRadius:'20px'
                                            }}>
                                            </img>
                                            
                                            <span style={{
                                                marginLeft:'30px',
                                                fontSize:"22px",
                                                fontWeight:"900",
                                            }}>В корзину</span>
                                        </button>
                                    </Link>
                                   

                                    </div>
                                    
                                </div>
                                <div style={{height:'20px'}}></div>
                                <h5>Страна-производитель: Казахстан</h5>
                                <h5>Бренд: {product.name}</h5>
                                
                                <hr />
                                <span className="justify-description-css">
                                    <p>{product.description}</p>
                                </span>
                                
                            </Col>
                            
                        </Row>

                    </Container>
                </div>
            }
        </div >
    )
}

export default ProductDetailsPage
