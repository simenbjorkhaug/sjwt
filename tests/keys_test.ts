import { generateKeys } from '../mod.ts'
import { assert } from 'https://deno.land/std@0.205.0/assert/mod.ts'

Deno.test('Should be able to generate an ES256 key', async () => {
  await generateKeys('ES256')
  assert(true)
})

Deno.test('Should be able to generate an ES384 key', async () => {
  await generateKeys('ES384')
  assert(true)
})

Deno.test('Should be able to generate an RS256 key', async () => {
  await generateKeys('RS256')
  assert(true)
})

Deno.test('Should be able to generate an RS384 key', async () => {
  await generateKeys('RS384')
  assert(true)
})

Deno.test('Should be able to generate an RS512 key', async () => {
  await generateKeys('RS512')
  assert(true)
})

Deno.test('Should be able to generate an PS256 key', async () => {
  await generateKeys('PS256')
  assert(true)
})

Deno.test('Should be able to generate an PS384 key', async () => {
  await generateKeys('PS384')
  assert(true)
})

Deno.test('Should be able to generate an PS512 key', async () => {
  await generateKeys('PS512')
  assert(true)
})
