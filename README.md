# storybook-addon-prettier-source

[![CircleCI](https://img.shields.io/circleci/project/github/chinchiheather/storybook-addon-prettier-source.svg)](https://circleci.com/gh/chinchiheather/storybook-addon-prettier-source/tree/master)

Storybook addon to show inline story source code formatted using prettier and syntax highlighting

This is an addon for use with [@storybook/react v4.0.0-alpha.x](https://github.com/storybooks/storybook/tree/master/app/react) - to use with @storybook/react v3.x see the latest [v2.x of this addon](https://github.com/chinchiheather/storybook-addon-prettier-source/tree/master)

![screenshot 1](https://chinchiheather.github.io/storybook-addon-prettier-source/img/screenshot-1.png)

## Setup
```bash
# yarn
yarn add --dev storybook-addon-prettier-source

# npm
npm install --save-dev storybook-addon-prettier-source
```

## Usage

All the APIs below can be combined together in various ways to meet your project's needs

### Global Decorator
Apply addon to all your stories by adding a decorator in your `.storybook/config.js` file:

```javascript
import { withPrettierSource } from 'storybook-addon-prettier-source';

addDecorator(withPrettierSource);
```

Apply addon configuration to all stories by passing in the options to the decorator in your `.storybook/config.js` file:

```javascript
import { withPrettierSource } from 'storybook-addon-prettier-source';

addDecorator(withPrettierSource({
  syntaxHighlighter: { showLineNumbers: true },
  reactElToString: { sortProps: true }
}));
```

### Stories
Apply addon to all stories of a component:

```javascript
import { withPrettierSource } from 'storybook-addon-prettier-source';

storiesOf('Button')
  .addDecorator(withPrettierSource)
  .add(...);
```

Apply addon configuration to all stories of a component:

```javascript
storiesOf('Button')
  .addParameters({
    prettierSource: {
      disable: true
    }
  })
  .add(...);
```

### Single Story
Apply addon configuration to a single story:

```javascript
import { withPrettierSource } from 'storybook-addon-prettier-source';

storiesOf('Button', module)
  .add(
    'text',
    () => <Button text="Default" onClick={action('click')} />,
    {
      prettierSource: {
        disable: true
      }
    }
  )
  .add(
    'icon',
    () => <Button icon={PlusIcon} onClick={action('click')} />,
    {
      prettierSource: {
        syntaxHighlighter: { showLineNumbers: true }
      }
    }
  )
```

### Combine With @storybook/addon-info
You can easily combine this with the [@storybook/addon-info](https://github.com/storybooks/storybook/tree/master/addons/info) addon, just disable the source code option in addon-info and exclude the `PrettierSource` component from the prop tables

```javascript
import { withPrettierSource, PrettierSource } from 'storybook-addon-prettier-source';
import { withInfo } from '@storybook/addon-info';

addDecorator(withPrettierSource);

addDecorator(withInfo({
  source: false,
  propTablesExclude: [PrettierSource]
 }));
```

## Configuration

Defaults shown are merged with any options provided

```javascript
{
  /* disable addon for a particular story or stories */
  disable: false,

  /* prettier options */
  prettier: {
    parser: 'babylon',
    plugins: [require('prettier/parser-babylon')]
  },

  /* react-syntax-highlighter options */
  syntaxHighlighter: {
    language: 'javascript',
    style: require('react-syntax-highlighter/styles/prism/tomorrow')
  },

  /* react-element-to-jsx-string options */
  reactElToString: {
    sortProps: false
  }
}
```

### prettier

We are using the [standalone UMD bundle](https://prettier.io/docs/en/browser.html) that runs in the browser, you can customise the options passed to `prettier.format()`

```javascript
addDecorator(withPrettierSource({
  prettier: {
    parser: 'graphql',
    plugins: [require("prettier/parser-graphql")]
  }
}));
```

### syntaxHighlighter

Customise any of the [react-syntax-highlighter](https://github.com/conorhastings/react-syntax-highlighter) options to control how your source code looks

To change the style, provide one of the [prism styles](https://github.com/conorhastings/react-syntax-highlighter/tree/master/src/styles/prism) - you will need to install `react-syntax-highlighter` in your project

```javascript
import dark from 'react-syntax-highlighter/styles/prism/dark'

addDecorator(withPrettierSource({
  syntaxHighlighter: {
    showLineNumbers: true,
    style: dark
  }
}));
```

### reactElToString

Provide options for the [react-element-to-jsx-string](https://github.com/algolia/react-element-to-jsx-string) library to control how your story component is turned into source code (keep in mind that the formatting is handled by prettier, so changing any of the format-related options may not do anything)

```javascript
addDecorator(withPrettierSource({
  reactElToString: {
    filterProps: ['wrapper']
  }
}));
```
