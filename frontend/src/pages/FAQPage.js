import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import NavBar from '../components/Navbar';



function FAQPage(){

    return (
        <div>
            <NavBar></NavBar>
            <div style={{
                height:'50px'
            }}></div>
        <Container>
            <Row>
                <Col md={3}>
                    <Row>
                        <div className='faq-btn-style'>
                            {"Главная > FAQ"}
                        </div>
                        

                    </Row>
                    <div style={{
                        height:'50px'
                    }}></div>
                    <Row>
                        <div className='faq-btn-style'>
                            {"Для поставщиков"}
                        </div>
                        

                    </Row>
                    <div style={{
                        height:'50px'
                    }}></div>
                    <Row>
                        <div className='faq-btn-style'>
                            {"Для заказчиков"}
                        </div>
                        

                    </Row>
                    
                    
                </Col>
                <Col md={9} style={
                    {
                        border:'1px solid #B3B3B3'
                    }
                }>
                    <Row style={{
                        background: "#F89F21",
                        color:'white',
                        textAlign:'center',
                        padding:'5px 20px',
                        fontWeight:'700'

                    }}>
                        <h4 style={{
                            
                        }}>
                            FAQ
                        </h4>
                        <div>Не можете найти ответ, который вы ищете? Мы поделились некоторыми из наших наиболее часто задаваемых вопросов, чтобы помочь вам!</div>

                    </Row>
                    <div style={{
                        height:'30px'
                    }}>

                    </div>
                    <Row style={
                        {
                            borderTop:"1px solid black",
                            fontWeight:'700',
                            fontSize:'18px',
                            padding:'5px 15px'
                        }
                    }>
                    Как проверяется подтверждающий документ?
                    </Row>
                    <hr></hr>
                    <Row  style={
                        {
                            borderBottom:"1px solid black",
                            fontWeight:'700',
                            fontSize:'18px',
                            padding:'5px 15px'
                        }
                    }>
                    * Подтверждающий документ проверяется через Администратора *
                    </Row>
                    <div style={{
                        height:'30px'
                    }}>

                    </div>
                    <Row style={
                        {
                            borderTop:"1px solid black",
                            fontWeight:'700',
                            fontSize:'18px',
                            padding:'5px 15px'
                        }
                    }>
                    Как проверяется подтверждающий документ?
                    </Row>
                    <hr></hr>
                    <Row  style={
                        {
                            borderBottom:"1px solid black",
                            fontWeight:'700',
                            fontSize:'18px',
                            padding:'5px 15px'
                        }
                    }>
                    * Подтверждающий документ проверяется через Администратора *
                    </Row>
                    <div style={{
                        height:'30px'
                    }}>

                    </div>
                    <Row style={
                        {
                            borderTop:"1px solid black",
                            fontWeight:'700',
                            fontSize:'18px',
                            padding:'5px 15px'
                        }
                    }>
                    Как проверяется подтверждающий документ?
                    </Row>
                    <hr></hr>
                    <Row  style={
                        {
                            borderBottom:"1px solid black",
                            fontWeight:'700',
                            fontSize:'18px',
                            padding:'5px 15px'
                        }
                    }>
                    * Подтверждающий документ проверяется через Администратора *
                    </Row>
                    
                </Col>

            </Row>
        </Container>
        </div>
    )

}

export default FAQPage;