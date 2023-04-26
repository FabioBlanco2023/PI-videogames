import axios from 'axios';

//conexion entre front y back
export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogames')
         return dispatch({
        type: 'GET_VIDEOGAMES',
        payload: json.data
        })
    }

};

export function getVideogameName(name) {
    return async function(dispatch) {
    try {
        var json = await axios.get(`http://localhost:3001/videogames?name=` + name);
        return dispatch ({
            type: 'GET_VIDEOGAME_NAME',
            payload: json.data  //es lo q devuelve la ruta una vez q le asigno algo por name
        })
    } catch (error) {
        alert('Juego No encontrado 😕');
    }

    }
}   

export function getGenres(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/genres'); 
        return dispatch({
            type:'GET_GENRES',
            payload: json.data
        })
    }
};


export function postVideogame(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/videogames', payload);
        
           
        return response;
    }
}

export function filterVideogamesByGenre(payload) { //el payload es el value del input
    return  {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterCreated(payload) { //db
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload) { //asc y desc 
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function orderByRating(payload) {
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function getDetails(id){
    if(id){
        return async function (dispatch){
            try {
                const detail = await axios.get(`http://localhost:3001/videogames/${id}`);
                dispatch ({
                    type: 'GET_DETAILS',
                    payload: detail.data
        })   
    } catch(error){
    console.log(error)
  } 
 }
}
return {
    type: 'RESET',
}
}; 