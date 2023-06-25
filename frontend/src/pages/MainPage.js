import { useHistory,Link } from "react-router-dom";
import IMAGES from '../constants/images';
import Navbar2 from '../components/Navbar2';
import { Container } from 'react-bootstrap';
import { Form, Button, Col,Row } from 'react-bootstrap'


function MainPage(params) {
    return  (
        <div >
            <Navbar2/>
        <div className="main-part1 container">
        <div className="break-point"></div>
        <div className='row content-center'>

            <div className='col descrp1'>
                <h1>Уникальная торговая площадка, которая дает возможность:</h1>
            </div>

        </div>
        <div style={
            {
                height:'200px'
            }
        }></div>
        
        <div className='row content-center'>
            <div className='col mnp-btn'>
            <Link to='/login'>
                <button onClick={()=>{
                    
                }} className="orange-button">Заказчикам</button>
                </Link>
            </div>
            <div className='col mnp-btn'>
            <Link to='/login'>
                <button onClick={()=>{
                    
                }} className="orange-button">Поставщикам</button>
            </Link> 

            </div>
        </div>
        <div className='row content-center'>
            <div className='col'>
                <Link to='/faq'>
                <button className="orange-button faq-btn"> FAQ</button>

                </Link>

            </div>

        </div>



        </div>
        <div>

            <div className="container-fluid road-map" style={{
                
            }}>
                <h1 style={{
                    fontSize:'50px',
                    marginBottom:'50px'

                }}>Как начать</h1>
                <div className="row" style={{
                    
                }}>
                    <div className="col">
                    <img src={IMAGES.roadmap1}></img>
                    <h3>Регистрация</h3>
                    <div className="text-color-dark">
                        Зарегистрируйтесь на сайте заполнив все данные 
                    </div>

                    </div>
                    <div className="col">
                    <img src={IMAGES.roadmap2}></img>
                    <h3>Авторизация</h3>
                    <div className="text-color-dark">
                        Войдите на сайт указав номер телефона и пароль

                    </div>

                    </div>
                    <div className="col">
                    <img src={IMAGES.korzina} height={75}></img>
                    <h3>Оформление покупок</h3>
                    <div className="text-color-dark">
                        Выбирайте товары и оформляйте заказы
                        Загружайте товары и принимайте заказы
                    </div>

                    </div>
                </div>
                <div style={{
                    height:'100px'
                }}></div>
                <div className="text-color-dark" style={{
                    fontSize:'26px',
                    width:"50%",
                    position:'relative',
                    left:'25%'
                }}>
                    Наша цель – помочь Вам сделать Ваш бизнес более успешным, прибыльным и контролируемым
                </div>
                <div style={{
                    height:'50px'
                }}>

                </div>
                <h5 style={{
                    color:'#F89F21',
                    fontFamily:'Inter',
                    fontWeight:'300',
                    fontSize:'24px'
                }}>
                    Вопрос только в том, готовы ли вы к этому?
                </h5>
                    <Link to='/register'>
                    <button className=" faq-btn opacity100" onClick={()=>{
                                
                            }}
                            style={{
                                color:'#FFFFFF',
                                fontFamily:'Quicksand',
                                fontWeight:'700',
                                borderRadius:'20px',
                                background:'#F89F21',
                                border:'none',
                                width:'400px',
                                height:'50px',
        
        
        
                            }}
                            >Да! Зарегистрироваться <img src={IMAGES.add_person} style={{
                                marginLeft:'15px',
                                height:'34px',
                                width:'34px'
                            }}
                        /></button>

                    </Link>
                    


            </div>


            </div>    



        </div>
    )


    
}

export default MainPage;