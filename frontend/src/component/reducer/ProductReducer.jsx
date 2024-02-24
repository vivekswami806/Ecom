import { ERROR, FETCH_ALL_DATA, FETCH_SINGEL_DATA, LOADING, SINGLE_LOADING_DATA } from "../action/actionType"

 export function reducer(state, action) {
    switch (action.type) {
      case LOADING:
       return {...state, loading:true}
     case FETCH_ALL_DATA:
        return {...state, loading:false ,products:action.payload}
        case ERROR:
          return{...state, loading:false,error:action.payload}
          case SINGLE_LOADING_DATA:
            return{...state, single_loader:true}
        case FETCH_SINGEL_DATA:
          return{...state ,single_loader:false,product:action.payload}
         case SINGLE_ERR:
          return{...state, single_loader:false,single_error:action.payload}
      default:
     return state
    }
  }