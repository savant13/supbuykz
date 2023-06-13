import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col,Row } from 'react-bootstrap'
import { createProduct } from '../actions/productActions'
import { useHistory } from 'react-router'
import { checkTokenValidation, logout } from '../actions/userActions'
import { CREATE_PRODUCT_RESET } from '../constants'
import Message from '../components/Message';
import IMAGES from '../constants/images'



const ProductCreatePage = () => {

    let history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState(false)
    const [image, setImage] = useState(null)

    // login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // create product reducer
    const createProductReducer = useSelector(state => state.createProductReducer)
    const { product, success: productCreationSuccess, error: productCreationError } = createProductReducer

    // check token validation reducer
    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    const categories = ['Напитки','Молочные продукты','Морские продукты',"Мясо"]
    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        }
        dispatch(checkTokenValidation())
    }, [dispatch, userInfo, history])

    const onSubmit = (e) => {
        e.preventDefault()
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        
        let form_data = new FormData()
        form_data.append('name', name)
        form_data.append('description', description)
        form_data.append('price', price)
        form_data.append('category',e.target[2].value)
        form_data.append('image', image)
        form_data.append("type_product",userInfo.type_user[0])

        dispatch(createProduct(form_data))
    }

    if (productCreationSuccess) {
        alert("Product successfully created.")
        history.push(`/product/${product.id}/`)
        dispatch({
            type: CREATE_PRODUCT_RESET
        })
    }

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }
    let content = {
        images:[
            IMAGES.add_product1,
            IMAGES.add_product2,
            IMAGES.add_product3,
        ],
        text:[
            "Добавьте новый товар за 5 минут",
            "Участвуйте в аукционах",
            "Обновляйте свой каталог"

        ]
    }
    if (userInfo.type_user=='Buyer'){
        content = {
            images:[
                IMAGES.request1,
                IMAGES.request2,
                IMAGES.request3,
            ],
            text:[
                "Создайте бесплатную заявку на  покупку за 5 минут",
                "Получайте предложения только от заинтересованных поставщиков",
                "Выбирайте лучшие цены и условия"
    
            ]
        }
    }



    return (
        <div>
            {/* {productCreationError && <Message variant='danger'>{productCreationError.image[0]}</Message>} */}

                <h1 style={{
                    color:'#F89F21',
                    textAlign:'center',
                    fontWeight:'900'
                }}>{userInfo.type_user!='Buyer'?"Добавить новый товар":'Заявка на покупку'}</h1>
                
            
            <Row className='add-product'>
                    <Col style={{
                       
                        textAlign:'center'
                    }}>
                    <div>
                    <img src={content.images[0]}> 
                    </img>

                    </div>
                    <div>
                    <img src={IMAGES.one}> 
                    </img>

                    </div>
                    <div>
                    {content.text[0]}
                    </div>
                    
                    
                    
                    </Col>

                    <Col style={{
                       
                       textAlign:'center'
                   }}>
                   <div>
                   <img src={content.images[1]}> 
                   </img>

                   </div>
                   <div>
                   <img src={IMAGES.two}> 
                   </img>

                   </div>
                   <div>
                   {content.text[1]}
                    </div>
                   
                   
                   
                   </Col> 
                   <Col style={{
                       
                       textAlign:'center',
                       
                   }}>
                   <div>
                   <img src={content.images[2]}> 
                   </img>

                   </div>
                   <div>
                   <img src={IMAGES.three}> 
                   </img>

                   </div>
                   <div>
                   {content.text[2]}
                    </div>
                   
                   
                   
                   </Col> 



               
             
            </Row>
            <Form onSubmit={onSubmit}>

                <Form.Group controlId='name'>
                    <Form.Label>
                        <b>
                        Наименование товара
                        </b>
                    </Form.Label>
                    <Form.Control
                        required
                        autoFocus={true}
                        type="text"
                        value={name}
                        placeholder=""
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>
                        <b>
                        Описание товара
                        </b>
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={description}
                        placeholder=""
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>
                        <b>
                        Категория продукта
                        </b>
                    </Form.Label>
                    
                    
                </Form.Group>
                <Form.Group controlId='categoryProduct' className='category-input'>
                    <select>
                    {categories.map((value,index)=>{
                            return <option
                            inline
                            label={value}
                            name="categoryProduct"
                            type='option'
                            value={value}
                            
                        />


                        })}


                        
                    </select>
                       
                        
                        
                </Form.Group>

                

                <Form.Group controlId='price'>
                    <Form.Label>
                        <b>
                        Цена
                        </b>
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        pattern="[0-9]+(\.[0-9]{1,2})?%?"
                        value={price}
                        placeholder="199.99"
                        step="0.01"
                        maxLength="8"
                        onChange={(e) => setPrice(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {/* <span style={{ display: "flex" }}>
                    <label>In Stock</label>
                    <input
                        type="checkbox"
                        value={stock}
                        className="ml-2 mt-2"
                        onChange={() => setStock(!stock)}
                    />
                </span> */}

                <Form.Group controlId='image'>
                    <Form.Label>
                        <b>
                        Изображение
                        </b>
                    </Form.Label>
                    <Form.Control
                        required
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    >
                    </Form.Control>
                </Form.Group>

                <Button
                style={{
                    margin:'5px 10px'
                }}
                    type="submit"
                    variant='success'
                    className="btn-custom"
                >
                    {userInfo.type_user!='Buyer'?"Добавить товар":"Отправить заявку"}
                </Button>
                <Button
                style={{
                    margin:'5px 10px'
                }}
                    type="submit"
                    variant='primary'
                    className="btn-custom btn2"
                    onClick={() => history.push("/")}
                >
                    Cancel
                </Button>
            </Form>
        </div>
    )
}

export default ProductCreatePage
