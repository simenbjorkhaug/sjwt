import { encodeBase64url } from 'npm:@bjorkhaug/sbase64url@5.0.4'
import { Header } from './header.ts'

export function encode<
  H extends { [key: string]: string | number | string[] | number[] },
  P = Record<string, string | number | string[] | number[]>,
>({
  payload,
  header,
}: {
  payload: P
  header: H & Omit<Header, 'alg'>
}) {
  return `${encodeBase64url(JSON.stringify({ ...header, alg: 'none' }))}.${
    encodeBase64url(JSON.stringify(payload))
  }.`
}
