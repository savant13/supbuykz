import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Form, Button, Card } from 'react-bootstrap'
import { chargeCustomer } from '../actions/cardActions'
import { Link, useHistory } from "react-router-dom";
import { getSingleAddress } from '../actions/userActions'
import Message from './Message'


const ChargeCardComponent = ({ product, match, selectedAddressId, addressSelected }) => {

    let history = useHistory()
    const dispatch = useDispatch()

    // create card reducer
    const createCardReducer = useSelector(state => state.createCardReducer)
    const { cardData } = createCardReducer

    // charge card reducer
    const chargeCardReducer = useSelector(state => state.chargeCardReducer)
    const { success: chargeSuccessfull, error: chargeError, loading: chargingStatus } = chargeCardReducer

    // get single address reducer    
    const getSingleAddressReducer = useSelector(state => state.getSingleAddressReducer)
    const { address } = getSingleAddressReducer

    useEffect(() => {
        dispatch(getSingleAddress(selectedAddressId))
    }, [dispatch, match, selectedAddressId])

    // charge card handler
    const onSubmit = (e) => {
        e.preventDefault()
        const address_detail = `${address.house_no}, near ${address.landmark}, ${address.city}, 
        ${address.state}, ${address.pin_code}`
        const data = {
            "email": cardData.email,
            "source": cardData.id,
            "amount": product.price,
            "name": address.name,
            "card_number": cardData.card_data.last4,
            "address": address_detail,
            "ordered_item": product.name,
            "paid_status": true,
            "total_price": product.price,
            "is_delivered": false,
            "delivered_at": "Not Delivered",
        }
        dispatch(chargeCustomer(data))
    }

    if (chargeSuccessfull) {
        history.push({
            pathname: '/payment-status/',
            state: { detail: product }
        })
        window.location.reload()
    }

    return (
        <div>
            {chargeError ? <Message variant="danger">{chargeError}</Message> : ""}
            <span className="text-info">
                <h5>Подтвердить платеж</h5>
            </span>
            <div className="mb-2">
            Использование карты: XXXX XXXX XXXX {cardData.card_data.last4}
            </div>
            <Form onSubmit={onSubmit}>

                {chargingStatus ?
                    <Button variant="primary" disabled style={{ width: "100%" }}>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        {" "}Обработка платежа...
                    </Button>
                    :
                    <Button variant="primary" type="submit" style={{ width: "100%" }}>
                        Pay {product.price}тг
                    </Button>
                }
            </Form>

            <Card
                className="p-2 mt-2 mb-2"
                style={{ border: "1px solid", borderColor: "#C6ACE7" }}
            >
                {address ?
                    <div>
                        <span className="text-info">
                            <b><em>Доставим по этому адресу</em></b>
                        </span>
                        <p></p>
                        <p><b>Имя: </b>{address ? address.name : ""}</p>
                        <p><b>Номер телефона: </b>{address ? address.phone_number : ""}</p>
                        <p><b>Номер дома: </b>{address ? address.house_no : ""}</p>
                        <p><b>Ориентир: </b>{address ? address.landmark : ""}</p>
                        <p><b>Город: </b>{address ? address.city : ""}</p>
                        
                        <p><b>Пин-код/почтовый индекс: </b>{address ? address.pin_code : ""}</p>
                    </div>
                    :
                    ""
                }
            </Card>
            <Link to="#" onClick={() => window.location.reload()}>Выберите другую карту для оплаты</Link>

        </div >
    )
}

export default ChargeCardComponent
