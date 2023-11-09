import { extract } from './extract.ts'
export class InvalidHeaderError extends Error {}

export class InvalidPayloadError extends Error {}

export function decode<H, P>(token: unknown): {
  header: H
  payload: P
  signature: string
} {
  const [header, payload, signature = ''] = extract(token)

  let h: H
  try {
    h = JSON.parse(header)
  } catch {
    throw new InvalidHeaderError('Token header is invalid')
  }

  let p: P
  try {
    p = JSON.parse(payload)
  } catch {
    throw new InvalidPayloadError('Token payload is invalid')
  }

  return {
    header: h,
    payload: p,
    signature,
  }
}
