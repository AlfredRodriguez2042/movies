import { mongoDBConnection } from "./Connection"


export const initDataBase=()=>{
    mongoDBConnection('main')
}