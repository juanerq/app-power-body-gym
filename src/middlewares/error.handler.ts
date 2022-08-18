import { Controller, ErrorHanlder, ErrorHanlderBoom, ErrorExpressValidator } from '../types'

export const logErrors: ErrorHanlder = (err, _req, _res, next) => {
  console.error(err)
  next(err)
}

export const errorsListHandler: ErrorHanlder = (err, _req, res, next) => {
  if (err instanceof Array) {
    const errors: ErrorExpressValidator[] = err
    res.status(400).json(errors[0])
  } else {
    next(err)
  }
}

export const errorHanlder: ErrorHanlder = (err, _req, res, _next) => {
  const error = {
    name: err.name,
    msg: err.message
    // stack: err.stack
  }

  res.status(500).json(error)
}

export const boomErrorHandler: ErrorHanlderBoom = (err, _req, res, next) => {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

export const error404: Controller = (_req, res) => {
  const error = {
    name: 'NotFound',
    msg: 'Not Found'
  }
  res.status(404).json(error)
}
