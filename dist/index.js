"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var utils_js_1 = require("./utils.js");
var defaultOptions_1 = require("./defaultOptions");
var NativeScrollAugment = /** @class */ (function () {
    function NativeScrollAugment(props) {
        this.scrollToStart = this.scrollGen(true, true, true);
        this.scrollToStartLeft = this.scrollGen(true, true, false);
        this.scrollToStartTop = this.scrollGen(true, false, true);
        this.scrollToEnd = this.scrollGen(false, true, true);
        this.scrollToEndLeft = this.scrollGen(false, true, false);
        this.scrollToEndTop = this.scrollGen(false, false, true);
        this.scrollToPosition = this.scrollToBy(false);
        this.scrollByValue = this.scrollToBy(true);
        if (!lodash_1.isElement(props.parent)) {
            throw new Error("First argument should be an element. Provided " + typeof props.parent);
        }
        if (!lodash_1.isArray(props.scrollsAreas)) {
            throw new Error("Second argument should be an array. Provided " + typeof props.scrollsAreas);
        }
        props.scrollsAreas.forEach(function ($node, index) {
            if (!lodash_1.isElement($node)) {
                throw new Error("Entries in second argument should be an element.\n            Provided " + typeof $node + " at index " + index);
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
        this.setActiveNode = this.setActiveNode.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.autoScroll = this.autoScroll.bind(this);
        this.tap = this.tap.bind(this);
        this.swipe = this.swipe.bind(this);
        this.release = this.release.bind(this);
        this.settings = lodash_1.extend({}, defaultOptions_1.defaultOptions, props.options);
    }
    NativeScrollAugment.prototype.destroy = function () {
        this.$parent.addEventListener(this.DETECT_EVT, this.setActiveNode, true);
        this.$parent.addEventListener('scroll', this.onScroll, true);
        if (!this.hasTouch && this.settings.enableKinetics) {
            this.$parent.removeEventListener('mousedown', this.tap);
            this.$parent.removeEventListener('mousemove', this.swipe);
            this.$parent.removeEventListener('mouseup', this.release);
        }
    };
    NativeScrollAugment.prototype.init = function () {
        this.$parent.addEventListener(this.DETECT_EVT, this.setActiveNode, true);
        this.$parent.addEventListener('scroll', this.onScroll, true);
        if (!this.hasTouch && this.settings.enableKinetics) {
            this.$parent.addEventListener('mousedown', this.tap, true);
        }
    };
    NativeScrollAugment.prototype.setActiveNode = function (e) {
        this.activeId = utils_js_1.findMatchingTarget(e.target, this.scrollsAreas);
        // if its a touch device and we are autoscrolling
        // it should stop as soon as the user touches the scroll area
        // else there will be jerky effects
        if (this.hasTouch) {
            this.cancelAutoScroll();
        }
    };
    NativeScrollAugment.prototype.leftVelocityTracker = function () {
        var now = utils_js_1.getTime();
        var elapsed = now - this.timeStamp;
        var delta = this.scrollLeft - this.lastScrollLeft;
        this.timeStamp = now;
        this.lastScrollLeft = this.scrollLeft;
        this.velocityLeft = this.settings.movingAverage * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityLeft;
    };
    NativeScrollAugment.prototype.topVelocityTracker = function () {
        var now = utils_js_1.getTime();
        var elapsed = now - this.timeStamp;
        var delta = this.scrollTop - this.lastScrollTop;
        this.timeStamp = now;
        this.lastScrollTop = this.scrollTop;
        this.velocityTop = this.settings.movingAverage * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityTop;
    };
    NativeScrollAugment.prototype.scrollTo = function (left, top) {
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
    NativeScrollAugment.prototype.onScroll = function (e) {
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
    NativeScrollAugment.prototype.autoScroll = function () {
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
        this.scrollTo(this.targetLeft + scrollX, this.targetTop + scrollY);
        if (scrollX !== 0 || scrollY !== 0) {
            this.autoScrollTracker = requestAnimationFrame(this.autoScroll);
        }
        else {
            this.isAutoScrolling = false;
            this.autoScrollTracker = -1;
        }
    };
    NativeScrollAugment.prototype.triggerAutoScroll = function (targetLeft, targetTop, amplitudeLeft, amplitudeTop) {
        if (amplitudeLeft !== 0 || amplitudeTop !== 0) {
            this.cancelAutoScroll();
            this.timeStamp = utils_js_1.getTime();
            this.targetLeft = targetLeft;
            this.targetTop = targetTop;
            this.amplitudeLeft = amplitudeLeft;
            this.amplitudeTop = amplitudeTop;
            this.isAutoScrolling = true;
            this.autoScrollTracker = requestAnimationFrame(this.autoScroll);
        }
    };
    NativeScrollAugment.prototype.cancelAutoScroll = function () {
        if (this.isAutoScrolling) {
            cancelAnimationFrame(this.autoScrollTracker);
            this.isAutoScrolling = false;
            this.autoScrollTracker = -1;
        }
    };
    NativeScrollAugment.prototype.resetMomentum = function () {
        this.velocityTop = this.amplitudeTop = 0;
        this.velocityLeft = this.amplitudeLeft = 0;
        this.lastScrollTop = this.scrollTop;
        this.lastScrollLeft = this.scrollLeft;
    };
    NativeScrollAugment.prototype.tap = function (e) {
        var point = utils_js_1.getPoint(e, this.hasTouch);
        this.pressed = true;
        this.referenceX = point.x;
        this.referenceY = point.y;
        this.resetMomentum();
        this.timeStamp = utils_js_1.getTime();
        this.cancelAutoScroll();
        this.$parent.addEventListener('mousemove', this.swipe, true);
        this.$parent.addEventListener('mouseup', this.release, true);
        if (utils_js_1.preventDefaultException(e.target, this.settings.preventDefaultException)) {
            e.preventDefault();
        }
    };
    NativeScrollAugment.prototype.swipe = function (e) {
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
            this.leftVelocityTracker();
            this.topVelocityTracker();
            this.scrollTo(this.scrollLeft + deltaX, this.scrollTop + deltaY);
            if (this.resetMomentumTracker !== -1) {
                clearTimeout(this.resetMomentumTracker);
                this.resetMomentumTracker = -1;
            }
            this.resetMomentumTracker = setTimeout(function () {
                if (_this.pressed) {
                    _this.resetMomentum();
                }
            }, 100);
        }
    };
    NativeScrollAugment.prototype.release = function () {
        var targetLeft = this.targetLeft;
        var targetTop = this.targetTop;
        var amplitudeLeft = this.amplitudeLeft;
        var amplitudeTop = this.amplitudeTop;
        this.pressed = false;
        this.topVelocityTracker();
        this.leftVelocityTracker();
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
        this.triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);
        this.$parent.removeEventListener('mousemove', this.swipe);
        this.$parent.removeEventListener('mouseup', this.release);
    };
    NativeScrollAugment.prototype.scrollGen = function (start, left, top) {
        var _this = this;
        return function () {
            var targetLeft = 0;
            var targetTop = 0;
            var amplitudeLeft = 0;
            var amplitudeTop = 0;
            var maxScroll;
            if (start) {
                targetLeft = left ? 0 : _this.scrollLeft;
                targetTop = top ? 0 : _this.scrollTop;
                amplitudeLeft = left ? -_this.scrollLeft : 0;
                amplitudeTop = top ? -_this.scrollTop : 0;
            }
            else {
                maxScroll = utils_js_1.getMaxScroll(_this.scrollsAreas);
                targetLeft = left ? maxScroll.left : _this.scrollLeft;
                targetTop = top ? maxScroll.top : _this.scrollTop;
                amplitudeLeft = left ? maxScroll.left - _this.scrollLeft : 0;
                amplitudeTop = top ? maxScroll.top - _this.scrollTop : 0;
            }
            _this.triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);
        };
    };
    NativeScrollAugment.prototype.scrollToBy = function (addTo) {
        var _this = this;
        return function (left, top) {
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
            maxScroll = utils_js_1.getMaxScroll(_this.scrollsAreas);
            numLeft = parseInt(left, 10);
            numTop = parseInt(top, 10);
            corrLeft = isNaN(numLeft) ? _this.scrollLeft : (addTo ? numLeft + _this.scrollLeft : numLeft);
            corrTop = isNaN(numTop) ? _this.scrollTop : (addTo ? numTop + _this.scrollTop : numTop);
            targetLeft = corrLeft > maxScroll.left ? maxScroll.left : (corrLeft < 0 ? 0 : corrLeft);
            targetTop = corrTop > maxScroll.top ? maxScroll.top : (corrTop < 0 ? 0 : corrTop);
            moveLeft = _this.scrollLeft - targetLeft !== 0 ? true : false;
            moveTop = _this.scrollTop - targetTop !== 0 ? true : false;
            amplitudeLeft = moveLeft ? targetLeft - _this.scrollLeft : 0;
            amplitudeTop = moveTop ? targetTop - _this.scrollTop : 0;
            _this.triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);
        };
    };
    return NativeScrollAugment;
}());
exports.default = NativeScrollAugment;
//# sourceMappingURL=index.js.map