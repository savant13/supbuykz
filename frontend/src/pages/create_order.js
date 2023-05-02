import React,{useContext, useState} from 'react';
import AuthContext from '../context/AuthContext';




function create_order(){
    const {user} = useContext(AuthContext)
    const [products,setProducts] = useState([])
    const all_products = async () => {


        const response_categories = await fetch(
          'http://127.0.0.1:8000/api/all-product/',{
            method:'GET'
          }
        );
        const data = await response_categories.json()
        setProducts(data)
        
      };
    
   

   

    let  submit = async (e)=>{
        e.preventDefault();
        const url = 'http://127.0.0.1:8000/api/create-order/'
        
        const formData = new FormData(e.target)
        formData.append("owner_id",user.id)
        let response = await fetch(url,{
            method:'POST',
            mode: "cors",
            body:formData,
            

        })
        console.log(response.json())
        


    }
    if (categories.length === 0){
        all_categories()
    }
    return (
    <>
    <div className='container'>
        <form method='POST' encType='multipart/form-data' onSubmit={submit}>

        <label>
        Наименование товара
    </label>
    <select name="product_id" >
        {products.map(
            (text,index)=>{
                return <option name={text.name} key={index} value={text.name}>{text.name} </option>
            }
        )}
        
        
    </select>
    <label>
    Какое количество 
    
    </label>
    <div><input name='quantity' className ='fieldl' /> </div>
   
    <br></br>
    
    
    <button type='submit' className='orange-button'>
            
            Оставить заявку
    </button>

    
    
    </form>
    



        
    </div>
    
    
    </>)

}

export default create_order;




    