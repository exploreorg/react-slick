'use strict';

exports.__esModule = true;
exports.PaginationDestination = exports.PaginationSource = exports.reset = undefined;

var _class, _temp, _class2, _temp2;

var _events = require('events');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var destinationPortals = {};
var emitter = new _events.EventEmitter();

var createRoot = function createRoot(reactElement) {
  var destination = document.createElement('div');
  _reactDom2.default.findDOMNode(reactElement).appendChild(destination);
  return destination;
};

var reset = exports.reset = function reset() {
  emitter.removeAllListeners();
  destinationPortals = {};
};

var PaginationSource = exports.PaginationSource = (_temp = _class = function (_React$Component) {
  _inherits(PaginationSource, _React$Component);

  function PaginationSource(props, context) {
    _classCallCheck(this, PaginationSource);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.setDestination = function () {
      var destination = _this.state.destination;

      var destinationPortal = destinationPortals[_this.props.name];
      if (destination && destination.portal === destinationPortal) return;
      _this.setState({ destination: destinationPortal && { portal: destinationPortal, root: createRoot(destinationPortal) } });
    };

    _this.state = { destination: null };
    return _this;
  }

  PaginationSource.prototype.componentWillMount = function componentWillMount() {
    emitter.on('destination', this.setDestination);
    this.componentDidUpdate();
  };

  PaginationSource.prototype.componentDidUpdate = function componentDidUpdate() {
    var _ref = this.state.destination || {},
        root = _ref.root;

    if (root) _reactDom2.default.render(_react2.default.createElement(
      'div',
      null,
      this.props.children
    ), root);
  };

  PaginationSource.prototype.componentWillUnmount = function componentWillUnmount() {
    emitter.removeListener('destination', this.setDestination);

    var _ref2 = this.state.destination || {},
        root = _ref2.root;

    if (root) {
      root.parentNode.removeChild(root);
    }
  };

  PaginationSource.prototype.render = function render() {
    return null;
  };

  return PaginationSource;
}(_react2.default.Component), _class.propTypes = {
  name: _propTypes2.default.string.isRequired
}, _temp);
var PaginationDestination = exports.PaginationDestination = (_temp2 = _class2 = function (_React$Component2) {
  _inherits(PaginationDestination, _React$Component2);

  function PaginationDestination() {
    _classCallCheck(this, PaginationDestination);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  PaginationDestination.prototype.componentDidMount = function componentDidMount() {
    var name = this.props.name;

    if (name in destinationPortals) {
      console.warn('Warning: Multiple destination portals with the same name "' + name + '" detected.');
    }

    destinationPortals[name] = this;
    emitter.emit('destination', this);
  };

  PaginationDestination.prototype.componentWillUnmount = function componentWillUnmount() {
    delete destinationPortals[this.props.name];
    emitter.emit('destination', this);
  };

  PaginationDestination.prototype.render = function render() {
    return _react2.default.createElement('div', null);
  };

  return PaginationDestination;
}(_react2.default.Component), _class2.propTypes = {
  name: _propTypes2.default.string.isRequired
}, _temp2);