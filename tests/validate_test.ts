import { assertThrows } from 'https://deno.land/std@0.205.0/assert/assert_throws.ts'
import { assert } from 'https://deno.land/std@0.182.0/_util/asserts.ts'
import { jwt } from '../mod.ts'

Deno.test('Should validate issuer', () => {
  const iat = jwt.utils.seconds(Date.now())
  const exp = iat + 60 * 60

  const header_cliams = {
    typ: jwt.constants.TYP,
    exp,
    iss: '',
    sub: '',
    aud: '',
    iat,
  } as const

  const token = jwt.encode({
    header: header_cliams,
    payload: {},
  })

  const { header } = jwt.decode(token)

  assertThrows(() => {
    jwt.validate(header as typeof header_cliams, {
      iss: 'test',
    })
  })
})

Deno.test('Should validate audience', () => {
  const iat = jwt.utils.seconds(Date.now())
  const exp = iat + 60 * 60

  const header_cliams = {
    typ: jwt.constants.TYP,
    exp,
    iss: '',
    sub: '',
    aud: '',
    iat,
  } as const

  const token = jwt.encode({
    header: header_cliams,
    payload: {},
  })

  const { header } = jwt.decode(token)

  assertThrows(() => {
    jwt.validate(header as typeof header_cliams, {
      aud: 'test',
    })
  })
})

Deno.test('Should validate subject', () => {
  const iat = jwt.utils.seconds(Date.now())
  const exp = iat + 60 * 60

  const header_cliams = {
    typ: jwt.constants.TYP,
    exp,
    iss: '',
    sub: '',
    aud: '',
    iat,
  } as const

  const token = jwt.encode({
    header: header_cliams,
    payload: {},
  })

  const { header } = jwt.decode(token)

  assertThrows(() => {
    jwt.validate(header as typeof header_cliams, {
      sub: 'test',
    })
  })
})

Deno.test('Should validate expiry', () => {
  const iat = jwt.utils.seconds(Date.now())
  const exp = iat - 100

  const header_cliams = {
    typ: jwt.constants.TYP,
    exp,
    iss: '',
    sub: '',
    aud: '',
    iat,
  } as const

  const token = jwt.encode({
    header: header_cliams,
    payload: {},
  })

  const { header } = jwt.decode(token)

  assertThrows(() => {
    jwt.validate(header as typeof header_cliams, {})
  })
})

Deno.test('Should validate expiry', () => {
  const iat = jwt.utils.seconds(Date.now())
  const exp = iat + 60 * 60

  const header_cliams = {
    typ: jwt.constants.TYP,
    exp,
    iss: 'test',
    sub: 'test',
    aud: 'test',
    iat,
  } as const

  const token = jwt.encode({
    header: header_cliams,
    payload: {},
  })

  const { header } = jwt.decode(token)

  jwt.validate(header as typeof header_cliams, {
    sub: 'test',
    iss: 'test',
    aud: 'test',
  })

  assert(true)
})
