import { decodeBase64url } from 'npm:@bjorkhaug/sbase64url@5.0.3'

export class InvalidTokenTypeError extends Error {}

export class MissingTokenHeaderError extends Error {}

export class MissingTokenPayloadError extends Error {}

export class MissingTokenSignatureError extends Error {}

export function extract(token: unknown): [
  header: string,
  payload: string,
  signature: string,
] {
  if (typeof token !== 'string') {
    throw new InvalidTokenTypeError('Token must be a string')
  }

  const [header, payload, signature] = token.replace(/(basic|bearer)/i, '')
    .trim().split('.')

  if (!header) {
    throw new MissingTokenHeaderError('Token header is missing')
  }

  if (!payload) {
    throw new MissingTokenPayloadError('Token payload is missing')
  }

  const protectedHeader = JSON.parse(
    new TextDecoder().decode(decodeBase64url(header)),
  )

  if (protectedHeader.alg !== 'none' && !signature) {
    throw new MissingTokenSignatureError('Token signature is missing')
  }

  return [
    new TextDecoder().decode(decodeBase64url(header)),
    new TextDecoder().decode(decodeBase64url(payload)),
    signature,
  ]
}
