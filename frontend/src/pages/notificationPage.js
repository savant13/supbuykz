import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const NotificationPage = ()=>{
    const [notifications,setNotifications] = useState([])
    const {user} = useContext(AuthContext)
    const [hooked,setHooked] = useState(false)
    async function show_notif() {
        const response = await fetch('http://127.0.0.1:8000/api/notification-from/?'+ new URLSearchParams(
            {
                username:user.username
            }
        ),{
            method:"GET",
        })
        const data = await response.json()
        setHooked(true)
        setNotifications(data)
        
        
    }
    if (!hooked){
        
        show_notif()

    }
    console.log(notifications)

    return <>
            <div>
                {notifications.map((value,index) => {
                    return <div>
                        <p> {value.to_user.user.username}</p>
                        <p>{value.accepted}</p>
                        <p>{value.order.client}</p>
                    </div>

                })}
            </div>
    
    
    </>


    
    

}

export default NotificationPage;