import { prop as Property, getModelForClass } from "@typegoose/typegoose"
import { v4 } from "uuid"
import { ICity } from './interfaces'

export class City implements ICity{
  @Property({ unique: true })
  id: string

  @Property()
  name: string

  @Property()
  lat: number

  @Property()
  lon: number

  constructor(city: ICity) {
    this.id = v4()
    this.name = city.name
    this.lat = city.lat
    this.lon = city.lon
  }
}

export const CityModel = getModelForClass(City)