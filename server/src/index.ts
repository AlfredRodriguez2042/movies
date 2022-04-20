import { initDataBase } from './Dal'
import {Server} from './server'


async function main(){
   console.log(process.env.NODE_ENV)
   initDataBase()
   const server = new Server()
   server.start() 
}
main()