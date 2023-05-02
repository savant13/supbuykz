import React,{useContext, useState} from 'react';
import AuthContext from '../context/AuthContext';




function AddProduct(){
    const [categories,setCategories] = useState([])
    const {user} = useContext(AuthContext)
    const all_categories = async () => {


        const response_categories = await fetch(
          'http://127.0.0.1:8000/api/all-categories/',{
            method:'GET'
          }
        );
        const data = await response_categories.json()
        setCategories(data)
        
      };
    
   

   

    let  submit = async (e)=>{
        e.preventDefault();
        const url = 'http://127.0.0.1:8000/api/add-product/'
        
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
    <div><input  name='name' className ='fieldl' /> </div>
    <label>
    Описание товара
    
    </label>
    <div><input name='description' className ='fieldl' /> </div>
    <label>
     Категория продукта
    </label>
    <br/>
    <select name="category_id" >
        {categories.map(
            (text,index)=>{
                return <option name={text.name} key={index} value={text.name}>{text.name} </option>
            }
        )}
        
        
    </select>
    <br></br>
    <label>Изображение</label>
    <div><input  type ="file" id='product_img' name='product_img' className ='fieldl' /> </div>
    <label>Цена</label>
    <div><input  id='price' name='price' className ='fieldl' /> </div>
    <button type='submit' className='orange-button'>
            
            Добавить товар
    </button>

    
    
    </form>
    



        
    </div>
    
    
    </>)

}

export default AddProduct;




    