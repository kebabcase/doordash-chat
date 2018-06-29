<template>
  <div class="room-detail-container">
    <h1 class="room-name">
      {{room.name}}
    </h1>
    <div class="users-in-room">
      <div
        v-for="(user, index) in room.users"
        :key="user"
        :class="{'current-user': user === currentUser}">
        <p v-if="index > 0">,&nbsp;</p>{{user}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {IRoom, ISubscription} from '../../../types';
import {http, eventManager, userInfo} from '../../../services';

@Component
export default class RoomDetail extends Vue {
  @Prop({default: -1}) private roomId!: number;

  private currentUser = '';
  private room: IRoom = {} as IRoom;

  private onMessageAddedSubscription!: ISubscription;

  private mounted() {
    this.currentUser = userInfo.username;

    this.onRoomIdChanged(this.roomId);

    this.onMessageAddedSubscription = eventManager.subscribe('onMessageAdded', () => {
      this.onRoomIdChanged(this.roomId);
    });
  }

  @Watch('roomId') private onRoomIdChanged(roomId: number) {
    http.get(`/rooms/${roomId}`)
      .then((response: any) => this.room = response.data)
      .catch((error: any) => {
        console.log(error);
      });
  }
}
</script>

<style scoped lang="scss">
.room-detail-container {
  position: relative;
  width: 100%;
  height: 120px;
  text-align: center;
  color: #777;
  box-shadow: 0 5px 5px -2px #dcdcdc;

  .room-name {
    padding-top: 30px;
    margin: 0 0 15px;
    font-weight: 400;
  }

  .users-in-room {
    font-size: 18px;

    & * {
      display: inline-block;
      margin: 0;
    }

    .current-user {
      color: #ff1940;
    }
  }
}
</style>
