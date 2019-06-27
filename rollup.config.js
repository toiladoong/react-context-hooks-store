import babel from 'rollup-plugin-babel';

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'umd',
    name: 'index'
  },
  globals: {
    react: 'React',
  },
  external: ['react'],
  plugins: [
    babel({
      "presets": [
        [
          "@babel/env",
          {
            "modules": false
          }
        ],
        "@babel/react"
      ]
    })
  ]
}
