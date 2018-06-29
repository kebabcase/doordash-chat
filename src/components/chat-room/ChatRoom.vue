<template>
  <div class="chat-room-container">
    <RoomDetail :room-id="roomId"/>
    <div class="messages-container">
      <div class="messages-content">
        <Message
          v-for="(message, index) in messages"
          :key="index"
          :message="message"/>
      </div>
    </div>
    <SendMessage
      class="send-message"
      :room-id="roomId"/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {IMessage, ISubscription} from '../../types';
import RoomDetail from './room-detail/RoomDetail.vue';
import Message from './message/Message.vue';
import SendMessage from './send-message/SendMessage.vue';
import {eventManager} from '../../services';
import {messageManager} from './message-manager';

@Component({
  components: {
    RoomDetail,
    Message,
    SendMessage,
  },
})
export default class ChatRoom extends Vue {
  @Prop({default: -1}) private roomId!: number;

  private onMessageAddedSubscription!: ISubscription;

  private messages: IMessage[] = [];

  private mounted() {
    this.onRoomIdChanged(this.roomId);

    this.onMessageAddedSubscription = eventManager.subscribe('onMessageAdded', this.onMessageAdded.bind(this));
  }

  private updated() {
    this.scrollToBottom();
  }

  private destroyed() {
    this.onMessageAddedSubscription.cancel();
  }

  private onMessageAdded() {
    this.messages = messageManager.messages;
  }

  private scrollToBottom() {
    const messagesContainer = this.$el.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  @Watch('roomId') private onRoomIdChanged(roomId: number) {
    messageManager.onRoomChanged(roomId)
      .then((messages) => {
        if (typeof messages !== 'string') {
          this.messages = messages;
        }
      });
  }
}
</script>

<style scoped lang="scss">
.chat-room-container {
  position: relative;
  width: calc(100% - 350px);
  height: 100%;
  float: left;

  .messages-container {
    flex: 1;
    display: flex;
    width: calc(100% - 40px);
    height: calc(100% - 260px);
    padding: 20px;
    background-color: #eff1f2;
    overflow: auto;

    .messages-content {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: flex-end;
      min-height: min-content;
    }
  }

  .send-message {
    position: absolute;
    bottom: 0;
  }
}
</style>
