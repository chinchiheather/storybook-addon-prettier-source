# storybook-addon-prettier-source

Storybook addon to show inline story source code formatted using prettier and syntax highlighting

![screenshot 1](https://chinchiheather.github.io/storybook-addon-prettier-source/img/screenshot-1.png)

## Setup
```bash
# yarn
yarn add --dev storybook-addon-prettier-source

# npm
npm install --save-dev storybook-addon-prettier-source
```

## Usage
Use as a global decorator in your `.storybook/config.js` file:

```javascript
import { withPrettierSource } from 'storybook-addon-prettier-source';

addDecorator((story, context) => withPrettierSource(story, context));
```

## Configuration

`withPrettierSource` takes an optional third parameter for configuring options

```javascript
{
  prettier: { /* prettier options */ },
  syntaxHighlighter: { /* react-syntax-highlighter options */ }
}
```

### prettier

We are using the [standalone UMD bundle](https://prettier.io/docs/en/browser.html) that runs in the browser, you can customise the options passed to `pretter.format()`

```javascript
addDecorator((story, context) => withPrettierSource(story, context, {
  prettier: {
    parser: 'graphql',
    plugin: [require("prettier/parser-graphql")]
  }
}));
```

### syntaxHighlighter

Customise any of the [react-syntax-highlighter](https://github.com/conorhastings/react-syntax-highlighter) options to control how your source code looks

```javascript
addDecorator((story, context) => withPrettierSource(story, context, {
  syntaxHighlighter: { showLineNumbers: true }
}));
```
