/* eslint-env jest */
/* eslint-disable global-require */

import React from 'react';
import { shallow } from 'enzyme';
import { PrettierSource, withPrettierSource } from '../prettier-source';

describe('withPrettierSource', () => {
  let wrap;
  let prettierSourceEl;
  let story;
  let context;

  const storyContent = (
    <div className="story-content">
      <span>
        This is a story which will be turned into prettier source code
      </span>
    </div>
  );

  function renderComponent(options) {
    story = jest.fn(() => storyContent);
    context = {
      kind: 'Button',
      name: 'text'
    };
    wrap = shallow(<div>{withPrettierSource(options)(story, context)}</div>);
    prettierSourceEl = wrap.find(PrettierSource);
  }

  beforeEach(() => {
    renderComponent();
  });

  it('wraps story content in PrettierSource component', () => {
    expect(prettierSourceEl.exists()).toBeTruthy();
    expect(prettierSourceEl.prop('children')).toEqual(storyContent);
  });

  it('sets prettier options', () => {
    const prettierOpts = {
      parser: 'graphql',
      plugins: [require('prettier/parser-graphql')]
    };
    renderComponent({
      prettier: prettierOpts
    });
    expect(prettierSourceEl.prop('prettierOpts')).toEqual(prettierOpts);
  });

  it('sets syntax highlighter options', () => {
    const syntaxHighlighterOpts = {
      showLineNumbers: true
    };
    renderComponent({
      syntaxHighlighter: syntaxHighlighterOpts
    });
    expect(prettierSourceEl.prop('syntaxHighlighterOpts')).toEqual(
      syntaxHighlighterOpts
    );
  });

  it('sets react el to string options', () => {
    const reactElToStringOpts = {
      filterProps: ['wrapper']
    };
    renderComponent({
      reactElToString: reactElToStringOpts
    });
    expect(prettierSourceEl.prop('reactElToStringOpts')).toEqual(
      reactElToStringOpts
    );
  });
});
