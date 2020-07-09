import { Router } from 'express'
import { WeatherController } from '../controllers'

const router = Router()

router.get('/', WeatherController.getCitiesWeather)

export default router