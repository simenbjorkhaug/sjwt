import { assert } from 'https://deno.land/std@0.182.0/_util/asserts.ts'
import { generateKeys, importKey, jwt } from '../mod.ts'

Deno.test('Should be able to sign a valid jwt', async () => {
  const keys = await generateKeys('RS256')

  const token = await jwt.sign<{ kid: string }>({
    header: {
      typ: 'at+JWT',
      alg: 'RS256',
      sub: '1234',
      iss: '1234',
      aud: '1234',
      kid: 'test',
      exp: Date.now() / 1000 + 60 * 60,
      iat: Date.now() / 1000,
    },
    payload: {
      nonce: '1234',
    },
    key: await importKey('RS256', keys.private, ['sign']),
  })

  assert(typeof token === 'string')
})
