import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import React, { useState } from 'react'


function copyMap(element){
    let new_element = {};
    for (let key in element) {
        new_element[key] = element[key]
    }
    return new_element

   
}

function CardBasket({basket,setBasket}){
    const [sum,setSum] = useState(0)
    
    const [countProduct,setCountProduct] = useState(Object.keys(basket).length)
    

    // setCountProduct(Object.keys(basket).length)

    return (
        <div className=''>
       {Object.values(basket).map((value,index)=>{
            const pr_id = Object.keys(basket)[index]
            let total_price = basket[pr_id].count * value.price
            
            return ( 
            <div key={index}>
                <div className='row ' style={{justifyContent:'space-between',alignItems:'center',margin:'10px 0px'}}>
                <div className='col-md-9' id='title-basket'>{value.name}</div>
                <div className='col-md-3' onClick={(e)=>{
                    
                    let new_basket = copyMap(basket)
                    delete new_basket[pr_id]
                    setBasket(new_basket)
                    setCountProduct(countProduct-1)
                    
                }}>X</div>

                </div>
                
                <div className='row ' style={{justifyContent:'space-around',alignItems:'center'}}>
                    <div className='canvas-plus-minus'>
                        <button onClick={(e)=>{
                            e.preventDefault()
                            
                            const new_basket = {};
                            for (let key in basket) {
                                new_basket[key] = basket[key]
                            }
                            new_basket[pr_id].count = new_basket[pr_id].count -1
                            setBasket(new_basket)
                            setCountProduct(countProduct-1)
                            total_price = basket[pr_id].count * value.price
                            setSum(sum + total_price)
                            
                            
                            
                        }}>
                            <b>&#9473;</b>
                        </button>
                        <div id='count'>{basket[pr_id].count}</div>
                        <button onClick={(e)=>{
                            e.preventDefault()
                            const new_basket = {};
                            for (let key in basket) {
                                new_basket[key] = basket[key]
                            }
                            new_basket[pr_id].count = new_basket[pr_id].count + 1
                            setBasket(new_basket)
                            setCountProduct(countProduct + 1)
                            total_price = basket[pr_id].count * value.price
                            setSum(sum + total_price)
                            
                           
                            
                            
                        }}>
                            <b>&#43;</b>
                        </button>
                    </div>

                    <div>
                        <b>{total_price} тг</b>
                        
                    </div>

                </div>
                <hr></hr>
                


            
            
            </div>
            
            )
       })}
       <div className='footer-basket'>
        <div className='row'>
            <div className='col-8'>Доставка </div>
            <div className='col-4'>Бесплатно</div>
        </div>
        <div className='row'>
            <div className='col-8'>Итого {countProduct} товаров</div>
            <div className='col-4'>{sum} тг </div>
        
        

        </div>
        <div className='row' style={{justifyContent:'space-around',alignItems:'center',margin:'20px 0px'}}>
            <div className='col-8'>
            <button className='btn2' onClick={(e)=>{
                setBasket({})
                localStorage.removeItem('basket')
                setCountProduct(0)
                setSum(0)
            }}>
            Очистить корзину 
            </button>

            </div>
            

        </div>

        <hr></hr>
        <div className='row' style={{justifyContent:'space-around',alignItems:'center',margin:'20px 0px'}}>
                <div className='col-8'>
                    <Link to='/basket/' >

                    <button className='btn1' onClick={(e)=>{
                        const jsoned = JSON.stringify(basket)
                        localStorage.setItem('basket',jsoned)
                    }}>
                        Оформить

                    </button>
                    
                    </Link>
                    
                </div>

            </div>
           
        


       </div>
       </div>
    )
}




export default CardBasket
