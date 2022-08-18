import jwt from 'jsonwebtoken'
import { PayloadJWT } from '../types'

const generateJwt = async (payload: PayloadJWT): Promise<any> => {
  return await new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRETORPRIVATEKEY as string, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err != null) return reject(new Error('Could not generate token'))
      resolve(token)
    })
  })
}

export default generateJwt
