import { randomUUID } from 'crypto'

// eslint-disable-next-line
import Socketkit from './dist/index.modern.js'

// Please change the authorization and signing keys.
process.env.AUTHORIZATION_KEY = 'ogXu2rHWHEHbRCgX9H6UmEefaww7tK89UaSkrOORak8='
process.env.SIGNING_KEY = 'WkRsalptVTBZVGd0TkRnM1lpMDBOREl3TFdFeU56TXRZamMxWXpjMlpEWTVNV1Zq'

const client = new Socketkit({
  authorization_key: process.env.AUTHORIZATION_KEY,
  signing_key: process.env.SIGNING_KEY,
})

client.setClientId(randomUUID())

client
  .sendEvent({
    application_build_number: 14,
    application_version: '1.0.0',
    carrier: 'T-Mobile',
    library_version: '0.5.3',
    locale: 'en-US',
    manufacturer: 'Apple',
    name: 'app_open',
    os_name: 'iOS',
    os_version: '14.4.1',
    platform: 'ios',
    screen_size: [2778, 1284],
    timestamp: new Date().toISOString(),
    type: 'iPad13,1',
    watch_model: 'Apple Watch 38mm',
  })
  .then(() => console.info('Successfully sent an event'))
