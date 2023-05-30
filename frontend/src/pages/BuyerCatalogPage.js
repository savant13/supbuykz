import { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import IMAGES from "../constants/image"
import '@fortawesome/fontawesome-free/css/all.min.css';


const imgs = [
    IMAGES.pepsi_cola,
    IMAGES.coka_cola,
    IMAGES.maxi_chai,
    IMAGES.coka_cola,
    IMAGES.coka_cola,

    IMAGES.airan
]




function BuyerCatalogPage(props){
    
    const [categories,setCategories] = useState([])
    const [orders,setOrders] = useState([]) 
    const [basketItems, setBasketItems] = useState([]);
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
     function addToBasket(item) {
        setBasketItems([...basketItems, item]);
      }
      
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
                    <h3 ><a onClick={(e)=>{
                        orders_by_categories(e,'')
                    }}>Категории</a></h3>
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
                                <img src={imgs[index]} width={125} height={170}>
                                </img>
                                <h3>{product.name}</h3>
                                <strong>{product.price}тг</strong>
                                <br></br>
                                
                                <button onClick={ ()=>{
                                        history.push('agreement')
                                    }}>Заказать +</button>
                              </div>

                        })}
                        </div>
                                          
                </div>
                <div className="col">
                    <button className="orange-button" onClick={()=>{
                        history.push('add_product')
                    }}>{
                    "Добавить  товар"
                    
                    }</button>
                    <div className="basket">
                    {basketItems.map((item) => {

                            let quantity = 0
                            return <div key={item.id}>
                                <h3>{item.name}</h3>
                                <p>{item.price}</p>
                                <button className="icon-button" onClick={()=>{quantity+=1}}>
                                    <i className="fas fa-plus"></i>
                                </button>
                                <p>{quantity}</p>
                                <button className="icon-button" onClick={()=>{quantity+=1}}>
                                    <i className="fas fa-minus" ></i>
                                </button>
                            </div>
                        })}

                    </div>
                </div>
            </div>
            <div className="">

            </div>
            
            </div>    
    </>


}

export default BuyerCatalogPage;