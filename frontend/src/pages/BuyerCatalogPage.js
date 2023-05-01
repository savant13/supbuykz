import { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import IMAGES from "../constants/image"

import AuthContext from '../context/AuthContext.js';






function BuyerCatalogPage (props){
    
    const [categories,setCategories] = useState([])
    const [orders,setOrders] = useState([]) 
    
    const history = useHistory()
    

    const all_categories = async () => {


        const response_categories = await fetch(
          'http://127.0.0.1:8000/api/all-categories/',{
            method:'GET'
          }
        );
        const data = await response_categories.json()
        setCategories(data)
        
      };
    const orders_by_categories = async(e,text)=>{ 
        if (e){e.preventDefault()}
        let response = await fetch('http://127.0.0.1:8000/api/categories?' + new URLSearchParams({
            category_name:text,
            type:"supplier"
        }),{
            method:'GET',
            
        })
        let data =  await response.json()
        setOrders(data)

    };
    if (categories.length == 0){
        all_categories()
        orders_by_categories(null,'')


    }
    

    return <>
    
        <div className="container container-catalog">
            <div className="row">
                <div className="col">
                    <h3>Категории</h3>
                    {categories.map((category,index)=>{
                        return <li key={index}><a href={"#"} onClick={(e)=>{
                            orders_by_categories(e,category.name)
                        }}>{category.name} </a></li>
                    })}

                </div>
                <div className="col">
                    {/* <h3>{categories[0].name}</h3> */}
                    <div className="row">
                        {orders.map((product,index)=>{
                              
                              return <div className="col canvas-product" key={index}> 
                                <img src={product.product_img} width={125} height={170}>
                                </img>
                                <h3>{product.name}</h3>
                                <strong>{product.price}тг</strong>
                                <br></br>
                                <strong>{product.quantity}шт</strong>
                                <br></br>
                                <button>Заказать +</button>
                              </div>

                        })}
                        </div>
                                          
                </div>
                <div className="col">
                    <button className="orange-button" onClick={()=>{
                        history.push('add_product')
                    }}>{
                    "Оставить заявку"
                    
                    }</button>
                </div>
            </div>
            
            </div>    
    </>


}

export default BuyerCatalogPage;