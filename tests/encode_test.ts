import { assert } from 'https://deno.land/std@0.182.0/_util/asserts.ts'
import { jwt } from '../mod.ts'

Deno.test('Should be able to produce an unsigned JWT', () => {
  assert(
    typeof jwt.encode({
      header: {
        typ: jwt.constants.TYP,
        exp: jwt.utils.seconds(Date.now()),
        iss: '',
        sub: '',
        aud: '',
        iat: jwt.utils.seconds(Date.now()),
      },
      payload: {},
    }) === 'string',
  )
})
