import CitiesDB from '../data-access/cities-db'
import { City } from '../../models/city-class'
import ActionResult from '../../models/action-result'
import { NotFoundError, MongoDBError } from '../../errors'

const getCities = async (): Promise<ActionResult> => {
  const citiesDetails = await CitiesDB.getCities()
  return new ActionResult(citiesDetails)
}

const createCity = async (city: City): Promise<ActionResult> => {
  const result = await CitiesDB.createCity(city)
  if (!result._id) {
    return new ActionResult({}, 'Create city failed.', new MongoDBError())
  }
  return new ActionResult(result, 'Create city success.')
}

const deleteCity = async (name: string): Promise<ActionResult> => {
  const result = await CitiesDB.deleteCity(name)
  const { deletedCount } = result
  if (!deletedCount) {
    return new ActionResult({ deletedCount }, `Failed to delete City: ${name}`, new NotFoundError())
  }
  return new ActionResult({ deletedCount }, `Delete City Success: ${name}.`)
}

export default {
  createCity,
  getCities,
  deleteCity,
}
