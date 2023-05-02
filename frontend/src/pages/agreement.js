import { useContext, useState } from "react";
import DownloadPDFButton from "../components/download_pdf";
import AuthContext from "../context/AuthContext";

const AgreementPage = ()=>{
    // const {user} = useContext(AuthContext)


    return <div className="container cnt-agreement">
        <h2>
            Оформление заказа
        </h2>
        <div className="row ">
            <div className="col number-class">
                1.
            </div>
            <div className="col part-center">
                
                    <DownloadPDFButton text='Договор'/>
                
            </div>
            <div className="col part-center">
                
                    <p>Скачайте договор и заполните все ваши данные.</p>
                
            </div>
          

        </div>
        <div className="row">
            <div className="col number-class">
                2.
            </div>
            <div className="col part-center">
                <input className="" placeholder = "Загрузить договор"type="file"/>
                
                
            </div>
            <div className="col part-center">
                <p>Загрузите ваш заполненный договор</p>
            </div>

        </div>
        <div className="row">
            <div className="col part-center left-part">
                <h3>Ваша заявка</h3>
                <div>
                    <div>
                Товары на сумму
                    </div>
                <div>
                 {/* {order.price} */}
                </div>

                </div>
                <h3>Коментарий к заявке</h3>
                <textarea rows="4"
                cols="35"
                placeholder="Enter your text here...">

                </textarea>
                
            </div>

        </div>
        <div className="center-agreement">
        <div className="row">
            <div className="col">
            После проверки договора Администратором нашего сервиса вы сможете связаться с Поставщиком.
            </div>
            
        </div>
        <div className="row">
            <div className="col">
            <button className="orange-button2">
                Получить Контакты 
                </button>
                <h3 className='text-color-main'>
                Удачных покупок! Ваш SUPBUY.KZ
                </h3>

            </div>
                
            </div>
            </div>
    </div>

}

export default  AgreementPage;