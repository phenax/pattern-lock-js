const esbuild = require('esbuild')
const path = require('path')

// const watch = process.argv.includes('--watch') ? 'forever' : false
const isProd = process.env.NODE_ENV === 'production'

const [sourceFile, format = 'cjs'] = process.argv.slice(2)

const SOURCE_DIR = path.resolve(__dirname, './src')
const BUILD_DIR = path.resolve(__dirname, './build')

const _src = p => path.join(SOURCE_DIR, p)

esbuild.build({
  entryPoints: [_src(sourceFile)],
  sourcemap: 'external',
  bundle: true,
  outdir: BUILD_DIR,
  minify: isProd,
  format,
}).catch(_e => process.exit(1))

