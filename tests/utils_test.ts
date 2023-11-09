import { assertEquals } from 'https://deno.land/std@0.205.0/assert/assert_equals.ts'
import { jwt } from '../mod.ts'

Deno.test('Should generate a Bearer prefixed token', () => {
  const token = jwt.encode({
    header: {
      typ: jwt.constants.TYP,
      exp: jwt.utils.seconds(Date.now()),
      iss: '',
      sub: '',
      aud: '',
      iat: jwt.utils.seconds(Date.now()),
    },
    payload: {},
  })

  assertEquals(jwt.utils.bearer(token), `Bearer ${token}`)
})

Deno.test('Should generate a Bearer prefixed token with a Basic prefix', () => {
  const token = jwt.encode({
    header: {
      typ: jwt.constants.TYP,
      exp: jwt.utils.seconds(Date.now()),
      iss: '',
      sub: '',
      aud: '',
      iat: jwt.utils.seconds(Date.now()),
    },
    payload: {},
  })

  assertEquals(jwt.utils.basic(token), `Basic ${token}`)
})
