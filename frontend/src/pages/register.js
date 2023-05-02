import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
let to_register = async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    

    
    
    let response = await fetch(
        "http://127.0.0.1:8000/api/register/",{
            method:'POST',
            mode: "cors",
            body:formData,
            
        }
    )
    console.log(response.json())
    

    


}
function register_page(){
    return (
        <div className='container  login-container'>
            <div className='row'>
                <div className='col'>
                <form  onSubmit={to_register} encType='multipart/form-data'>
                <h3>Регистрация </h3>
                <p>Создайте свою учетную запись, чтобы получить все функции</p>
                <div><input className ='fieldl' placeholder='Название организации' name='username'></input></div>
                <div><input className ='fieldl' placeholder='ИИН/БИН' name='iin_number'></input></div>
                <div><input className ='fieldl' placeholder='Полное имя' name='first_name'></input></div>
                <div><input className ='fieldl' placeholder='Мобильный телефон' name='phone_number'></input></div>
                <div><input type='email' className ='fieldl' placeholder='Электронная  почта' name='email'></input></div>
                <div><input className ='fieldl' placeholder='Юридический адрес ' name='address'></input></div>
                <div><input type='password' className ='fieldl' placeholder='Пароль' name='password'></input></div>
                <div><input type='password' className ='fieldl' placeholder='Повторите пароль' name='confirm_password'></input></div>
                <div><p> Подтверждающий документ/лицензия</p><input type='file' className ='fieldl' placeholder=' Подтверждающий документ/лицензия ' name='licenze'></input></div>
                <div>  <select id="types" name='type'>
                        <option value="SUPL">Supplier</option>
                        <option value="BUYER">Buyer</option>
                </select>
                </div> 
                <button className='orange-button' type='submit' id='register-btn'>
                        Зарегистрироваться
                    </button>
                    </form> 
                                  
                </div>

                
                <div className='col'>
                    <div className='content-register'>
                        <div>
                            <h3>Заполнение данных</h3>
                            <p>Для регистрации вам нужно заполнить все  необходимые данные.</p>
                        </div>
                        <div>
                            <h3>Придумайте пароль</h3>
                            <p>Пароль должен содержать не менее 8 символов, состоящих из не менее одной буквы в верхнем регистре, одной буквы в нижнем регистре и цифры</p>
                        </div>
                        <div>
                            <h3>Лицензия</h3>
                            <p>Для успешной регистрации вам нужно загрузить PDF вариант лицензии,подтверждающий о наличии ИП ТОО</p>
                        </div>
                    </div>
                </div>

            </div>
            
        </div>
    )



}

export default register_page;