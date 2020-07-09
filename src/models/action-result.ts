import { City } from './city-class'
import { Weather } from './weather-class'
import { ICity, IWeatherRaw, IBase } from './interfaces'

export interface IActionResult {
  message: string
  data: IBase
  status: string
  errors: Array<Error>
}

class ActionResult implements IActionResult {
  status: string
  errors: Error[]
  data: IBase
  message: string

  constructor(data: object, newMessage = '', error?: Error) {
    this.status = 'Processed Successfully'
    this.data = this.processData(data)
    this.message = newMessage
    this.errors = error ? [error] : []
  }

  private processData(data: object): IBase {
    if (data.hasOwnProperty('weather')) {
      return new Weather(<IWeatherRaw>data)
    } else if (data.hasOwnProperty('name')) {
      return new City(<ICity>data)
    } else {
      return data
    }
  }

  toJSON(): IActionResult {
    if (this.errors.length) {
      this.status = 'Processed with Errors'
    }
    return {
      data: this.data,
      message: this.message,
      status: this.status,
      errors: this.errors
    }
  }
}

export default ActionResult