import {
  isElement,
  isArray,
  isString,
  extend,
  find,
  isNumber
} from 'lodash';
import {
  findMatchingTarget,
  getTime,
  getPoint,
  preventDefaultException,
  getMaxScroll,
} from './utils.js';
import {
  defaultOptions,
  ISettings,
  ISettingsOptional,
} from './defaultOptions';

export default class NativeScrollAugment {
  static generateId() {
    const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const ID_LENGTH = 8;
    let rtn = '';

    for (let i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  }

  private hasTouch: boolean;
  private DETECT_EVT: string;
  private activeId: string;
  private $parent: HTMLElement;
  private scrollsAreas: HTMLElement[];

  private scrollLeft: number;
  private scrollTop: number;
  private lastScrollLeft: number;
  private lastScrollTop: number;
  private targetTop: number;
  private targetLeft: number;

  private velocityLeft: number;
  private velocityTop: number;
  private amplitudeLeft: number;
  private amplitudeTop: number;

  private timeStamp: number;
  private referenceX: number;
  private referenceY: number;
  private pressed: boolean;
  private autoScrollTracker: number;
  private isAutoScrolling: boolean;
  private resetMomentumTracker: number;

  private settings: ISettings;

  constructor(props: {
    parent: HTMLElement;
    scrollsAreas: HTMLElement[];
    options?: ISettingsOptional;
  }) {
    if (!isElement(props.parent)) {
      throw new Error(`First argument should be an element. Provided ${typeof props.parent}`);
    }
    if (!props.parent.id) {
      props.parent.id = `native-scroll-augment-parent-${NativeScrollAugment.generateId()}`;
    }
    if (!isArray(props.scrollsAreas)) {
      throw new Error(`Second argument should be an array. Provided ${typeof props.scrollsAreas}`);
    }
    props.scrollsAreas.forEach(($node, index) => {
      if (!isElement($node)) {
        throw new Error(`Entries in second argument should be an element. Provided ${typeof $node} at index ${index}`);
      }
      if (!$node.id) {
        $node.id = `scroll-area-${NativeScrollAugment.generateId()}`;
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

    this.settings = extend(
      {},
      defaultOptions,
      props.options,
    );
  }

  public _bindMethods() {
    this._tap = this._tap.bind(this)
    this._swipe = this._swipe.bind(this)
    this._release = this._release.bind(this)
    this._onScroll = this._onScroll.bind(this)
    this._setActiveNode = this._setActiveNode.bind(this)
    this._autoScroll = this._autoScroll.bind(this)
  }

  public init() {
    this._bindMethods()

    this.$parent.addEventListener(this.DETECT_EVT, this._setActiveNode, true);
    this.$parent.addEventListener('scroll', this._onScroll, true);

    if (!this.hasTouch && this.settings.enableKinetics) {
      this.$parent.addEventListener('mousedown', this._tap, true);
    }
  }

  public destroy() {
    this.$parent.addEventListener(this.DETECT_EVT, this._setActiveNode, true);
    this.$parent.addEventListener('scroll', this._onScroll, true);

    if (!this.hasTouch && this.settings.enableKinetics) {
      this.$parent.removeEventListener('mousedown', this._tap);
    }
  }

  public updateOptions(options: ISettingsOptional) {
    this.settings = extend(
      {},
      defaultOptions,
      options,
    );
  }

  public replaceScrollAreas(scrollsAreas: HTMLElement[], left?: number, top?: number) {
    let ok = true;
    let notElement: {
      $node: HTMLElement;
      index: number;
    } | undefined;

    if (!isArray(scrollsAreas)) {
      console.error(`Argument should be an array. Provided ${typeof scrollsAreas}`);
      ok = false;
    } else {
      scrollsAreas.forEach(($node, index) => {
        if (!isElement($node)) {
          console.error(`Entries in argument should be an element.
            Provided ${typeof $node} at index ${index}`);
          ok = false;
        }
      });
    }

    if (ok) {
      this._cancelAutoScroll();

      this.scrollLeft = isNumber(left) ? left : 0;
      this.scrollTop = isNumber(top) ? top : 0;

      this._resetMomentum();

      this.scrollsAreas = scrollsAreas;
    }
  }

  public _setActiveNode(e: Event) {
    this.activeId = findMatchingTarget(e.target, this.scrollsAreas);

    // if its a touch device and we are autoscrolling
    // it should stop as soon as the user touches the scroll area
    // else there will be jerky effects
    if (this.hasTouch) {
      this._cancelAutoScroll();
    }
  }

  public _leftVelocityTracker() {
    const now = getTime();
    const elapsed = now - this.timeStamp;
    const delta = this.scrollLeft - this.lastScrollLeft;

    this.timeStamp = now;
    this.lastScrollLeft = this.scrollLeft;

    this.velocityLeft = this.settings.movingAverage * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityLeft;
  }

  public _topVelocityTracker() {
    const now = getTime();
    const elapsed = now - this.timeStamp;
    const delta = this.scrollTop - this.lastScrollTop;

    this.timeStamp = now;
    this.lastScrollTop = this.scrollTop;

    this.velocityTop = this.settings.movingAverage * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityTop;
  }

  public _scrollTo(left: number, top: number) {
    const correctedLeft = Math.round(left);
    const correctedTop = Math.round(top);

    this.scrollsAreas.forEach(($node) => {
      const maxScrollX = $node.scrollWidth - $node.clientWidth;
      const maxScrollY = $node.scrollHeight - $node.clientHeight;

      if (maxScrollX > 0 && correctedLeft >= 0 && correctedLeft <= maxScrollX) {
        $node.scrollLeft = correctedLeft;
        this.scrollLeft = correctedLeft;
      }
      if (maxScrollY > 0 && correctedTop >= 0 && correctedTop <= maxScrollY) {
        $node.scrollTop = correctedTop;
        this.scrollTop = correctedTop;
      }
    });
  }

  public _onScroll(e: Event) {
    const target = (e.target as HTMLElement);
    let valX: number;
    let valY: number;

    if (this.pressed || this.isAutoScrolling) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (target.clientWidth !== target.scrollWidth) {
      valX = target.scrollLeft;
      this.lastScrollLeft = this.scrollLeft;
      this.scrollLeft = valX;
    } else {
      valX = this.scrollLeft;
    }
    if (target.clientHeight !== target.scrollHeight) {
      valY = target.scrollTop;
      this.lastScrollTop = this.scrollTop;
      this.scrollTop = valY;
    } else {
      valY = this.scrollTop;
    }

    this.scrollsAreas.forEach(($node) => {
      if ($node.id !== this.activeId) {
        $node.scrollLeft = valX;
        $node.scrollTop = valY;
      }
    });
  }

  public _autoScroll() {
    const TIME_CONST = 325;
    const elapsed = getTime() - this.timeStamp;
    let deltaY = 0;
    let deltaX = 0;
    let scrollX = 0;
    let scrollY = 0;

    if (this.amplitudeTop) {
      deltaY = -this.amplitudeTop * Math.exp(-elapsed / TIME_CONST);
    }
    if (this.amplitudeLeft) {
      deltaX = -this.amplitudeLeft * Math.exp(-elapsed / TIME_CONST);
    }

    if (deltaX > 0.5 || deltaX < -0.5) {
      scrollX = deltaX;
    } else {
      scrollX = 0;
    }

    if (deltaY > 0.5 || deltaY < -0.5) {
      scrollY = deltaY;
    } else {
      scrollY = 0;
    }

    this._scrollTo(this.targetLeft + scrollX, this.targetTop + scrollY);

    if (scrollX !== 0 || scrollY !== 0) {
      this.autoScrollTracker = requestAnimationFrame(this._autoScroll);
    } else {
      this.isAutoScrolling = false;
      this.autoScrollTracker = -1;
    }
  }

  public _triggerAutoScroll(
    targetLeft: number,
    targetTop: number,
    amplitudeLeft: number,
    amplitudeTop: number,
  ) {
    if (amplitudeLeft !== 0 || amplitudeTop !== 0) {
      this._cancelAutoScroll();

      this.timeStamp = getTime();
      this.targetLeft = targetLeft;
      this.targetTop = targetTop;
      this.amplitudeLeft = amplitudeLeft;
      this.amplitudeTop = amplitudeTop;

      this.isAutoScrolling = true;
      this.autoScrollTracker = requestAnimationFrame(this._autoScroll);
    }
  }

  public _cancelAutoScroll() {
    if (this.isAutoScrolling) {
      cancelAnimationFrame(this.autoScrollTracker);
      this.isAutoScrolling = false;
      this.autoScrollTracker = -1;
    }
  }

  public _resetMomentum() {
    this.velocityTop = this.amplitudeTop = 0;
    this.velocityLeft = this.amplitudeLeft = 0;

    this.lastScrollTop = this.scrollTop;
    this.lastScrollLeft = this.scrollLeft;
  }

  public _tap(e: MouseEvent | TouchEvent) {
    const point = getPoint(e, this.hasTouch);

    this.pressed = true;
    this.referenceX = point.x;
    this.referenceY = point.y;

    this._resetMomentum();

    this.timeStamp = getTime();

    this._cancelAutoScroll();

    this.$parent.addEventListener('mousemove', this._swipe, true);
    this.$parent.addEventListener('mouseup', this._release, true);

    if (preventDefaultException((e.target as HTMLElement), this.settings.preventDefaultException)) {
      e.preventDefault();
    }
  }

  public _swipe(e: MouseEvent | TouchEvent) {
    const point = getPoint(e, this.hasTouch);
    let x;
    let y;
    let deltaX;
    let deltaY;

    if (this.pressed) {
      x = point.x;
      y = point.y;

      deltaX = this.referenceX - x;
      deltaY = this.referenceY - y;

      if (deltaX > 2 || deltaX < -2) {
        this.referenceX = x;
      } else {
        deltaX = 0;
      }
      if (deltaY > 2 || deltaY < -2) {
        this.referenceY = y;
      } else {
        deltaY = 0;
      }

      this._leftVelocityTracker();
      this._topVelocityTracker();

      this._scrollTo(this.scrollLeft + deltaX, this.scrollTop + deltaY);

      if (this.resetMomentumTracker !== -1) {
        clearTimeout(this.resetMomentumTracker);
        this.resetMomentumTracker = -1;
      }
      this.resetMomentumTracker = setTimeout(() => {
        if (this.pressed) {
          this._resetMomentum();
        }
      }, 100);
    }
  }

  public _release() {
    let targetLeft = this.targetLeft;
    let targetTop = this.targetTop;
    let amplitudeLeft = this.amplitudeLeft;
    let amplitudeTop = this.amplitudeTop;

    this.pressed = false;

    this._topVelocityTracker();
    this._leftVelocityTracker();

    if (this.velocityLeft > 10 || this.velocityLeft < -10) {
      amplitudeLeft = 0.8 * this.velocityLeft;
      targetLeft = Math.round(this.scrollLeft + amplitudeLeft);
    } else {
      targetLeft = this.scrollLeft;
    }
    if (this.velocityTop > 10 || this.velocityTop < -10) {
      amplitudeTop = 0.8 * this.velocityTop;
      targetTop = Math.round(this.scrollTop + amplitudeTop);
    } else {
      targetTop = this.scrollTop;
    }

    this._triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);

    this.$parent.removeEventListener('mousemove', this._swipe);
    this.$parent.removeEventListener('mouseup', this._release);
  }

  public _scrollToEdges(start: boolean, left: boolean, top: boolean) {
    let targetLeft = 0;
    let targetTop = 0;
    let amplitudeLeft = 0;
    let amplitudeTop = 0;
    let maxScroll;

    if (start) {
      targetLeft = left ? 0 : this.scrollLeft;
      targetTop = top ? 0 : this.scrollTop;
      amplitudeLeft = left ? -this.scrollLeft : 0;
      amplitudeTop = top ? -this.scrollTop : 0;
    } else {
      maxScroll = getMaxScroll(this.scrollsAreas);

      targetLeft = left ? maxScroll.left : this.scrollLeft;
      targetTop = top ? maxScroll.top : this.scrollTop;
      amplitudeLeft = left ? maxScroll.left - this.scrollLeft : 0;
      amplitudeTop = top ? maxScroll.top - this.scrollTop : 0;
    }

    this._triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);
  }

  public _scrollToValue(addTo: boolean, left: any, top: any) {
    let maxScroll;
    let numLeft;
    let corrLeft;
    let numTop;
    let corrTop;
    let targetLeft;
    let targetTop;
    let moveLeft;
    let moveTop;
    let amplitudeLeft;
    let amplitudeTop;

    maxScroll = getMaxScroll(this.scrollsAreas);

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
  }

  public scrollToStart() {
    this._scrollToEdges(true, true, true);
  }
  public scrollToStartLeft() {
    this._scrollToEdges(true, true, false);
  }
  public scrollToStartTop() {
    this._scrollToEdges(true, false, true);
  }
  public scrollToEnd() {
    this._scrollToEdges(false, true, true);
  }
  public scrollToEndLeft() {
    this._scrollToEdges(false, true, false);
  }
  public scrollToEndTop() {
    this._scrollToEdges(false, false, true);
  }

  public scrollToPosition(left: any, top: any) {
    this._scrollToValue(false, left, top);
  }
  public scrollByValue(left: any, top: any) {
    this._scrollToValue(true, left, top);
  }
}
