import test from 'ava'
import * as ed from 'noble-ed25519'
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
      properties: {},
    }),
  )
})

test('should sign arrays', async (t) => {
  const client = new Awacs('https://tracking.socketkit.com', {
    authorization_key: 'authorization_key',
    signing_key: ed.utils.randomPrivateKey(),
  })

  client.setLogger(mockLogger)

  t.truthy(await client.sign([{ name: 'custom', timestamp: Date.now() }]))
})

test('should not sign non-array payloads', async (t) => {
  const client = new Awacs('https://tracking.socketkit.com', {
    authorization_key: 'authorization_key',
    signing_key: ed.utils.randomPrivateKey(),
  })

  client.setLogger(mockLogger)

  t.is(await client.sign('hello'), null)
})

test('should have EventTypes property', (t) => {
  t.truthy(Awacs.EventTypes)
})
