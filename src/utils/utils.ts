/* eslint-disable @typescript-eslint/no-extraneous-class */
export default class Utils {
  static to (reference: Function): {result: any, error: any} {
    try {
      const result = reference()
      return { result, error: null }
    } catch (error) {
      return { result: null, error }
    }
  }
}
