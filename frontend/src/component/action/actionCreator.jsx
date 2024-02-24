import { ERROR, FETCH_ALL_DATA, FETCH_SINGEL_DATA, LOADING, SINGLE_LOADING_DATA } from "./actionType";

export function initialFetchData(){
    return{type:LOADING}
}
export function fetchallData(data){
    return{type:FETCH_ALL_DATA, payload:data}
}
export function fetchSingleProduct(data){
    return{type:FETCH_SINGEL_DATA, payload:data}
}
export function singleLoading(){
    return{type:SINGLE_LOADING_DATA}
}
export function errorWhileProductApi(err){
return {type:ERROR,payload:err}
}
export function singleError(err){
 return {type:ERROR, payload:err}
}