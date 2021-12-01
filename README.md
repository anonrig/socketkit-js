## Socketkit JavaScript SDK

Access Socketkit using cross-platform JavaScript SDK to anonymously track and understand user behavior with built-in security.

## Install

```
npm i --save socketkit
```

## Setup

```javascript
import Socketkit from 'socketkit'
import { randomUUID } from 'crypto'

const options = {
  authorization_key: 'authorization_key',
  signing_key: 'signing_key'
}
const client = new Socketkit(options)

// Store this preferably in your own database for future reference.
const clientId = randomUUID()
client.setClientId(clientId)
client.sendEvent({ name: 'custom', timestamp: new Date().toISOString(), custom_key: 'value' })
```

## Send events

### app_open

App open event type should be sent when the application is booted. Includes characteristic features of a client for analytical purposes. For properties and their requirements please look into [the definition](https://github.com/socketkit/socketkit-js/blob/main/events.js#L3).

```javascript
client.sendEvent({
  name: "app_open",
  timestamp: new Date().toISOString(),
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
  library_version: '0.4.1',
  watch_model: 'Apple Watch 38mm', // if the client is watchOS.
})
```

### in_app_purchase

Includes all the information related to tracking a in app purchase payment. For properties and their requirements please look into [the definition](https://github.com/socketkit/socketkit-js/blob/main/events.js#L92).

```javascript
client.sendEvent({
  name: "in_app_purchase",
  timestamp: new Date().toISOString(),
  product_name: "Weekly Package",
  product_quantity: 1,
  product_price: 4.99,
  product_currency: "USD"
})
```

### set_client

Set client event type gives the ability to store more information about the user. It should not store any identifiable data for privacy compliance. For properties and their requirements please look into [the definition](https://github.com/socketkit/socketkit-js/blob/main/events.js#L135).

```javascript
client.sendEvent({
  name: "set_client",
  timestamp: new Date().toISOString(),
  distinct_id: null,
  referer: "Google",
  push_token: null,
  is_opt_out: false, // required for GDPR compliance
  additional_properties: {
    ab_test_enabled: false
  }
})
```

### custom

Custom event type gives the user the ability to send any kind of data to the Awacs server. For properties and their requirements please look into [the definition](https://github.com/socketkit/socketkit-js/blob/main/events.js#L175).

```javascript
client.sendEvent({
  name: "custom",
  timestamp: new Date().toISOString(),
  random_key: "value"
})
```
