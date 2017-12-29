<template>
  <div class="gain-wrapper" v-if="gain">
    <div class="gain-wrapper-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: ['gain'],
  name: 'input-tips',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/styles/fn.less';

.gain-wrapper {
  position: absolute;
  right: 30px;
  top: 100%;
  border: 1px solid #eabe41; /* no */
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  border-radius: 12px;
  background: #fff;
  font-size: 24px;
  color: @text-secondary-color;
  &-inner {
      position: relative;
      overflow: hidden;
      padding: 6px 24px;
      border-radius: 12px;
      background-color: #fff;
  }
  &:before {
      content: '';
      width: 16px;
      height: 16px;
      border-top: 1px solid #eabe41; /* no */
      border-right: 1px solid #eabe41; /* no */
      background-color: #fff;
      transform: rotate(-45deg);
      position: absolute;
      top: -8px;
      right: 28px;
  }
}
</style>