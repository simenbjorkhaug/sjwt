import * as JWS from './jws.ts'

export type Header = {
  typ: 'at+JWT'
  alg: JWS.Algorithm
  iss: string
  sub: string
  aud: string
  exp: number
  nbf?: number
  iat: number
  jti?: string
}
