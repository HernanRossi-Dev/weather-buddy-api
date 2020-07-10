import CitiesDB from '../data-access/cities-db'
import axios from 'axios'
import ActionResult from '../../models/action-result'
import { City } from '../../models/city-class'
import { logger } from '../../utils'
import { processUTCDate } from '../../utils/helper-functions'

const getCitiesWeather = async (): Promise<ActionResult> => {
  const cities: Array<City> = await CitiesDB.getCities()
  let weatherData = []
  if (cities.length > 0) {
    try {
      for (let i = 0; i < cities.length; i++) {
        const { lat, lon, name } = cities[i]
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely, hourly}&appid=${process.env.OPEN_WEATHER_API_KEY}`
        const result = await axios.get(url)
        if (!result) continue
        
        const { daily } = result.data
        if (daily && daily.length) {
          result.data.daily = processUTCDate(daily)
        }
        result.data.name = name
        weatherData.push(result.data)
      }
    } catch (err) {
      logger.error({ status: 'Error', message: err.message, timestamp: new Date() })
    }
  }
  return new ActionResult(weatherData)
}

export default {
  getCitiesWeather,
}
