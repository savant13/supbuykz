import { useContext} from 'react';
import IMAGES from '../constants/image.js';
import AuthContext from '../context/AuthContext.js';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useState } from "react"

function Navbar() {
    // let {user} = useContext(AuthContext)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let history = useHistory()
    let {logoutUser} = useContext(AuthContext)
    let isLogin = 'Вход'
    if (user){
        isLogin = 'Выход'
    }
    
    
    return(
        <header>
            <h3 className='text-color-dark'>
                {/* Hello {user??"".username??""} */}
                
            </h3>
            <nav>
                <a href='#'><img src={IMAGES.img2 } height={50} width={60}/><span>Алматы</span></a>
                <a  onClick={
                    ()=>{
                       history.push('notification')
                    }
                }><img src={IMAGES.img1} height={50} width={60}/></a>
                
                
            
            <button onClick={()=>{
                if (user==null){
                    logoutUser()
                }
                else{
                    history.push('login')
                }

                
            }} className = 'login-btn'>
               {isLogin}
            </button>
            </nav>
           


        </header>
    );
    
}
export default Navbar;