<template>
  <div class="log-in-container-row">
    <div class="log-in-container-col">
      <div class="username-input-container">
        <input
          class="username-input"
          v-model="username"
          placeholder="Type your username..."/>
      </div>
      <div class="log-in-btn-container">
        <button
          class="log-in-btn"
          :disabled="!username.length"
          @click="onLogInBtnClicked">
          Join the DoorDash Chat!
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {eventManager, userInfo} from '../../services';

@Component
export default class LogIn extends Vue {
  private username: string = '';

  private onLogInBtnClicked() {
    userInfo.username = this.username;
    if (userInfo.isLoggedIn()) {
      eventManager.emit('onUserLogIn');
    }
  }
}
</script>

<style scoped lang="scss">
$buttonWidth: 500px;
$buttonHeight: 50px;
$buttonFontSize: 18px;

.log-in-container-row {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;

  .log-in-container-col {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .username-input-container {
      width: $buttonWidth;
      height: $buttonHeight;
      margin-bottom: 20px;

      .username-input {
        width: calc(100% - 20px);
        height: 100%;
        font-size: $buttonFontSize;
        padding-left: 20px;
        color: #464646;
        border-style: none;
        border-radius: 5px;
        border: 1px solid #c8c8c8;
        box-shadow: 0 1px 1px #dcdcdc;

        &:focus {
          outline: none;
        }
      }
    }

    .log-in-btn-container {
      width: $buttonWidth;
      height: $buttonHeight;
      margin-top: 20px;

      .log-in-btn {
        width: 100%;
        height: 100%;
        font-size: $buttonFontSize;
        color: #fff;
        background-color: #ff1940;
        border-style: none;
        border-radius: 5px;

        &:disabled {
          background-color: #777;
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
}
</style>
