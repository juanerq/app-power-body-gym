import { Controller } from '../types'

const handler404: Controller = (_req, res) => res.status(404).end()

export default handler404
