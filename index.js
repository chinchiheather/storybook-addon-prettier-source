import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reactElToString from 'react-element-to-string';
import prettier from 'prettier/standalone';
import parser from 'prettier/parser-babylon';
import SyntaxHighlighter, {
  registerLanguage
} from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import dark from 'react-syntax-highlighter/styles/prism/tomorrow';
import './inline-source.css';

registerLanguage('jsx', jsx);

export class PrettierSource extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
    prettierOpts: PropTypes.object,
    syntaxHighlighterOpts: PropTypes.object
  };

  static defaultProps = {
    prettierOpts: {},
    syntaxHighlighterOpts: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      prettified: this.prettifyChildren(props.children, props.prettierOpts)
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.children !== newProps.children) {
      this.setState({
        prettified: this.prettifyChildren(
          newProps.children,
          newProps.prettierOpts
        )
      });
    }
  }

  prettifyChildren = (children, prettierOpts) => {
    const stringifiedChildren = reactElToString(children);
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
            style={dark}
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

export function withPrettierSource(story, context, opts = {}) {
  return (
    <PrettierSource
      prettierOpts={opts.prettier}
      syntaxHighlighterOpts={opts.syntaxHighlighter}
    >
      {story(context)}
    </PrettierSource>
  );
}
