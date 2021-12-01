import axios from 'axios'
import webcrypto from 'isomorphic-webcrypto'

import * as Events from './events.js'
import * as pkg from './package.json'

/**
 * Socketkit Javascript SDK
 * @class
 * @classdesc Provides an interface to send events using Javascript.
 */
export default class Socketkit {
  static EventTypes = Events

  /**
   * @constructor
   * @description Socketkit javascript sdk
   *
   * @example
   *  const client = new Socketkit(options)
   *
   * @param {object} options - Socketkit Options
   * @param {string!} options.authorization_key - Authorization key
   * @param {string} options.signing_key - Signing Key
   */
  constructor(
    { authorization_key, signing_key } = {
      authorization_key: null,
      signing_key: null,
    },
  ) {
    if (!authorization_key) {
      throw new Error(`[Socketkit] Missing authorization_key`)
    }

    if (!signing_key) {
      throw new Error(`[Socketkit] Missing signing_key`)
    }

    this.authorization_key = authorization_key
    this.client = axios.create({ baseURL: 'https://tracking.socketkit.com' })
    this.client_id = null
    this.logger = console
    this.signing_key = atob(signing_key)
  }

  /**
   * @function setClientId
   * @description Sets the client id. Client id needs to be an UUID. Preferably v4.
   *
   * @example
   *  const client = new Socketkit(url, options)
   *  client.setClientId(randomUUID)
   *
   * @param {string} client_id - Client id (Required to be UUID)
   * @returns {void}
   */
  setClientId(client_id) {
    this.client_id = client_id
    this.logger.debug(`[Socketkit] Setting client_id to ${client_id}`)
  }

  /**
   * @function setLogger
   * @description Changes the default logger
   *
   * @example
   *  const client = new Socketkit(url, options)
   *  client.setLogger(console)
   *
   * @param {object} logger - Logger instance
   * @returns {void}
   */
  setLogger(logger) {
    this.logger = logger
    this.logger.debug(`[Socketkit] Setting logger`)
  }

  /**
   * @async
   * @function sign
   * @description Signs the payload using the Socketkit signing key
   *
   * @example
   *  const client = new Socketkit(url, options)
   *  client.sign([{ name: 'custom', timestamp: '2021-11-30T21:48:12.554Z' }])
   *
   * @param {[Events.app_open|Events.in_app_purchase|Events.set_client|Events.custom]} payload - Event payload
   * @returns {Promise<string | null>} - Signed payload
   */
  async sign(payload) {
    if (!Array.isArray(payload)) {
      this.logger.error('Signing payload is not an array.')
      return null
    }

    try {
      const encoder = new TextEncoder('utf8')
      const key = await webcrypto.subtle.importKey(
        'raw',
        encoder.encode(this.signing_key),
        { hash: 'SHA-512', name: 'HMAC' },
        false,
        ['sign', 'verify'],
      )
      const signature = await webcrypto.subtle.sign(
        'HMAC',
        key,
        encoder.encode(JSON.stringify(payload)),
      )

      return btoa(String.fromCharCode(...new Uint8Array(signature)))
    } catch (error) {
      this.logger.warn(`[Socketkit] Failed to sign the payload due to ${error.message}`, error)
      return null
    }
  }

  /**
   * @async
   * @function sendEvent
   * @description Send an event to Socketkit
   *
   * @example
   *  const client = new Socketkit(url, options)
   *  client.setClientId(randomUUID)
   *  await client.sendEvent({ name: "custom", timestamp: '2021-11-30T21:48:12.554Z', properties: {} })
   *
   * @param {Events.app_open|Events.in_app_purchase|Events.set_client|Events.custom} event - Event payload
   * @returns {Promise<void>}
   */
  async sendEvent(event) {
    if (!this.client_id) {
      return this.logger.warn(`[Socketkit] You need to set client_id first.`)
    }

    const request = [event]
    const signature = await this.sign(request)

    if (!signature) return // do nothing

    try {
      // @ts-ignore
      await this.client.post('/v1/events', request, {
        headers: {
          'user-agent': `socketkit-js-${pkg.version}`,
          'x-client-id': this.client_id,
          'x-signature': signature,
          'x-socketkit-key': this.authorization_key,
        },
      })
    } catch (error) {
      this.logger.warn(
        `[Socketkit] Sending event failed: "${error.response?.data.message ?? error.message}"`,
      )
    }
  }
}
