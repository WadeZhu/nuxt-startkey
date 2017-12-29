
<template>
  <div class="klg-symmetry-cell">
    <slot name="left"></slot>
    <slot name="right"></slot>
  </div>
</template>

<style lang="less" scoped>
  /* 
    左右对称分布的行
    为了兼容低版本ios，需要传入div
  */
  .klg-symmetry-cell {
    display: flex;
    justify-content: space-between;
  }
</style>