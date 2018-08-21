import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeDecorator } from '@storybook/addons';
import reactElToString from 'react-element-to-jsx-string';
import prettier from 'prettier/standalone';
import parser from 'prettier/parser-babylon';
import SyntaxHighlighter, {
  registerLanguage
} from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import tomorrow from 'react-syntax-highlighter/styles/prism/tomorrow';
import './prettier-source.css';

registerLanguage('jsx', jsx);

export class PrettierSource extends Component {
  static propTypes = {
    /**
     * Child content
     * This is converted into code and displayed to user as well as
     * being rendered as a normal React child of the component
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
    /** Options to override prettier config */
    prettierOpts: PropTypes.object,
    /** Options to override react-syntax-highlighter config */
    syntaxHighlighterOpts: PropTypes.object,
    /** Options to override react-element-to-jsx-string config */
    reactElToStringOpts: PropTypes.object
  };

  static defaultProps = {
    prettierOpts: {},
    syntaxHighlighterOpts: {},
    reactElToStringOpts: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      prettified: this.prettifyChildren(
        props.children,
        props.prettierOpts,
        props.reactElToStringOpts
      )
    };
  }

  componentWillReceiveProps(newProps) {
    const { children } = this.props;
    const { children: newChildren } = newProps;

    if (children !== newChildren) {
      this.setState({
        prettified: this.prettifyChildren(
          newProps.children,
          newProps.prettierOpts,
          newProps.reactElToStringOpts
        )
      });
    }
  }

  prettifyChildren = (children, prettierOpts, reactElToStringOpts) => {
    // react-element-to-jsx-string puts all object properties on a new line
    // We want prettier to handle that so we need remove all new lines then
    // spaces between tags caused by newline removal
    const stringifiedChildren = reactElToString(children, {
      sortProps: false,
      ...reactElToStringOpts
    })
      .replace(/\n/g, '')
      .replace(/>\s+</g, '><');

    const prettified = prettier.format(stringifiedChildren, {
      parser: 'babylon',
      plugins: [parser],
      ...prettierOpts
    });
    return prettified;
  };

  render() {
    const { children, syntaxHighlighterOpts } = this.props;
    const { prettified } = this.state;

    return (
      <div>
        {children}
        <div className="source">
          <h3>Story Source</h3>
          <SyntaxHighlighter
            language="javascript"
            style={tomorrow}
            className="code"
            {...syntaxHighlighterOpts}
          >
            {prettified}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }
}

function addPrettierSource(story, context, opts) {
  return (
    <PrettierSource
      prettierOpts={opts.prettier}
      syntaxHighlighterOpts={opts.syntaxHighlighter}
      reactElToStringOpts={opts.reactElToString}
    >
      {story(context)}
    </PrettierSource>
  );
}

export const withPrettierSource = makeDecorator({
  name: 'withPrettierSource',
  parameterName: 'prettierSource',
  allowDeprecatedUsage: true,
  wrapper: (story, context, { options, parameters }) => {
    const storyOptions = parameters || options;
    const infoOptions =
      typeof storyOptions === 'string' ? { text: storyOptions } : storyOptions;
    const mergedOptions =
      typeof infoOptions === 'string'
        ? infoOptions
        : { ...options, ...infoOptions };
    return addPrettierSource(story, context, mergedOptions);
  }
});
