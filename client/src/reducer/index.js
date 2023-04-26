const initialState = {
    videogames : [],
    allVideogames: [],
    genres: [],
    detail: {},
    platforms: []

}


function rootReducer(state= initialState, action){ // en esta accion mando todos los videogames al arrglo vacio
    switch(action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload //esto es para q los filtros siempre empiecen sobre todos y no obre el filtro aplicado
            }


        case 'GET_VIDEOGAME_NAME': //searchbar
            return {
                ...state,
                videogames: action.payload

            }


        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
               
            }    


        case 'POST_VIDEOGAME':
            return{
                ...state,

            }    


        case 'FILTER_BY_GENRE':
            const allGames = state.videogames; //aca tb para el filtro desde todos
            const genresFiltered = action.payload === 'All' ? 
            state.allVideogames 
            : allGames.filter(el => {
                return el.genres.find(el => {
                    return el.name === action.payload;
                })     
            });
            return {
                ...state,
                videogames: genresFiltered
            };
                
            

        case 'FILTER_CREATED':
            const filterCreated = action.payload === 'Created' ? 
            state.allVideogames.filter(el => el.createdInDb) 
            : state.allVideogames.filter( el => !el.createdInDb)
            return {
                ...state, //me devuelve el estado anterior
                videogames: action.payload === 'All'? state.allVideogames 
                : filterCreated  

            };


        case 'ORDER_BY_NAME': //orden asc y desc
            let sortName = action.payload ==='Asc'?
            state.videogames.sort(function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) 
            :state.videogames.sort(function(a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                videogames: sortName,
            };


        case'ORDER_BY_RATING':
        let sortRating = action.payload === 'Low' ?
        state.videogames.sort(function(a, b) {
            if (a.rating > b.rating) {
                return 1;
            }
            if(b.rating > a.rating) {
                return -1;
            }
            return 0;
        })
        :state.videogames.sort(function(a, b) {
            if (a.rating > b.rating) {
                return -1;
            }
            if ( b.rating > a.rating) {
                return 1;
            }
            return 0;        
        });
        return  {
            ...state,
            videogames: sortRating,
        }
        
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }

        case 'GET_PLATFORMS':
            return {
                ...state,
                platforms: action.payload
            }    

            default:    
                return state;

            }
        };   

        
         
        

    



export default rootReducer;