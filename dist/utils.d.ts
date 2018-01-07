export declare const getTime: () => number;
export declare const findMatchingTarget: (target: EventTarget | null, nodes: HTMLElement[]) => string;
export declare const getPoint: (event: MouseEvent | TouchEvent, hasTouch: boolean) => {
    x: number;
    y: number;
};
export declare const preventDefaultException: (el: HTMLElement, exceptions: {
    [key: string]: RegExp;
}) => boolean;
export declare const getMaxScroll: (nodes: HTMLElement[]) => {
    left: number;
    top: number;
};
export declare const checkRequestAnimationFrame: () => void;
