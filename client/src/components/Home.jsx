import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames, getGenres, filterVideogamesByGenre, filterCreated, orderByName, orderByRating } from '../actions/index';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';

import Navbar from './Navbar';
import Loader from './Loader';
import './home.css'

export default function Home(){  //este hook vendria a reemplazar al map state to prop

    const dispatch = useDispatch()                 //lo de aca abajo me trae del reduce el estado videogames
    const allVideogames = useSelector((state) => state.videogames) //con useSelector hago q me traiga todo lo q está en el estado de videogame y lo guardo en esa constante
    
    const [currentPage, setCurrentPage] = useState(1) //estado local . pag 1 xq siempre arranca desde la 1er pagina//guardame la pag actual y una const q me setee la pag actual
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)//otro estado local//setear los videojuegos por pagina//guardar ctos videosjuegos quiero por pagina
    const [order, setOrder] = useState('') //estado local de asc y desc que arranca vacio
    
    const indexOfLastVideogame = currentPage * videogamesPerPage // 1 * 15 = 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // 0
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)//videogames de la pagina actual


    const paginado = (pageNumber) => {   //me va a ayudar al renderizado
    setCurrentPage(pageNumber)
    }

  //  const allGenres = useSelector((state) => state.genres);


    useEffect (() => {
    dispatch(getGenres());
    }, [dispatch]);

    //me traigo los videojuegos cdo el componente se monta
    useEffect (() => { //acá le paso la acción. arriba la declaré
    dispatch(getVideogames());
    }, [dispatch]); //arreglo vacío xq no depende de nada, se monta tranquilo

    if(!allVideogames.length) {
        return <Loader/>;
    }

    function handleClick(e){
    e.preventDefault();       //prevent default para q no rompa cdo recarga la pagina, o evita q recargue, no entendi bien
    dispatch(getVideogames());
    };

    function handleSort(e){ //dispatch del asc y desc
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1); //seteame la pagina a la 1ra
    setOrder(e.target.value);

    };

    function handleFilterGenre(e){
    e.preventDefault();    
    dispatch(filterVideogamesByGenre(e.target.value));    
    setCurrentPage(1);
    setOrder(e.target.value);
    };

    function handleFilterCreated(e){
    e.preventDefault();
    dispatch(filterCreated(e.target.value));//el payload
    setCurrentPage(1);
    setOrder(e.target.value);
    };

    function handleRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);


    }

    
 
    return (
        <div>
            <div className="create_container"></div>
            <Link className='button_create_videogame' to= '/videogame'>CREATE VIDEOGAME</Link>
            
            
            <div className='reload_container'>
            <button className='button_reload' onClick={(e) => {handleClick(e)}}>  
                Reload     
            </button>
            </div>

            <div>
            <Navbar
                handleSort={handleSort}
                handleRating={handleRating}
                handleFilterCreated={handleFilterCreated}
                handleFilterGenre={handleFilterGenre}
            />
        </div>

        <ul className='card_grid'>
            {currentVideogames?.map((g) => {

                return (
                     <Card
                        id={g.id}
                        name={g.name}
                        image={g.image}
                        genres={g.genres}
                        key={g.id}
                        rating={g.rating}
                        platforms={g.platforms} />
                    );
                  })}
        </ul>

        <div className='pagination'>
            <Paginado 
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length} // length xq necesito un valor numerico
                paginado={paginado}/>

            
            </div>

            </div>
        
    )
}