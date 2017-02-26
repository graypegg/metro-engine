module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

module.exports = require("dockerode");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__system_DockerConnection_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dockerode__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dockerode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_dockerode__);
/* harmony export (immutable) */ __webpack_exports__["init"] = init;



function init() {
  return new __WEBPACK_IMPORTED_MODULE_0__system_DockerConnection_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1_dockerode___default.a);
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MetroContainer__ = __webpack_require__(4);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var DockerConnection = function () {
  function DockerConnection(Docker) {
    _classCallCheck(this, DockerConnection);

    this.dc = new Docker();
  }

  /**
   * getContainers - Returns a list of all currently running MetroContainers
   *
   * @return {array} An array of MetroContainers
   */


  _createClass(DockerConnection, [{
    key: 'getContainers',
    value: function getContainers() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.dc.listContainers(function (err, containers) {

          if (err) reject(err);else {
            resolve(containers.filter(function (container) {
              return true;
            }).map(function (c) {
              return new __WEBPACK_IMPORTED_MODULE_0__MetroContainer__["a" /* default */](_this.dc, c);
            }));
          }
        });
      });
    }

    /**
     * getContainer - Returns a MetroContainer matching the type param
     *
     * @param {string} type MetroContainer type
     *
     * @return {MetroContainer} The requested MetroContainer, or null if not found
     */

  }, {
    key: 'getContainer',
    value: function getContainer(type) {
      return this.getContainers.filter(function (container) {
        return container;
      });
    }
  }]);

  return DockerConnection;
}();

/* harmony default export */ __webpack_exports__["a"] = DockerConnection;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MetroContainer = function MetroContainer(dc, container) {
  _classCallCheck(this, MetroContainer);

  this.c = dc.getContainer(container.Id);
};

/* harmony default export */ __webpack_exports__["a"] = MetroContainer;

/***/ })
/******/ ]);