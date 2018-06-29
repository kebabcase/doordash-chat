export type Callback = (args: any) => void;

export interface ISubscription {
  cancel: () => void;
}
