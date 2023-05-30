import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import React from 'react'

function Product({ product }) {
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

                    <Card.Text as="h3">
                         {product.price} тг
                    </Card.Text>
                    <Card.Footer>
                        <button className='btn-product'>
                            Принять
                        </button>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
