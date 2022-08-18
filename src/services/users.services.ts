import { Filters, NewUserData, User } from '../types'
import DBServices from './db.services'
const dbServices = new DBServices('users')

class UserServices {
  usersDB: User[]
  constructor () {
    this.usersDB = dbServices.getDataBase()
  }

  getUsers (filters: Filters): User[] | User {
    this.usersDB = dbServices.getDataBase()
    let { pageNumber, pageSize, from, to, endDate, startDate, status, rut } = filters

    from = from != null ? from - 1 : 0
    to = to ?? 100

    if (rut != null) return this.findByRut(rut)
    if (pageNumber != null && pageSize != null) this.usersDB = this.usersDB.slice((pageSize * (pageNumber - 1)), pageSize * pageNumber)
    if (startDate != null || endDate != null) this.usersDB = this.filterByDate({ startDate, endDate })
    if (status != null) this.usersDB = this.usersDB.filter((user: User) => user.status === status)

    return this.usersDB.slice(from, to)
  }

  findById (id: number): User {
    const user = dbServices.findById(id) as User
    return user
  }

  findByRut (rut: string): User {
    const user = dbServices.findByRut(rut) as User
    return user
  }

  findByName (name: string): User[] {
    this.usersDB = dbServices.getDataBase()
    name = name.toLowerCase().trim()
    return this.usersDB.filter((user: User) => user.name.toLowerCase().includes(name))
  }

  filterByDate (date: {startDate?: string | undefined, endDate?: string | undefined}): User[] {
    const users = dbServices.getDataBase()

    return users.filter((user: User) => {
      const start = new Date(user.startDate).getTime()
      const end = new Date(user.endDate).getTime()

      return start >= new Date(date.startDate ?? 0).getTime() && end <= new Date(date.endDate ?? 0).getTime()
    })
  }

  createUser (userDate: NewUserData): User {
    this.usersDB = dbServices.getDataBase()
    const newUser = {
      id: Math.max(0, ...this.usersDB.map(user => user.id)) + 1,
      ...userDate
    }

    dbServices.createItem(newUser)

    return newUser
  }

  updateUser (id: number, userData: NewUserData): User {
    this.usersDB = dbServices.getDataBase()
    const user = this.findById(id)
    const changes = {
      ...user,
      ...userData
    }

    dbServices.updateItem(id, changes)

    return changes
  }

  deleteUser (id: number): void {
    dbServices.deleteItem(id)
  }
}

export default UserServices
