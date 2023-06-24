import React, { useState } from 'react'
import {useHistory,Link} from 'react-router-dom'


function SearchBarForProducts() {

    let history = useHistory()
    const [searchTerm, setSearchTerm] = useState("")

    const onSubmit = (e) => {
        e.preventDefault();
        if(searchTerm) {
            
            
            
            history.push(`/products/?searchTerm=${searchTerm.toLowerCase()}`)
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <span
                    style={{ display: "flex" }}
                    className=""
                >
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Начните вводить название товара"
                        className="form-control search-input"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                   
                    <button
                        type="submit"
                        className="hidden"
                    ><i className="fas fa-search"></i>
                    </button>
                    
                    
                </span>
            </form>
        </div>
    )
}

export default SearchBarForProducts
