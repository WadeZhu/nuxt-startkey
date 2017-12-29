<template>
  <div class="credict-info">
    <p class="credict-info-title">{{title}}</p>
    <div class="credict-info-description">
      <slot name="description"></slot>
    </div>
    <img :src="imgSrc">
    <div v-if="$slots.mainContent" class="credict-info-main-content">
      <slot name="mainContent"></slot>
    </div>
    <div v-if="$slots.secondContent" class="credict-info-second-content">
      <slot name="secondContent"></slot>
    </div>
  </div>
</template>

<script>
  /**
   * credict-info
   * @module components/credict-info
   * @desc app首页增信静态页面
   * @param {string} [title] - 标题
   * @param {slot} [description] - 描述
   * @param {string} [imgSrc] - 图片链接
   * @param {slot} [mainContent] - 整段内容
   * @param {slot} [secondContent] - 分点内容
   *
   * @example
   * <credict-info title="我是标题" imgSrc="src">
   *   <p slot="description" >hello</p>
   *   <p slot="maincontent">world</p>
   * </credict-info>
   */
  export default {
    name: 'app-header',
    props: {
      title: String,
      imgSrc: String
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';

  .credict-info {
    width: 650px;
    margin: 0 auto;
    padding-top: 50px;
    text-align: center;
    border-bottom: 2px dashed @line-light-color; /*no*/
    box-sizing: border-box;
    &-title {
      font-size: 32px;
      color: @text-orange-color;
    }
    &-description {
      font-size: 24px;
      color: @text-gray-medium-color;
    }
    img {
      width: 186px;
      margin: 30px 0 50px 0;
    }
    &-main-content {
      font-size: 24px;
      color: @text-third-color;
      text-align: left;
      text-indent: 2em;
      margin-bottom: 50px;
    }
    &-second-content {
      font-size: 24px;
      color: @text-third-color;
      text-align: left;
      margin-bottom: 50px;
    }
  }
</style>
