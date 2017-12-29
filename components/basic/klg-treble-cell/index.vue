
<template>
  <div class="klg-treble-cell">
    <slot name="left"></slot>
    <slot name="middle"></slot>
    <slot name="right"></slot>
  </div>
</template>

<style lang="less" scoped>
  /* 
    左中右对称分布的行
    需要给klg-treble-cell设定高度
    需要传入div
    为了兼容低版本ios，所以不用flex布局写法
  */
  .klg-treble-cell div {
    width: 1/3*100%;
    float: left;
  }
</style>