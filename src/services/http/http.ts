import axios from 'axios';

class Http {
  private ABSOLUTE_PATH = 'http://localhost:8000/api';
  
  public get(url: string): Promise<any> {
    return axios.get(`${this.ABSOLUTE_PATH}${url}`);
  }
  
  public post(url: string, payload: any): Promise<any> {
    console.log('Http: post: ', payload);
    return axios.post(`${this.ABSOLUTE_PATH}${url}`, payload);
  }
}

const http = new Http();
export {http};
