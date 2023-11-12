import { encodeBase64url } from 'npm:@bjorkhaug/sbase64url@5.0.3'
import { findAlgorithm, findHashFunction } from './algorithms.ts'
import { type Header } from './header.ts'
import { findDefaultParamsForAlgorithm, Params } from './keys.ts'

export class InvalidExpClaimError extends Error {}

export async function sign<
  H extends { [key: string]: string | number | string[] | number[] },
  P = Record<string, string | number | string[] | number[]>,
>({
  key,
  payload,
  header,
  key_params = {},
}: {
  payload: P
  header: H & Header
  key: CryptoKey
  key_params?: Partial<Params<Header['alg']>>
}): Promise<string> {
  if (header.exp < Date.now() / 1000) {
    throw new InvalidExpClaimError(
      'Token is invalid, time is already set to expired',
    )
  }

  const headerAsBase64Url = encodeBase64url(
    JSON.stringify(header),
  )

  const payloadAsBase64Url = encodeBase64url(
    JSON.stringify(payload),
  )

  const keyParams: { [key: string]: unknown } = findDefaultParamsForAlgorithm(
    header.alg,
  )

  for (const [key, value] of Object.entries(key_params ?? {})) {
    keyParams[key as string] = value
  }

  const signature = await crypto.subtle.sign(
    Object.assign({
      name: findAlgorithm(header.alg),
      hash: findHashFunction(header.alg),
    }, keyParams),
    key,
    new TextEncoder().encode(`${headerAsBase64Url}.${payloadAsBase64Url}`),
  )

  return `${headerAsBase64Url}.${payloadAsBase64Url}.${
    encodeBase64url(signature)
  }`
}
