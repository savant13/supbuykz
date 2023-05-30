import { useContext, useState } from "react";
// import AuthContext from "../context/AuthContext";
// import { useHistory } from "react-router-dom/cjs/react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import IMAGES from "../constants/image";

const n = [
    {
        from_user : "Aidos",
        accepted:'YES',
        order:"Jennie",
        product_url:IMAGES.pepsi_cola,
        product_title:'Pepsi'
    },
    {
        from_user : "Aigerim",
        accepted:'No',
        order:"Jennie",
        product_url:IMAGES.coka_cola,
        product_title:"Coka cola"
    },{
        from_user : "Ainur",
        accepted:'YES',
        order:"Jennie",
        product_url:IMAGES.airan,
        product_title:"Airan"

    }
    
]

const NotificationPage = ()=>{
    const [notifications,setNotifications] = useState(n)
    // const {user} = useContext(AuthContext)
    // const [hooked,setHooked] = useState(false)
    // async function show_notif() {
    //     const response = await fetch('http://127.0.0.1:8000/api/notification-from/?'+ new URLSearchParams(
    //         {
    //             username:user.username
    //         }
    //     ),{
    //         method:"GET",
    //     })
    //     const data = await response.json()
    //     setHooked(true)
    //     setNotifications(data)
        
        
    // }
    // if (!hooked){
        
    //     show_notif()

    // }
    console.log(notifications)

    return (
            <div>
                {notifications.map((value,index) => {
                    return <div>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={value.product_url} height={50} width={50}/>
                    <Card.Body>
                      <Card.Title>{value.product_title}</Card.Title>
                      <Card.Text>
                        
                      </Card.Text>
                      <Button variant="primary">Принять</Button>
                      <Button variant="primary">Отклонить</Button>
                    </Card.Body>
                  </Card>
                  </div>

                })}
            </div>
            )
    
    
    


    
    

}

export default NotificationPage;