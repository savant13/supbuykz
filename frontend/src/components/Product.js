import { Row, Col, Form, Button, Card  } from 'react-bootstrap'
import { Link } from 'react-router-dom'


import React from 'react'

function Product({ product ,basket,setBasket}) {
    return (
        <div>
            <Card className="mb-4 rounded">

                <Card.Body>
                <Link to={`/product/${product.id}`}>
                    <Card.Img variant="top" src={product.image} height="162" />
                </Link>
                    <Link to={`/product/${product.id}`}>
                        <Card.Title as="div">
                            <p>{product.name}</p>
                        </Card.Title>
                    </Link>

                    <Card.Body >
                         <Row style={{
                            justifyContent:'space-between'
                         }}>
                            <Col md={8} style={{
                                fontSize:'16px',
                                padding:'0px'
                            }}>
                            {product.price} тг
                            
                            </Col>
                            <Col md={4} style={{
                                color:'#F89F21',
                                fontFamily:'Inter',
                                fontWeight:'700',
                                fontSize:'14px',
                                padding:'0px'
                            }}>
                            {product.count} шт

                            </Col>
                        

                         </Row>
                         
                    </Card.Body>
                    <Card.Footer>
                        <button className='btn-product' onClick={(e)=>{
                            e.preventDefault()
                                let count = 1;
                                if (basket[String(product.id)]){
                                    console.log(basket[String(product.id)].count)
                                    count = basket[String(product.id)].count + 1
                                }
                            
                                let new_basket = {}
                                for (const key in basket) {
                                    new_basket[key] = basket[key]
                                }
                                new_basket[String(product.id)] = {
                                    name:product.name,
                                    price:product.price,
                                    count:count,
                                    image:product.image
    
                                }
                                setBasket(new_basket)

                            
                           
                           
                            
                        }}>
                            {product.type_product!='B'?"Заказать":"Принять"}
                        </button>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
