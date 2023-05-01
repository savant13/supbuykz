import React,{useContext} from 'react';
import AuthContext from '../context/AuthContext.js';
import { useHistory } from 'react-router-dom'

const LoginPage = ()=>{
    let {loginUser} = useContext(AuthContext)
    const history = useHistory()


    return (
        <div className='container login-container'>
            <div className='row'>
                <div className='col'>
                <h2>Supbuy.kz - Вход</h2>
                <form onSubmit={loginUser}>
                <div><input className ='fieldl' placeholder='Ваш имя' name='username'></input></div>
                <div><input className ='fieldl' placeholder='Пароль' type='password' name='password'></input></div>
                <button type='submit' className='orange-button'>Войти</button>
                <button type='button' className='orange-button' onClick={(e)=>{
                    e.preventDefault()

                    history.push('/register')
                }}>Регистрация</button>
                <a href='#'>Забыли пароль?</a>
                </form>
                </div>

            </div>
            
        </div>
    )



}

export default LoginPage;