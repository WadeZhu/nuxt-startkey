<template>
  <div class="actionsheet">
    <transition name="klg-actionsheet-mask">
      <div class="klg-mask klg-mask_transparent" @click="onClickingMask" v-show="visible"></div>
    </transition>
    <div class="klg-actionsheet" :class="{'klg-actionsheet_toggle': visible}">
      <div class="commonsheet">
        <span class="icon-close" @click="emitEvent('on-click-menu', 'cancel')">
            <slot name="close"></slot>
        </span>
        <div class="commonsheet-header">
          <slot name="header"></slot>
        </div>
        <div class="commonsheet-body">
          <div class="commonsheet-content">
            <slot name="main"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RebuyrulesDialog from 'components/rebuyrules-dialog/index.js'

export default {
  name: 'commonsheet',
  mounted () {
    this.$nextTick(() => {
      this.$tabbar = document.querySelector('.klg-tabbar')
    })
  },
  props: {
    value: Boolean
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    onClickingMask () {
      this.$emit('on-click-mask')
      this.visible = false
    },
    emitEvent (event, menu) {
      if (event === 'on-click-menu' && !/.noop/.test(menu)) {
        this.$emit(event, menu)
        this.$emit(`${event}-${menu}`)
        this.visible = false
      }
    },
    fixIos (zIndex) {
      if (this.$el.parentNode && this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1) {
        return
      }
      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
        this.$tabbar.style.zIndex = zIndex
      }
    }
  },
  watch: {
    visible (val) {
      this.$emit('input', val)
      if (val) {
        this.fixIos(-1)
      } else {
        setTimeout(() => {
          this.fixIos(100)
        }, 200)
      }
    },
    value: {
      handler: function (val) {
        this.visible = val
      },
      immediate: true
    }
  },
  beforeDestroy () {
    this.fixIos(100)
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/styles/fn.less';

.klg-actionsheet {
  position: fixed;
  left: 0;
  bottom: 0;
  transform: translate(0, 100%);
  backface-visibility: hidden;
  z-index: 5000;
  width: 100%;
  background-color: #fff;
  //slide up animation
  transition: transform .3s;
}

//actionSheet aniamtion
.klg-actionsheet_toggle{
  transform: translate(0, 0);
}

.klg-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .4);
}

.klg-mask_transparent{
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.commonsheet {
  background-color: #fff;
  text-align: center;
  color: @text-gray-color;
  &-header {
    padding: 25px 0;
    font-size: 32px;
    color: @text-main-color;
    position: relative;
  }
  .icon-close {
    display: inline-block;
    position: absolute;
    right: 50px;
    top: 30px;
  }
  &-body {
    padding: 38px;
  }
  &-content {
    min-height: 500px;
    position: relative;
  }
}

.klg-actionsheet-menu-primary {
  color: @actionsheet-label-primary-color;
}
.klg-actionsheet-menu-warn {
  color: @actionsheet-label-warn-color;
}
.klg-actionsheet-menu-default {
  color: @actionsheet-label-default-color;
}
.klg-actionsheet-menu-disabled {
  color: @actionsheet-label-disabled-color;
}
.klg-actionsheet-mask-enter,
.klg-actionsheet-mask-leave-active {
  opacity: 0;
}
.klg-actionsheet-mask-leave-active,
.klg-actionsheet-mask-enter-active {
  transition: opacity 300ms!important;
}
</style>