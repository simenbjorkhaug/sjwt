import { decode, InvalidHeaderError, InvalidPayloadError } from './decode.ts'
import { InvalidExpClaimError, sign } from './sign.ts'
import {
  InvalidSignatureError,
  MissingAlgClaimInHeaderError,
  verify,
} from './verify.ts'
import {
  InvalidAudienceError,
  InvalidIssuerError,
  InvalidSubjectError,
  InvalidTokenTypeError,
  TokenExpiredError,
  TokenNotYetValidError,
  validate,
} from './validate.ts'
import { InvalidAlgorithmError } from './algorithms.ts'
import {
  MissingTokenHeaderError,
  MissingTokenPayloadError,
  MissingTokenSignatureError,
} from './extract.ts'
import { basic } from './basic.ts'
import { bearer } from './bearer.ts'
import { encode } from './encode.ts'
import { TYP } from './typ.ts'
import { seconds } from './seconds.ts'

export * from './keys.ts'
export const jwt = {
  decode,
  sign,
  verify,
  validate,
  encode,
  constants: {
    TYP,
  },
  utils: {
    seconds,
    bearer,
    basic,
  },
  errors: {
    TokenExpiredError,
    InvalidIssuerError,
    InvalidSubjectError,
    InvalidAudienceError,
    TokenNotYetValidError,
    InvalidSignatureError,
    MissingAlgClaimInHeaderError,
    InvalidExpClaimError,
    InvalidHeaderError,
    InvalidPayloadError,
    InvalidAlgorithmError,
    MissingTokenHeaderError,
    MissingTokenPayloadError,
    MissingTokenSignatureError,
    InvalidTokenTypeError,
  },
}
