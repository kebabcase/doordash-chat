<template>
  <div class="message-row">
    <div
      class="message-container"
      :class="{'user-sent': sentByUser}">
      <div class="message-display-container">
        {{message.message}}
      </div>
      <div
        class="sender-display-container"
        v-if="!sentByUser">
        {{message.name}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {IMessage} from '../../../types';
import {userInfo} from '../../../services';

@Component
export default class Message extends Vue {
  @Prop({default: {id: '', name: '', message: '', reaction: null}}) private message!: IMessage;

  private currentUser: string = '';
  private sentByUser: boolean = false;

  private mounted() {
    this.currentUser = userInfo.username;
    this.sentByUser = this.message.name === this.currentUser;
  }
}
</script>

<style scoped lang="scss">
.message-row {
  width: 100%;

  .message-container {
    max-width: 50%;
    width: 80%;
    min-height: 80px;

    .message-display-container {
      padding: 20px 30px;
      margin: 8px 0;
      color: #464646;
      font-size: 18px;
      line-height: 25px;
      border-radius: 25px;
      background-color: #fff;
    }

    .sender-display-container {
      margin: 8px 0;
      font-size: 18px;
      color: #696969;
    }

    &.user-sent {
      float: right;

      .message-display-container {
        color: #fff;
        background-color: #ff1940;
      }
    }
  }
}
</style>
