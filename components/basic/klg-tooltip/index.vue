<template>
  <span class="klg-tooltip" :class="classes">
    <slot>{{text}}</slot>
  </span>
</template>

<script>
  export default {
    name: 'klg-tooltip',
    props: {
      text: String,
      large: Boolean,
      type: {
        default: 'primary'
      }
    },
    computed: {
      classes () {
        return [
          {
            'klg-btn--large': this.large
          },
          `klg-btn--${this.type}`
        ]
      }
    }
  }
</script>

<style lang="less">
  @import '../../../assets/styles/fn.less';

  .klg-tooltip {
    position: relative;
    font-size: 22px;
    padding: 2px 8px 2px 10px;
    border-radius: 6px;
    border: 1px solid @tooltip-primary-color; /*px*/
    color: @tooltip-primary-color;
    &:after {
      content: "";
      position: absolute;
      left: -1.3*4px;
      top: 50%;
      margin-top: -2px;
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #fff;
      border-left: 1px solid @tooltip-primary-color; /*px*/
      border-top: 1px solid @tooltip-primary-color; /*px*/
      transform: rotate(-45deg);
    }
  }
</style>