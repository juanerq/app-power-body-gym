import bcryptjs from 'bcryptjs'

const bcrypt = (password: string): string => {
  const salt = bcryptjs.genSaltSync()
  return bcryptjs.hashSync(password, salt)
}

export default bcrypt
