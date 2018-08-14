'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactElToString = _interopDefault(require('react-element-to-string'));
var prettier = _interopDefault(require('prettier/standalone'));
var parser = _interopDefault(require('prettier/parser-babylon'));
var SyntaxHighlighter = require('react-syntax-highlighter/prism-light');
var SyntaxHighlighter__default = _interopDefault(SyntaxHighlighter);
var jsx = _interopDefault(require('react-syntax-highlighter/languages/prism/jsx'));
var dark = _interopDefault(require('react-syntax-highlighter/styles/prism/tomorrow'));

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".source {\n  padding: 40px;\n}\n\n.source h3 {\n  font-size: 25px;\n  color: #444;\n}\n\n.source .code {\n  font-size: 14px;\n}\n";
styleInject(css);

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

SyntaxHighlighter.registerLanguage('jsx', jsx);

var PrettierSource = function (_Component) {
  inherits(PrettierSource, _Component);

  function PrettierSource(props) {
    classCallCheck(this, PrettierSource);

    var _this = possibleConstructorReturn(this, (PrettierSource.__proto__ || Object.getPrototypeOf(PrettierSource)).call(this, props));

    _this.prettifyChildren = function (children, prettierOpts) {
      var stringifiedChildren = reactElToString(children);
      var prettified = prettier.format(stringifiedChildren, _extends({
        parser: 'babylon',
        plugins: [parser]
      }, prettierOpts));
      return prettified;
    };

    _this.state = {
      prettified: _this.prettifyChildren(props.children, props.prettierOpts)
    };
    return _this;
  }

  createClass(PrettierSource, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var children = this.props.children;
      var newChildren = newProps.children;


      if (children !== newChildren) {
        this.setState({
          prettified: this.prettifyChildren(newProps.children, newProps.prettierOpts)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          syntaxHighlighterOpts = _props.syntaxHighlighterOpts;
      var prettified = this.state.prettified;


      return React__default.createElement(
        'div',
        null,
        children,
        React__default.createElement(
          'div',
          { className: 'source' },
          React__default.createElement(
            'h3',
            null,
            'Story Source'
          ),
          React__default.createElement(
            SyntaxHighlighter__default,
            _extends({
              language: 'javascript',
              style: dark,
              className: 'code'
            }, syntaxHighlighterOpts),
            prettified
          )
        )
      );
    }
  }]);
  return PrettierSource;
}(React.Component);

PrettierSource.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  prettierOpts: PropTypes.object,
  syntaxHighlighterOpts: PropTypes.object
};
PrettierSource.defaultProps = {
  prettierOpts: {},
  syntaxHighlighterOpts: {}
};
function withPrettierSource(story, context) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return React__default.createElement(
    PrettierSource,
    {
      prettierOpts: opts.prettier,
      syntaxHighlighterOpts: opts.syntaxHighlighter
    },
    story(context)
  );
}

exports.withPrettierSource = withPrettierSource;
