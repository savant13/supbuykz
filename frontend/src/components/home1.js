import { useHistory } from 'react-router-dom'

function Home(){
    const history = useHistory()
    return (
        <div className="main-part1 container">
            <div className="break-point"></div>
            <div className='row content-center'>
                
                <div className='col descrp1'>
                    <h3>Уникальная торговая площадка, которая дает возможность:</h3>
                </div>
                
            </div>
            <div className='row content-center'>
                <div className='col descrp1'>
                    <h4 onClick={()=>{
                        // history.push('buyer-catalog')
                    }}>Заказчикам</h4>
                    бесплатный доступ к базе прямых поставщиков с приемлимыми ценами

                    
                    

                </div>
                <div className='col descrp1'>
                    
                    <h4 >Поставщикам</h4>
                    
                    возможность получать прямые заказы с торговых точек 
                    
                </div>
                
            </div>
            <div className='row content-center'>
                <div className='col'>
                    <button onClick={()=>{
                         history.push('login')
                    }} className="orange-button">Заказчикам</button>
                </div>
                <div className='col'>
                    <button onClick={()=>{
                         history.push('login')
                    }} className="orange-button">Поставщикам</button>
                
                
                </div>
            </div>
            <div className='row content-center'>
                <div className='col'>
                    <button className="orange-button faq-btn"> FAQ</button>
                    
                </div>
                
            </div>
            


        </div>
    )

}

export default Home;