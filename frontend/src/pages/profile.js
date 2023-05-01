import React from 'react';
import axios from 'axios';
function profile_page(){
    const user = user_data()
    return (
        <div className='container profile-container'>
            <h3>Личный кабинет</h3>
            <div className='row'>
                <div className='col'>
                    <div className='profile-photo'>
                        <img alt=''></img>
                        <p> Фото профиля</p>
                        <p>“тип аккаунта”</p>
                    </div>
                    

                </div>
                <div className='col'>
                    <div className='profile-fields'>
                        <h2>Контактная информация</h2>
                    <div>
                        <label>Наименование организации / ИП:</label>
                        <br></br>
                        <input className ='fieldl' placeholder={user.organization} readOnly ></input>
                        
                    </div>
                    <div>
                        <label>Электронная почта:</label>
                        <br></br>
                        <input className ='fieldl' placeholder={user.email} readOnly></input>
                        
                    </div>
                    <div>
                        <label>Номер телефона:</label>
                        <br></br>
                        <input className ='fieldl' placeholder={user.telephone} readOnly></input>
                        
                    </div>
                    <div>
                        <label>Город:</label>
                        <br></br>
                        <input className ='fieldl' placeholder={user.city_name} readOnly></input>
                        
                    </div>
                    </div>
                    
                </div>

            </div>
            
        </div>
    )



}

export default profile_page;














function user_data(){
    // axios.get("http://127.0.0.1:8000/api/user-info").then(r=>{
    //     console.log(r)
    //     return r
    // })

    const user = {
        email:'Amirzhan@',
        username:"Amirzhan",
        organization:"TOO SDU",
        city_name:'Алматы',
        telephone:'777 777 777'
        
    }

    return user
    
}
