<template>
  <div class="app-tabbar">
    <a class="app-tabbar-item app-tabbar-item--home" :class="{active: activePage === 'home'}" href="/msite/home">考拉理财</a>
    <a class="app-tabbar-item app-tabbar-item--asset" :class="{active: activePage === 'assets'}" href="/msite/assets">投资</a>
    <a class="app-tabbar-item app-tabbar-item--wabao" :class="{active: activePage === 'wabao'}" href="/msite/wabao">挖宝<span class="news" v-if="hasTicketNews &&hasTicketNews !== '0'">{{hasTicketNews}}</span></a>
    <a class="app-tabbar-item app-tabbar-item--user_center" :class="{active: activePage === 'user_center'}" href="/msite/user_center">我的资产</a>
  </div>
</template>

<script>
  export default {
    name: 'app-tabbar',
    props: ['activePage', 'hasTicketNews']
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';

  .app-tabbar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid @line-dark-color; /* no */
    z-index: 999;
    background-color: #fff;
  }

  .news {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background-color: @text-red-color;
    font-size: @text-s-size;
    position: absolute;
    top: 10px;
    right: 30px;
    color: white;
  }

  .app-tabbar-item {
    padding-top: 32 * .25px;
    padding-bottom: 32 * .15px;
    text-align: center;
    flex-grow: 1;
    width: 33.3333%;
    font-size: 28px;
    color: @text-gray-color;
    position: relative;
    &:before {
      content: '';
      display: block;
      width: 60px;
      height: 60px;
      margin: 0 auto;
      color: transparent;
      text-indent: -999px;
      background-image: url('~/static/image/common/tab.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }

    &.active {
      color: #f1973c;
    }

    &--home {
      &:before {
        background-position: 0 0;
      }
      &.active {
        &:before {
          background-position: 0 14.3%;
        }
      }
    }

    &--asset {
      &:before {
        background-position: 0 28.6%;
      }
      &.active {
        &:before {
          background-position: 0 42.9%;
        }
      }
    }

    &--wabao {
      &:before {
        background-position: 0 57.1%;
      }
      &.active {
        &:before {
          background-position: 0 71.4%;
        }
      }
    }

    &--user_center {
      &:before {
        background-position: 0 85.7%;
      }
      &.active {
        &:before {
          background-position: 0 100%;
        }
      }
    }
  }
</style>
