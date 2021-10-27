const axios = require('axios').default
const Helper = require('./utils/helpers')
/**
 * @class Dixa
 */
class Dixa {
  /**
   *This is a constructor for creating a Peer Instance
   * @param {string} token - Dixa's secretkey
   * @returns { Dixa } - An instance of Dixa
   */
  constructor (token) {
    this.token = token
    this.request = axios.create({
      baseURL: 'https://integrations.dixa.io',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   * Returns a list of Users
   * @returns {JSON}  A JSON response containing all users
   */
  async getUser () {
    try {
      const response = await this.request.get('/v1/users')

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Creates a new user
   * @param {Object} payload - The user payload
   * @param {string} payload.name - The name of the user
   * @param {string} payload.email - The email of the user
   * @param {string} payload.phone_number- The phone number of the user
   * @returns {JSON}  A JSON response containing the details of the user
   * @memberof Dixa
   */
  async createUser (payload) {
    try {
      const response = await this.request.post('/v1/users', {
        name: payload.name,
        email: payload.email,
        phone_number: payload.phone_number
      })

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Returns a list of conversations requested by a specific user.
   * @param {string} userId - Id of the requester
   * @param {int} limit - Maximum number of items per page. With upper bound set to 200.
   * @returns {JSON}  A JSON response containing the conversations requested by a specific user
   */
  async getUserConversations (userId, limit) {
    try {
      const response = await this.request.get(`/v1/users/${userId}/requested_conversations?limit=${limit}`)

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Schedules anonymization for specified entity
   * @param {Object} payload - Entity info to schedule anonymization
   * @returns {JSON}  A JSON response containing the scheduled entity
   */
  async scheduleAnonymity (payload) {
    try {
      const response = await this.request.post('/v1/anonymization_request', {
        entity_id: payload.entity_id,
        entity_type: payload.entity_type,
        force_anonymization: true
      })

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Fetches anonymization request for specified id
   * @param {string} requestId - The id of the anonymization request
   * @returns {JSON}  A JSON response containing anonymization request for specified id
   */
  async getAnonymity (requestId) {
    try {
      const response = await this.request.get(`/v1/anonymization_request/${requestId}`)

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Fetches a list of tags for the organization
   * @returns {JSON} A JSON response containing a list of tags for the organization
   */
  async getTags () {
    try {
      const response = await this.request.get('​/v1/tags')

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Fetches a list of queues for the organization
   * @returns { JSON } - A JSON response containing a list of queues for the organization
   */
  async getQueues () {
    try {
      const response = await this.request.get('​/v1/queues')

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Fetches a specific queue by id
   * @param {string} id - The id of the queue
   * @returns { JSON } A JSON response containing the a queue
   */
  async getQueueById (id) {
    try {
      const response = await this.request.get(`/v1/queues/${id}`)

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Get a list of endpoints by type
   * @param {string} type - The type of endpoint
   * @returns { JSON } A JSON response containing the a list of endpoints
   */
  async getEndpointsByType (type) {
    try {
      const response = await this.request.get(`/v1/endpoints?type=${type}`)

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Get an endpoint by id
   * @param {string} id - The id of the endpoint
   * @returns { JSON } A JSON response containing the endpoint
   */
  async getEndpointsById (id) {
    try {
      const response = await this.request.get(`/v1/endpoints/${id}`)

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Creates a conversation
   * @param {Object} conversation - The conversation object
   * @returns { JSON } A JSON response containing the conversation
   */
  async createConversation (conversation) {
    try {
      const response = await this.request.post('/v1/conversations', { ...conversation })

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Fetches a single conversation by csid
   * @param {integer} csid - The csid of the conversation to be fetched
   * @returns { JSON } A JSON response containing a single conversation
   */
  async getConversationByCsid (csid) {
    try {
      const response = await this.request.get(`/v1/conversations/${csid}`)

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Fetches messages in a single conversation by csid
   * @param {integer} csid - The csid of the conversation to be fetched
   * @returns { JSON } A JSON response containing a single conversation messages
   */
  async getConversationMessagesByCsid (csid) {
    try {
      const response = await this.request.get(`/v1/conversations/${csid}/messages`)

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Add a historical message to a conversation
   * @param {integer} csid - The csid of the conversation to add historical messages to
   * @param { object } message - The message to be added
   * @returns { JSON } A JSON response containing a single conversation
   */
  async addHistoricalMessageByCsid (csid, message) {
    try {
      const response = await this.request.post(`/v1/conversations/${csid}/messages/historical`, {
        ...message
      })

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }
}

module.exports = Dixa
