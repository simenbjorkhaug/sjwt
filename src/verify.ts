import { decodeBase64url, encodeBase64url } from 'npm:@bjorkhaug/sbase64url'
import { findAlgorithm, findHashFunction } from './algorithms.ts'
import { extract } from './extract.ts'
import { Header } from './header.ts'
import { findDefaultParamsForAlgorithm, Params } from './keys.ts'
import { InvalidHeaderError } from './decode.ts'

export class InvalidSignatureError extends Error {}

export class MissingAlgClaimInHeaderError extends Error {}

export async function verify<H extends Header>(
  token: unknown,
  key: CryptoKey,
  key_params?: Partial<Params<Header['alg']>>,
) {
  const [header, payload, signature] = extract(token)

  let protectedHeader: H
  try {
    protectedHeader = JSON.parse(header) as H
  } catch {
    throw new InvalidHeaderError('Token header is invalid')
  }

  if (!protectedHeader.alg) {
    throw new MissingAlgClaimInHeaderError(
      'Token header is missing required alg claim',
    )
  }

  const keyParams: { [key: string]: unknown } = findDefaultParamsForAlgorithm(
    protectedHeader.alg,
  )

  for (const [key, value] of Object.entries(key_params ?? {})) {
    keyParams[key as string] = value
  }

  if (
    !(await crypto.subtle.verify(
      Object.assign({
        name: findAlgorithm(protectedHeader.alg),
        hash: findHashFunction(protectedHeader.alg),
      }, keyParams),
      key,
      Uint8Array.from(
        decodeBase64url(signature).split(''),
        (s) => s.charCodeAt(0),
      ),
      new TextEncoder().encode(
        `${encodeBase64url(header)}.${encodeBase64url(payload)}`,
      ),
    ))
  ) {
    throw new InvalidSignatureError()
  }
}
