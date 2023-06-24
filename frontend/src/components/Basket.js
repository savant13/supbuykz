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
    let array = Object.values(basket)
    

    let res =() => {
        let res = 0;
        let count = 0;
        
        for (let index = 0; index < array.length; index++) {
            res+=array[index].count * array[index].price
            count+=array[index].count
            
            
        }
        
        return {
            sum:res,
            count:count
        }
    }
    let result = res()
    

    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    // setCountProduct(Object.keys(basket).length)
    const jsoned = JSON.stringify(basket)
    localStorage.setItem('basket',jsoned)
    
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
                            if (new_basket[pr_id].count ==0){
                                delete new_basket[pr_id]
                            }
                            setBasket(new_basket)
                            
                            total_price = basket[pr_id].count * value.price
                            
                            
                            
                            
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
                            
                            total_price = basket[pr_id].count * value.price
                            
                            
                           
                            
                            
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
            <div className='col-8'>Итого {result.count} товаров</div>
            <div className='col-4'>{result.sum} тг </div>
        
        

        </div>
        <div className='row' style={{justifyContent:'space-around',alignItems:'center',margin:'20px 0px'}}>
            <div className='col-8'>
            <button className='btn2' onClick={(e)=>{
                setBasket({})
                localStorage.removeItem('basket')
                
            }}>
            Очистить корзину 
            </button>

            </div>
            

        </div>

        <hr></hr>
        <div className='row' style={{justifyContent:'space-around',alignItems:'center',margin:'20px 0px'}}>
                <div className='col-8'>
                    <Link to={userInfo.type_user=='B'?"/basket/":"/agreement"} >

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
