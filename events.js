/**
 * App open event. Includes all necessary information regarding the device and user
 * @typedef {Object} app_open
 * @property {"app_open"} name - Name of the event
 * @property {number} timestamp - Unix timestamp of the event
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
export const app_open = 'app_open'

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
export const in_app_purchase = 'in_app_purchase'

/**
 * Set Client Properties Event
 * @typedef {Object} set_client
 * @property {"set_client"} name - Name of the event
 * @property {number} timestamp - Unix timestamp of the event
 * @property {string} [distinct_id]
 * @property {string} [referer]
 * @property {string} [push_token]
 * @property {boolean} [is_opt_out]
 * @property {object} [additional_properties]
 */
export const set_client = 'set_client'

/**
 * Represents a custom event
 * @typedef {Object} custom
 * @property {"custom"} name - Name of the event
 * @property {number} timestamp - Unix timestamp of the event
 */
export const custom = 'custom'
