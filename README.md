# Simple jwt library

## Purpose

Consume and use the web crypto standard for runtimes like node and deno without
relying on external platforms. With this library you can sign and issue valid
jwt tokens, as well as encode jwt without any signature.

Note does not support issueing a CryptoKey with P521 Curve, as it is not
implemented in Deno.

### Usage

```typescript
import { bearer, decode, encode, sign, validate, verify } from '@bjorkhaug/sjwt'
```

### TODO method docs
