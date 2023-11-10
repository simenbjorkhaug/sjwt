import { jwt } from '../mod.ts'
import { assertEquals } from 'https://deno.land/std@0.205.0/assert/assert_equals.ts'

Deno.test('Should be able to decode a valid jwt', () => {
  const iat = jwt.utils.seconds(Date.now())
  const exp = iat + 60 * 60

  const token = jwt.encode({
    header: {
      typ: jwt.constants.TYP,
      exp,
      iss: '',
      sub: '',
      aud: '',
      iat,
    },
    payload: {},
  })

  assertEquals(jwt.decode(token), {
    header: {
      alg: 'none',
      typ: jwt.constants.TYP,
      iss: '',
      sub: '',
      aud: '',
      iat,
      exp,
    } as { [key: string]: unknown },
    payload: {},
    signature: '',
  })
})
