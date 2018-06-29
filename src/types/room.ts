import {IMessage} from './message';

export interface IRoom {
  id: number;
  name: string;
  users?: string[];
  messages?: IMessage[];
}
