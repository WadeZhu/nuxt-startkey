<template>
  <span v-text="text" :class="['klg-badge', {'klg-badge-single': typeof text !== 'undefined' && text.toString().length === 1}]"></span>
</template>

<script>
export default {
  props: {
    text: [String, Number]
  }
}
</script>

<style lang="less">
@import '../../../assets/styles/variable.less';

.klg-badge {
  display: inline-block;
  text-align: center;
  background: @badge-bg-color;
  color: #fff;
  font-size: 24px;
  height: 28px;
  line-height: 28px;
  border-radius: 14px;
  padding: 0 10px;
  background-clip: padding-box;
  vertical-align: middle;
}

.klg-badge-single {
  padding: 0;
  width: 28px;
}
</style>