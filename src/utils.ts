import { find } from 'lodash';

export const getTime = Date.now ? Date.now : () => new Date().getTime();

export const findMatchingTarget = (
  target: EventTarget | null,
  nodes: HTMLElement[],
): string => {
  const domTarget = target as HTMLElement;

  if (!nodes.length || domTarget.tagName === 'BODY') {
    return 'BODY';
  }

  const found = find(nodes, (node) => node.id === domTarget.id);

  return found ? domTarget.id : findMatchingTarget(domTarget.parentElement, nodes);
};

export const getPoint = (
  event: MouseEvent | TouchEvent,
  hasTouch: boolean,
): {
  x: number;
  y: number;
} => {
  let point;
  const mEvent = (event as MouseEvent);
  const tEvent = (event as TouchEvent);

  if (hasTouch && tEvent.touches.length) {
    point = {
      x: tEvent.touches[0].clientX,
      y: tEvent.touches[0].clientY,
    };
  } else {
    point = {
      x: mEvent.clientX,
      y: mEvent.clientY,
    };
  }

  return point;
};

export const preventDefaultException = (
  el: HTMLElement,
  exceptions: {
    [key: string]: RegExp,
  },
): boolean => {
  for (const i in exceptions) {
    if (exceptions[i].test((el as any)[i])) {
      return true;
    }
  }

  return false;
};

export const getMaxScroll = (
  nodes: HTMLElement[],
): {
  left: number;
  top: number;
} => {
  let maxScrollLeft = 0;
  let maxScrollTop = 0;

  nodes.forEach((node) => {
    const $el = node.children[0];
    const maxScrollX = $el.scrollWidth - $el.clientWidth;
    const maxScrollY = $el.scrollHeight - $el.clientHeight;

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

export const checkRequestAnimationFrame = () => {
  let lastTime = 0;
  const vendors = ['ms', 'moz', 'webkit', 'o'];

  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = (window as any)[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = (window as any)[vendors[x] + 'CancelAnimationFrame']
      || (window as any)[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback) => {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id) => {
      clearTimeout(id);
    };
  }
};
