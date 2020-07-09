import Joi from '@hapi/joi'

export const deleteCity = Joi.object({
  name: Joi.string().required(),
})

export const postCity= Joi.object({
  name: Joi.string().required(),
  lat: Joi.number().required(),
  lon: Joi.number().required(),
})
