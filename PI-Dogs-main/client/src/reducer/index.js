
const initialState = { 
    dogs : [],
    allDogs: [], //declaro un estado q siempre va a tener todos los perros
    temperament : []

};

function rootReducer(state= initialState, action){
    switch(action.type) {

        case 'GET_DOGS':
        return {
            ...state, //guardo el estado
            dogs: action.payload, //en mi estado dogs, q en un ppio es un estado vacío, mandà todo lo q te mande la acción de dogs
            allDogs: action.payload //acá tb me guarda todos los perros para q pueda usarlo cdo filtro y q me los cargue a todos de nuevo, y no sobre el filtro del filtro
        }

        case 'GET_DOG_NAME':
            return {
                ...state,
                dogs: action.payload //es el arreglo q estoy renderizando
            }

        case 'GET_TEMPERAMENT':
        return {
            ...state,
            temperament: action.payload
        }

        case 'POST_DOG':
            return {
                ...state,
            }


        case 'FILTER_BY_TEMPERAMENT':
            const allDogs = state.allDogs //aca tb para el filtro desde todos
            const temperamentFiltered = action.payload === 'All'? allDogs : allDogs.filter(el => el.temperament === action.payload)
                return {
                    ...state, //me traiego todo lo de estado
                    dogs: temperamentFiltered
                    
        }


        case 'FILTER_CREATED':
            const filterCreated = action.payload === 'Created' ? 
            state.allDogs.filter(el => el.createdInDb) 
            : state.allDogs.filter( el => !el.createdInDb)
            return {
                ...state, //me devuelve el estado anterior
                dogs: action.payload === 'All'? state.allDogs 
                : filterCreated  

        }

        case 'ORDER_BY_NAME': //'Asc. Desc'
            let sortName = action.payload ==='Asc'?
            state.dogs.sort(function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0; // si son iguales lo deja como están quiere decir
            }) 
            :state.dogs.sort(function(a, b) { // si no, ordenalo 'Desc'
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
                dogs: sortName,
            };


    

        
        
        default:
            return state;
    }
    

};


export default rootReducer;