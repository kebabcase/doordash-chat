import {IMessage} from '../../types';
import {http} from '../../services';

class MessageManager {
  private FETCH_INTERVAL = 2000;

  private currentRoom: number = -1;
  private currentMessages: IMessage[] = [];

  constructor() {
    this.init();
  }

  private init() {
    setInterval(() => {
      if (this.currentRoom >= 0) {
        this.fetch(this.currentRoom);
      }
    }, this.FETCH_INTERVAL);
  }

  public onRoomChanged(roomId: number) {
    this.currentRoom = roomId;
    return this.fetch(roomId);
  }

  private fetch(roomId: number): Promise<IMessage[] | string> {
    return http.get(`/rooms/${roomId}/messages`)
      .then((response: any) => {
        if (response.data.error) {
          this.currentMessages = [];
          console.log(response.data.error);
          return response.data.error;
        } else {
          this.currentMessages = response.data;
          return this.messages;
        }
      });
  }

  public addMessage(message: IMessage) {
    this.message = message;
    return http.post(`/rooms/${this.currentRoom}/messages`, message);
  }

  public get messages(): IMessage[] {
    return this.currentMessages;
  }

  public set message(message: IMessage) {
    this.currentMessages.push(message);
  }
}

const messageManager = new MessageManager();
export {messageManager};
