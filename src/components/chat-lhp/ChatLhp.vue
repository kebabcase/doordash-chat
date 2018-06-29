<template>
  <div class="chat-lhp-container">
    <UserStatus/>
    <div
      class="room-item"
      v-for="room in roomList"
      :key="room.id"
      :class="{active: room.id === roomId}"
      @click="$emit('update:roomId', room.id)">
      {{room.name}}
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {IRoom} from '../../types';
import UserStatus from './user-status/UserStatus.vue';
import {http} from '../../services';

@Component({
  components: {
    UserStatus,
  }
})
export default class ChatLhp extends Vue {
  @Prop({default: -1}) private roomId!: number;

  private roomList: IRoom[] = [];

  private mounted() {
    this.fetchRoomList();
  }

  private fetchRoomList() {
    return http.get('/rooms')
      .then((response: any) => this.roomList = response.data)
      .catch((error: any) => {
        console.log(error);
      });
  }
}
</script>

<style scoped lang="scss">
.chat-lhp-container {
  width: 350px;
  height: 100%;
  float: left;
  color: #fff;
  background-color: #ff1940;

  .room-item {
    width: calc(100% - 40px);
    padding: 20px 20px 15px;
    font-size: 18px;
    text-align: left;

    &.active, &:hover {
      background-color: #800d20;
      cursor: pointer;
    }
  }
}
</style>
