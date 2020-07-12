import { Request, Response } from 'express'
import { logger } from '../../utils'
import { WeatherServices } from '../services'
import ActionResult from '../../models/action-result'

export const getCitiesWeather = async (_: Request, res: Response) => {
  try {
    const result: ActionResult = await WeatherServices.getCitiesWeather()
    logger.debug({ message: 'Retrieve current weather success', data: result })
    res.status(200).json(result.toJSON())
  } catch (err) {
    logger.error({ message: 'Retrieve current weather failure', error: err.message, name: err.name, stack: err.stack })
    res.status(err.status || 500).json({ name: err.name, message: err.message })
  }
}
