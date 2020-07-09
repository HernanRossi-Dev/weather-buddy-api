import { IWeather, IWeatherMain, IWeatherRaw } from "./interfaces"

export class Weather implements IWeather {
  id: number
  name: string
  coords: {
    lat: number,
    lon: number
  }
  main: {
    temp: number,
    pressure: number,
    humidity: number,
    temp_min: number,
    temp_max: number
  }
  dt?: number
  wind?: {
    speed?: number,
    deg?: number
  }
  rain?: number | null
  snow?: number | null
  clouds?: {
    all: number
  }
  sys?: {
    type?: number,
    id?: number,
    message?: number,
    country?: string,
    sunrise?: number,
    sunset?: number
  }
  weatherMain: IWeatherMain

  constructor(weather: IWeatherRaw) {
    this.id = weather.id
    this.name = weather.name
    this.coords = weather.coords
    this.main = weather.main
    this.rain = weather.rain
    this.snow = weather.snow
    this.clouds = weather.clouds
    this.weatherMain = weather.weather[0]
  }
}
