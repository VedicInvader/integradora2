const { Schema, model } = require('mongoose')

const readingSchema = new Schema({
  flujo_energia:          { type: Number, required: true },
  dir_viento:             { type: Number, required: true },
  dir_viento_prom:        { type: Number, required: true },
  velocidad_viento:       { type: Number, required: true },
  velocidad_viento_prom:  { type: Number, required: true },
  energia:                { type: Number, required: true },
  radiacion_solar_prom:   { type: Number, required: true },
  temp_prom:              { type: Number, required: true },
  timestamp:              { type: Date,   default: Date.now }
})

module.exports = model('Reading', readingSchema)
