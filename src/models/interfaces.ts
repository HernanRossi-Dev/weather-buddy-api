export interface IBase {
  name?: string
  _id?: string
  created?: Date
  updated?: Date
  modifiedCount?: number
  deletedCount?: number
}

export interface ICity extends IBase {
  name: string
  lat: number
  lon: number
}

export interface IWeatherMain {
  id: number,
  main: string,
  description: string,
  icon: string
}

export interface IWeather extends IBase{
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
  dateTime?: string 
}

export interface IWeatherRaw extends IWeather {
  weather: Array<IWeatherMain>
  dt: number
}