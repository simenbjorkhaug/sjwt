import { type Header } from './header.ts'

export class TokenExpiredError extends Error {}

export class InvalidAudienceError extends Error {}

export class TokenNotYetValidError extends Error {}

export class InvalidSubjectError extends Error {}

export class InvalidIssuerError extends Error {}

export class InvalidJTIError extends Error {}

export class InvalidTokenTypeError extends Error {}

/**
 * See validation rules: https://www.rfc-editor.org/rfc/rfc9068.txt
 */
export function validate<H extends Partial<Header> & Pick<Header, 'exp'>>(
  header: H,
  validate: Partial<Omit<Header, 'exp' | 'iat'>>,
) {
  if (header.exp < Date.now() / 1000) {
    throw new TokenExpiredError('Token expired')
  }

  if (validate.typ) {
    if (header.typ !== validate.typ) {
      throw new InvalidTokenTypeError('Invalid token type')
    }
  }

  if (validate.nbf) {
    if (header.nbf && header.nbf > Date.now() / 1000) {
      throw new TokenNotYetValidError('Token not yet valid')
    }
  }

  if (validate.aud) {
    if (header.aud !== validate.aud) {
      throw new InvalidAudienceError('Invalid audience')
    }
  }

  if (validate.sub) {
    if (header.sub !== validate.sub) {
      throw new InvalidSubjectError('Invalid subject')
    }
  }

  if (validate.iss) {
    if (header.iss !== validate.iss) {
      throw new InvalidIssuerError('Invalid issuer')
    }
  }

  if (validate.jti) {
    if (header.jti !== validate.jti) {
      throw new InvalidJTIError('Invalid jti')
    }
  }
}
