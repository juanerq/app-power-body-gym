import { Response, Request, NextFunction } from 'express'
import Boom from '@types/boom'
import { Status } from './enums'

export type DataBases = User | Admin

export type Controller = (req: Request, res: Response) => void

export type ControllerNext = (req: Request, res: Response, next: NextFunction) => void

export type ErrorHanlder = (error: Error, req: Request, res: Response, next: NextFunction) => void

export type ErrorHanlderBoom = (error: Boom, req: Request, res: Response, next: NextFunction) => void

export interface ErrorExpressValidator {
  msg: string
  param: string
  location: string
}

export interface User {
  id: number
  rut: string
  name: string
  startDate: string
  endDate: string
  status: Status
  payment: number
}

export interface Admin {
  name?: string
  password: string
}

export type NewUserData = Omit<User, 'id'>

export interface Filters {
  rut?: string
  pageNumber?: number
  pageSize?: number
  from?: number
  to?: number
  startDate?: string
  endDate?: string
  status?: string
}

export interface PayloadJWT {
  name: string
}
