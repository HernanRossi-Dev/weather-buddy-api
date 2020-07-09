import { IWeatherRaw, IWeather } from "src/models/interfaces";

export const processUTCDate = (dailyForcasts: Array<IWeatherRaw>) : Array<IWeather> => {
  dailyForcasts.map((entry: IWeatherRaw) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const convertUTC = new Date(entry.dt * 1000)
    entry.dateTime = convertUTC.toLocaleDateString("en-US", options)
  })
  return dailyForcasts
}