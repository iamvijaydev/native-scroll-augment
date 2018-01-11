import {
  isElement,
  isArray,
  isString,
  extend,
  find,
  isUndefined
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
  static scrollGen(context: NativeScrollAugment, start: boolean, left: boolean, top: boolean) {
    return () => {
      let targetLeft = 0;
      let targetTop = 0;
      let amplitudeLeft = 0;
      let amplitudeTop = 0;
      let maxScroll;

      if (start) {
        targetLeft = left ? 0 : context.scrollLeft;
        targetTop = top ? 0 : context.scrollTop;
        amplitudeLeft = left ? -context.scrollLeft : 0;
        amplitudeTop = top ? -context.scrollTop : 0;
      } else {
        maxScroll = getMaxScroll(context.scrollsAreas);

        targetLeft = left ? maxScroll.left : context.scrollLeft;
        targetTop = top ? maxScroll.top : context.scrollTop;
        amplitudeLeft = left ? maxScroll.left - context.scrollLeft : 0;
        amplitudeTop = top ? maxScroll.top - context.scrollTop : 0;
      }

      context.triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);
    };
  }

  static scrollToBy(context: NativeScrollAugment, addTo: boolean) {
    return (left: any, top: any) => {
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

      maxScroll = getMaxScroll(context.scrollsAreas);

      numLeft = parseInt(left, 10);
      numTop = parseInt(top, 10);

      corrLeft = isNaN(numLeft) ? context.scrollLeft : (addTo ? numLeft + context.scrollLeft : numLeft);
      corrTop = isNaN(numTop) ? context.scrollTop : (addTo ? numTop + context.scrollTop : numTop);

      targetLeft = corrLeft > maxScroll.left ? maxScroll.left : (corrLeft < 0 ? 0 : corrLeft);
      targetTop = corrTop > maxScroll.top ? maxScroll.top : (corrTop < 0 ? 0 : corrTop);

      moveLeft = context.scrollLeft - targetLeft !== 0 ? true : false;
      moveTop = context.scrollTop - targetTop !== 0 ? true : false;

      amplitudeLeft = moveLeft ? targetLeft - context.scrollLeft : 0;
      amplitudeTop = moveTop ? targetTop - context.scrollTop : 0;

      context.triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);
    };
  }

  public scrollToStart = NativeScrollAugment.scrollGen(this, true, true, true);
  public scrollToStartLeft = NativeScrollAugment.scrollGen(this, true, true, false);
  public scrollToStartTop = NativeScrollAugment.scrollGen(this, true, false, true);
  public scrollToEnd = NativeScrollAugment.scrollGen(this, false, true, true);
  public scrollToEndLeft = NativeScrollAugment.scrollGen(this, false, true, false);
  public scrollToEndTop = NativeScrollAugment.scrollGen(this, false, false, true);
  public scrollToPosition = NativeScrollAugment.scrollToBy(this, false);
  public scrollByValue = NativeScrollAugment.scrollToBy(this, true);

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
    if (!isArray(props.scrollsAreas)) {
      throw new Error(`Second argument should be an array. Provided ${typeof props.scrollsAreas}`);
    }
    props.scrollsAreas.forEach(($node, index) => {
        if (!isElement($node)) {
          throw new Error(`Entries in second argument should be an element.
            Provided ${typeof $node} at index ${index}`);
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

    this.settings = extend(
      {},
      defaultOptions,
      props.options,
    );
  }

  public destroy() {
    this.$parent.addEventListener(this.DETECT_EVT, this.setActiveNode, true);
    this.$parent.addEventListener('scroll', this.onScroll, true);

    if (!this.hasTouch && this.settings.enableKinetics) {
      this.$parent.removeEventListener('mousedown', this.tap);
      this.$parent.removeEventListener('mousemove', this.swipe);
      this.$parent.removeEventListener('mouseup', this.release);
    }
  }

  public init() {
    this.$parent.addEventListener(this.DETECT_EVT, this.setActiveNode, true);
    this.$parent.addEventListener('scroll', this.onScroll, true);

    if (!this.hasTouch && this.settings.enableKinetics) {
      this.$parent.addEventListener('mousedown', this.tap, true);
    }
  }

  public updateOptions(options: ISettingsOptional) {
    this.settings = extend(
      {},
      defaultOptions,
      options,
    );
  }

  public replaceScrollAreas(scrollsAreas: HTMLElement[]) {
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
      this.cancelAutoScroll();

      this.scrollTop = 0;
      this.scrollLeft = 0;

      this.resetMomentum();

      this.scrollsAreas = scrollsAreas;
    }
  }

  public setActiveNode(e: Event) {
    this.activeId = findMatchingTarget(e.target, this.scrollsAreas);

    // if its a touch device and we are autoscrolling
    // it should stop as soon as the user touches the scroll area
    // else there will be jerky effects
    if (this.hasTouch) {
      this.cancelAutoScroll();
    }
  }

  public leftVelocityTracker() {
    const now = getTime();
    const elapsed = now - this.timeStamp;
    const delta = this.scrollLeft - this.lastScrollLeft;

    this.timeStamp = now;
    this.lastScrollLeft = this.scrollLeft;

    this.velocityLeft = this.settings.movingAverage * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityLeft;
  }

  public topVelocityTracker() {
    const now = getTime();
    const elapsed = now - this.timeStamp;
    const delta = this.scrollTop - this.lastScrollTop;

    this.timeStamp = now;
    this.lastScrollTop = this.scrollTop;

    this.velocityTop = this.settings.movingAverage * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityTop;
  }

  public scrollTo(left: number, top: number) {
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

  public onScroll(e: Event) {
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

  public autoScroll() {
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

    this.scrollTo(this.targetLeft + scrollX, this.targetTop + scrollY);

    if (scrollX !== 0 || scrollY !== 0) {
      this.autoScrollTracker = requestAnimationFrame(this.autoScroll);
    } else {
      this.isAutoScrolling = false;
      this.autoScrollTracker = -1;
    }
  }

  public triggerAutoScroll(
    targetLeft: number,
    targetTop: number,
    amplitudeLeft: number,
    amplitudeTop: number,
  ) {
    if (amplitudeLeft !== 0 || amplitudeTop !== 0) {
      this.cancelAutoScroll();

      this.timeStamp = getTime();
      this.targetLeft = targetLeft;
      this.targetTop = targetTop;
      this.amplitudeLeft = amplitudeLeft;
      this.amplitudeTop = amplitudeTop;

      this.isAutoScrolling = true;
      this.autoScrollTracker = requestAnimationFrame(this.autoScroll);
    }
  }

  public cancelAutoScroll() {
    if (this.isAutoScrolling) {
      cancelAnimationFrame(this.autoScrollTracker);
      this.isAutoScrolling = false;
      this.autoScrollTracker = -1;
    }
  }

  public resetMomentum() {
    this.velocityTop = this.amplitudeTop = 0;
    this.velocityLeft = this.amplitudeLeft = 0;

    this.lastScrollTop = this.scrollTop;
    this.lastScrollLeft = this.scrollLeft;
  }

  public tap(e: MouseEvent | TouchEvent) {
    const point = getPoint(e, this.hasTouch);

    this.pressed = true;
    this.referenceX = point.x;
    this.referenceY = point.y;

    this.resetMomentum();

    this.timeStamp = getTime();

    this.cancelAutoScroll();

    this.$parent.addEventListener('mousemove', this.swipe, true);
    this.$parent.addEventListener('mouseup', this.release, true);

    if (preventDefaultException((e.target as HTMLElement), this.settings.preventDefaultException)) {
      e.preventDefault();
    }
  }

  public swipe(e: MouseEvent | TouchEvent) {
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

      this.leftVelocityTracker();
      this.topVelocityTracker();

      this.scrollTo(this.scrollLeft + deltaX, this.scrollTop + deltaY);

      if (this.resetMomentumTracker !== -1) {
        clearTimeout(this.resetMomentumTracker);
        this.resetMomentumTracker = -1;
      }
      this.resetMomentumTracker = setTimeout(() => {
        if (this.pressed) {
          this.resetMomentum();
        }
      }, 100);
    }
  }

  public release() {
    let targetLeft = this.targetLeft;
    let targetTop = this.targetTop;
    let amplitudeLeft = this.amplitudeLeft;
    let amplitudeTop = this.amplitudeTop;

    this.pressed = false;

    this.topVelocityTracker();
    this.leftVelocityTracker();

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

    this.triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);

    this.$parent.removeEventListener('mousemove', this.swipe);
    this.$parent.removeEventListener('mouseup', this.release);
  }
}
