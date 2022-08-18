import DBServices from '../services/db.services'
import { ControllerNext, User } from '../types'
const dbServices = new DBServices('users')

// Day of the month to filter expired users
const DAY_MONTH = 1
// Month limit to delete users
const MONTH_LIMIT = 6

const validateExpiredUsers: ControllerNext = (_req, _res, next) => {
  const currentDate = new Date()
  const day = currentDate.getDay()

  if (day === DAY_MONTH) {
    const endDate: number = currentDate.setMonth(currentDate.getMonth() - MONTH_LIMIT)

    const users = dbServices.getDataBase()
    const exemptUsers = users.filter((user: User) => {
      const end = new Date(user.endDate).getTime()

      return end > endDate
    })

    dbServices.changeEntireDB(exemptUsers)
  }
  next()
}

export default validateExpiredUsers
