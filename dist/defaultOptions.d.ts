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
export declare const defaultOptions: ISettings;
