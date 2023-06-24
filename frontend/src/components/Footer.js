import IMAGES from "../constants/images";
import {Link} from "react-router-dom";

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
                        <Link to='/faq'>
                        <button className="orange-button faq-btn ftr-btn">FAQ</button>

                        </Link>

                    </div>
                    <div  className="col">
                        <img src={IMAGES.tel} style={{
                            marginRight:'10px'
                        }}/>
                        
                                            +7 (700) 989 01 01
                    </div>
                    <div  className="col">
                        <img src={IMAGES.email} style={{
                            marginRight:'10px'
                        }}/>supbuystaff@gmai.com
                    </div>
                </div>

            </div>
            </footer>
    )
}
export default Footer;