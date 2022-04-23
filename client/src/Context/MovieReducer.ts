

export const GET_MOVIES="GET_MOVIES"
export const GET_SEARCH_MOVIE="GET_SEARCH_MOVIE"
export const DELETE_MOVIE="DELETE_MOVIE"
export const UPDATE_MOVIE="UPDATE_MOVIE"
export const CREATE_MOVIE="CREATE_MOVIE"
export const ERROR_MESSAGE="ERROR_MESSAGE"
export const INITIAL_SEARCH="INITIAL_SEARCH"


type MovieAction={
    type: "GET_MOVIES" |"DELETE_MOVIE" |"UPDATE_MOVIE" |"CREATE_MOVIE"| "ERROR_MESSAGE"|"GET_SEARCH_MOVIE"|"INITIAL_SEARCH",
    payload:any
}
interface IMovie{
    id?:string
    title:string
    category:string
    year:number
    directors:string
    actors:string
  }
export interface IMovieState{
    movies:IMovie[]
    limit:number
    page:number
    search:IMovie[]
    filter:IMovie[]
    errorMessage:any
}
export const MovieReducer = (state:IMovieState,action:MovieAction)=>{
    switch (action.type) {
        case GET_SEARCH_MOVIE:
            
            const regex = new RegExp(`^${action.payload}`, 'i')
            return{
                ...state,
                filter:state.search.filter(q=>action.payload!==""?regex.test(q.title):null)
            }
        case INITIAL_SEARCH:
            return{
                ...state,
                search:action.payload
            }    
        case GET_MOVIES:
            return{
                ...state,
                page:action.payload.page,
                limit:action.payload.limit,
                movies:action.payload.docs
            }
        case CREATE_MOVIE:
            return{
                ...state,
                movies:action.payload
            }
        case UPDATE_MOVIE:
            return{
                ...state,
                movies:action.payload
            }
        case DELETE_MOVIE:
            return{
                ...state,
                movies:action.payload
            }  
        case ERROR_MESSAGE:
            return{
                ...state,
                errorMessage:action.payload
            }              
        default:
           return state;
    }
}