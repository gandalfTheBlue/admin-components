function __$styleInject(css) {
    if (!css) return;

    if (typeof window == 'undefined') return;
    var style = document.createElement('style');
    style.setAttribute('media', 'screen');

    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

import { Form, Modal, Input, message, Table, Button, Cascader, DatePicker, Upload, Radio, InputNumber, Select, Drawer, Divider, Dropdown, Menu } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import useActiveRoute from 'src/hooks/useActiveRoute';
import api from 'src/utils/api';
import 'moment';
import { LockOutlined, LoadingOutlined, UploadOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { formLayout, formItemHide } from 'src/utils/const';
import update from 'immutability-helper';
import { DropTarget, DragSource, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useTableFetch$1 from 'src/hooks/useTableFetch';
import usePageForm from 'src/hooks/usePageForm';
import { deepClone } from 'src/utils/common';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { apiBaseImg, apiBaseFile } from 'src/config';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { withRouter } from 'react-router';
import errorPage from 'src/images/error-page.svg';
import { EditableProTable } from '@ant-design/pro-table';
import { PageCustom as PageCustom$1, PageFormDrawer as PageFormDrawer$1 } from '@gandalftheblue/admin-components';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var tableOrder = {
  title: '序号',
  key: 'index',
  render: function render(text, record, index) {
    return "".concat(index + 1);
  }
};

__$styleInject(".change-password .ant-modal-body {\n  padding: 24px 60px;\n}\n.change-password .ant-modal-body .ant-form-item {\n  margin-bottom: 10px;\n}\n.change-password .ant-modal-body .ant-form-item-label {\n  margin-right: 20px;\n}\n");

var ChangePassword = function ChangePassword(_ref) {
  var setVisible = _ref.setVisible,
      user = _ref.user;

  var _useActiveRoute = useActiveRoute(),
      apiPath = _useActiveRoute.apiPath;

  var _Form$useForm = Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var handleOk = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$form$validateF, password;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return form.validateFields(['password']);

            case 2:
              _yield$form$validateF = _context.sent;
              password = _yield$form$validateF.password;
              _context.next = 6;
              return api.post("".concat(apiPath, "/changePsw?id=").concat(user.id, "&psw=").concat(password));

            case 6:
              message.success('密码修改成功。');
              setVisible(false);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleOk() {
      return _ref2.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/React.createElement(Modal, {
    wrapClassName: "change-password",
    visible: true,
    onOk: handleOk,
    onCancel: function onCancel() {
      return setVisible(false);
    },
    cancelText: "\u53D6\u6D88",
    okText: "\u786E\u5B9A"
  }, /*#__PURE__*/React.createElement(Form, _extends({}, formLayout, {
    className: "change-password-form",
    form: form
  }), /*#__PURE__*/React.createElement(Form.Item, {
    label: "\u7528\u6237\u540D\u79F0"
  }, /*#__PURE__*/React.createElement("span", null, user.username)), /*#__PURE__*/React.createElement(Form.Item, {
    name: "password",
    label: "\u65B0\u5BC6\u7801",
    rules: [{
      required: true,
      min: 6
    }],
    hasFeedback: true
  }, /*#__PURE__*/React.createElement(Input.Password, {
    prefix: /*#__PURE__*/React.createElement(LockOutlined, null),
    placeholder: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801"
  }))));
};

__$styleInject("tr.drop-over-downward td {\n  border-bottom: 2px dashed #1890ff;\n}\ntr.drop-over-upward td {\n  border-top: 2px dashed #1890ff;\n}\n");

var _excluded$4 = ["isOver", "connectDragSource", "connectDropTarget", "moveRow"];
var dragingIndex = -1;

var BodyRow = function BodyRow(props) {
  var isOver = props.isOver,
      connectDragSource = props.connectDragSource,
      connectDropTarget = props.connectDropTarget;
      props.moveRow;
      var restProps = _objectWithoutProperties(props, _excluded$4);

  var style = _objectSpread2(_objectSpread2({}, restProps.style), {}, {
    cursor: 'move'
  });

  var className = restProps.className;

  if (isOver) {
    if (restProps.index > dragingIndex) {
      className += ' drop-over-downward';
    }

    if (restProps.index < dragingIndex) {
      className += ' drop-over-upward';
    }
  }

  return connectDragSource(connectDropTarget( /*#__PURE__*/React.createElement("tr", _extends({}, restProps, {
    className: className,
    style: style
  }))));
};

var rowSource = {
  beginDrag: function beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index
    };
  }
};
var rowTarget = {
  drop: function drop(props, monitor) {
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.index; // Don't replace items with themselves

    if (dragIndex === hoverIndex) {
      return;
    } // Time to actually perform the action


    props.moveRow(dragIndex, hoverIndex); // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.

    monitor.getItem().index = hoverIndex;
  }
};
var DragableBodyRow = DropTarget('row', rowTarget, function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
})(DragSource('row', rowSource, function (connect) {
  return {
    connectDragSource: connect.dragSource()
  };
})(BodyRow));
var dragBodyRowComponents = {
  body: {
    row: DragableBodyRow
  }
};

var _excluded$3 = ["pagination", "fetchTable", "showPagination", "showRowSelection", "rowSelection", "defaultPageSize", "pageSizeOptions", "refreshInterval", "dataSource"];

var CustomTable = function CustomTable(_ref) {
  var pagination = _ref.pagination,
      fetchTable = _ref.fetchTable,
      _ref$showPagination = _ref.showPagination,
      showPagination = _ref$showPagination === void 0 ? true : _ref$showPagination,
      _ref$showRowSelection = _ref.showRowSelection,
      showRowSelection = _ref$showRowSelection === void 0 ? false : _ref$showRowSelection,
      rowSelection = _ref.rowSelection,
      defaultPageSize = _ref.defaultPageSize,
      pageSizeOptions = _ref.pageSizeOptions,
      refreshInterval = _ref.refreshInterval,
      originDataSourced = _ref.dataSource,
      tableProps = _objectWithoutProperties(_ref, _excluded$3);

  var _useActiveRoute = useActiveRoute(),
      isSort = _useActiveRoute.isSort,
      apiPath = _useActiveRoute.apiPath;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      dataSource = _useState2[0],
      setDataSource = _useState2[1];

  useEffect(function () {
    setDataSource(originDataSourced);
  }, [originDataSourced]);
  var reorder = useCallback(function (dataSource) {
    var reorderItems = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(items) {
        var payload;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                payload = items.map(function (item, index) {
                  return {
                    id: item.id,
                    sortOrder: index + 1
                  };
                });
                _context.next = 3;
                return api.post("".concat(apiPath, "/changeSortOrder"), payload);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function reorderItems(_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    reorderItems(dataSource);
  }, [apiPath]);
  var moveRow = useCallback(function (dragIndex, hoverIndex) {
    var dragRow = dataSource[dragIndex];
    var newDataSource = update(dataSource, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
    });
    setDataSource(newDataSource);
    reorder(newDataSource);
  }, [dataSource, reorder]);
  rowSelection = showRowSelection ? rowSelection : null;
  var finalPagination;

  if (pagination) {
    finalPagination = _objectSpread2(_objectSpread2({}, pagination), {}, {
      showTotal: function showTotal(totalNum) {
        return _showTotal(totalNum, rowSelection);
      }
    });

    if (pageSizeOptions) {
      finalPagination.pageSizeOptions = pageSizeOptions;
    }
  }

  React.useEffect(function () {
    if (defaultPageSize) {
      fetchTable({
        __updateDefaultPageSize__: defaultPageSize
      });
    }
  }, [defaultPageSize, fetchTable]);
  React.useEffect(function () {
    if (!showPagination) {
      fetchTable({
        __updateHasPagination__: false
      });
    }
  }, [showPagination, fetchTable]);
  React.useEffect(function () {
    if (refreshInterval) {
      fetchTable({
        __updateRefreshInterval__: refreshInterval
      });
    }
  }, [refreshInterval, fetchTable]);

  if (isSort) {
    return /*#__PURE__*/React.createElement(DndProvider, {
      backend: HTML5Backend
    }, /*#__PURE__*/React.createElement(Table, _extends({}, tableProps, {
      dataSource: dataSource,
      loading: false,
      bordered: true,
      rowSelection: rowSelection,
      pagination: pagination && finalPagination,
      onChange: function onChange(paginator, filters) {
        return fetchTable({
          __tableChange__: {
            paginator: paginator,
            filters: filters
          }
        });
      },
      components: dragBodyRowComponents,
      onRow: function onRow(_, index) {
        return {
          index: index,
          moveRow: moveRow
        };
      }
    })));
  }

  return /*#__PURE__*/React.createElement(Table, _extends({}, tableProps, {
    dataSource: dataSource,
    loading: false,
    bordered: true,
    rowSelection: rowSelection,
    pagination: pagination && finalPagination,
    onChange: function onChange(paginator, filters) {
      return fetchTable({
        __tableChange__: {
          paginator: paginator,
          filters: filters
        }
      });
    }
  }));
};

CustomTable.useTableFetch = useTableFetch$1;

var _showTotal = function _showTotal(total, rowSelection) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ant-pagation-total"
  }, rowSelection ? /*#__PURE__*/React.createElement("div", {
    className: "ant-pagation-total-selected"
  }, "\u5DF2\u9009\u62E9", /*#__PURE__*/React.createElement("span", null, " ".concat(rowSelection.selectedRowKeys && rowSelection.selectedRowKeys.length || 0, "/").concat(total, " ")), "\u9879 ", /*#__PURE__*/React.createElement("a", {
    onClick: function onClick() {
      return rowSelection.onChange([], []);
    }
  }, "\u6E05\u7A7A")) : null, /*#__PURE__*/React.createElement("div", null, "\u5171".concat(total, "\u6761")));
};

__$styleInject(".list-header {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n.list-header-right input {\n  margin-right: 15px;\n}\n");

var ListHeader = function ListHeader(_ref) {
  var _defaultSearch$keywor;

  var fetchTable = _ref.fetchTable,
      defaultSearch = _ref.search,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? '请输入查询条件' : _ref$placeholder,
      showAdd = _ref.showAdd,
      addCallback = _ref.addCallback,
      deleteCallback = _ref.deleteCallback;

  var _useState = useState((_defaultSearch$keywor = defaultSearch === null || defaultSearch === void 0 ? void 0 : defaultSearch.keyword) !== null && _defaultSearch$keywor !== void 0 ? _defaultSearch$keywor : ''),
      _useState2 = _slicedToArray(_useState, 2),
      search = _useState2[0],
      setSearch = _useState2[1];

  var handleSearch = function handleSearch() {
    fetchTable({
      keyword: search
    });
  };

  var clearSearch = function clearSearch() {
    setSearch('');
    fetchTable({
      keyword: ''
    });
  };

  var handleAdd = function handleAdd() {
    addCallback && addCallback();
  };

  var handleDelete = function handleDelete() {
    deleteCallback && deleteCallback();
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "list-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: handleAdd,
    style: {
      visibility: showAdd ? 'visible' : 'hidden'
    }
  }, "\u65B0\u589E"), /*#__PURE__*/React.createElement(Button, {
    onClick: handleDelete,
    style: {
      visibility: deleteCallback ? 'visible' : 'hidden',
      marginLeft: 10
    }
  }, "\u6279\u91CF\u5220\u9664")), /*#__PURE__*/React.createElement("div", {
    className: "list-header-right"
  }, /*#__PURE__*/React.createElement(Input, {
    value: search,
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    },
    onPressEnter: handleSearch,
    placeholder: placeholder,
    style: {
      width: 220
    }
  }), /*#__PURE__*/React.createElement(Button, {
    className: "mr-10",
    onClick: handleSearch
  }, "\u641C\u7D22"), /*#__PURE__*/React.createElement(Button, {
    onClick: clearSearch
  }, "\u6E05\u7A7A")));
};

var FormCascader = function FormCascader(_ref) {
  var label = _ref.label,
      name = _ref.name,
      required = _ref.required,
      initialValue = _ref.initialValue,
      options = _ref.options;
  var message = "\u8BF7\u9009\u62E9".concat(label);
  return /*#__PURE__*/React.createElement(Form.Item, {
    rules: [{
      required: required !== null && required !== void 0 ? required : true,
      message: message
    }],
    label: label,
    name: name,
    initialValue: initialValue
  }, /*#__PURE__*/React.createElement(Cascader, {
    options: options,
    placeholder: message
  }));
};

var FormDate = function FormDate(_ref) {
  var label = _ref.label,
      name = _ref.name,
      disabledDate = _ref.disabledDate;
  return /*#__PURE__*/React.createElement(Form.Item, {
    label: label,
    name: name,
    rules: [{
      required: true
    }]
  }, /*#__PURE__*/React.createElement(DatePicker, {
    disabledDate: disabledDate
  }));
};

__$styleInject(".form-editor {\n  display: flex;\n  margin: 0 50px 20px 50px;\n}\n.form-editor > span {\n  min-width: 60px;\n}\n.form-editor .bf-container {\n  border: 1px solid #d9d9d9;\n}\n.form-editor .ant-row {\n  width: 0;\n}\n");

var FormEditor = function FormEditor(_ref) {
  var form = _ref.form,
      label = _ref.label,
      name = _ref.name,
      initialValue = _ref.initialValue,
      _ref$maxSize = _ref.maxSize,
      maxSize = _ref$maxSize === void 0 ? 100 : _ref$maxSize;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isUploading = _useState2[0],
      setIsUploading = _useState2[1];

  var _useState3 = useState(BraftEditor.createEditorState(initialValue)),
      _useState4 = _slicedToArray(_useState3, 2),
      editorState = _useState4[0],
      setEditorState = _useState4[1];

  var handleEditorChange = function handleEditorChange(editorState) {
    setEditorState(editorState);
    form.setFieldsValue(_defineProperty({}, name, editorState.toHTML()));
  };

  var uploadHandler = function uploadHandler(_ref2) {
    var file = _ref2.file;
    setIsUploading(file.status === 'uploading');

    if (file.status === 'done') {
      var type = '';

      if (file.type.startsWith('image')) {
        type = 'IMAGE';
      }

      if (file.type.startsWith('video')) {
        type = 'VIDEO';
      }

      if (file.type.startsWith('audio')) {
        type = 'AUDIO';
      }

      setEditorState(ContentUtils.insertMedias(editorState, [{
        type: type,
        url: file.response.data.url
      }]));
    }
  };

  function _beforeUpload(file) {
    if (file.size > maxSize * 1024 * 1024) {
      message.error("\u5A92\u4F53\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7".concat(maxSize, "M"));
      return Promise.reject();
    }

    return true;
  }

  var extendControls = [{
    key: 'antd-uploader',
    type: 'component',
    component: /*#__PURE__*/React.createElement(Upload, {
      accept: "image/png,image/jpg,image/gif,image/jpeg, audio/*, video/*",
      showUploadList: false,
      action: apiBaseImg,
      onChange: uploadHandler,
      disabled: isUploading,
      beforeUpload: function beforeUpload(file) {
        return _beforeUpload(file);
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "control-item button upload-button"
    }, !isUploading && /*#__PURE__*/React.createElement("span", null, "\u63D2\u5165\u56FE\u7247/\u97F3\u89C6\u9891"), isUploading && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(LoadingOutlined, null), "\u6587\u4EF6\u4E0A\u4F20\u4E2D")))
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "form-editor"
  }, /*#__PURE__*/React.createElement("span", null, label, ": "), /*#__PURE__*/React.createElement(BraftEditor, {
    value: editorState,
    onChange: handleEditorChange,
    extendControls: extendControls,
    excludeControls: ['media']
  }), /*#__PURE__*/React.createElement(Form.Item, {
    label: label,
    name: name,
    style: {
      visibility: 'hidden',
      width: 0
    }
  }));
};

var FormEnableRadio = function FormEnableRadio(_ref) {
  var label = _ref.label,
      name = _ref.name,
      _ref$initialValue = _ref.initialValue,
      initialValue = _ref$initialValue === void 0 ? true : _ref$initialValue;
  return /*#__PURE__*/React.createElement(Form.Item, {
    initialValue: initialValue,
    rules: [{
      required: true
    }],
    label: label !== null && label !== void 0 ? label : '启用',
    name: name !== null && name !== void 0 ? name : 'isEnable'
  }, /*#__PURE__*/React.createElement(Radio.Group, null, /*#__PURE__*/React.createElement(Radio, {
    value: true
  }, "\u662F"), /*#__PURE__*/React.createElement(Radio, {
    value: false
  }, "\u5426")));
};

var FileUpload = function FileUpload(_ref) {
  var callback = _ref.callback,
      accept = _ref.accept,
      fileUrl = _ref.fileUrl,
      onRemove = _ref.onRemove;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      fileList = _useState2[0],
      setFileList = _useState2[1];

  useEffect(function () {
    if (fileUrl) {
      setFileList([{
        url: fileUrl,
        name: fileUrl,
        status: 'done'
      }]);
    }
  }, [fileUrl]);
  var props = {
    accept: accept,
    name: 'file',
    maxCount: 1,
    action: apiBaseFile,
    onRemove: onRemove,
    onChange: function onChange(info) {
      setFileList(info.fileList);

      if (info.file.status === 'done') {
        callback(info.file.response.data.url);
      }
    }
  };
  return /*#__PURE__*/React.createElement(Upload, _extends({}, props, {
    fileList: fileList
  }), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(UploadOutlined, null)
  }, "\u70B9\u51FB\u4E0A\u4F20"));
};

var FormFile = function FormFile(_ref) {
  var form = _ref.form,
      label = _ref.label,
      name = _ref.name,
      message = _ref.message,
      fileUrl = _ref.fileUrl,
      _ref$required = _ref.required,
      required = _ref$required === void 0 ? true : _ref$required,
      _ref$accept = _ref.accept,
      accept = _ref$accept === void 0 ? '*' : _ref$accept;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      url = _useState2[0],
      setUrl = _useState2[1];

  useEffect(function () {
    setUrl(fileUrl);
  }, [fileUrl]);

  var handleFileChange = function handleFileChange(fileUrl) {
    form.setFieldsValue(_defineProperty({}, name, fileUrl));
  };

  var handleOnRemove = function handleOnRemove() {
    form.setFieldsValue(_defineProperty({}, name, null));
  };

  return /*#__PURE__*/React.createElement(Form.Item, {
    rules: [{
      required: required,
      message: message
    }],
    label: label,
    name: name,
    shouldUpdate: function shouldUpdate() {
      setUrl(form.getFieldValue(name));
    }
  }, /*#__PURE__*/React.createElement(FileUpload, {
    onRemove: handleOnRemove,
    callback: handleFileChange,
    fileUrl: url,
    accept: accept
  }));
};

function getBase64(img, callback) {
  var reader = new FileReader();
  reader.addEventListener('load', function () {
    return callback(reader.result);
  });
  reader.readAsDataURL(img);
}

function _beforeUpload(file, callback) {
  var isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    callback({
      valid: false,
      message: '请上传JPG或PNG格式的照片'
    });
    return false;
  }

  return true;
}

var ImageUpload = /*#__PURE__*/function (_React$Component) {
  _inherits(ImageUpload, _React$Component);

  var _super = _createSuper(ImageUpload);

  function ImageUpload() {
    var _this;

    _classCallCheck(this, ImageUpload);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      loading: false,
      imageUrl: _this.props.imageUrl
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (info) {
      if (info.file.status === 'uploading') {
        _this.setState({
          loading: true
        });

        return;
      }

      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, function (imageUrl) {
          _this.props.callback(info.file.response.data.url);

          _this.setState({
            imageUrl: imageUrl,
            loading: false
          });
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getUpload", function (imageUrl, uploadButton) {
      return /*#__PURE__*/React.createElement(Upload, {
        disabled: _this.props.disabled,
        name: "file",
        listType: "picture-card",
        className: "avatar-uploader",
        showUploadList: false,
        action: apiBaseImg,
        beforeUpload: function beforeUpload(file) {
          return _beforeUpload(file, _this.props.callback);
        },
        onChange: _this.handleChange
      }, imageUrl ? /*#__PURE__*/React.createElement("img", {
        src: imageUrl,
        alt: "\u56FE\u7247",
        style: {
          width: '100%'
        }
      }) : uploadButton);
    });

    return _this;
  }

  _createClass(ImageUpload, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState(_objectSpread2(_objectSpread2({}, this.state), {}, {
        imageUrl: nextProps.imageUrl
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var uploadButton = /*#__PURE__*/React.createElement("div", null, this.state.loading ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : /*#__PURE__*/React.createElement(PlusOutlined, null), /*#__PURE__*/React.createElement("div", {
        className: "ant-upload-text"
      }, "\u7167\u7247"));
      var imageUrl = this.state.imageUrl;
      return this.getUpload(imageUrl, uploadButton);
    }
  }]);

  return ImageUpload;
}(React.Component);

var FormImage = function FormImage(_ref) {
  var form = _ref.form,
      label = _ref.label,
      name = _ref.name,
      message = _ref.message,
      imageUrl = _ref.imageUrl,
      _ref$required = _ref.required,
      required = _ref$required === void 0 ? true : _ref$required;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      url = _useState2[0],
      setUrl = _useState2[1];

  useEffect(function () {
    setUrl(imageUrl);
  }, [imageUrl]);

  var handleLogoChange = function handleLogoChange(imageUrl) {
    form.setFieldsValue(_defineProperty({}, name, imageUrl));
  };

  return /*#__PURE__*/React.createElement(Form.Item, {
    rules: [{
      required: required,
      message: message
    }],
    label: label,
    name: name,
    shouldUpdate: function shouldUpdate() {
      setUrl(form.getFieldValue(name));
    }
  }, /*#__PURE__*/React.createElement(ImageUpload, {
    callback: handleLogoChange,
    imageUrl: url
  }));
};

var _excluded$2 = ["label", "name", "required", "type", "disabled", "rules", "hide"];
var TextArea = Input.TextArea;

var FormInput = function FormInput(_ref) {
  var label = _ref.label,
      name = _ref.name,
      required = _ref.required,
      type = _ref.type,
      disabled = _ref.disabled,
      rules = _ref.rules,
      hide = _ref.hide,
      rest = _objectWithoutProperties(_ref, _excluded$2);

  var isDisabled = disabled === true;
  var finalRules = [{
    required: required !== null && required !== void 0 ? required : true
  }];

  if (rules) {
    finalRules = rules;
  }

  if (type === 'email') {
    finalRules[0].type = type;
  }

  return /*#__PURE__*/React.createElement(Form.Item, {
    rules: finalRules,
    label: label,
    name: name,
    style: hide ? formItemHide : {}
  }, type === 'textarea' ? /*#__PURE__*/React.createElement(TextArea, _extends({
    rows: 2,
    disabled: isDisabled
  }, rest)) : /*#__PURE__*/React.createElement(Input, _extends({
    disabled: isDisabled,
    type: type
  }, rest)));
};

__$styleInject(".form-input-number {\n  width: 100%;\n}\n");

var _excluded$1 = ["label", "name", "required", "type", "suffix", "rules"];

var FormInputNum = function FormInputNum(_ref) {
  var label = _ref.label,
      name = _ref.name,
      required = _ref.required,
      type = _ref.type,
      suffix = _ref.suffix,
      _ref$rules = _ref.rules,
      rules = _ref$rules === void 0 ? [] : _ref$rules,
      rest = _objectWithoutProperties(_ref, _excluded$1);

  var parsers = {
    integer: function integer(value) {
      return value.replace(/[^\d.]/g, '');
    }
  };
  var defaultRules = [{
    required: required !== null && required !== void 0 ? required : true
  }];
  var finalRules = defaultRules.concat(rules);
  return /*#__PURE__*/React.createElement(Form.Item, {
    label: label,
    name: name,
    rules: finalRules
  }, /*#__PURE__*/React.createElement(InputNumber, _extends({
    className: "form-input-number",
    formatter: function formatter(value) {
      return "".concat(value, " ").concat(suffix !== null && suffix !== void 0 ? suffix : '');
    },
    parser: parsers[type]
  }, rest)));
};

var FormPublishRadio = function FormPublishRadio(_ref) {
  var label = _ref.label,
      name = _ref.name,
      _ref$initialValue = _ref.initialValue,
      initialValue = _ref$initialValue === void 0 ? true : _ref$initialValue;
  return /*#__PURE__*/React.createElement(Form.Item, {
    initialValue: initialValue,
    rules: [{
      required: true
    }],
    label: label !== null && label !== void 0 ? label : '发布',
    name: name !== null && name !== void 0 ? name : 'isEnable'
  }, /*#__PURE__*/React.createElement(Radio.Group, null, /*#__PURE__*/React.createElement(Radio, {
    value: true
  }, "\u662F"), /*#__PURE__*/React.createElement(Radio, {
    value: false
  }, "\u5426")));
};

var FormRadio = function FormRadio(_ref) {
  var label = _ref.label,
      name = _ref.name,
      options = _ref.options;
  return /*#__PURE__*/React.createElement(Form.Item, {
    rules: [{
      required: true
    }],
    label: label,
    name: name
  }, /*#__PURE__*/React.createElement(Radio.Group, null, options.map(function (option) {
    return /*#__PURE__*/React.createElement(Radio, {
      key: option.value,
      value: option.value
    }, option.title);
  })));
};

var Option = Select.Option;

var FormSelect = function FormSelect(_ref) {
  var _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options,
      label = _ref.label,
      name = _ref.name,
      message = _ref.message,
      required = _ref.required,
      initialValue = _ref.initialValue,
      _ref$valueKey = _ref.valueKey,
      valueKey = _ref$valueKey === void 0 ? 'id' : _ref$valueKey,
      _ref$titleKey = _ref.titleKey,
      titleKey = _ref$titleKey === void 0 ? 'name' : _ref$titleKey,
      _ref$mode = _ref.mode,
      originMode = _ref$mode === void 0 ? null : _ref$mode;

  if (!message) {
    if (originMode === 'tagInput') {
      message = "\u8BF7\u8F93\u5165".concat(label, "\u6807\u7B7E");
    }

    if (originMode === 'tagSelect') {
      message = "\u8BF7\u9009\u62E9".concat(label);
    }
  }

  var mode = originMode;

  if (['tagInput', 'tagSelect'].includes(originMode)) {
    mode = 'tags';
  }

  return /*#__PURE__*/React.createElement(Form.Item, {
    rules: [{
      required: required !== null && required !== void 0 ? required : true,
      message: message
    }],
    label: label,
    name: name,
    initialValue: initialValue
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: message,
    mode: mode
  }, options.map(function (item) {
    var value = item[valueKey];
    var finalValue = mode === 'tags' ? String(value) : value;
    return /*#__PURE__*/React.createElement(Option, {
      key: value,
      value: finalValue
    }, item[titleKey]);
  })));
};

var _excluded = ["comp", "disabled", "hide"];
var confirm$2 = Modal.confirm;

var PageFormDrawer = function PageFormDrawer(_ref) {
  var _ref$formItems = _ref.formItems,
      formItems = _ref$formItems === void 0 ? [] : _ref$formItems,
      defaultValues = _ref.defaultValues,
      onClose = _ref.onClose,
      callback = _ref.callback,
      drawerWidth = _ref.drawerWidth,
      initValues = _ref.initValues,
      beforeFinish = _ref.beforeFinish;
  var entity = deepClone(defaultValues);

  var _useActiveRoute = useActiveRoute(),
      path = _useActiveRoute.path,
      title = _useActiveRoute.title,
      _useActiveRoute$apiPa = _useActiveRoute.apiPath,
      apiPath = _useActiveRoute$apiPa === void 0 ? path : _useActiveRoute$apiPa;

  var _Form$useForm = Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var _usePageForm = usePageForm(entity),
      _usePageForm2 = _slicedToArray(_usePageForm, 3),
      entityId = _usePageForm2[0],
      isEdit = _usePageForm2[1],
      status = _usePageForm2[2];

  var columns = formItems.filter(function (column) {
    return column.form;
  }).filter(function (column) {
    return !(isEdit && column.form.hide === 'isEdit');
  }).map(function (column) {
    return _objectSpread2({
      label: column.title,
      name: column.dataIndex
    }, column.form);
  });
  var tagItems = formItems.filter(function (item) {
    var _item$form, _item$form$mode;

    return (_item$form = item.form) === null || _item$form === void 0 ? void 0 : (_item$form$mode = _item$form.mode) === null || _item$form$mode === void 0 ? void 0 : _item$form$mode.startsWith('tag');
  }).map(function (item) {
    var separators = {
      tagInput: '@_@',
      tagSelect: ','
    };
    item.separator = separators["".concat(item.form.mode)];
    return item;
  });
  var resetFields = useCallback(function () {
    var fields = form.getFieldsValue();
    form.setFields(Object.keys(fields).map(function (name) {
      return {
        name: name,
        value: fields[name],
        touched: false
      };
    }));
  }, [form]);
  useEffect(function () {
    if (entity) {
      initValues && initValues(form, entity);
      tagItems.forEach(function (item) {
        var itemName = item.dataIndex,
            separator = item.separator;
        var itemValue = entity[itemName];
        entity[itemName] = itemValue ? String(itemValue).split(separator) : [];
      });
      form.setFieldsValue(entity);
      resetFields();
    }
  }, [entity, form, initValues, resetFields, tagItems]);

  var handleClose = function handleClose() {
    resetFields();
    onClose();
  };

  var onFinish = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(values) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              beforeFinish && beforeFinish(values);

              if (!!entityId) {
                values.id = entityId;
              }

              tagItems.forEach(function (item) {
                var _values$itemName;

                var itemName = item.dataIndex,
                    separator = item.separator;
                values[itemName] = (_values$itemName = values[itemName]) === null || _values$itemName === void 0 ? void 0 : _values$itemName.join(separator);
              });
              _context.next = 5;
              return api.post(getFormPath(apiPath), values);

            case 5:
              message.success("".concat(status).concat(title, "\u6210\u529F"));
              handleClose();
              callback && callback();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onFinish(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var confirmClose = function confirmClose() {
    var fields = columns.map(function (column) {
      return column.name;
    });
    var touched = form.isFieldsTouched(fields);

    if (!touched) {
      handleClose();
      return;
    }

    confirm$2({
      title: "\u6709\u672A\u4FDD\u5B58\u7684\u5185\u5BB9\uFF0C\u8BF7\u95EE\u786E\u8BA4\u79BB\u5F00\u5417",
      okText: '确定',
      cancelText: '取消',
      onOk: function onOk() {
        handleClose();
      },
      onCancel: function onCancel() {}
    });
  };

  return /*#__PURE__*/React.createElement(Drawer, {
    title: "".concat(status).concat(title),
    placement: "right",
    closable: true,
    onClose: confirmClose,
    visible: true,
    key: "right",
    width: drawerWidth
  }, /*#__PURE__*/React.createElement(Form, _extends({}, formLayout, {
    form: form,
    onFinish: onFinish
  }), columns.map(function (item, index) {
    var comp = item.comp,
        disabled = item.disabled,
        hide = item.hide,
        rest = _objectWithoutProperties(item, _excluded);

    rest.key = index;
    rest.form = form;
    rest.disabled = disabled;

    if (disabled === 'isEdit') {
      rest.disabled = isEdit;
    }

    if (comp === 'FormImage') {
      rest.imageUrl = entity ? entity[item.name] : '';
    }

    if (comp === 'FormEditor') {
      rest.initialValue = entity ? entity[item.name] : '';
    }

    if (hide === true || hide === 'isEdit' && isEdit) {
      rest.hide = true;
    }

    return /*#__PURE__*/React.createElement(compMap[comp], rest);
  }), /*#__PURE__*/React.createElement(Form.Item, tailLayout, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    htmlType: "submit",
    style: {
      marginRight: 20
    }
  }, "\u786E\u5B9A"), /*#__PURE__*/React.createElement(Button, {
    onClick: confirmClose
  }, "\u53D6\u6D88"))));
};
var compMap = {
  FormInput: FormInput,
  FormInputNum: FormInputNum,
  FormEnableRadio: FormEnableRadio,
  FormImage: FormImage,
  FormSelect: FormSelect,
  FormDate: FormDate,
  FormRadio: FormRadio,
  FormCascader: FormCascader,
  FormEditor: FormEditor,
  FormPublishRadio: FormPublishRadio,
  FormFile: FormFile
};

var getFormPath = function getFormPath(apiPath, customApiPath) {
  return customApiPath !== null && customApiPath !== void 0 ? customApiPath : "".concat(apiPath, "/edit");
};

var tailLayout = {
  wrapperCol: {
    offset: 3,
    span: 16
  }
};

var confirm$1 = Modal.confirm;
var useTableFetch = CustomTable.useTableFetch;

var PageList = function PageList(_ref) {
  var columns = _ref.columns,
      path = _ref.path,
      customForm = _ref.customForm,
      addCallback = _ref.addCallback,
      showRowSelection = _ref.showRowSelection,
      _ref$drawerWidth = _ref.drawerWidth,
      drawerWidth = _ref$drawerWidth === void 0 ? 600 : _ref$drawerWidth,
      initValues = _ref.initValues,
      beforeFinish = _ref.beforeFinish;

  var _useActiveRoute = useActiveRoute(),
      title = _useActiveRoute.title,
      _useActiveRoute$title = _useActiveRoute.titleProp,
      titleProp = _useActiveRoute$title === void 0 ? 'name' : _useActiveRoute$title,
      apiPath = _useActiveRoute.apiPath,
      isPublish = _useActiveRoute.isPublish,
      isInIndex = _useActiveRoute.isInIndex,
      isEnable = _useActiveRoute.isEnable,
      isPassword = _useActiveRoute.isPassword,
      isHeaderItem = _useActiveRoute.isHeaderItem,
      isCopy = _useActiveRoute.isCopy,
      actionWidth = _useActiveRoute.actionWidth;

  var fetchPath = path !== null && path !== void 0 ? path : "".concat(apiPath, "/page");
  var tableList = useTableFetch(fetchPath);
  var listColumns = columns.filter(function (column) {
    return !column.hideInList;
  });

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      selectedEntity = _useState2[0],
      setSelectedEntity = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedEntityPwd = _useState4[0],
      setSelectedEntityPwd = _useState4[1];

  var confirmUpdate = function confirmUpdate(_ref2) {
    var status = _ref2.status,
        title = _ref2.title,
        titleValue = _ref2.titleValue,
        path = _ref2.path,
        callback = _ref2.callback;
    confirm$1({
      title: "\u8BF7\u95EE\u60A8\u786E\u8BA4\u8981".concat(status, "\u8BE5").concat(title, "\u5417?"),
      content: "".concat(title, "\u540D: ").concat(titleValue),
      okText: '确定',
      cancelText: '取消',
      onOk: function () {
        var _onOk = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return api.post(path);

                case 2:
                  message.success("".concat(title).concat(status, "\u6210\u529F"));
                  callback && callback();

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function onOk() {
          return _onOk.apply(this, arguments);
        }

        return onOk;
      }(),
      onCancel: function onCancel() {
        console.log('Cancel');
      }
    });
  };

  var deleteEntity = function deleteEntity(entity) {
    var payload = {
      status: '删除',
      title: title,
      titleValue: entity[titleProp],
      path: "".concat(apiPath, "/del?id=").concat(entity.id),
      callback: function callback() {
        tableList.fetchTable();
      }
    };
    confirmUpdate(payload);
  };

  var publishEntity = function publishEntity(entity) {
    var status = entity.isPublish ? '取消发布' : '发布';
    var payload = {
      status: status,
      title: title,
      titleValue: entity[titleProp],
      path: "".concat(apiPath, "/publish?id=").concat(entity.id, "&isPublish=").concat(!entity.isPublish),
      callback: function callback() {
        tableList.fetchTable();
      }
    };
    confirmUpdate(payload);
  };

  var indexEntity = function indexEntity(entity) {
    var status = entity.isInIndex ? '取消首页显示' : '设为首页显示';
    var payload = {
      status: status,
      title: title,
      titleValue: entity[titleProp],
      path: "".concat(apiPath, "/showInIndex?id=").concat(entity.id, "&show=").concat(!entity.isInIndex),
      callback: function callback() {
        tableList.fetchTable();
      }
    };
    confirmUpdate(payload);
  };

  var enableEntity = function enableEntity(entity) {
    var status = entity.isEnable ? '禁用' : '启用';
    var payload = {
      status: status,
      title: title,
      titleValue: entity[titleProp],
      path: "".concat(apiPath, "/enable?id=").concat(entity.id, "&isEnable=").concat(!entity.isEnable),
      callback: function callback() {
        tableList.fetchTable();
      }
    };
    confirmUpdate(payload);
  };

  var handleEdit = function handleEdit(record) {
    if (customForm) {
      customForm(record);
    } else {
      setSelectedEntity(record);
    }
  };

  var handleAdd = function handleAdd() {
    if (addCallback) {
      addCallback();
      return;
    }

    setSelectedEntity({});
  };

  var copyItem = function copyItem(record) {
    var newRecord = JSON.parse(JSON.stringify(record));
    delete newRecord.id;
    setSelectedEntity(newRecord);
  };

  var handleBatchDelete = function handleBatchDelete() {
    var selectedRowKeys = tableList.rowSelection.selectedRowKeys;

    if (!selectedRowKeys.length) {
      message.warn("\u8BF7\u5148\u9009\u62E9\u8981\u5220\u9664\u7684".concat(title));
      return;
    }

    confirm$1({
      title: "\u8BF7\u95EE\u60A8\u786E\u8BA4\u8981\u5220\u9664\u9009\u4E2D\u7684".concat(title, "\u5417?"),
      okText: '确定',
      cancelText: '取消',
      onOk: function () {
        var _onOk2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return api.post("".concat(apiPath, "/dels?ids=").concat(selectedRowKeys.join(',')));

                case 2:
                  message.success("\u6279\u91CF\u5220\u9664".concat(title, "\u6210\u529F"));
                  tableList.fetchTable();

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function onOk() {
          return _onOk2.apply(this, arguments);
        }

        return onOk;
      }(),
      onCancel: function onCancel() {}
    });
  };

  var setHeaderItem = function setHeaderItem(record) {
    confirm$1({
      title: "\u8BF7\u95EE\u60A8\u786E\u8BA4\u8981\u8BBE\u7F6E\u8BE5\u65B0\u95FB\u4E3A\u5934\u90E8\u65B0\u95FB\u5417?",
      okText: '确定',
      cancelText: '取消',
      onOk: function () {
        var _onOk3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return api.post("".concat(apiPath, "/headerItem?id=").concat(record.id));

                case 2:
                  message.success("\u6279\u91CF\u5934\u90E8\u65B0\u95FB\u6210\u529F");
                  tableList.fetchTable();

                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function onOk() {
          return _onOk3.apply(this, arguments);
        }

        return onOk;
      }(),
      onCancel: function onCancel() {}
    });
  };

  var actionRow = {
    title: '操作',
    key: 'action',
    width: actionWidth,
    render: function render(_, record) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        className: "table-action",
        onClick: function onClick() {
          return handleEdit(record);
        }
      }, "\u7F16\u8F91"), /*#__PURE__*/React.createElement(Divider, {
        type: "vertical"
      }), /*#__PURE__*/React.createElement("span", {
        className: "table-action",
        onClick: function onClick() {
          return deleteEntity(record);
        }
      }, "\u5220\u9664"), isPublish && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Divider, {
        type: "vertical"
      }), /*#__PURE__*/React.createElement("span", {
        className: "table-action",
        onClick: function onClick() {
          return publishEntity(record);
        }
      }, record.isPublish ? '取消发布' : '发布')), isInIndex && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Divider, {
        type: "vertical"
      }), /*#__PURE__*/React.createElement("span", {
        className: "table-action",
        onClick: function onClick() {
          return indexEntity(record);
        }
      }, record.isInIndex ? '取消首页显示' : '设为首页显示')), isEnable && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Divider, {
        type: "vertical"
      }), /*#__PURE__*/React.createElement("span", {
        className: "table-action",
        onClick: function onClick() {
          return enableEntity(record);
        }
      }, record.isEnable ? '禁用' : '启用')), isPassword && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Divider, {
        type: "vertical"
      }), /*#__PURE__*/React.createElement("span", {
        className: "table-action",
        onClick: function onClick() {
          return setSelectedEntityPwd(record);
        }
      }, "\u4FEE\u6539\u5BC6\u7801")), isHeaderItem && !record.isHeaderItem && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Divider, {
        type: "vertical"
      }), /*#__PURE__*/React.createElement("span", {
        className: "table-action",
        onClick: function onClick() {
          return setHeaderItem(record);
        }
      }, "\u8BBE\u4E3A\u5934\u90E8\u65B0\u95FB")), isCopy && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Divider, {
        type: "vertical"
      }), /*#__PURE__*/React.createElement("span", {
        className: "table-action",
        onClick: function onClick() {
          return copyItem(record);
        }
      }, "\u590D\u5236")));
    }
  };

  var formCallback = function formCallback() {
    tableList.fetchTable();
    setSelectedEntity();
  };

  var handleClose = function handleClose() {
    setSelectedEntity();
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "page page-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-list-title"
  }, title, "\u5217\u8868"), /*#__PURE__*/React.createElement(ListHeader, _extends({}, tableList, {
    showAdd: true,
    placeholder: "\u8BF7\u8F93\u5165\u67E5\u8BE2\u6761\u4EF6",
    addCallback: handleAdd,
    deleteCallback: showRowSelection ? handleBatchDelete : null
  })), /*#__PURE__*/React.createElement(CustomTable, _extends({}, tableList, {
    columns: [tableOrder].concat(_toConsumableArray(listColumns), [actionRow]),
    rowKey: "id",
    size: "middle",
    showRowSelection: showRowSelection
  })), selectedEntity && /*#__PURE__*/React.createElement(PageFormDrawer, {
    formItems: columns,
    onClose: handleClose,
    defaultValues: selectedEntity,
    callback: formCallback,
    drawerWidth: drawerWidth,
    initValues: initValues,
    beforeFinish: beforeFinish
  }), selectedEntityPwd && /*#__PURE__*/React.createElement(ChangePassword, {
    setVisible: setSelectedEntityPwd,
    user: selectedEntityPwd
  }));
};

__$styleInject(".page-custom.pro-table {\n  width: calc(100% - 254px);\n}\n.page-custom .admin-form-title {\n  margin-bottom: 20px;\n}\n");

var PageCustom = function PageCustom(_ref) {
  var children = _ref.children,
      title = _ref.title,
      customClass = _ref.customClass;
  return /*#__PURE__*/React.createElement("div", {
    className: "page page-custom admin-form ".concat(customClass)
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-form-title"
  }, title), children);
};

__$styleInject(".error-boundary {\n  width: calc(100% - 254px);\n  height: 100%;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: center;\n}\n.error-boundary h2 {\n  margin-top: 20px;\n  margin-left: 28px;\n}\n");

var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);

  var _super = _createSuper(ErrorBoundary);

  function ErrorBoundary(props) {
    var _this;

    _classCallCheck(this, ErrorBoundary);

    _this = _super.call(this, props);
    _this.state = {
      hasError: false
    };
    return _this;
  }

  _createClass(ErrorBoundary, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.unlisten = this.props.history.listen(function () {
        _this2.setState({
          hasError: false
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unlisten();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        return /*#__PURE__*/React.createElement("div", {
          className: "error-boundary"
        }, /*#__PURE__*/React.createElement("img", {
          src: errorPage,
          alt: "error"
        }), /*#__PURE__*/React.createElement("h2", null, "\u62B1\u6B49, \u7CFB\u7EDF\u51FA\u4E86\u70B9\u95EE\u9898, \u8BF7\u7A0D\u540E\u8BBF\u95EE\u6216\u8054\u7CFB\u7BA1\u7406\u5458\u3002"));
      }

      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError() {
      return {
        hasError: true
      };
    }
  }]);

  return ErrorBoundary;
}(React.Component);

var ErrorBoundary$1 = withRouter(ErrorBoundary);

__$styleInject(".tree-table-header {\n  margin-left: 25px;\n}\n");

var confirm = Modal.confirm;

var TreeTable = function TreeTable(_ref) {
  var columns = _ref.columns,
      _ref$maxLevel = _ref.maxLevel,
      maxLevel = _ref$maxLevel === void 0 ? 2 : _ref$maxLevel;

  var _useActiveRoute = useActiveRoute(),
      title = _useActiveRoute.title,
      apiPath = _useActiveRoute.apiPath;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      items = _useState2[0],
      setItems = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      treeItems = _useState4[0],
      setTreeItems = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      formVisible = _useState6[0],
      setFormVisible = _useState6[1];

  var _useState7 = useState(),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedItem = _useState8[0],
      setSelectedItem = _useState8[1];

  var fetchItems = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return api.get("".concat(apiPath, "/page?rows=10000"));

          case 2:
            result = _context.sent;
            setItems(result.data);
            setTreeItems(listToTree(result.data));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [apiPath]);
  useEffect(function () {
    fetchItems();
  }, [fetchItems]);

  var handleAction = function handleAction(e) {
    var _e$target = e.target,
        _e$target$type = _e$target.type,
        type = _e$target$type === void 0 ? '' : _e$target$type,
        id = _e$target.id;
    var item = items.find(function (item) {
      return item.id === Number(id);
    }) || {
      pid: 1
    };

    if (type.startsWith('add')) {
      if (type === 'add-current') {
        setSelectedItem({
          parent: item.parent,
          pid: item.pid
        });
      }

      if (type === 'add-next') {
        setSelectedItem({
          parent: item.name,
          pid: item.id
        });
      }

      setFormVisible(true);
    }

    if (type === 'edit') {
      setSelectedItem(item);
      setFormVisible(true);
    }

    if (type === 'delete') {
      deleteCategory(item);
    }
  };

  var deleteCategory = function deleteCategory(record) {
    confirm({
      title: "\u8BF7\u95EE\u60A8\u786E\u8BA4\u8981\u5220\u9664\u8BE5".concat(title, "\u5417?"),
      content: "".concat(title, ": ").concat(record.name),
      okText: '确定',
      cancelText: '取消',
      onOk: function () {
        var _onOk = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return api.post("".concat(apiPath, "/del?id=").concat(record.id));

                case 2:
                  message.success("\u5220\u9664".concat(title, "\u6210\u529F"));
                  fetchItems();

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function onOk() {
          return _onOk.apply(this, arguments);
        }

        return onOk;
      }(),
      onCancel: function onCancel() {
        console.log('Cancel');
      }
    });
  };

  var getColumns = function getColumns(maxLevel) {
    return [{
      dataIndex: 'pid',
      hideInList: true,
      form: {
        comp: 'FormInput',
        hide: true
      }
    }, {
      title: '父级',
      dataIndex: 'parent',
      hideInList: true,
      form: {
        comp: 'FormInput',
        disabled: true,
        required: false
      }
    }].concat(_toConsumableArray(columns), [{
      title: '操作',
      valueType: 'option',
      width: 200,
      render: function render(_, record) {
        return [/*#__PURE__*/React.createElement(Dropdown, {
          key: "add",
          overlay: getMenu(record, maxLevel)
        }, /*#__PURE__*/React.createElement("a", {
          className: "ant-dropdown-link",
          onClick: function onClick(e) {
            return e.preventDefault();
          }
        }, "\u6DFB\u52A0 ", /*#__PURE__*/React.createElement(DownOutlined, null))), /*#__PURE__*/React.createElement("a", {
          key: "edit",
          type: "edit",
          id: record.id
        }, "\u7F16\u8F91"), /*#__PURE__*/React.createElement("a", {
          key: "delete",
          type: "delete",
          id: record.id
        }, "\u5220\u9664")];
      }
    }]);
  };

  var getMenu = function getMenu(record, maxLevel) {
    return /*#__PURE__*/React.createElement(Menu, null, /*#__PURE__*/React.createElement(Menu.Item, {
      key: "1"
    }, /*#__PURE__*/React.createElement("a", {
      type: "add-current",
      id: record.id
    }, "\u540C\u7EA7", title)), record.level < maxLevel && /*#__PURE__*/React.createElement(Menu.Item, {
      key: "2"
    }, /*#__PURE__*/React.createElement("a", {
      type: "add-next",
      id: record.id
    }, "\u4E0B\u7EA7", title)));
  };

  return /*#__PURE__*/React.createElement(PageCustom$1, {
    title: title,
    customClass: "pro-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "list-header tree-table-header",
    onClick: handleAction
  }, /*#__PURE__*/React.createElement(Button, {
    type: "primary"
  }, /*#__PURE__*/React.createElement("a", {
    type: "add-current"
  }, "\u6DFB\u52A0\u7B2C\u4E00\u7EA7"))), /*#__PURE__*/React.createElement("div", {
    onClick: handleAction
  }, /*#__PURE__*/React.createElement(EditableProTable, {
    rowKey: "id",
    recordCreatorProps: false,
    columns: getColumns(maxLevel).filter(function (column) {
      return !column.hideInList;
    }),
    value: treeItems
  }), formVisible && /*#__PURE__*/React.createElement(PageFormDrawer$1, {
    formItems: getColumns(maxLevel),
    onClose: function onClose() {
      return setFormVisible(false);
    },
    defaultValues: selectedItem,
    callback: fetchItems,
    drawerWidth: 600
  })));
};

var listToTree = function listToTree(list) {
  var rootId = 1;
  var map = {},
      node,
      roots = [],
      i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i;
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    node.level = node.hid.split(':').length - 2;
    node.value = node.id;
    node.label = node.name;

    if (node.pid !== rootId) {
      if (!list[map[node.pid]].children) {
        list[map[node.pid]].children = [];
      }

      node.parent = list[map[node.pid]].name;
      list[map[node.pid]].children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
};

export { ErrorBoundary$1 as ErrorBoundary, PageCustom, PageFormDrawer, PageList, TreeTable };
