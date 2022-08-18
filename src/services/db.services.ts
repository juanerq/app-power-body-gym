/* eslint-disable @typescript-eslint/no-var-requires */
import boom from '@hapi/boom'
import fs from 'fs'
import path from 'path'
import { DataBases } from '../types'

class DBServices {
  databases: any = {
    users: {
      filePath: path.join(__dirname, '../../database/users.json')
    },
    admin: {
      filePath: path.join(__dirname, '../../database/admin.json')
    }
  }

  private readonly selectedDB: string = ''
  private readonly dbPath: string = ''

  constructor (selectDB: string) {
    this.selectedDB = selectDB

    this.dbPath = this.validateDB(this.selectedDB)
  }

  private validateDB (db: string): string {
    // eslint-disable-next-line no-prototype-builtins
    if (this.databases.hasOwnProperty(db) == null) {
      throw new Error(`${db} is not a valid database`)
    }
    return this.databases[db].filePath
  }

  getDataBase (): any {
    return require(this.dbPath)
  }

  findById (id: number): DataBases {
    const dbData = require(this.dbPath)

    const itemFound = dbData.find((item: any) => item.id === id)
    if (itemFound == null) throw boom.notFound(`${this.selectedDB} not found`)

    return itemFound
  }

  findByRut (rut: string): DataBases {
    const dbData = require(this.dbPath)

    const itemFound = dbData.find((item: any) => item.rut === rut)
    if (itemFound == null) throw boom.notFound(`${this.selectedDB} not found`)

    return itemFound
  }

  changeEntireDB (dbData: DataBases[] | DataBases): string {
    fs.writeFileSync(this.dbPath, JSON.stringify(dbData))

    return 'Changes made'
  }

  createItem (content: object): string {
    const dbData = require(this.dbPath)

    dbData.push(content)

    this.changeEntireDB(dbData)
    return 'Item created'
  }

  updateItem (id: number, content: object): string {
    const dbData = require(this.dbPath)

    const index = dbData.findIndex((item: any) => item.id === id)
    if (index !== -1) {
      dbData[index] = content

      this.changeEntireDB(dbData)
      return 'Item updated'
    }
    throw boom.notFound(`${this.selectedDB} not found`)
  }

  deleteItem (id: number): string {
    const dbData = require(this.dbPath)

    const index = dbData.findIndex((item: any) => item.id === id)
    if (index !== -1) {
      dbData.splice(index, 1)

      this.changeEntireDB(dbData)
    }
    return 'Item deleted'
  }
}

export default DBServices
