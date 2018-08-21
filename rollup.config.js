import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  external: [
    '@storybook/addons',
    'prop-types',
    'react',
    'prettier/standalone',
    'prettier/parser-babylon',
    'react-syntax-highlighter/prism-light',
    'react-syntax-highlighter/languages/prism/jsx',
    'react-syntax-highlighter/styles/prism/tomorrow',
    'react-element-to-jsx-string'
  ],
  plugins: [
    resolve(),
    postcss(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    })
  ]
};
