"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var utils_js_1 = require("./utils.js");
var defaultOptions_1 = require("./defaultOptions");
var NativeScrollAugment = /** @class */ (function () {
    function NativeScrollAugment(props) {
        if (!lodash_1.isElement(props.parent)) {
            throw new Error("First argument should be an element. Provided " + typeof props.parent);
        }
        if (!props.parent.id) {
            props.parent.id = "native-scroll-augment-parent-" + NativeScrollAugment.generateId();
        }
        if (!lodash_1.isArray(props.scrollsAreas)) {
            throw new Error("Second argument should be an array. Provided " + typeof props.scrollsAreas);
        }
        props.scrollsAreas.forEach(function ($node, index) {
            if (!lodash_1.isElement($node)) {
                throw new Error("Entries in second argument should be an element. Provided " + typeof $node + " at index " + index);
            }
            if (!$node.id) {
                $node.id = "scroll-area-" + NativeScrollAugment.generateId();
            }
        });
        this.hasTouch = 'ontouchstart' in window;
        this.DETECT_EVT = this.hasTouch ? 'touchstart' : 'mouseover';
        this.activeId = '';
        this.$parent = props.parent;
        this.scrollsAreas = props.scrollsAreas;
        this.scrollLeft = 0;
        this.scrollTop = 0;
        this.lastScrollLeft = 0;
        this.lastScrollTop = 0;
        this.targetTop = 0;
        this.targetLeft = 0;
        this.velocityLeft = 0;
        this.velocityTop = 0;
        this.amplitudeLeft = 0;
        this.amplitudeTop = 0;
        this.timeStamp = 0;
        this.referenceX = 0;
        this.referenceY = 0;
        this.pressed = false;
        this.isAutoScrolling = false;
        this.settings = lodash_1.extend({}, defaultOptions_1.defaultOptions, props.options);
    }
    NativeScrollAugment.generateId = function () {
        var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var ID_LENGTH = 8;
        var rtn = '';
        for (var i = 0; i < ID_LENGTH; i++) {
            rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        return rtn;
    };
    NativeScrollAugment.prototype._bindMethods = function () {
        this._tap = this._tap.bind(this);
        this._swipe = this._swipe.bind(this);
        this._release = this._release.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this._setActiveNode = this._setActiveNode.bind(this);
        this._autoScroll = this._autoScroll.bind(this);
    };
    NativeScrollAugment.prototype.init = function () {
        this._bindMethods();
        this.$parent.addEventListener(this.DETECT_EVT, this._setActiveNode, true);
        this.$parent.addEventListener('scroll', this._onScroll, true);
        if (!this.hasTouch && this.settings.enableKinetics) {
            this.$parent.addEventListener('mousedown', this._tap, true);
        }
    };
    NativeScrollAugment.prototype.destroy = function () {
        this.$parent.addEventListener(this.DETECT_EVT, this._setActiveNode, true);
        this.$parent.addEventListener('scroll', this._onScroll, true);
        if (!this.hasTouch && this.settings.enableKinetics) {
            this.$parent.removeEventListener('mousedown', this._tap);
        }
    };
    NativeScrollAugment.prototype.updateOptions = function (options) {
        this.settings = lodash_1.extend({}, defaultOptions_1.defaultOptions, options);
    };
    NativeScrollAugment.prototype.replaceScrollAreas = function (scrollsAreas, left, top) {
        var ok = true;
        var notElement;
        if (!lodash_1.isArray(scrollsAreas)) {
            console.error("Argument should be an array. Provided " + typeof scrollsAreas);
            ok = false;
        }
        else {
            scrollsAreas.forEach(function ($node, index) {
                if (!lodash_1.isElement($node)) {
                    console.error("Entries in argument should be an element.\n            Provided " + typeof $node + " at index " + index);
                    ok = false;
                }
            });
        }
        if (ok) {
            this._cancelAutoScroll();
            this.scrollLeft = lodash_1.isNumber(left) ? left : 0;
            this.scrollTop = lodash_1.isNumber(top) ? top : 0;
            this._resetMomentum();
            this.scrollsAreas = scrollsAreas;
        }
    };
    NativeScrollAugment.prototype._setActiveNode = function (e) {
        this.activeId = utils_js_1.findMatchingTarget(e.target, this.scrollsAreas);
        // if its a touch device and we are autoscrolling
        // it should stop as soon as the user touches the scroll area
        // else there will be jerky effects
        if (this.hasTouch) {
            this._cancelAutoScroll();
        }
    };
    NativeScrollAugment.prototype._leftVelocityTracker = function () {
        var now = utils_js_1.getTime();
        var elapsed = now - this.timeStamp;
        var delta = this.scrollLeft - this.lastScrollLeft;
        this.timeStamp = now;
        this.lastScrollLeft = this.scrollLeft;
        this.velocityLeft = this.settings.movingAverage * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityLeft;
    };
    NativeScrollAugment.prototype._topVelocityTracker = function () {
        var now = utils_js_1.getTime();
        var elapsed = now - this.timeStamp;
        var delta = this.scrollTop - this.lastScrollTop;
        this.timeStamp = now;
        this.lastScrollTop = this.scrollTop;
        this.velocityTop = this.settings.movingAverage * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityTop;
    };
    NativeScrollAugment.prototype._scrollTo = function (left, top) {
        var _this = this;
        var correctedLeft = Math.round(left);
        var correctedTop = Math.round(top);
        this.scrollsAreas.forEach(function ($node) {
            var maxScrollX = $node.scrollWidth - $node.clientWidth;
            var maxScrollY = $node.scrollHeight - $node.clientHeight;
            if (maxScrollX > 0 && correctedLeft >= 0 && correctedLeft <= maxScrollX) {
                $node.scrollLeft = correctedLeft;
                _this.scrollLeft = correctedLeft;
            }
            if (maxScrollY > 0 && correctedTop >= 0 && correctedTop <= maxScrollY) {
                $node.scrollTop = correctedTop;
                _this.scrollTop = correctedTop;
            }
        });
    };
    NativeScrollAugment.prototype._onScroll = function (e) {
        var _this = this;
        var target = e.target;
        var valX;
        var valY;
        if (this.pressed || this.isAutoScrolling) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if (target.clientWidth !== target.scrollWidth) {
            valX = target.scrollLeft;
            this.lastScrollLeft = this.scrollLeft;
            this.scrollLeft = valX;
        }
        else {
            valX = this.scrollLeft;
        }
        if (target.clientHeight !== target.scrollHeight) {
            valY = target.scrollTop;
            this.lastScrollTop = this.scrollTop;
            this.scrollTop = valY;
        }
        else {
            valY = this.scrollTop;
        }
        this.scrollsAreas.forEach(function ($node) {
            if ($node.id !== _this.activeId) {
                $node.scrollLeft = valX;
                $node.scrollTop = valY;
            }
        });
    };
    NativeScrollAugment.prototype._autoScroll = function () {
        var TIME_CONST = 325;
        var elapsed = utils_js_1.getTime() - this.timeStamp;
        var deltaY = 0;
        var deltaX = 0;
        var scrollX = 0;
        var scrollY = 0;
        if (this.amplitudeTop) {
            deltaY = -this.amplitudeTop * Math.exp(-elapsed / TIME_CONST);
        }
        if (this.amplitudeLeft) {
            deltaX = -this.amplitudeLeft * Math.exp(-elapsed / TIME_CONST);
        }
        if (deltaX > 0.5 || deltaX < -0.5) {
            scrollX = deltaX;
        }
        else {
            scrollX = 0;
        }
        if (deltaY > 0.5 || deltaY < -0.5) {
            scrollY = deltaY;
        }
        else {
            scrollY = 0;
        }
        this._scrollTo(this.targetLeft + scrollX, this.targetTop + scrollY);
        if (scrollX !== 0 || scrollY !== 0) {
            this.autoScrollTracker = requestAnimationFrame(this._autoScroll);
        }
        else {
            this.isAutoScrolling = false;
            this.autoScrollTracker = -1;
        }
    };
    NativeScrollAugment.prototype._triggerAutoScroll = function (targetLeft, targetTop, amplitudeLeft, amplitudeTop) {
        if (amplitudeLeft !== 0 || amplitudeTop !== 0) {
            this._cancelAutoScroll();
            this.timeStamp = utils_js_1.getTime();
            this.targetLeft = targetLeft;
            this.targetTop = targetTop;
            this.amplitudeLeft = amplitudeLeft;
            this.amplitudeTop = amplitudeTop;
            this.isAutoScrolling = true;
            this.autoScrollTracker = requestAnimationFrame(this._autoScroll);
        }
    };
    NativeScrollAugment.prototype._cancelAutoScroll = function () {
        if (this.isAutoScrolling) {
            cancelAnimationFrame(this.autoScrollTracker);
            this.isAutoScrolling = false;
            this.autoScrollTracker = -1;
        }
    };
    NativeScrollAugment.prototype._resetMomentum = function () {
        this.velocityTop = this.amplitudeTop = 0;
        this.velocityLeft = this.amplitudeLeft = 0;
        this.lastScrollTop = this.scrollTop;
        this.lastScrollLeft = this.scrollLeft;
    };
    NativeScrollAugment.prototype._tap = function (e) {
        var point = utils_js_1.getPoint(e, this.hasTouch);
        this.pressed = true;
        this.referenceX = point.x;
        this.referenceY = point.y;
        this._resetMomentum();
        this.timeStamp = utils_js_1.getTime();
        this._cancelAutoScroll();
        this.$parent.addEventListener('mousemove', this._swipe, true);
        this.$parent.addEventListener('mouseup', this._release, true);
        if (utils_js_1.preventDefaultException(e.target, this.settings.preventDefaultException)) {
            e.preventDefault();
        }
    };
    NativeScrollAugment.prototype._swipe = function (e) {
        var _this = this;
        var point = utils_js_1.getPoint(e, this.hasTouch);
        var x;
        var y;
        var deltaX;
        var deltaY;
        if (this.pressed) {
            x = point.x;
            y = point.y;
            deltaX = this.referenceX - x;
            deltaY = this.referenceY - y;
            if (deltaX > 2 || deltaX < -2) {
                this.referenceX = x;
            }
            else {
                deltaX = 0;
            }
            if (deltaY > 2 || deltaY < -2) {
                this.referenceY = y;
            }
            else {
                deltaY = 0;
            }
            this._leftVelocityTracker();
            this._topVelocityTracker();
            this._scrollTo(this.scrollLeft + deltaX, this.scrollTop + deltaY);
            if (this.resetMomentumTracker !== -1) {
                clearTimeout(this.resetMomentumTracker);
                this.resetMomentumTracker = -1;
            }
            this.resetMomentumTracker = setTimeout(function () {
                if (_this.pressed) {
                    _this._resetMomentum();
                }
            }, 100);
        }
    };
    NativeScrollAugment.prototype._release = function () {
        var targetLeft = this.targetLeft;
        var targetTop = this.targetTop;
        var amplitudeLeft = this.amplitudeLeft;
        var amplitudeTop = this.amplitudeTop;
        this.pressed = false;
        this._topVelocityTracker();
        this._leftVelocityTracker();
        if (this.velocityLeft > 10 || this.velocityLeft < -10) {
            amplitudeLeft = 0.8 * this.velocityLeft;
            targetLeft = Math.round(this.scrollLeft + amplitudeLeft);
        }
        else {
            targetLeft = this.scrollLeft;
        }
        if (this.velocityTop > 10 || this.velocityTop < -10) {
            amplitudeTop = 0.8 * this.velocityTop;
            targetTop = Math.round(this.scrollTop + amplitudeTop);
        }
        else {
            targetTop = this.scrollTop;
        }
        this._triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);
        this.$parent.removeEventListener('mousemove', this._swipe);
        this.$parent.removeEventListener('mouseup', this._release);
    };
    NativeScrollAugment.prototype._scrollToEdges = function (start, left, top) {
        var targetLeft = 0;
        var targetTop = 0;
        var amplitudeLeft = 0;
        var amplitudeTop = 0;
        var maxScroll;
        if (start) {
            targetLeft = left ? 0 : this.scrollLeft;
            targetTop = top ? 0 : this.scrollTop;
            amplitudeLeft = left ? -this.scrollLeft : 0;
            amplitudeTop = top ? -this.scrollTop : 0;
        }
        else {
            maxScroll = utils_js_1.getMaxScroll(this.scrollsAreas);
            targetLeft = left ? maxScroll.left : this.scrollLeft;
            targetTop = top ? maxScroll.top : this.scrollTop;
            amplitudeLeft = left ? maxScroll.left - this.scrollLeft : 0;
            amplitudeTop = top ? maxScroll.top - this.scrollTop : 0;
        }
        this._triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);
    };
    NativeScrollAugment.prototype._scrollToValue = function (addTo, left, top) {
        var maxScroll;
        var numLeft;
        var corrLeft;
        var numTop;
        var corrTop;
        var targetLeft;
        var targetTop;
        var moveLeft;
        var moveTop;
        var amplitudeLeft;
        var amplitudeTop;
        maxScroll = utils_js_1.getMaxScroll(this.scrollsAreas);
        numLeft = parseInt(left, 10);
        numTop = parseInt(top, 10);
        corrLeft = isNaN(numLeft) ? this.scrollLeft : (addTo ? numLeft + this.scrollLeft : numLeft);
        corrTop = isNaN(numTop) ? this.scrollTop : (addTo ? numTop + this.scrollTop : numTop);
        targetLeft = corrLeft > maxScroll.left ? maxScroll.left : (corrLeft < 0 ? 0 : corrLeft);
        targetTop = corrTop > maxScroll.top ? maxScroll.top : (corrTop < 0 ? 0 : corrTop);
        moveLeft = this.scrollLeft - targetLeft !== 0 ? true : false;
        moveTop = this.scrollTop - targetTop !== 0 ? true : false;
        amplitudeLeft = moveLeft ? targetLeft - this.scrollLeft : 0;
        amplitudeTop = moveTop ? targetTop - this.scrollTop : 0;
        this._triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);
    };
    NativeScrollAugment.prototype.scrollToStart = function () {
        this._scrollToEdges(true, true, true);
    };
    NativeScrollAugment.prototype.scrollToStartLeft = function () {
        this._scrollToEdges(true, true, false);
    };
    NativeScrollAugment.prototype.scrollToStartTop = function () {
        this._scrollToEdges(true, false, true);
    };
    NativeScrollAugment.prototype.scrollToEnd = function () {
        this._scrollToEdges(false, true, true);
    };
    NativeScrollAugment.prototype.scrollToEndLeft = function () {
        this._scrollToEdges(false, true, false);
    };
    NativeScrollAugment.prototype.scrollToEndTop = function () {
        this._scrollToEdges(false, false, true);
    };
    NativeScrollAugment.prototype.scrollToPosition = function (left, top) {
        this._scrollToValue(false, left, top);
    };
    NativeScrollAugment.prototype.scrollByValue = function (left, top) {
        this._scrollToValue(true, left, top);
    };
    return NativeScrollAugment;
}());
exports.default = NativeScrollAugment;
//# sourceMappingURL=index.js.map