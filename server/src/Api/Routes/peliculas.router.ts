import { Router } from 'express'
import controller from '@Controller/MoviesController'
import Multer from '../Utils/Multer'

const route: Router = Router()

/**
 * Get HealtCheck
 * @route GET /peliculas/healtcheck
 * @operationId check
 * @returns {string} 200 - status ok
 * @returns {Error.model} 500 - Unexpected error
 */

route.get('/healtcheck', (_req:any,res:any)=>{
res.status(200).json({
    status:"OK"
})
})
/**
 * Get Peliculas
 * @group Peliculas - Peliculas entity operations
 * @route GET /peliculas
 * @operationId findAll
 * @param {string} search.query (optional) eg: xmen
 * @param {number} limit.query - Limit
 * @param {number} page.query - Page
 * @produces application/json
 * @returns {Array.<Peliculas>} 200 - An array of Peliculas
 * @returns {Error.model} 500 - Unexpected error
 */

route.get('/', controller.findAll)
/**
 * Get Peliculas
 * @group Peliculas - Peliculas entity operations
 * @route GET /peliculas/all
 * @operationId find
 * @produces application/json
 * @returns {Array.<Peliculas>} 200 - An array of Peliculas
 * @returns {Error.model} 500 - Unexpected error
 */

 route.get('/all', controller.find)

/**
 * Post Peliculas
 * @group Peliculas - Peliculas entity operations
 * @route Post /peliculas
 * @operationId create
 * @produces application/json
 * @returns {Peliculas} 200 - An object of Peliculas
 * @returns {Error.model} 500 - Unexpected error
 */
route.post('/',Multer.single('file'), controller.create)

/**
 * Put Peliculas
 * @group Peliculas - Peliculas entity operations
 * @route Put /peliculas/:id
 * @operationId update
 * @produces application/json
 * @returns {Array.<Peliculas>} 200 - An array of Peliculas
 * @returns {Error.model} 500 - Unexpected error
 */
route.put('/:id', controller.update)


/**
 * Delete Peliculas
 * @group Peliculas - Peliculas entity operations
 * @route DELETE /peliculas/:id
 * @operationId deletePeliculas
 * @produces application/json
 * @returns {Peliculas} 200 - An array of Articles
 * @returns {Error.model} 500 - Unexpected error
 */
route.delete('/:id', controller.delete)

export default route
