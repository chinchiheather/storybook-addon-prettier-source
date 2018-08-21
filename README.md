# storybook-addon-prettier-source

[![CircleCI](https://img.shields.io/circleci/project/github/chinchiheather/storybook-addon-prettier-source.svg)](https://circleci.com/gh/chinchiheather/storybook-addon-prettier-source/tree/master)

Storybook addon to show inline story source code formatted using prettier and syntax highlighting

This is an addon for use with [@storybook/react](https://github.com/storybooks/storybook/tree/master/app/react)

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

Defaults shown are merged with any options provided

```javascript
{
  disable: false, /* disable addon for a particular story or story group */
  prettier: {
    /* prettier options */
    parser: 'babylon',
    plugins: [require('prettier/parser-babylon')]
  },
  syntaxHighlighter: {
    /* react-syntax-highlighter options */
    language: 'javascript',
    style: require('react-syntax-highlighter/styles/prism/tomorrow')
  },
  reactElToString: {
    /* react-element-to-jsx-string options */
    sortProps: false
  }
}
```

### prettier

We are using the [standalone UMD bundle](https://prettier.io/docs/en/browser.html) that runs in the browser, you can customise the options passed to `prettier.format()`

```javascript
addDecorator((story, context) => withPrettierSource({
  prettier: {
    parser: 'graphql',
    plugins: [require("prettier/parser-graphql")]
  }
})(story)(context);
```

### syntaxHighlighter

Customise any of the [react-syntax-highlighter](https://github.com/conorhastings/react-syntax-highlighter) options to control how your source code looks

To change the style, provide one of the [prism styles](https://github.com/conorhastings/react-syntax-highlighter/tree/master/src/styles/prism) - you will need to install `react-syntax-highlighter` in your project

```javascript
import dark from 'react-syntax-highlighter/styles/prism/dark'

addDecorator((story, context) => withPrettierSource({
  syntaxHighlighter: {
    showLineNumbers: true,
    style: dark
  }
})(story)(context);
```

### reactElToString

Provide options for the [react-element-to-jsx-string](https://github.com/algolia/react-element-to-jsx-string) library to control how your story component is turned into source code (keep in mind that the formatting is handled by prettier, so changing any of the format-related options may not do anything)

```javascript
addDecorator((story, context) => withPrettierSource({
  reactElToString: {
    filterProps: ['wrapper']
  }
})(story)(context);
```
