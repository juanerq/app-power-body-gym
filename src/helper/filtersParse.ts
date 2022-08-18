import { Filters } from '../types'

export const filterModel: any = {
  rut: 'string',
  pageNumber: 'number',
  pageSize: 'number',
  from: 'number',
  to: 'number',
  startDate: 'string',
  endDate: 'string',
  status: 'string'
}

const changeTypeTo = (value: string | number, type: any): string | number => {
  if (type === 'string') return value?.toString()
  if (type === 'number') return Number(value)

  return value
}

const filtersParse = (filters: Filters): Filters => {
  const filtersObj: any = {}
  Object.entries(filters).forEach(element => {
    const [key, value] = element

    // eslint-disable-next-line valid-typeof
    if (filterModel[key] === typeof value) {
      filtersObj[key] = value
    } else {
      const valueParse = changeTypeTo(value, filterModel[key])
      filtersObj[key] = valueParse
    }
  })
  return filtersObj
}

export default filtersParse
