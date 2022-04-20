 import { connect, connection } from 'mongoose'
 import { Logger } from '../Api/Utils/Logger'
 import { loadAsync } from 'node-yaml-config';
//  import Config from 'config'
//  const config = Config.get('default.yaml')
//  console.log(Config())
 
 
 const DataBaseEvents = (dbConnectionName: string) => {
   connection.on('error', (error) => {
     Logger.error(` <${dbConnectionName}> connection error:`, error)
    })
    connection.on('disconnected', () => {
      Logger.error(` <${dbConnectionName}> connection lost:`)
    })
    connection.on('connecting', () => {
      Logger.info(`Connecting to <${dbConnectionName}>`, null, true)
    })
    connection.on('open', () => {
      Logger.info(`<${dbConnectionName}> Connected`, null, true)
    })
  }
  
  export const mongoDBConnection = async (dbConnectionName: string) => {
  const config2 = await loadAsync(__dirname+"../../../config/default.yaml");

  const Service: any = config2
  try {
    DataBaseEvents(dbConnectionName)
    await connect(Service.databases[dbConnectionName].host, {
      user: Service.databases[dbConnectionName].user,
      pass: Service.databases[dbConnectionName].password,
      dbName: Service.databases[dbConnectionName].dbName,
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}


