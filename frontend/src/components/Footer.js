import IMAGES from "../constants/images";



function Footer(){
    return(
        <footer>
            <div className="container ">
                <div className="row align-items-center">
                    <div  className="col">
                        <img src={IMAGES.logo}></img>
                        <p>
                             © 2023. Все права защищены.
                        </p>

                    </div>
                    <div  className="col">
                        <button className="orange-button ftr-btn">Для поставщиков</button>
                        <button className="orange-button faq-btn ftr-btn">FAQ</button>

                    </div>
                    <div  className="col">
                        <img src={IMAGES.tel_icon}/>
                        
                                            +7 (700) 989 01 01
                    </div>
                    <div  className="col">
                        <img src={IMAGES.email_icon}/>supbuystaff@gmai.com
                    </div>
                </div>

            </div>
            </footer>
    )
}
export default Footer;