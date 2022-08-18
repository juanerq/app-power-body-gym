import { Admin } from '../types'
import DBServices from './db.services'
const dbServices = new DBServices('admin')

export default class AdminServices {
  getAdminInfo (): Admin {
    return dbServices.getDataBase()
  }

  update (data: Admin): string {
    const adminData = this.getAdminInfo()
    const changes = {
      ...adminData,
      ...data
    }

    return dbServices.changeEntireDB(changes)
  }
}
