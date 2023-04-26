import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import './navbar.css';



export default function Navbar ({handleFilterGenre, handleFilterCreated, handleRating, handleSort}) {

    const allGenre = useSelector(state => state.genres);

    return (
        <div>
            <div className="navbar_container">
            <SearchBar/>
            </div>

            <div>
            <select className="select" onChange={(e) => handleSort(e)}>
                    <option>Order</option>
                    <option value='Asc'>A-Z</option>
                    <option value='Desc'>Z-A</option>
            </select>

            <select className="select" onChange={(e) => handleRating(e)}>
                    <option>Rating</option>
                    <option value="Top">Rating Top</option>
                    <option value="Low">Rating Low</option>
            </select> 

            <select className="select" onChange={(e) => handleFilterCreated(e)}> 
                    <option>Games</option>
                    <option value='All'>All</option>
                    <option value='Created'>Created</option>
                    <option value='Api'>Existent</option>
            </select>        
            
            <select className="select" onChange={(e) => handleFilterGenre(e)}>
                    <option>Genres</option>
                    <option value='All'>All</option> 
                    {Array.isArray(allGenre) && allGenre.map((genre) => (
                       <option key={genre.name} value={genre.name}>
                           {genre.name}
                       </option>
                   ))}
            </select>
        </div>
    </div>
  )
};
