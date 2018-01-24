// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({19:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\n  flex-grow: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n"], ["\n  flex-grow: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  display: inline-block;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  list-style: none;\n"], ["\n  display: inline-block;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  list-style: none;\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n  padding: 3rem 0;\n  height: 3rem;\n  position: relative;\n  \n  &:not(:last-child) {\n    border-bottom: 1px solid #eaeaea;\n  }\n\n  &:before,\n  &:after {\n    content: ' ';\n    position: absolute;\n    top: 3.3rem;\n    height: 2.5rem;\n    background: #eaeaea\n  }\n\n  &:before {\n    left: 2.5rem;\n    width: 2.5rem;\n    border-radius: 50%;\n  }\n\n  &:after {\n    left: 75px;\n    right: 2.5rem;\n    border-radius: 1rem;\n  }\n"], ["\n  padding: 3rem 0;\n  height: 3rem;\n  position: relative;\n  \n  &:not(:last-child) {\n    border-bottom: 1px solid #eaeaea;\n  }\n\n  &:before,\n  &:after {\n    content: ' ';\n    position: absolute;\n    top: 3.3rem;\n    height: 2.5rem;\n    background: #eaeaea\n  }\n\n  &:before {\n    left: 2.5rem;\n    width: 2.5rem;\n    border-radius: 50%;\n  }\n\n  &:after {\n    left: 75px;\n    right: 2.5rem;\n    border-radius: 1rem;\n  }\n"]);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Area = _styledComponents2.default.div(_templateObject);

var Content = _styledComponents2.default.ul(_templateObject2);

var Item = _styledComponents2.default.li(_templateObject3);

Area.Content = Content;
Area.Item = Item;

exports.default = Area;
},{"styled-components":28}],13:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  display: flex;\n"], ["\n  display: flex;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _dist = require("../../../../dist");

var _dist2 = _interopRequireDefault(_dist);

var _Parent = require("../shared/Parent");

var _Parent2 = _interopRequireDefault(_Parent);

var _Area = require("../shared/Area");

var _Area2 = _interopRequireDefault(_Area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ParentExd = _Parent2.default.extend(_templateObject);

var ConnectedScrollEg1 = function (_React$Component) {
  _inherits(ConnectedScrollEg1, _React$Component);

  function ConnectedScrollEg1() {
    _classCallCheck(this, ConnectedScrollEg1);

    return _possibleConstructorReturn(this, (ConnectedScrollEg1.__proto__ || Object.getPrototypeOf(ConnectedScrollEg1)).apply(this, arguments));
  }

  _createClass(ConnectedScrollEg1, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.nsa = new _dist2.default({
        parent: this.$parent,
        scrollsAreas: [this.$scrollArea1, this.$scrollArea2],
        options: { enableKinetics: true, movingAverage: 0.2 }
      });

      this.nsa.init();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.log(this.nsa);
      this.nsa.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        ParentExd,
        { innerRef: function innerRef(node) {
            _this2.$parent = node;
          } },
        _react2.default.createElement(
          _Area2.default,
          { innerRef: function innerRef(node) {
              _this2.$scrollArea1 = node;
            } },
          ConnectedScrollEg1.generateData()
        ),
        _react2.default.createElement(
          _Area2.default,
          { innerRef: function innerRef(node) {
              _this2.$scrollArea2 = node;
            } },
          ConnectedScrollEg1.generateData()
        )
      );
    }
  }], [{
    key: "generateData",
    value: function generateData() {
      return _react2.default.createElement(
        _Area2.default.Content,
        null,
        Array.from({ length: 100 }, function (v, i) {
          return i;
        }).map(function (d, i) {
          return _react2.default.createElement(_Area2.default.Item, { key: i });
        })
      );
    }
  }]);

  return ConnectedScrollEg1;
}(_react2.default.Component);

exports.default = ConnectedScrollEg1;
},{"react":8,"../../../../dist":22,"../shared/Parent":20,"../shared/Area":19}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://' + window.location.hostname + ':63593/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,13])