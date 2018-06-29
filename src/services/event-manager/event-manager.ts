import {Callback, ISubscription} from '../../types';

class EventManager {
  private listeners: {[key: string]: Callback[]} = {};
  
  public emit(event: string, ...args: any[]) {
    const callbacks = this.listeners[event];
    if (callbacks && callbacks) {
      for (let i = 0, iLen = callbacks.length; i < iLen; i++) {
        callbacks[i].apply(null, ...args);
      }
    }
  }
  
  public subscribe(event: string, callback: Callback): ISubscription {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    
    this.listeners[event].push(callback);
    
    return {
      cancel: () => {
        const index = this.listeners[event].indexOf(callback);
        this.listeners[event].splice(index, 1);
      },
    }
  }
}

const eventManager = new EventManager();
export {eventManager};