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

### Global Decorator
Apply to all your stories by adding a decorator in your `.storybook/config.js` file:

```javascript
import { withPrettierSource } from 'storybook-addon-prettier-source';

addDecorator((story, context) => withPrettierSource()(story)(context);
```

### Single Story
**Or** use per story

```javascript
import { withPrettierSource } from 'storybook-addon-prettier-source';

storiesOf('Button', module)
  .add(
    'text',
    withPrettierSource()(() => (
        <Button text="Default" onClick={action('click')} />
    ))
  )
```

### Combine With @storybook/addon-info
You can easily combine this with the [@storybook/addon-info](https://github.com/storybooks/storybook/tree/release/3.4/addons/info) addon, just disable the source code option in addon-info and exclude the `PrettierSource` component from the prop tables

```javascript
import { withPrettierSource, PrettierSource } from 'storybook-addon-prettier-source';
import { withInfo } from '@storybook/addon-info';

addDecorator((story, context) => withPrettierSource()(story)(context);
addDecorator((story, context) => withInfo({
  source: false,
  propTablesExclude: [PrettierSource]
 })(story)(context);
```

## Configuration

`withPrettierSource` takes an optional parameter for configuring options

```javascript
{
  prettier: { /* prettier options */ },
  syntaxHighlighter: { /* react-syntax-highlighter options */ }
}
```

### prettier

We are using the [standalone UMD bundle](https://prettier.io/docs/en/browser.html) that runs in the browser, you can customise the options passed to `prettier.format()`

```javascript
addDecorator((story, context) => withPrettierSource({
  prettier: {
    parser: 'graphql',
    plugin: [require("prettier/parser-graphql")]
  }
})(story)(context);
```

### syntaxHighlighter

Customise any of the [react-syntax-highlighter](https://github.com/conorhastings/react-syntax-highlighter) options to control how your source code looks

```javascript
addDecorator((story, context) => withPrettierSource({
  syntaxHighlighter: {
    showLineNumbers: true
  }
})(story)(context);
```
