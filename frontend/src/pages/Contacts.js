import { Spinner, Row, Col, Container, Card, Button, Modal } from 'react-bootstrap'
import IMAGES from '../constants/images';
import NavBar from '../components/Navbar';

function ContactsPage(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const orders =[
        {
            name:'Aidos',
            address:'Жетысу-2,15/13',
            phone_number:'+7777-090-23-23',
            status:'Активен'
        },
        {
            name:'Erkin',
            address:'Аккент,45/13',
            phone_number:'+7707-020-03-23',
            status:'неактивен'
        },
        {
            name:'Aisana',
            address:'Mega Tower',
            phone_number:'+7777-777-00-00',
            status:'неактивен'
        },
        {
            name:'Askhat',
            address:'Абылайхана 184a/12',
            phone_number:'+7707-070-12-43',
            status:'неактивен'
        }
    ]
    return (
        <div>
            
        <NavBar></NavBar>
        <div style={{
            height:'50px'
        }}></div>
        
        <Container>
            {orders.map((value,index)=>{
                return (
                    <Container style={{
                        border:'1px solid #FFBA58',
                        borderRadius:'10px',
                        padding:'10px 30px',
                        margin:'20px 0px'
                    }}>
                        <Row>
                        <h3>Статус: {value.status.toUpperCase()}</h3>
                        </Row>

                    <Row  key={index}>
                        
                        <Col md={4}>
                            
                        <Card className="mb-2  avatar" style={{
                            height:'150px',
                            width:'120px',
                            borderRadius:'30px'
                        }}>
                                    <Card.Body>
                                        <Card.Img src={IMAGES.avatar}  height={60}></Card.Img>
                                        
        
                                    </Card.Body>
        
                                </Card>
        
                        </Col>
                        <Col md={8}>
                            <Row>
                                <Col>
                                Имя клиента:
                                
                                </Col>
                                <Col>
                                {value.name}
                                
                                </Col>
                                
                                
                            </Row>
                            <Row>
                                <Col>
                                Номер телефона:
                                
                                </Col>
                                <Col>
                                {value.phone_number}
                                
                                </Col>
                                
                                
                            </Row>
                            <Row>
                                <Col>
                                Адресс:
                                
                                </Col>
                                <Col>
                                {value.address}
                                
                                </Col>
                                
                                
                            </Row>
                            
        
                        </Col>
        
        
                    </Row>
                    </Container>

                )
            })}
            
        </Container>
        </div>
    )
}

export default ContactsPage;