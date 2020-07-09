import { Request, Response } from 'express'
import { CitiesServices } from '../services'
import { City } from '../../models/city-class'
import { logger } from '../../utils'
import { CityQueryT } from '../../models/types'
import ActionResult from '../../models/action-result'

export const getCities = async (_: Request, res: Response) => {
  try {
    const result: ActionResult = await CitiesServices.getCities()
    logger.debug({ message: 'Retrieve cities success', data: result })
    res.status(200).json(result.toJSON())
  } catch (err) {
    logger.error({ message: 'Retrieve cities failure', error: err.message, name: err.name, stack: err.stack })
    res.status(err.status || 500).json({ name: err.name, message: err.message })
  }
}

export const postCity = async (req: Request, res: Response) => {
  try {
    const city: City = new City(req.body)
    const result: ActionResult = await CitiesServices.createCity(city)
    logger.debug({ message: 'Post city success', data: result })
    res.status(200).json(result.toJSON())
  } catch (err) {
    logger.error({ message: 'Post city failure.', error: err.message, name: err.name, stack: err.stack })
    res.status(err.status || 500).json({ name: err.name, message: err.message })
  }
}

export const deleteCity = async (req: Request, res: Response) => {
  try {
    const { name } = <CityQueryT>req.query
    const result: ActionResult = await CitiesServices.deleteCity(name)
    res.status(200).json(result.toJSON())
  } catch (err) {
    logger.error({ message: 'Delete city failure.', error: err.message, name: err.name, stack: err.stack })
    res.status(err.status || 500).json({ name: err.name, message: err.message })
  }
}
