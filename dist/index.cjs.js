'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var antd = require('antd');
var React = require('react');
var common = require('src/utils/common');
var reactRouter = require('react-router');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var AdminAvatar = function AdminAvatar(_ref) {
  var src = _ref.src,
      shape = _ref.shape,
      size = _ref.size;

  if (!src) {
    return null;
  }

  return /*#__PURE__*/React__default["default"].createElement(antd.Avatar, {
    shape: shape,
    size: size,
    src: "".concat(common.getDomain()).concat(src)
  });
};

var BackBtn = function BackBtn(_ref) {
  var back = _ref.back;
  var history = reactRouter.useHistory();
  return /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    className: "back-btn",
    type: "primary",
    onClick: function onClick() {
      return history.push(back);
    }
  }, "\u8FD4\u56DE");
};

exports.AdminAvatar = AdminAvatar;
exports.BackBtn = BackBtn;
