import test from 'ava'
import Awacs from './index.js'

const mockLogger = {
  debug: () => {},
  warn: () => {},
  info: () => {},
  error: () => {},
}

test('should validate events', (t) => {
  const client = new Awacs('https://tracking.socketkit.com', {
    authorization_key: 'authorization_key',
    signing_key: 'signing_key',
  })

  t.truthy(
    client.isEventValid({
      name: 'custom',
      timestamp: Date.now(),
    }),
  )
})

test('should mock logger', (t) => {
  const client = new Awacs('https://tracking.socketkit.com', {
    authorization_key: 'authorization_key',
    signing_key: 'signing_key',
  })

  client.setLogger(mockLogger)

  t.deepEqual(client.logger, mockLogger)
})

test('should have EventTypes property', (t) => {
  t.truthy(Awacs.EventTypes)
})
