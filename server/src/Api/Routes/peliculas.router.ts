import { Router } from 'express'
import controller from '@Controller/Movies'

const route: Router = Router()

/**
 * Get Peliculas
 * @group Peliculas - Peliculas entity operations
 * @route GET /peliculas
 * @operationId findAll
 * @param {string} search.query (optional) eg: xmen
 * @produces application/json
 * @returns {Array.<Peliculas>} 200 - An array of Peliculas
 * @returns {Error.model} 500 - Unexpected error
 */

route.get('/', controller.findAll)

module.exports = route
