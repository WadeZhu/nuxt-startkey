<template>
  <div class="actionsheet">
    <transition name="klg-actionsheet-mask">
      <div class="klg-mask klg-mask_transparent" @click="onClickingMask" v-show="show"></div>
    </transition>
    <div class="klg-actionsheet" :class="{'klg-actionsheet_toggle': show}" v-show="show">
      <div class="klg-actionsheet__menu">
        <div class="klg-actionsheet-header" v-if="hasHeaderSlot">
          <slot name="header"></slot>
        </div>
        <div class="klg-actionsheet__cell" v-for="(text, key) in menus" @click="onMenuClick(text, key)" v-html="text.label || text" :class="`klg-actionsheet-menu-${text.type || 'default'}`">
        </div>
      </div>
      <div class="klg-actionsheet__action" @click="emitEvent('on-click-menu', 'cancel')" v-if="showCancel">
        <div class="klg-actionsheet__cell">{{cancelText || '取消'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'actionsheet',
  mounted () {
    this.hasHeaderSlot = !!this.$slots.header
    this.$nextTick(() => {
      this.$tabbar = document.querySelector('.klg-tabbar')
    })
  },
  props: {
    value: Boolean,
    showCancel: Boolean,
    cancelText: String,
    menus: {
      type: [Object, Array],
      default: () => ({})
    },
    closeOnClickingMask: {
      type: Boolean,
      default: true
    },
    closeOnClickingMenu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      hasHeaderSlot: false,
      show: false
    }
  },
  methods: {
    onMenuClick (text, key) {
      if (typeof text === 'string') {
        this.emitEvent('on-click-menu', key)
      } else {
        if (text.type !== 'disabled' && text.type !== 'info') {
          if (text.value) {
            this.emitEvent('on-click-menu', text.value)
          } else {
            this.show = false
          }
        }
      }
    },
    onClickingMask () {
      this.$emit('on-click-mask')
      this.closeOnClickingMask && (this.show = false)
    },
    emitEvent (event, menu) {
      if (event === 'on-click-menu' && !/.noop/.test(menu)) {
        this.$emit(event, menu)
        this.$emit(`${event}-${menu}`)
        this.closeOnClickingMenu && (this.show = false)
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
    show (val) {
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
        this.show = val
      },
      immediate: true
    }
  },
  beforeDestroy () {
    this.fixIos(100)
  }
}
</script>

<style lang="less">
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
.klg-actionsheet__menu{
  background-color: #FFFFFF;
}
.klg-actionsheet__action {
  border-top: 10px solid rgba(0, 0, 0, .4); /* px */
  background-color: #FFFFFF;
}
.klg-actionsheet-header {
  padding: 24px 30px;
  text-align: center;
  font-size: 32px;
}
.klg-actionsheet__cell {
  position: relative;
  padding: 24px 30px;
  font-size: 28px;
  &:after {
    .setBottomLine(@line-light-color);
  }
  &:active{
    background-color: #ECECEC;
  }
  &:last-child{
    &:after {
      display: none;
    }
  }
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