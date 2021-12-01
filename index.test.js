import test from 'ava'

import Awacs from './index.js'

const mockLogger = {
  debug: () => {},
  error: () => {},
  info: () => {},
  warn: () => {},
}

test('should mock logger', (t) => {
  const client = new Awacs({
    authorization_key: 'authorization_key',
    signing_key: 'signing_key',
  })

  client.setLogger(mockLogger)

  t.deepEqual(client.logger, mockLogger)
})

test('should have EventTypes property', (t) => {
  t.truthy(Awacs.EventTypes)
})
