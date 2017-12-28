<template>
  <header
    v-if="!($device && $device.isApp)"
    class="app-header">
    <div class="app-header-button is-left">
      <slot name="left"></slot>
    </div>
    <h1 class="app-header-title" v-text="title"></h1>
    <div class="app-header-button is-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
  /**
   * app-header
   * @module components/app-header
   * @desc 顶部导航
   * @param {string} [title] - 标题
   * @param {slot} [left] - 显示在左侧区域
   * @param {slot} [right] - 显示在右侧区域
   *
   * @example
   * <app-header title="我是标题">
   *   <a slot="left" @click="handleBack">返回</a>
   *   <a slot="right" href="#">操作</a>
   * </app-header>
   */
  export default {
    name: 'app-header',
    props: {
      fixed: Boolean,
      title: String
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';

  .app-header {
    display: flex;
    align-items: center;
    position: relative;
    background-color: #fff;
    padding: 18px 38.4px;
    text-align: center;
    // 1px border
    &:after {
      .setBottomLine(@text-orange-color);
    }
    &-title {
      flex: 1.3;
      font-size: 35.2px;
    }
    &-button {
      flex: .5;
      > a {
        color: inherit;
      }
      > .app-header-back {
        &:after {
          content: " ";
          .setArrow(left, 22.4px, #4f4f4f, 4px);
        }
      }
      &.is-left {
        text-align: left;
      }
      &.is-right {
        text-align: right;
      }
    }
  }
</style>
