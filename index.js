import axios from 'axios'
import * as ed from 'noble-ed25519'

import ajv from './validator.js'
import * as Events from './events.js'
import { convertStringToHex } from './library.js'
import * as pkg from './package.json'

/**
 * Awacs Javascript SDK
 * @class
 * @classdesc Provides an interface to send events using Javascript.
 */
export default class Awacs {
  static EventTypes = Events

  /**
   * @constructor
   * @description Awacs javascript sdk
   *
   * @example
   *  const client = new Awacs('https://tracking.socketkit.com', options)
   *
   * @param {string} baseURL - Base url for Awacs url
   * @param {object} options - Awacs Options
   * @param {string!} options.authorization_key - Authorization key
   * @param {string} options.signing_key - Signing Key
   */
  constructor(baseURL, { authorization_key, signing_key } = { authorization_key: null, signing_key: null }) {
    if (!baseURL) {
      throw new Error(`[Awacs] Missing baseURL`)
    }

    if (!authorization_key) {
      throw new Error(`[Awacs] Missing authorization_key`)
    }

    if (!signing_key) {
      throw new Error(`[Awacs] Missing signing_key`)
    }

    this.signing_key = signing_key
    this.instance = axios.create({
      baseURL,
      headers: { 'x-Awacs-key': authorization_key },
    })
    this.client_id = null

    /**
     * @param {object} logger - Logger instance
     */
    this.logger = console
  }

  /**
   * @function setClientId
   * @description Sets the client id. Client id needs to be an UUID. Preferably v4.
   *
   * @example
   *  const client = new Awacs(url, options)
   *  client.setClientId(randomUUID)
   *
   * @param {string} client_id - Client id (Required to be UUID)
   * @returns {void}
   */
  setClientId(client_id) {
    this.client_id = client_id
    this.instance.defaults.headers.post['x-client-id'] = client_id
    this.logger.debug(`[Awacs] Setting client_id to ${client_id}`)
  }

  /**
   * @function setLogger
   * @description Changes the default logger
   *
   * @example
   *  const client = new Awacs(url, options)
   *  client.setLogger(console)
   *
   * @param {object} logger - Logger instance
   * @returns {void}
   */
  setLogger(logger) {
    this.logger = logger
    this.logger.debug(`[Awacs] Setting logger`)
  }

  /**
   * @async
   * @function sign
   * @description Signs the payload using the Awacs signing key
   *
   * @example
   *  const client = new Awacs(url, options)
   *  client.sign([{ name: 'app_open', timestamp: 1625852442986 }])
   *
   * @param {Events.app_open|Events.in_app_purchase|Events.set_client|Events.custom} payload - Event payload
   * @returns {Promise<string | null>} - Signed payload
   */
  async sign(payload) {
    if (!Array.isArray(payload)) {
      this.logger.error('Signing payload is not an array.')
      return null
    }

    try {
      const hex = convertStringToHex(JSON.stringify(payload))
      return await ed.sign(hex, this.signing_key)
    } catch (error) {
      this.logger.warn(
        `[Awacs] Failed to sign the payload due to ${error.message}`,
        error,
      )
      return null
    }
  }

  /**
   * @async
   * @function sendEvent
   * @description Send an event to Awacs
   *
   * @example
   *  const client = new Awacs(url, options)
   *  client.setClientId(randomUUID)
   *  await client.sendEvent("custom", { name: "custom", timestamp: 1625852442986, properties: {} })
   *
   * @param {Events.app_open|Events.in_app_purchase|Events.set_client|Events.custom} event - Event payload
   * @returns {Promise<void>}
   */
  async sendEvent(event) {
    if (!this.client_id) {
      return this.logger.warn(`[Awacs] You need to set client_id first.`)
    }

    if (!this.isEventValid(event)) {
      this.logger.warn(`[Awacs] Failed to validate event payload`)
      return this.logger.error(ajv.errors)
    }

    const signature = await this.sign(event)

    if (!signature) return // do nothing

    try {
      await this.instance.post('/v1/events', [event], {
        headers: { 'x-signature': signature },
      })
    } catch (error) {
      this.logger.warn(error)
    }
  }

  /**
   * @private
   * @function isEventValid
   * @description Validate if a payload is a valid event.
   *
   * @example
   *  const client = new Awacs(url, options)
   *  client.isEventValid({ name: "custom", timestamp: 1625852442986 }) === true
   *
   * @param {Events.app_open|Events.in_app_purchase|Events.set_client|Events.custom} event - Event payload
   * @returns {boolean}
   */
  isEventValid(event) {
    if (!event.name) {
      this.logger.warn(
        `[Awacs] Event does not have a valid name. Received ${event.name}.`,
      )
      return false
    }

    const [_, type] = Object.entries(Events).find(
      ([key]) => key === event.name,
    )

    if (event.name === 'app_open') {
      event.library_version = pkg.version
    }

    if (!type) {
      this.logger.warn(`Event type ${event.name} does not exist`)
      return false
    }

    return ajv.validate(type, event)
  }
}
