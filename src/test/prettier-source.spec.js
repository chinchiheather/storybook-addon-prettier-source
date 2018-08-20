/* eslint-env jest */
/* eslint-disable global-require */

import React from 'react';
import { shallow } from 'enzyme';
import SyntaxHighlighter from 'react-syntax-highlighter/prism-light';

describe('PrettierSource', () => {
  let PrettierSource;

  let defaultProps;
  let wrap;

  let mockStoryJsx;

  const mockReactElToJsxString = jest.fn(() => mockStoryJsx);
  const mockPrettier = { format: jest.fn(() => mockStoryJsx) };

  beforeEach(() => {
    mockStoryJsx = `<div className="story-content">
  <span>
    This is a story which will be turned into prettier source code
  </span>
</div>`;

    jest.mock('react-element-to-jsx-string', () => mockReactElToJsxString);
    jest.mock('prettier/standalone', () => mockPrettier);
    ({ PrettierSource } = require('../prettier-source'));

    defaultProps = {
      children: (
        <div className="story-content">
          <span>
            This is a story which will be turned into prettier source code
          </span>
        </div>
      ),
      prettierOpts: null,
      syntaxHighlighterOps: null,
      reactElToStringOpts: null
    };

    renderComponent();
  });

  function renderComponent(props = defaultProps) {
    mockReactElToJsxString.mockClear();
    mockPrettier.format.mockClear();

    wrap = shallow(<PrettierSource {...props} />);
  }

  describe('Rendering the component', () => {
    it('renders child story content', () => {
      expect(wrap.find('.story-content').exists()).toBeTruthy();
    });

    it("renders 'Story Source' title", () => {
      expect(wrap.find('h3').text()).toBe('Story Source');
    });

    it('renders source code', () => {
      expect(wrap.find(SyntaxHighlighter).exists()).toBeTruthy();
    });
  });

  describe('Formatting source code', () => {
    describe('Converting story into jsx string', () => {
      it('converts child story content into jsx string', () => {
        const formatted = mockReactElToJsxString.mock.calls[0][0];
        expect(formatted).toEqual(defaultProps.children);
      });

      it('passes through reactElToString options', () => {
        const customOptsProps = {
          ...defaultProps,
          reactElToStringOpts: {
            sortProps: true
          }
        };
        renderComponent(customOptsProps);

        const options = mockReactElToJsxString.mock.calls[0][1];
        expect(options).toEqual(customOptsProps.reactElToStringOpts);
      });

      it('merges reactElToString options with defaults', () => {
        const customOptsProps = {
          ...defaultProps,
          reactElToStringOpts: {
            filterProps: ['wrapper']
          }
        };
        renderComponent(customOptsProps);

        const defaultOptions = { sortProps: false };
        const options = mockReactElToJsxString.mock.calls[0][1];
        expect(options).toEqual({
          ...defaultOptions,
          ...customOptsProps.reactElToStringOpts
        });
      });

      it('removes all new lines and spaces between tags in jsx string', () => {
        mockStoryJsx = `<div className="story-content">

  <span>

    This is a story which will be turned into prettier source code
  </span>


</div>`;
        renderComponent();

        const prettified = mockPrettier.format.mock.calls[0][0];
        expect(prettified).toBe(
          `<div className="story-content"><span>    This is a story which will be turned into prettier source code  </span></div>`
        );
      });
    });

    describe('Formatting with prettier', () => {
      it('formats story jsx using prettier', () => {
        expect(mockPrettier.format).toHaveBeenCalled();
      });

      it('passes through prettierOpts', () => {
        const customOptsProps = {
          ...defaultProps,
          prettierOpts: {
            parser: 'graphql',
            plugins: [() => null]
          }
        };
        renderComponent(customOptsProps);

        const options = mockPrettier.format.mock.calls[0][1];
        expect(options).toEqual(customOptsProps.prettierOpts);
      });

      it('merges prettierOpts with defaults', () => {
        const customOptsProps = {
          ...defaultProps,
          prettierOpts: {
            plugins: [() => null]
          }
        };
        renderComponent(customOptsProps);

        const defaultOptions = {
          parser: 'babylon',
          plugins: [require('prettier/parser-babylon')]
        };
        const options = mockPrettier.format.mock.calls[0][1];
        expect(options).toEqual({
          ...defaultOptions,
          ...customOptsProps.prettierOpts
        });
      });
    });

    describe('Syntax highlighting', () => {
      it('displays formatted code', () => {
        const codeEl = wrap.find(SyntaxHighlighter);
        expect(codeEl.prop('children')).toBe(`<div className="story-content">
  <span>
    This is a story which will be turned into prettier source code
  </span>
</div>`);
      });

      it('passes through syntaxHighlighterOpts', () => {
        const customOptsProps = {
          ...defaultProps,
          syntaxHighlighterOpts: {
            displayLines: true
          }
        };
        renderComponent(customOptsProps);
        const codeEl = wrap.find(SyntaxHighlighter);

        expect(codeEl.prop('displayLines')).toBeTruthy();
      });

      it('merges syntaxHighlighterOpts with defaults', () => {
        const dark = require('react-syntax-highlighter/styles/prism/dark');
        const customOptsProps = {
          ...defaultProps,
          syntaxHighlighterOpts: {
            style: dark
          }
        };
        renderComponent(customOptsProps);
        const codeEl = wrap.find(SyntaxHighlighter);

        expect(codeEl.prop('language')).toBe('javascript');
        expect(codeEl.prop('style')).toEqual(dark);
      });
    });
  });
});
