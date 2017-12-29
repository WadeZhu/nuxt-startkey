<template>
  <div class="alarm-progress" :class="classes">
    <div class="alarm-progress-inner">
      <div class="alarm-progress-trail" :style="trailStyle"></div>
    </div>
    <img class="alarm-progress-icon" :src="iconSrc">
    <span class="alarm-progress-text">{{text}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      text: String,
      percent: Number,
      type: {
        type: String,
        default: 'primary'
      }
    },
    name: 'alarm-progress',
    computed: {
      classes () {
        return [
          `alarm-progress--${this.type}`
        ]
      },
      iconSrc() {
        return this.type === 'secondary'
          ? '~/static/image/common/icon_alarm_r.png'
          : '~/static/image/common/icon_alarm_y.png'
      },
      trailStyle() {
        return {
          width: this.percent + '%',
          transition: 'width 0.3s ease'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';

  .alarm-progress {
    position: relative;
    height: 32px;
    text-align: right;
    &-icon {
      position: absolute;
      left: -28px;
      bottom: -2px;
      width: 55.33px;
      height: 38px
    }
    &-inner {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      height: 100%;
      overflow: hidden;
      background-color: #dddddd;
      border-radius: 0 32px 32px 0;
    }
    &-trail {
      height: 100%;
      background-color: #F6C141;
    }
    &-text {
      position: absolute;
      right: 20px;
      top: 0;
      color: #fff;
      font-size: 22px;
    }
  }

  .alarm-progress--secondary .alarm-progress-trail {
    background-color: #FA5A2B;
  }
</style>