import { build, emptyDir } from 'https://deno.land/x/dnt@0.38.1/mod.ts'

await emptyDir('./npm')

await build({
  entryPoints: ['./mod.ts'],
  outDir: './npm',
  shims: {
    // see JS docs for overview and more options
    deno: true,
    crypto: true,
  },
  test: true,
  typeCheck: false,
  package: {
    // package.json properties
    name: '@bjorkhaug/sjwt',
    version: Deno.args[0],
    description: 'Simple jwt encoding and decoding for Deno and Node.js',
    license: 'MIT',
    publishConfig: {
      access: 'public',
      registry: 'https://registry.npmjs.org/',
      scope: '@bjorkhaug',
    },
    dependencies: {
      '@bjorkhaug/sbase64url': '^2.0.0',
    },
    repository: {
      type: 'git',
      url: 'git+https://github.com/simenbjorkhaug/sjwt.git',
    },
    bugs: {
      url: 'https://github.com/simenbjorkhaug/sjwt/issues',
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync('README.md', 'npm/README.md')
  },
})
