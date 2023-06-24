import { Container,Row,Col } from "react-bootstrap";
import IMAGES from "../constants/images";
import NavBar from '../components/Navbar.js'

function onSubmit(e){
    e.preventDefault()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    let form_data = new FormData()
   

}
const AgreementPage = ()=>{
    const basket = JSON.parse(localStorage.getItem('basket'))
    let total_price = 0
    for (const key in basket) {
        total_price += basket[key].price * basket[key].count
    }
    return (
    <div>
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
                <a href={IMAGES.document_pdf} download style={{
                    textDecoration:'none',

                }}>
               
                <button className="btn1" style={{
                    width:'250px',
                    display:"flex",
                    justifyContent:'space-evenly',
                    alignItems:'center'
                }}>
                    <b>Договор</b> 
                    <img src={IMAGES.doc_button} width={25} height={25}>
                    
                    </img>

                </button>
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
                <button className="btn1" style={{
                    width:'250px',
                    display:"flex",
                    justifyContent:'space-evenly',
                    alignItems:'center'
                }}>
                    
                    <b>Загрузить Договор</b> 
                    <img src={IMAGES.download_button} width={25} height={25}>
                    
                    </img>

                </button>

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
                

            }}>
            Получить Контакты 
            </button>
            </Col>
            
        </Row>
        </form>


    </Container>
    </div>)
    



}

export default AgreementPage;