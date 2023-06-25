import { Container,Row,Col } from "react-bootstrap";
import IMAGES from "../constants/images";
import agreementFile from '../data/template_agreement.docx';
import NavBar from '../components/Navbar.js'
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'

function onSubmit(e){
    e.preventDefault()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    let form_data = new FormData()
   

}
const AgreementPage = ()=>{
    const basket = JSON.parse(localStorage.getItem('basket'))
    const [end,setEnd] = useState(false)
    let total_price = 0
    for (const key in basket) {
        total_price += basket[key].price * basket[key].count
    }
    let myRef = useRef('fileInput');
    
    return (
    <div> 
           
    <div style={{
        opacity:end?'40%':'100%'
    }}>
        <NavBar></NavBar>
     
        <div style={{
            height:'50px'
        }}></div>
    <Container style={{
        
        
    }}>
        
        
        <form onSubmit={onSubmit}>

        
        <Row style={{
            justifyContent:'center'
        }}>
            <h1>Оформление заказа <img src={IMAGES.korzina} width={50} height={50}></img></h1>
        
        </Row>
        <br></br>
        <br></br>
        <Row>
            <Col md={2}>
               <h2>1.</h2>
            </Col>
            <Col md={5}>
                <a href={agreementFile} download target="_blank" rel="noopener noreferrer" style={{
                    textDecoration:'none',

                }}>
                 
               
                <div className="btn1" style={{
                    width:'250px',
                    display:"flex",
                    justifyContent:'space-evenly',
                    alignItems:'center'
                }}
                
                
                >
                    <b>Договор</b> 
                    <img src={IMAGES.doc_button} width={25} height={25}>
                    
                    </img>

                </div>
            </a>

            </Col>
            <Col md={5}>
            Скачайте договор и заполните все ваши данные.
            </Col>

        </Row>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Row>
        <Col md={2}>
               <h2>2.</h2>
            </Col>
            <Col md={5}>
                  
                <div className="btn1" style={{
                    width:'250px',
                    display:"flex",
                    justifyContent:'space-evenly',
                    alignItems:'center'
                }}>
                    <input type="file" onChange={(e)=>{
                        const file = e.target.files[0];
                    }} style={{
                        opacity:'0%',
                        position:'absolute'
                    }}/>
                    <b>Загрузить Договор</b> 
                    <img src={IMAGES.download_button} width={25} height={25}>
                    
                    </img>

                </div>

            </Col>
            <Col md={5}>
            Загрузите ваш заполненный договор
            </Col>

        </Row>
        <br></br>
        <br></br>
        <Row>
            <Col md={2}></Col>
            <Col md={5}></Col>
            <Col md={5} style={{
                borderLeft:"1px solid black",
                paddingLeft:'40px'
                
                
            }}>
                <Row style={{
                    marginTop:'10px'
                }}>
                    <h3>Ваша заявка <img src={IMAGES.zaiavka}  width={25} height={25}></img></h3>
                </Row>
                <Row style={{
                    marginTop:'10px'
                }}>
                    <h5>Товары на сумму {total_price} тг</h5>
                </Row>
                <Row style={{
                    marginTop:'40px'
                }}>
                    <h4>Коментарий к заявке <img src={IMAGES.pencil} width={30} height={30}></img></h4>
                </Row>
                <Row style={{
                    marginTop:'20px'
                }}>
                    <textarea style={{
                        resize:'none',
                        height:'100px',
                        width:'250px'
                    }}>

                    </textarea>
                </Row>



            </Col>

        </Row>
        <br></br>
        <br></br>
        <br></br>
        <Row style={{
            justifyContent:'center'
        }}>
            <Col md={1}>
            <h3>3.</h3>
            </Col>
            <Col md={6} style={{
                fontSize:'20px'
            }}>
            После проверки договора Администратором нашего сервиса вы сможете связаться с Поставщиком.
            </Col>
        </Row>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Row style={{
            justifyContent:'center'
        }}>
            <Col md={4}>
            <button className="btn1" style={{
                width:'350px',
                

            }}
            onClick={()=>{
                setEnd(true)
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // Optional: Enables smooth scrolling animation
                  });
            }}
            >
            Получить Контакты 
            </button>
            </Col>
            
        </Row>
        </form>


    </Container>
    
    </div>
    <div style={
            {
                position:'fixed',
                background: "#F89F21",
                opacity:end?"80%":'0%',
                display:end?"block":'none',
                width:'482px',
                height:'500px',
                left:'40%',
                top:'25%',
                color:'white',
                padding:'20px 30px',
                textAlign:'center',
                borderRadius:'50px'
            }
            
        }>
            <h3>Спасибо за заказ!</h3>
            <div style={{
                height:'25px'
            }}></div>
            <div >
                <img src={IMAGES.done_agreement}></img>
            </div>
            <div style={{
                height:'50px'
            }}></div>
            <div style={{
                fontSize:'20px',
                fontWeight:'400',
                fontFamily:'Inter',

                
            }}>
            Ваш заказ успешно оформлен.В ближайшее время по указанному телефону с вами свяжутся.
            </div>
            <div style={{
                height:'50px'
            }}></div>
            <Link to='/products'>
                <button className="btn1" style={{
                    background:'#F27623',
                    
                    fontSize:'20px',
                    fontFamily:'Inter',
                    width:'70%',
                    borderRadius:'60px'
                }}>
                Вернуться на главную 
            </button>
            </Link>

        </div> 

    </div>
    )
    



}

export default AgreementPage;