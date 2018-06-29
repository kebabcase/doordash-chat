<template>
  <div class="send-message-container">
    <div class="send-message-input-container">
      <input
        class="send-message-input"
        placeholder="Type a message..."
        v-model="message"/>
    </div>
    <div class="send-message-button-container">
      <button
        class="send-message-btn"
        :disabled="roomId < 0 || !message.length"
        @click="onSendBtnClicked">
        Send
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {eventManager, userInfo} from '../../../services';
import {messageManager} from '../message-manager';

@Component
export default class SendMessage extends Vue {
  @Prop({default: -1}) private roomId!: number;

  private message: string = '';

  private onSendBtnClicked() {
    messageManager.addMessage({
      name: userInfo.username,
      message: this.message,
    })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          this.message = '';
          eventManager.emit('onMessageAdded');
        }
      });
  }
}
</script>

<style scoped lang="scss">
$buttonWidth: 50px;

.send-message-container {
  width: 100%;
  height: 100px;
  box-shadow: 0 -5px 5px -2px #dcdcdc;

  .send-message-input-container {
    width: calc(100% - #{$buttonWidth + 60px});
    height: calc(100% - 40px);
    margin: 20px 10px 20px 20px;
    float: left;

    .send-message-input {
      width: calc(100% - 40px);
      height: calc(100% - 20px);
      padding: 10px 20px;
      color: #464646;
      font-size: 18px;
      border-style: none;
      border-radius: 5px;
      border: 1px solid #c8c8c8;
      box-shadow: 0 1px 1px #dcdcdc;

      &:focus {
        outline: none;
      }
    }
  }

  .send-message-button-container {
    width: $buttonWidth;
    height: calc(100% - 40px);
    margin: 20px 20px 20px 10px;
    float: left;

    .send-message-btn {
      width: $buttonWidth;
      height: 100%;
      font-size: 18px;
      font-weight: 600;
      color: #4a90e2;
      border: none;
      background: none;

      &:disabled {
        cursor: not-allowed;
      }

      &:hover:not([disabled]) {
        cursor: pointer;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
