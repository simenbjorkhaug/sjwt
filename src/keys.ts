import { findAlgorithm, findHashFunction } from './algorithms.ts'
import { Algorithm } from './jws.ts'
import { encodeBase64url } from 'npm:@bjorkhaug/sbase64url'

async function exportKey(
  key: CryptoKey,
): Promise<JsonWebKey> {
  return await crypto.subtle.exportKey(
    'jwk',
    key,
  ) as JsonWebKey
}

export function findDefaultParamsForAlgorithm(algorithm: Algorithm) {
  if (
    ['RS512', 'RS384', 'RS256'].includes(algorithm)
  ) {
    return {
      modulusLength: 4096,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    }
  }

  if (['PS512', 'PS384', 'PS256'].includes(algorithm)) {
    return {
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      saltLength: 64,
    }
  }

  if (algorithm === 'ES256') {
    return {
      namedCurve: 'P-256',
    }
  }

  if (algorithm === 'ES384') {
    return {
      namedCurve: 'P-384',
    }
  }

  // if (algorithm === 'ES512') {
  //   return {
  //     namedCurve: 'P-521',
  //   }
  // }

  if (['HS512', 'HS384', 'HS256'].includes(algorithm)) {
    return {
      hash: {
        name: findHashFunction(algorithm),
      },
    }
  }

  return {}
}

export type Params<T extends Algorithm> = T extends
  | 'RS256'
  | 'RS384'
  | 'PS512' ? RsaHashedKeyGenParams
  : T extends 'RS512' | 'PS256' | 'PS384' ? RsaHashedKeyGenParams & RsaPssParams
  : T extends 'ES256' | 'ES384' ? EcKeyGenParams
  : T extends 'HS256' | 'HS384' | 'HS512' ? HmacKeyGenParams
  : never

type ImportParams<T extends Algorithm> = T extends
  | 'RS256'
  | 'RS384'
  | 'RS512' ? RsaHashedImportParams
  : T extends 'PS256' | 'PS384' | 'PS512' ? RsaHashedImportParams & RsaPssParams
  : T extends 'ES256' | 'ES384' ? EcKeyImportParams
  : T extends 'HS256' | 'HS384' | 'HS512' ? HmacImportParams
  : never

class Keys {
  readonly #kid = encodeBase64url(crypto.getRandomValues(new Uint8Array(32)))
  constructor(
    private readonly private_key: JsonWebKey,
    private readonly public_key: JsonWebKey,
  ) {}

  async cryptoKeys() {
    return {
      privateKey: await importKey(
        this.private_key.alg as Algorithm,
        this.private_key,
        ['sign'],
      ),
      publicKey: await importKey(
        this.public_key.alg as Algorithm,
        this.public_key,
        ['verify'],
      ),
    }
  }

  get jwks() {
    const omit_key_ops_and_ext: { [key: string]: unknown } = {}

    const key = JSON.parse(JSON.stringify(this.public_key))

    for (const k in key) {
      if (Object.prototype.hasOwnProperty.call(key, k) === false) {
        continue
      }

      if (k === 'key_ops' || k === 'ext') {
        continue
      }

      omit_key_ops_and_ext[k] = key[k]
    }

    return {
      keys: [
        omit_key_ops_and_ext,
      ],
    }
  }

  get private() {
    return this.private_key
  }

  get public() {
    return this.public_key
  }

  get algorithm() {
    return this.private_key.alg as Algorithm
  }

  get kid() {
    return this.#kid
  }
}

export async function generateKeys(
  algorithm: Algorithm,
  params: Omit<Params<typeof algorithm>, 'name' | 'hash'> = {},
): Promise<Keys> {
  const keyParams: { [key: string]: unknown } = findDefaultParamsForAlgorithm(
    algorithm,
  )

  for (const [key, value] of Object.entries(params ?? {})) {
    keyParams[key as string] = value
  }

  const key = await crypto.subtle.generateKey(
    Object.assign({
      name: findAlgorithm(algorithm),
      hash: findHashFunction(algorithm),
    }, keyParams),
    true,
    ['sign', 'verify'],
  ) as CryptoKeyPair

  return new Keys(
    await exportKey(key.privateKey),
    await exportKey(key.publicKey),
  )
}

export async function importKey(
  algorithm: Algorithm,
  key: ArrayBuffer | JsonWebKey,
  keyUsages: KeyUsage[],
  params: Omit<ImportParams<typeof algorithm>, 'name' | 'hash'> = {},
) {
  const keyParams: { [key: string]: unknown } = findDefaultParamsForAlgorithm(
    algorithm,
  )

  for (const [key, value] of Object.entries(params ?? {})) {
    keyParams[key as string] = value
  }

  return await crypto.subtle.importKey(
    'jwk',
    key as JsonWebKey,
    Object.assign({
      name: findAlgorithm(algorithm),
      hash: findHashFunction(algorithm),
    }, keyParams),
    true,
    keyUsages,
  )
}
