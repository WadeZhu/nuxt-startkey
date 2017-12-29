<template>
  <div class="home-loading">
    <img src="~/static/image/user_active/img_gif.gif" class="home-loading-kaola">
    <p>正在火速赶往银行，请稍后...</p>
    <div class="home-loading-going">
      <div class="logo">
        <img src="~/static/image/user_active/icon_kaola.png">
      </div>
      <div class="icon">
        <span><i></i></span>
      </div>
      <div class="logo">
        <img src="~/static/image/user_active/icon_XW.png">
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * loading-kaola
   * @module components/loading-kaola
   * @desc 调用接口时的静态loading页面
   *
   * @example
   * <loading-kaola title="我是标题"></loading-kaola>
   */
  export default {
    name: 'loading-kaola'
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';
  .home-loading {
    padding: 50px 0;
    text-align: center;
    &-kaola {
      width: 300px;
      margin-bottom: 30px;

    }
    p {
      font-size: 28px;
      color: #c2c2c2;
      text-align: center;
    }
    &-going {
      margin-top: 100px;
      padding: 0px 150px;
      display: flex;
      height: 78px;
      .logo {
        flex: 1;
        img {
          height: 100%;
        }
      }
      .icon {
        flex: 1.5;
        position: relative;
        span {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150px;
          height: 6px;
          border-radius: 3px;
          background-color: #c2c2c2;
          transform: translate(-50%, -50%);
          i {
            display: block;
            width: 35%;
            height: 100%;
            background-color: #f1973c;
            float: left;
          }
        }
      }
    }
  }
</style>
