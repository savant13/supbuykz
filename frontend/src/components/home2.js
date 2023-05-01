import IMAGES from "../constants/image";
function Home(){
    return (
        <div>
            
            <div className="container road-map">
                <h1>Как начать</h1>
                <div className="row">
                    <div className="col">
                    <img src={IMAGES.register_icon}></img>
                    <h3>Регистрация</h3>
                    <div className="text-color-dark">
                        Зарегистрируйтесь на сайте заполнив все данные 
                    </div>

                    </div>
                    <div className="col">
                    <img src={IMAGES.person_icon}></img>
                    <h3>Авторизация</h3>
                    <div className="text-color-dark">
                        Войдите на сайт указав номер телефона и пароль

                    </div>

                    </div>
                    <div className="col">
                    <img src={IMAGES.basket_icon}></img>
                    <h3>Оформление покупок</h3>
                    <div className="text-color-dark">
                        Выбирайте товары и оформляйте заказы
                        Загружайте товары и принимайте заказы
                    </div>

                    </div>
                </div>
                <p className="text-color-dark">
                    Наша цель – помочь Вам сделать Ваш бизнес более успешным, прибыльным и контролируемым
                </p>
                <h3>
                    Вопрос только в том, готовы ли вы к этому?
                </h3>
                
                    <button className="orange-button faq-btn opacity100" onClick={()=>{
                                window.location.href='register'
                    }}>Да! Зарегистрироваться <img src={IMAGES.add_person_icon} 
                /></button>
                

            </div>
            

        </div>
        
    )

}

export default Home;