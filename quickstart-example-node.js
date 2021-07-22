import { randomUUID } from 'crypto'

import Socketkit from './dist/index.modern.js'

const client = new Socketkit('http://localhost:3002', {
  authorization_key: process.env.AUTHORIZATION_KEY,
  signing_key: process.env.SIGNING_KEY,
})

client.setClientId(randomUUID())

client
  .sendEvent({
    name: 'app_open',
    timestamp: 1626941117306,
    locale: 'en-US',
    manufacturer: 'Apple',
    platform: 'ios',
    type: 'iPad13,1',
    carrier: 'T-Mobile',
    os_name: 'iOS',
    os_version: '14.4.1',
    screen_size: [2778, 1284],
    application_build_number: 14,
    application_version: '1.0.0',
    library_version: '0.5.3',
    watch_model: 'Apple Watch 38mm',
  })
  .then((msg) => console.log(msg))
  .catch((error) => console.error(error))
