const UnauthorizedError = require('../errors/UnauthorizedError')
const ServerError = require('../errors/ServerError')
const BadRequestError = require('../errors/BadRequestError')
/**
 * @class Helper
 */
class Helper {
  /**
   *
   * @param {object} error - The error object
   * @returns {Object} - The an error instance
   * @memberof Helper
   */
  static processError (error) {
    switch (error.response.status) {
      case 400:
        throw new BadRequestError({ message: error.response.data })
      case 401:
        throw new UnauthorizedError({ message: error.response.data.message })
      default:
        throw new ServerError({ message: error.response.data.message })
    }
  }
}

module.exports = Helper
