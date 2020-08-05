// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ECQE":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var dataStr = localStorage.getItem('frontNavSite');
var dataObj = JSON.parse(dataStr);
var map = dataObj || [{
  title: 'I',
  url: 'https://www.iconfont.cn'
}, {
  title: 'G',
  url: 'https://github.com'
}];
$('.addButton').on('click', function () {
  var siteUrl = window.prompt('输入需要添加的网址');

  if (siteUrl.indexOf('http') !== 0) {
    siteUrl = "https://" + siteUrl;
  }

  var title = getUrl(siteUrl)[0];
  var siteObj = {
    title: title,
    url: siteUrl
  };
  map.push(siteObj);
  localStorage.setItem('frontNavSite', JSON.stringify(map));
  render();
});

function getUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
}

function render() {
  $(".siteList>li").not('li.last').remove();
  map.forEach(function (item, i) {
    var color = "rgb(".concat(rgb(), ",").concat(rgb(), ",").concat(rgb(), ")");
    var $li = $("\n            <li>\n                <div class=\"site\">\n                    <div class=\"logo\" style=\"color:".concat(color, ";\">").concat(item['title'], "</div>\n                    <p class=\"link\" style=\"color:rgba(0,0,0,0.7);\">").concat(getUrl(item['url']), "</p>\n                    <svg class=\"icon chacha\">\n                    <use xlink:href=\"#icon-chacha1\"></use>\n                </svg>\n                </div>\n            </li>\n            ")).insertBefore($('.siteList').find('li.last'));
    $li.on('click', function () {
      window.location.href = item['url'];
    });
    $li.on('click', '.chacha', function (e) {
      e.stopPropagation();
      map.splice(i, 1);
      render();
      localStorage.setItem('frontNavSite', JSON.stringify(map));
    });
  });
}

$(window).on('keypress', function (e) {
  if (flag) {
    var _iterator = _createForOfIteratorHelper(map),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;

        if (e.key === item["title"].toLocaleLowerCase()) {
          window.location.href = item['url'];
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
});
$(function () {
  render();
});

function rgb() {
  return Math.floor(Math.random() * 256);
}

$('.btn-g').on('click', function () {
  $('.search-form')[0].action = 'https://www.google.com/search';
  $('.search-ipt')[0].name = 'q';
  $('.search-ipt')[0].placeholder = "Google";
  $(this).addClass('btn-active').siblings().removeClass('btn-active');
});
$('.btn-b').on('click', function () {
  $('.search-form')[0].action = "https://www.baidu.com/s";
  $('.search-ipt')[0].name = 'wd';
  $('.search-ipt')[0].placeholder = "Baidu";
  $(this).addClass('btn-active').siblings().removeClass('btn-active');
});
var flag = true;
$('.search-ipt').on('focus', function (e) {
  $('.btn-active').css({
    border: "4px solid rgba(35, 174, 229, 0.2)",
    borderBottom: "0"
  });
  flag = false;
});
$('.search-ipt').on('blur', function () {
  flag = true;
  $('.btn-active').css({
    boxShadow: "",
    border: '1px solid #ddd'
  });
});
},{}]},{},["ECQE"], null)
//# sourceMappingURL=mian.278e65d5.js.map