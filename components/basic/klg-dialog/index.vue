<template>
  <div class="klg-dialog" @touchmove.prevent="onTouchMove">
    <transition :name="maskTransition">
      <div class="klg-dialog-mask" @click="hideOnBlur && (currentValue = false)" v-show="currentValue"></div>
    </transition>
    <div class="klg-dialog-content-wraper">
      <transition :name="dialogTransition">
        <div class="klg-dialog-content" v-show="currentValue">
          <div class="klg-dialog-body">
            <div class="klg-dialog-close" :class="['klg-dialog-close--' + this.closeIconPosition]" @click="currentValue = false" v-show="showCloseIcon"></div>
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'klg-dialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'klg-dialog-mask'
    },
    dialogTransition: {
      type: String,
      default: 'klg-dialog-content'
    },
    hideOnBlur: {
      type: Boolean,
      default: true
    },
    showCloseIcon: {
      type: Boolean,
      default: true
    },
    closeIconPosition: {
      type: String,
      default: 'top'
    },
    scroll: {
      type: Boolean,
      default: true
    }
  },
  created () {
    if (typeof this.value !== 'undefined') {
      this.currentValue = this.value
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit(val ? 'on-show' : 'on-hide')
      this.$emit('input', val)
    }
  },
  data () {
    return {
      currentValue: false
    }
  },
  methods: {
    onTouchMove: function (event) {
      !this.scroll && event.preventDefault()
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/styles/transition.less';

.klg-dialog-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .6);
}

.klg-dialog-content-wraper {
  position: fixed;
  top: 50%;
  left: 8%;
  z-index: 1000;
  width: 84%;
  transform: translateY(-50%)
  // top: 0;
  // right: 0;
  // bottom: 0;
  // left: 0;
}

.klg-dialog-content {
  width: 100%;
}

.klg-dialog-body {
  position: relative;
  max-width: 800px;
  background-color: #fff;
  border-radius: 10px;
}

.klg-dialog-close {
  position: absolute;
  top: -89.6px;
  right: 0;
  &:after {
    font-family: Arial;
    display: inline-block;
    text-align: center;
    content: "\D7";
    font-size: 56px;
    line-height: 56px;
    color: #fff;
    border: 2px solid #fff; /*px*/
    border-radius: 50%;
    width: 56px;
    height: 56px;
  }
  &--bottom {
    top: 105%;
    right: 50%;
    transform: translateX(50%);
  }
}
</style>
