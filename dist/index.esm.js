import { Avatar, Button } from 'antd';
import React from 'react';
import { getDomain } from 'src/utils/common';
import { useHistory } from 'react-router';

var AdminAvatar = function AdminAvatar(_ref) {
  var src = _ref.src,
      shape = _ref.shape,
      size = _ref.size;

  if (!src) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Avatar, {
    shape: shape,
    size: size,
    src: "".concat(getDomain()).concat(src)
  });
};

var BackBtn = function BackBtn(_ref) {
  var back = _ref.back;
  var history = useHistory();
  return /*#__PURE__*/React.createElement(Button, {
    className: "back-btn",
    type: "primary",
    onClick: function onClick() {
      return history.push(back);
    }
  }, "\u8FD4\u56DE");
};

export { AdminAvatar, BackBtn };
