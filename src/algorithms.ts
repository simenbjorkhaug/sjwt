import * as JWS from './jws.ts'

export class InvalidAlgorithmError extends Error {}

const algorithmLookup: Record<JWS.Algorithm, string> = {
  RS256: 'RSASSA-PKCS1-v1_5',
  RS384: 'RSASSA-PKCS1-v1_5',
  RS512: 'RSASSA-PKCS1-v1_5',
  ES256: 'ECDSA',
  ES384: 'ECDSA',
  // ES512: 'ECDSA', Not supported by Deno, Rust issue
  PS256: 'RSA-PSS',
  PS384: 'RSA-PSS',
  PS512: 'RSA-PSS',
  HS256: 'HMAC',
  HS384: 'HMAC',
  HS512: 'HMAC',
} as const

const algorithmHashNameLookup: Record<JWS.Algorithm, string> = {
  RS256: 'SHA-256',
  RS384: 'SHA-384',
  RS512: 'SHA-512',
  ES256: 'SHA-256',
  ES384: 'SHA-384',
  // ES512: 'SHA-512', Not supported by Deno, Rust issue
  PS256: 'SHA-256',
  PS384: 'SHA-384',
  PS512: 'SHA-512',
  HS256: 'SHA-256',
  HS384: 'SHA-384',
  HS512: 'SHA-512',
} as const

export function findAlgorithm(
  algorithm: JWS.Algorithm,
): typeof algorithmLookup[typeof algorithm] {
  const scheme = algorithmLookup[algorithm]

  if (!scheme) {
    throw new InvalidAlgorithmError('Invalid algorithm')
  }

  return scheme
}

export function findHashFunction(
  algorithm: JWS.Algorithm,
): typeof algorithmHashNameLookup[typeof algorithm] {
  const hash = algorithmHashNameLookup[algorithm]

  if (!hash) {
    throw new InvalidAlgorithmError('Invalid algorithm')
  }

  return hash
}
