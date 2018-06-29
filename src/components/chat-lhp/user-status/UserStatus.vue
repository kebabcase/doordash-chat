<template>
  <div class="user-status-container">
    <div class="user-name">
      {{username}}
    </div>
    <div class="session-duration">
      Online for {{duration}} minutes
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {userInfo} from '../../../services';

@Component
export default class UserStatus extends Vue {
  private username: string = '';
  private duration: string = '0';

  private updateDurationInterval!: number;

  private mounted() {
    this.username = userInfo.username;

    this.updateDuration();
  }

  private destroyed() {
    clearInterval(this.updateDurationInterval);
  }

  private updateDuration() {
    this.updateDurationInterval = window.setInterval(() => {
      this.duration = userInfo.getDuration();
    }, 60000);
  }
}
</script>

<style scoped lang="scss">
.user-status-container {
  width: calc(100% - 40px);
  height: 100px;
  padding: 20px 20px 15px;

  .user-name {
    margin: 8px 0;
    font-size: 24px;
    font-weight: 600;
  }
}
</style>
