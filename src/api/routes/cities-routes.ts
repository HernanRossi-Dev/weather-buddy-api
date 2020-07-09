import { Router } from 'express'
import { JoiSchemas, joiValidation } from '../../models/request-validation'
import { CitiesController } from '../controllers'

const router = Router()

router.get('/', CitiesController.getCities)

router.post('/', joiValidation(JoiSchemas.postCity, 'body'), CitiesController.postCity)

router.delete('/', joiValidation(JoiSchemas.deleteCity, 'query'), CitiesController.deleteCity)

export default router