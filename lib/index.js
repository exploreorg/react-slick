'use strict';

exports.__esModule = true;
exports.Pagination = exports.Slider = undefined;

var _pagination = require('./pagination.js');

Object.defineProperty(exports, 'Pagination', {
  enumerable: true,
  get: function get() {
    return _pagination.PaginationDestination;
  }
});

var _slider = require('./slider.js');

var _slider2 = _interopRequireDefault(_slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Slider = _slider2.default;