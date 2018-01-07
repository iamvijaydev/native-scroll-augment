"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.getTime = Date.now ? Date.now : function () { return new Date().getTime(); };
exports.findMatchingTarget = function (target, nodes) {
    var domTarget = target;
    if (!nodes.length || domTarget.tagName === 'BODY') {
        return 'BODY';
    }
    var found = lodash_1.find(nodes, function (node) { return node.id === domTarget.id; });
    return found ? domTarget.id : exports.findMatchingTarget(domTarget.parentElement, nodes);
};
exports.getPoint = function (event, hasTouch) {
    var point;
    var mEvent = event;
    var tEvent = event;
    if (hasTouch && tEvent.touches.length) {
        point = {
            x: tEvent.touches[0].clientX,
            y: tEvent.touches[0].clientY,
        };
    }
    else {
        point = {
            x: mEvent.clientX,
            y: mEvent.clientY,
        };
    }
    return point;
};
exports.preventDefaultException = function (el, exceptions) {
    for (var i in exceptions) {
        if (exceptions[i].test(el[i])) {
            return true;
        }
    }
    return false;
};
exports.getMaxScroll = function (nodes) {
    var maxScrollLeft = 0;
    var maxScrollTop = 0;
    nodes.forEach(function (node) {
        var $el = node.children[0];
        var maxScrollX = $el.scrollWidth - $el.clientWidth;
        var maxScrollY = $el.scrollHeight - $el.clientHeight;
        if (maxScrollX > maxScrollLeft) {
            maxScrollLeft = maxScrollX;
        }
        if (maxScrollY > maxScrollTop) {
            maxScrollTop = maxScrollY;
        }
    });
    return {
        left: maxScrollLeft,
        top: maxScrollTop,
    };
};
exports.checkRequestAnimationFrame = function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
};
//# sourceMappingURL=utils.js.map