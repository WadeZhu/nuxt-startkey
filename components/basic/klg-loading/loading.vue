<template>
  <div class="klg-loading">
    <div v-if="isShowCover" class="klg-loading-cover"></div>
    <div class="klg-loading-mask"></div>
    <div class="klg-loading-avatar"></div>
    <div class="klg-loading-spinner"></div>
    <div class="klg-loading-text">{{text}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: '考拉奋力加载中...'
      },
      isShowCover: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="less" scope>
  @keyframes rotate {
    from {
      transform: rotateZ(0)
    }

    to {
      transform: rotateZ(360deg)
    }
  }

  .klg-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 240px;
    height: 240px;
    margin-top: -120px;
    margin-left: -120px;
    z-index: 99999;
    &-cover {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #000;
      opacity: .4;
    }
    &-mask {
      width: 100%;
      height: 100%;
      border-radius: 30px;
      background: #000;
      opacity: .5;
    }
    &-avatar,
    &-spinner {
      position: absolute;
      top: 40px;
      left: 60px;
      width: 120px;
      height: 120px;
      background: url(https://app.kaolalicai.cn/images/common/loading.png) no-repeat;
      background-size: 100%;
    }
    &-spinner {
      background-position: 0 100%;
      animation: rotate 2s infinite;
    }
    &-text {
      position: absolute;
      top: 170px;
      width: 100%;
      font-size: 24px;
      text-align: center;
      color: #fff;
    }
  }
</style>
