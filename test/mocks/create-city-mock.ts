import faker from 'faker'

const CreateCityMock = () => {
  const newCity = {
      lat: faker.address.latitude,
      lon: faker.address.longitude,
      name: faker.address.city
    }
  return newCity
}

export default CreateCityMock