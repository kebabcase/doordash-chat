<template>
  <div id="app">
    <LogIn v-if="!loggedIn"/>
    <div
      class="app-container"
      v-else>
      <ChatLhp :room-id.sync="selectedRoomId"/>
      <ChatRoom
        v-if="selectedRoomId >= 0"
        :room-id="selectedRoomId"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {ISubscription} from './types';
import {eventManager, userInfo} from './services';
import LogIn from './components/log-in/LogIn.vue';
import ChatLhp from './components/chat-lhp/ChatLhp.vue';
import ChatRoom from './components/chat-room/ChatRoom.vue';

@Component({
  components: {
    LogIn,
    ChatLhp,
    ChatRoom,
  },
})
export default class App extends Vue {
  private loggedIn = false;
  private selectedRoomId = -1;

  private onUserLogInSubscription!: ISubscription;

  private mounted() {
    this.onUserLogInSubscription = eventManager.subscribe('onUserLogIn', this.onUserLogIn.bind(this));
  }

  private destroyed() {
    this.onUserLogInSubscription.cancel();
  }

  private onUserLogIn() {
    this.loggedIn = userInfo.isLoggedIn();
  }
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .app-container {
    width: 100%;
    height: 100%;
  }
}
</style>
