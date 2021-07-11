/**
 * App open event. Includes all necessary information regarding the device and user
 * @typedef {Object} app_open
 * @property {"app_open"} name - Name of the event
 * @property {integer} timestamp - Unix timestamp of the event
 * @property {string} locale
 * @property {string} manufacturer
 * @property {"ios"|"android"} platform
 * @property {string} type
 * @property {string} [carrier]
 * @property {string} os_name - Changes according to platform and device type
 * @property {string} os_version
 * @property {array} screen_size - Screen size expected format is [height, width]
 * @property {number} application_build_number
 * @property {string} application_version
 * @property {string} library_version
 * @property {string} [watch_model] - Only used by watch applications
 */
export const app_open = {
  $id: 'app_open_event',
  type: 'object',
  title: 'app_open',
  description:
    'App open event. Includes all necessary information regarding the device and user',
  properties: {
    name: {
      type: 'string',
      description: 'Name of the event',
      enum: ['app_open'],
    },
    timestamp: {
      type: 'integer',
      description: 'Unix timestamp of the event',
    },
    locale: { type: 'string', format: 'locale_code' },
    manufacturer: { type: 'string' },
    platform: {
      type: 'string',
      enum: ['ios', 'android'],
    },
    type: { type: 'string' },
    carrier: { type: 'string' },
    os_name: {
      type: 'string',
      description: 'Changes according to platform and device type',
    },
    os_version: {
      type: 'string',
      format: 'semver',
    },
    screen_size: {
      type: 'array',
      items: {
        type: 'integer',
      },
      maxItems: 2,
      minItems: 2,
      description: 'Screen size expected format is [height, width]',
    },
    application_build_number: { type: 'number' },
    application_version: {
      type: 'string',
      format: 'semver',
    },
    library_version: {
      type: 'string',
      format: 'semver',
    },
    watch_model: {
      type: 'string',
      description: 'Only used by watch applications',
    },
  },
  required: [
    'name',
    'timestamp',
    'locale',
    'platform',
    'manufacturer',
    'type',
    'os_name',
    'os_version',
    'screen_size',
    'application_build_number',
    'application_version',
    'library_version',
  ],
}

/**
 * In App Purchase Event
 * @typedef {Object} in_app_purchase
 * @property {"in_app_purchase"} name - Name of the event
 * @property {string} timestamp - Unix timestamp of the event
 * @property {string} product_name
 * @property {number} product_quantity
 * @property {number} product_price
 * @property {string} product_currency
 */
export const in_app_purchase = {
  $id: 'in_app_purchase_event',
  type: 'object',
  title: 'in_app_purchase',
  description: 'In App Purchase Event',
  properties: {
    name: {
      type: 'string',
      description: 'Name of the event',
      enum: ['in_app_purchase'],
    },
    timestamp: {
      type: 'string',
      description: 'Unix timestamp of the event',
    },
    product_name: { type: 'string' },
    product_quantity: { type: 'number' },
    product_price: { type: 'number' },
    product_currency: {
      type: 'string',
      format: 'currency_code',
    },
  },
  required: [
    'name',
    'timestamp',
    'product_name',
    'product_quantity',
    'product_price',
    'product_currency',
  ],
}

/**
 * Set Client Properties Event
 * @typedef {Object} set_client
 * @property {"set_client"} name - Name of the event
 * @property {integer} timestamp - Unix timestamp of the event
 * @property {string} [distinct_id]
 * @property {string} [referer]
 * @property {string} [push_token]
 * @property {boolean} [is_opt_out]
 * @property {object} [additional_properties]
 */
export const set_client = {
  $id: 'set_client_event',
  type: 'object',
  title: 'set_client',
  description: 'Set Client Properties Event',
  properties: {
    name: {
      type: 'string',
      description: 'Name of the event',
      enum: ['set_client'],
    },
    timestamp: {
      type: 'integer',
      description: 'Unix timestamp of the event',
    },
    distinct_id: { type: 'string' },
    referer: { type: 'string' },
    push_token: { type: 'string' },
    is_opt_out: { type: 'boolean' },
    additional_properties: {
      type: 'object',
      properties: {},
      additionalProperties: true,
      minProperties: 1,
    },
  },
  required: ['name', 'timestamp'],
}

/**
 * Represents a custom event
 * @typedef {Object} custom
 * @property {"custom"} name - Name of the event
 * @property {integer} timestamp - Unix timestamp of the event
 */
export const custom = {
  $id: 'custom_event',
  type: 'object',
  title: 'custom',
  description: 'Custom event type',
  properties: {
    name: {
      type: 'string',
      description: 'Name of the event',
      enum: ['custom'],
    },
    timestamp: {
      type: 'integer',
      description: 'Unix timestamp of the event',
    },
  },
  additionalProperties: true,
  required: ['name', 'timestamp'],
}
