class UserInfo {
  private currentUsername = '';
  private loggedInTime: number = 0;
  
  public get username(): string {
    return this.currentUsername;
  }
  
  public set username(username: string) {
    if (username.length) {
      this.currentUsername = username;
      this.loggedInTime = Date.now();
    }
  }
  
  public isLoggedIn(): boolean {
    return !!this.username.length;
  }
  
  public getDuration(): string {
    const currentTime = Date.now();
    console.log('Current time: ', currentTime);
    console.log('Logged in time: ', this.loggedInTime);
    const duration = Math.floor((currentTime - this.loggedInTime) / 60000);
    return `${duration}`;
  }
}

const userInfo = new UserInfo();
export {userInfo};
