<template>
  <button class="klg-btn" :class="classes" :disabled="disabled" :type="actionType">
    <slot>{{text}}</slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      default: 'default'
    },
    disabled: Boolean,
    large: Boolean,
    block: Boolean,
    plain: Boolean,
    text: String,
    actionType: String,
    showLoading: Boolean
  },
  computed: {
    classes () {
      return [
        {
          'klg-btn--disabled': this.disabled,
          'klg-btn--block': this.block,
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

  button, input {
    &.klg-btn {
      width: 100%;
      border-width: 0;
      outline: 0;
      -webkit-appearance: none;
      &:focus {
          outline: 0;
      }
    }
  }

  .klg-btn {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 64px;
    padding-right: 64px;
    text-align: center;
    text-decoration: none;
    text-align: center;
    text-decoration: none;
    font-size: @button-font-size;
    color: @button-default-font-color;
    line-height: unit(@button-border-height/@button-font-size);
    border-radius: @button-border-radius;
  }
  
  .klg-btn--large {
    line-height: unit(@button-large-border-height/@button-font-size);
  }
  
  .klg-btn--block {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  .klg-btn--default {
    background-color: @button-default-bg;
    background-image: linear-gradient(@button-default-bg-linear-top, @button-default-bg-linear-bottom);
  }

  .klg-btn--secondary {
    background-color: @button-secondary-bg;
    background-image: linear-gradient(@button-secondary-bg-linear-top, @button-secondary-bg-linear-bottom);
  }

  .klg-btn[disabled],
  .klg-btn--disabled {
    background-color: @button-disabled-bg;
    background-image: linear-gradient(@button-disabled-bg-linear-top, @button-disabled-bg-linear-bottom);
  }
</style>
