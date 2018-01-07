export interface ISettings {
  enableKinetics: boolean;
  movingAverage: number;
  preventDefaultException: {
    [key: string]: RegExp;
  };
}

export interface ISettingsOptional {
  enableKinetics?: boolean;
  movingAverage?: number;
  preventDefaultException?: {
    [key: string]: RegExp;
  };
}

export const defaultOptions: ISettings = {
  enableKinetics: false,
  movingAverage: 0.1,
  preventDefaultException: {
    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/,
  },
};
