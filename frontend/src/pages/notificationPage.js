import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const NotificationPage = ()=>{
    const [notifications,setNotifications] = useState([])
    const {user} = useContext(AuthContext)
    

}

export default NotificationPage;