import { useEffect, useState } from "react"
import ClientCatalogPage from "./ClientCatalogPage";
import BuyerCatalogPage from "./BuyerCatalogPage";
import AdminPage from "./AdminPage";
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'



let CatalogPage = () =>{
    let {user} = useContext(AuthContext)
    
    
    console.log(user.type)
    switch (user.type) {
        case 'SUPL':
            return <ClientCatalogPage/>
            

        case 'BUYER':
            return <BuyerCatalogPage/>
           

        case 'ADMIN':
            return <AdminPage/>
            
    }

    return <h1>Can you reload page </h1>
}

export default CatalogPage;