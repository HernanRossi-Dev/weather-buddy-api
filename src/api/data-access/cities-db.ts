import { CityModel, City } from '../../models/city-class'

const getCity = async (name: string) => {
  return await CityModel.findOne({name})
}

const getCities = async () => {
  return await CityModel.find()
}

const createCity = async (city: City) => {
  const newCity = await CityModel.create(city)
  return await newCity.save()
}

const deleteCity = async (name: string) => {
  return await CityModel.deleteOne({name})
}

export default {
  getCity,
  getCities,
  createCity,
  deleteCity
}